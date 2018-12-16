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
      .sort((a, b) => a.hitPoints - b.hitPoints || a.y - b.y || a.x - b.x)[0];
  }
  
  getEnemies() {
    return map.alivePlayers.filter(p => p.symbol !== this.symbol);
  }

  calculateManhattenDistance(otherPlayer) {
    return Math.abs(this.x - otherPlayer.x) + Math.abs(this.y - otherPlayer.y);
  }

  move() {
  // let inRange = new Set(this.getEnemies().map(player => getAdjacentAvailableSpace(player.x, player.y))
  //   .reduce((acc, spaces) => acc.concat(...spaces),[]));
  // let targets = {};
  // inRange.forEach(position => {
  //   targets[`${position.x},${position.y}`] = undefined;
  // });
  // //console.log('inRange',inRange);
  // //Find out which paths we can get to

  // //console.log('targets',targets);
  // getPaths(targets, new Set(), this.x,this.y, []);

  // let orderedTargets = Object.values(targets).filter(x => x).map(array => array.slice(1)).sort((a,b) => a.length - b.length || a[0].y - b[0].y || a[0].x - b[0].x);
    let altMove = findNextMovement(this);
    // if (orderedTargets.length > 0) {
    //   if (orderedTargets[0][0].x != altMove.x || orderedTargets[0][0].y != altMove.y) {
    //     console.log('orderedTargets',orderedTargets[0][0], altMove);
    //   }
    //   const nextMove = orderedTargets[0][0];
    if (altMove != null) {
      let nextMove = altMove;
      //console.log('next move',orderedTargets[0][0]);
      this.x = nextMove.x;
      this.y = nextMove.y;
    } else if(altMove != null) {
      console.log('>>>>>>>>>no ordered targets:',altMove);
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

//copied from https://github.com/albertobastos/advent-of-code-2018-nodejs/blob/master/src/d15.js - same result as mine, but much much faster
function findNextMovement(player) {
  let targetKeys = {}; // "x,y" ==> { x, y } of alive enemy
  player.getEnemies()
    .map(p => getAdjacentAvailableSpace(p.x, p.y))
    .reduce((acc, list) => acc.concat(...list), [])
    .forEach(pos => (targetKeys[`${pos.x},${pos.y}`] = pos));

  let visited = {};
  visited[`${player.x},${player.y}`] = true;

  let paths = [[{x: player.x,y:player.y}]];
  while (true) {
    let newPaths = [];
    let targetPaths = [];
    paths.forEach(path => {
      let adjacents = getAdjacentAvailableSpace(path[path.length - 1].x, path[path.length - 1].y);
      adjacents.forEach(adj => {
        let xy = `${adj.x},${adj.y}`;
        if (targetKeys[xy]) {
          // found a path to a target!
          // add it so at the end of the iteration we chose the right one based on enemy order
          targetPaths.push([...path, adj, targetKeys[xy]]);
        } else if (!visited[xy]) {
          // new extended path to explore at next iteration
          newPaths.push([...path, adj]);
        }
        visited[xy] = true; // mark as visited so other paths ignore it
      });
    });

    if (targetPaths.length > 0) {
      // we got one or more paths reaching a target for the first time, here is where our search ends
      // if we found multiple shortest paths, use the one that reaches the first target according top-to-bottom/left-to-right order
      targetPaths = targetPaths.sort((p1, p2) =>
        p1[p1.length - 1].y === p2[p2.length - 1].y
          ? p1[p1.length - 1].x - p2[p2.length - 1].x
          : p1[p1.length - 1].y - p2[p2.length - 1].y
      );

      // return the first step to take for the shortest path ([0] is the player current position)
      return targetPaths[0][1];
    }

    // no paths to a target found yet, keep iterating with the paths after one more step
    paths = newPaths;
    if (paths.length < 1) return null; // no reachables targets, search ends without a result
  }
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
  while (!finished) {
    rounds++;
    finished = round();
    //console.log('finished', finished);
    //check if either side is completed.
    //finished = new Goblin(0,0).getEnemies().length == 0 || new Elf(0,0).getEnemies().length == 0;
    if (rounds % 1 == 0) {
      console.log('After',rounds,'rounds');
      map.print();
      console.log(map.alivePlayers.sort((a, b) => a.y - b.y || a.x - b.x).map(player => `${player.symbol} ${player.x} ${player.y} ${player.hitPoints}`).join("\n"));
      console.log('');
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