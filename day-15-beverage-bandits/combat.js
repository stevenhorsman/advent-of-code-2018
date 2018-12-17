//Some inspiration from https://github.com/albertobastos/advent-of-code-2018-nodejs/blob/master/src/d15.js
const enumify = require('enumify');

class MapObject extends enumify.Enum {}

const DEFAULT_POWER = 3;

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

  getElves() {
    return this.players.filter(p => p.symbol == 'E');
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
  let inRange = new Set(this.getEnemies().map(player => getAdjacentAvailableSpace(player.x, player.y))
    .reduce((acc, spaces) => acc.concat(...spaces),[]));
  let targets = {};//Change to set
  inRange.forEach(position => {
    targets[`${position.x},${position.y}`] = undefined;
  });
 
    let nextMove = findPaths(targets, this.x, this.y);
    
    if (nextMove != null) {
      this.x = nextMove.x;
      this.y = nextMove.y;
    }
  }
}

//Algo from https://www.geeksforgeeks.org/shortest-path-unweighted-graph/
function findPaths(targets, x, y) {
  let queue = [];
  let dist = {};
  let pred = {};
  let visited = {};

  let posString = `${x},${y}`;
  visited[posString] = true;
  dist[posString] = 0;
  queue.push({x:x, y:y});

  while(queue.length > 0) {
    let position = queue.shift();
    let predString = `${position.x},${position.y}`;
    
    getAdjacentAvailableSpace(position.x, position.y).forEach(adj => {
      let posString = `${adj.x},${adj.y}`;
      if (visited[posString] !== true) {
        visited[posString] = true;
        dist[posString] = dist[predString] + 1;
        pred[posString] = predString;
        queue.push({x:adj.x, y:adj.y});

        if (Object.keys(targets).filter(target => visited[target] !== true).length == 0) {
          return true;
        }
      }
    });
  }
  let orderedTargets = Object.keys(targets).filter(target => dist[target] != undefined).sort((a,b) => {
    return dist[a] - dist[b] || a.split(',')[1] - b.split(',')[1] || a.split(',')[0] - b.split(',')[0];
  });
  if (orderedTargets.length == 0) {
    return null;
  }

  let crawl = orderedTargets[0];
  let prevStep;
  while (pred[crawl] && crawl != `${x},${y}`) {
    prevStep = crawl; 
    crawl = pred[crawl]; 
  }
  return {x:+prevStep.split(',')[0], y:+prevStep.split(',')[1]};
}

class Elf extends Player {
  constructor(x, y) {
    super(x, y);
    this.power=elfAttackPower;
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
let elfAttackPower = DEFAULT_POWER;
function game(input,noElfDies=false, roundCap = 9999999) {
  elfAttackPower = DEFAULT_POWER;
  let rounds = playGame(input,roundCap);
  while (noElfDies && map.getElves().filter(player => !player.isAlive).length > 0) {
    elfAttackPower++;
    rounds = playGame(input,roundCap);
  }
  
  let hpSum = map.alivePlayers.map(player => player.hitPoints).reduce((acc, curr) => acc + curr, 0);
  rounds--;
  console.log('elfPower',elfAttackPower,'rounds', rounds,'sum',hpSum);
  return hpSum * rounds;
}

function playGame(input,roundCap) {
  map = new Map(input);
  let finished = false;
  let rounds = 0;
  while (!(finished || rounds >= roundCap)) {
    rounds++;
    finished = round();
  }
  return rounds;
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
    { x: +x, y: +y - 1 },
    { x: +x - 1, y: +y },
    { x: +x + 1, y: +y },
    { x: +x, y: +y + 1 }
  ];

  return adjacents
    .filter(position => map.getGrid(position.x, position.y) == MapObject.EMPTY) //No wall
    .filter(position => !map.alivePlayers.some(player => 
      player.x == position.x && player.y == position.y
    )); //NO players
}

module.exports.game = game;