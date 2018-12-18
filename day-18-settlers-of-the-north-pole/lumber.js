const enumify = require('enumify');

class Acre extends enumify.Enum { }
Acre.initEnum({
  OPEN: {
    get symbol() { return '.'; }
  },
  WOOD: {
    get symbol() { return '|'; }
  },
  LUMBERYARD: {
    get symbol() { return '#'; }
  },
  VOID: {
    get symbol() { return '!'; }
  }
});

function parse(char) {
  for (const d of Acre.enumValues) {
    if (d.symbol === char) {
      return d;
    }
  }
}

class Grid {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.grid = Array(this.height);
    for (let j = 0; j < this.height; j++) {
      this.grid[j] = new Array(this.width);
    }
  }

  fill(inputLines) {
    for (let j = 0; j < this.height; j++) {
      this.grid[j] = inputLines[j].split('').map(char => parse(char));
    }
  }

  set(x, y, value) {
    if (x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length) {
      this.grid[y][x] = value;
    }
  }

  get(x, y) {
    if (x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length) {
      return this.grid[y][x];
    }
    return Acre.VOID;
  }

  print() {
    for (let y = 0; y < this.grid.length; y++) {
      console.log(this.grid[y].map(square => square.symbol).join(''));
    }
    console.log('');
  }

  evolve() {
    let nextState = new Grid(this.width, this.height);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        switch (this.get(x, y)) {
          case Acre.OPEN: {
            let woods = this.getNeighbourCount(x, y, Acre.WOOD);
            if (woods >= 3) {
              nextState.set(x, y, Acre.WOOD);
            } else {
              nextState.set(x, y, Acre.OPEN);
            }
            break;
          }
          case Acre.WOOD: {
            let lumberyards = this.getNeighbourCount(x, y, Acre.LUMBERYARD);
            if (lumberyards >= 3) {
              nextState.set(x, y, Acre.LUMBERYARD);
            } else {
              nextState.set(x, y, Acre.WOOD);
            }
            break;
          }
          case Acre.LUMBERYARD: {
            let woods = this.getNeighbourCount(x, y, Acre.WOOD);
            let lumberyards = this.getNeighbourCount(x, y, Acre.LUMBERYARD);
            if (woods > 0 && lumberyards > 0) {
              nextState.set(x, y, Acre.LUMBERYARD);
            } else {
              nextState.set(x, y, Acre.OPEN);
            }
            break;
          }
        }
      }
    }
    return nextState;
  }

  getNeighbourCount(x, y, type) {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (!(i == x && j == y)) { //don't count self
          if (this.get(i, j) == type) {
            count++;
          }
        }
      }
    }
    return count;
  }

  get woods() {
    let water = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.get(x, y) == Acre.WOOD) {
          water++;
        }
      }
    }
    return water;
  }

  get lumberYards() {
    let water = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.get(x, y) == Acre.LUMBERYARD) {
          water++;
        }
      }
    }
    return water;
  }
}

function calculateResourceProduct(input, iterations = 10) {
  let inputLines = input.split(/\r?\n/)
    .map((line) => line = line.trim());
  let grid = new Grid(inputLines[0].length, inputLines.length);
  grid.fill(inputLines);
  let cycleSearch = iterations > 500;
  const results = [];
  let prev = -1;
  let result = grid.woods * grid.lumberYards;
  results.push(result);
  for (let i = 1; i <= iterations; i++) {
    grid = grid.evolve();
    if (cycleSearch) {
      prev = result;
      result = grid.woods * grid.lumberYards;
      const prevIndex = results.indexOf(prev);
      if (prevIndex != -1 && results.indexOf(result) == prevIndex + 1) {
        const cycle = (i - prevIndex) - 1;
        while (i < iterations - cycle) {
          i += cycle;
        }
        cycleSearch = false;
      } else {
        results.push(result);
      }
    }
  }
  return grid.woods * grid.lumberYards;
}

module.exports.calculateResourceProduct = calculateResourceProduct;