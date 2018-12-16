//Some inspiration from https://github.com/albertobastos/advent-of-code-2018-nodejs/blob/master/src/d15.js
const enumify = require('enumify');

class MapObject extends enumify.Enum {}

MapObject.initEnum({
  WALL: {
    get available() { return false; },
    get symbol() {return '#'; }
  },
  EMPTY: {
    get available() { return true; },
    get symbol() {return '.'; }
  }
});

class Map {
  constructor(input) {
    this.players = [];
    this.grid = input.split(/\r?\n/).map((line,y) => {
      return line.trim().split('').map((char,x) => {
        if (char == 'G') {
          this.players.push(new Goblin(x,y));
          char = '.';
        } else if (char == 'E') {
          this.players.push(new Elf(x,y));
          char = '.';
        }
        return this.parse(char);
      });
    });
  }

  parse(char) {
    for (const d of MapObject.enumValues) {
      if(d.symbol === char) {
        return d;
      }
    }
  }

  print() {
    let mapCopy = [];
    for (var i = 0; i < this.grid.length; i++) {
      mapCopy[i] = this.grid[i].slice();
    }
    this.alivePlayers.forEach(player => {
      mapCopy[player.y][player.x] = player;
    });
    for (let y = 0; y < mapCopy.length; y++) {
      console.log(mapCopy[y].map(object => object.symbol).join(''));
    }
    console.log('');
  }

  getGrid(x, y) {
    if (x >=0 && x < this.grid[0].length && y >=0 && y < this.grid.length) {
      return this.grid[y][x];
    }
    return MapObject.WALL;

  }

  get alivePlayers() {
    return this.players.filter(player => player.isAlive);
  }
}

class Player {
  constructor(x, y) {
    this.power = 3;
    this.hitPoints = 200;
    this.x = x;
    this.y = y;
  }

  get isAlive() {
    return this.hitPoints > 0;
  }

  attack(enemy) {
    enemy.hitPoints -= this.power;
  }

  getEnemyInAttackRange() {
    return this.getEnemies()
      .filter(enemy => this.calculateManhattenDistance(enemy) === 1)
      .sort((a, b) => a.hitPoints - b.hitPoints)[0];
  }
  
  getEnemies() {
    return map.alivePlayers.filter(p => p.symbol !== this.symbol);
  }

  calculateManhattenDistance(otherPlayer) {
    return Math.abs(this.x - otherPlayer.x) + Math.abs(this.y - otherPlayer.y);
  }

  move() {
    let inRange = new Set(this.getEnemies().map(player => getAdjacentAvailableSpace(player.x, player.y))
      .reduce((acc, spaces) => acc.concat(...spaces),[]));
    let targets = {};
    inRange.forEach(position => {
      targets[`${position.x},${position.y}`] = undefined;
    });
    //console.log('inRange',inRange);
    //Find out which paths we can get to

    //console.log('targets',targets);
    getPaths(targets, new Set(), this.x,this.y, []);

    let orderedTargets = Object.values(targets).filter(x => x).map(array => array.slice(1)).sort((a,b) => a.length - b.length || a[0].y - b[0].y || a[0].x - b[0].x);
    //console.log('orderedTargets',orderedTargets);
    if (orderedTargets.length > 0) {
      const nextMove = orderedTargets[0][0];
      //console.log('next move',orderedTargets[0][0]);
      this.x = nextMove.x;
      this.y = nextMove.y;
    }
  }
}

function getPaths(targets, seen, x, y, pathSoFar) {
  if (pathSoFar.length > 100) return;
  let curr =`${x},${y}`;
  seen.add(curr);
  pathSoFar.push({x:x,y:y});
  if (Object.keys(targets).includes(curr)) {
    if (!targets[curr] || pathSoFar.length < targets[curr].length) {
      targets[curr] = pathSoFar.slice();
      //console.log('found better target', curr, 'path', pathSoFar/*, targets*/);
    }
  }
  //console.log('Now at', curr, /*Object.keys(targets).includes(curr), 'targets',targets,*/ pathSoFar/*, seen*/);
  let newAdj = getAdjacentAvailableSpace(x, y).filter(pos => !seen.has(`${pos.x},${pos.y}`));
  //console.log(curr,':newAdj', newAdj);
  newAdj.forEach(pos => {
    //console.log(curr,'about to visit',pos);
    getPaths(targets, new Set(seen), pos.x, pos.y, pathSoFar.slice());
  });
}

class Elf extends Player {
  constructor(x, y) {
    super(x, y);
  }
  get symbol() {return 'E'; }
}


class Goblin extends Player {
  constructor(x, y) {
    super(x, y);
  }
  get symbol() {return 'G'; }
}

let map;
function game(input) {
  map = new Map(input);
  //map.print();
  let finished = false;
  let rounds = 0;
  while (!finished && rounds < 50) {
    rounds++;
    finished = round();
    //console.log('finished', finished);
    //check if either side is completed.
    //finished = new Goblin(0,0).getEnemies().length == 0 || new Elf(0,0).getEnemies().length == 0;
    if (rounds % 20 == 0) {
      console.log('After',rounds,'rounds');
      map.print();
      console.log(map.alivePlayers);
    }
  }
  let hpSum = map.alivePlayers.map(player => player.hitPoints).reduce((acc, curr) => acc + curr, 0);
  rounds--;
  console.log('rounds', rounds,'sum',hpSum);
  return hpSum * rounds;
}

function round() {
  let finished = false;
  map.alivePlayers.sort((a, b) => a.y - b.y || a.x - b.x).forEach(player => {
    if(player.getEnemies().length == 0) {
      finished = true;
    }
    if (player.isAlive) {
      let enemyInRange = player.getEnemyInAttackRange();
      if (enemyInRange) {
        player.attack(enemyInRange);
      } else {
        player.move();
        let enemyInRange = player.getEnemyInAttackRange();
        if (enemyInRange) {
          player.attack(enemyInRange);
        } 
      }
    }
  });
  return finished;
}

function getAdjacentAvailableSpace(x, y) {
  const adjacents = [
    { x: x, y: y - 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x, y: y + 1 }
  ];
  return adjacents
    .filter(position => map.getGrid(position.x, position.y) == MapObject.EMPTY) //No wall
    .filter(position => !map.alivePlayers.some(player => {
      return player.x === position.x && player.y === position.y;
    })); //NO players
}

function getPlayer1InRange(input) {
  map = new Map(input);
  map.print();
  let player1 = map.alivePlayers.sort((a, b) => a.y - b.y || a.x - b.x)[0];
  console.log('player1',player1);
  player1.move();
  map.print();
}

module.exports.game = game;
module.exports.getPlayer1InRange = getPlayer1InRange;