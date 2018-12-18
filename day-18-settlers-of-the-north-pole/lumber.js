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

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function parse(char) {
  for (const d of Acre.enumValues) {
    if(d.symbol === char) {
      return d;
    }
  }

class Grid {
  constructor(input) {
    let splits = input.split(/\r?\n/)
      .map((line) => line = line.trim());
    this.height = splits.length;
    this.width = splits[0].length;
    this.grid = Array(this.height);
    for (let j = 0; j < this.height; j++) {
        this.grid[j] = splits[j].split('').map(char => parse(char));
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
  let grid = new Grid(input);
  grid.print();
  //floodGrid(input,iterations);
  return grid.woods * grid.lumberYards;
}

function floodGrid(input) {
  let clay = [];
  input.split(/\r?\n/)
    .map((line) => {
      line = line.trim();
      let result = line.match(/([x|y])=(\d+), ([x|y])=(\d+)..(\d+)/);
      if (result[1] == 'x') {
        for (let i = +result[4]; i <= +result[5]; i++) {
          clay.push(new Point(result[2], i));
        }
      } else {
        for (let i = +result[4]; i <= +result[5]; i++) {
          clay.push(new Point(i, +result[2]));
        }
      }
    });

  const sortX = clay
    .map(p => p.x)
    .sort((a, b) => b - a);
  const minX = +sortX[sortX.length - 1] -1;
  const width = (sortX[0] - minX) + 3;
  const springX = 500 - minX;

  const sortY = clay
    .map(p => p.y)
    .sort((a, b) => b - a);
  const minY = +sortY[sortY.length - 1];
  const height = (sortY[0] - minY) + 1;

  // console.log('Grid from', minX, minY, ' to ', minX + width, minY + height);

  let grid = new Grid(width, height, springX, Acre.SAND);
  clay.forEach(pos => grid.set(pos.x - minX, pos.y - minY, Acre.CLAY));
  //grid.print();

  propagateWater(grid, springX, -1);
  //grid.print();
  return grid;
}

function propagateWater(grid, x, y) {
  // console.log('propagateWater', x, y);
  //grid.print();
  //console.log('checking below',grid.get(x, y + 1));
  let below = grid.get(x, y + 1);
  if (below == Acre.SAND) {
    // console.log('settingBelowToRunning');
    //flow down and continue;
    grid.set(x, y + 1, Acre.RUNNING);
    propagateWater(grid, x, y + 1);
  }
  //console.log('below is Blocking',grid.get(x, y + 1));
  if (grid.isBlocking(x, y + 1)) {
    if (grid.get(x + 1, y) == Acre.SAND) {
      // console.log('settingRightToRunning');
      grid.set(x + 1, y, Acre.RUNNING);
      propagateWater(grid, x + 1, y);
    }
  }
  //console.log('below is Blocking2',grid.get(x, y + 1));
  if (grid.isBlocking(x, y + 1)) {
    if (grid.get(x - 1, y) == Acre.SAND) {
      // console.log('settingLefttToRunning');
      grid.set(x - 1, y, Acre.RUNNING);
      propagateWater(grid, x - 1, y);
    }
  }
  //console.log('getting bucket');
  let range = grid.getBucketRange(x, y);
  if (range[0] <= range[1]) {
    // console.log('filling bucketRange', x, y, range);
    for (let i = range[0]; i <= range[1]; i++) {
      grid.set(i, y, Acre.WATER);
    }
  }
}
module.exports.calculateResourceProduct = calculateResourceProduct;