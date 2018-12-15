const direction = require('./direction');

class MineCart {
  constructor(x, y, directionChar) {
    this.location = new direction.Point(x, y);
    this.direction = direction.parse(directionChar);
    this.turns = 0;
  }

  move(track) {
    this.location.update(this.direction);
    let nextTrackPiece = track[this.location.y][this.location.x];
    if (nextTrackPiece == '+') {
      switch (this.turns % 3) {
        case 0:
          this.direction = this.direction.antiClockwise;
          break;
        case 2:
          this.direction = this.direction.clockwise;
      }
      this.turns++;
    } else {
      this.direction = direction.changeDirection(nextTrackPiece, this.direction);
    }
  }
}

function getFirstCrashLocation(input) {
  return getLastCartLocation(input, true);
}

//Track parsing from Mario - https://github.com/mariotacke/advent-of-code-2018
function getLastCartLocation(input, stopOnFirstCrash = false) {
  const width = Math.max(...input.split('\n').map((line) => line.length));
  const track = input
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.padEnd(width, ' ').split(''));

  let carts = [];
  for (let y = 0; y < track.length; y++) {
    for (let x = 0; x < track[y].length; x++) {
      if (/[\^v<>]/.test(track[y][x])) {
        const marker = track[y][x];
        const cart = new MineCart(x, y, marker);

        track[y][x] = /[<>]/.test(marker) ? '-' : '|';
        carts.push(cart);
      }
    }
  }

  while (carts.length > 1) {
    const crashed = [];
    carts.sort((a, b) => a.location.y - b.location.y || a.location.x - b.location.x);
    for (let i = 0; i < carts.length; i++) {
      carts[i].move(track);
      let crashedCarts = carts.filter(cart => cart.location.equals(carts[i].location));
      if (crashedCarts.length > 1) {
        if (stopOnFirstCrash) {
          return `${carts[i].location.x},${carts[i].location.y}`;
        }
        
        //console.log("crash at", tick, carts[i].location);
        crashed.push(crashedCarts[0]);
        crashed.push(crashedCarts[1]);
      }
    }
    carts = carts.filter((cart) => !crashed.some(c => c === cart));
  }
  return `${carts[0].location.x},${carts[0].location.y}`;
}

// function printTrack(track, carts) {
//   let trackCopy = [];
//   for (var i = 0; i < track.length; i++)
//     trackCopy[i] = track[i].slice();
//   carts.forEach((cart) => {
//     trackCopy[cart.location.y][cart.location.x] = cart.direction.symbol;
//   });
//   for (let y = 0; y < trackCopy.length; y++) {
//     console.log(trackCopy[y].join(''));
//   }
//   console.log('');
// }

module.exports.getLastCartLocation = getLastCartLocation;
module.exports.getFirstCrashLocation = getFirstCrashLocation;
