const enumify = require('enumify');

class GroundSquare extends enumify.Enum { }
GroundSquare.initEnum({
  SAND: {
    get symbol() { return '.'; }
  },
  CLAY: {
    get symbol() { return '#'; }
  },
  WATER: {
    get symbol() { return '~'; }
  },
  RUNNING: {
    get symbol() { return '|'; }
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

class Grid {
  constructor(width, height, springX, defaultValue) {
    this.width = width;
    this.height = height;
    this.springX = springX;
    this.grid = new Array(height);
    for (let i = 0, length = height; i < length; ++i) {
      this.grid[i] = new Array(width).fill(defaultValue);
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
    return GroundSquare.VOID;
  }

  getBucketRange(x, y) {
    let min = x;
    let max = x;
    while (this.get(max + 1, y) == GroundSquare.RUNNING) {
      max++;
    }
    if (this.get(max + 1, y) != GroundSquare.CLAY) {
      //no wall
      return [1,0];
    }
    while (this.get(min - 1, y) == GroundSquare.RUNNING) {
      min--;
    }
    if (this.get(min - 1, y) != GroundSquare.CLAY) {
      //no wall
      return [1,0];
    }
    //console.log('getBucketRange',x,y,'=',min, max);
    return [min, max];
  }

  isBlocking(x, y) {
    return this.get(x, y) == GroundSquare.WATER || this.get(x, y) == GroundSquare.CLAY;
  }

  print() {
    console.log(new Array(this.springX + 1).join(' ') + '+');
    for (let y = 0; y < this.grid.length; y++) {
      console.log(this.grid[y].map(square => square.symbol).join(''));
    }
    console.log('');
  }

  get waterSquares() {
    let water = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.get(x, y) == GroundSquare.WATER || this.get(x, y) == GroundSquare.RUNNING) {
          water++;
        }
      }
    }
    return water;
  }

  //TODO tidy
  get standingWaterSquares() {
    let water = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.get(x, y) == GroundSquare.WATER) {
          water++;
        }
      }
    }
    return water;
  }
}

function calculateWetSquares(input) {
  let grid = floodGrid(input);
  return grid.waterSquares;
}

function calculateStandingWater(input) {
  let grid = floodGrid(input);
  return grid.standingWaterSquares;
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

  let grid = new Grid(width, height, springX, GroundSquare.SAND);
  clay.forEach(pos => grid.set(pos.x - minX, pos.y - minY, GroundSquare.CLAY));
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
  if (below == GroundSquare.SAND) {
    // console.log('settingBelowToRunning');
    //flow down and continue;
    grid.set(x, y + 1, GroundSquare.RUNNING);
    propagateWater(grid, x, y + 1);
  }
  //console.log('below is Blocking',grid.get(x, y + 1));
  if (grid.isBlocking(x, y + 1)) {
    if (grid.get(x + 1, y) == GroundSquare.SAND) {
      // console.log('settingRightToRunning');
      grid.set(x + 1, y, GroundSquare.RUNNING);
      propagateWater(grid, x + 1, y);
    }
  }
  //console.log('below is Blocking2',grid.get(x, y + 1));
  if (grid.isBlocking(x, y + 1)) {
    if (grid.get(x - 1, y) == GroundSquare.SAND) {
      // console.log('settingLefttToRunning');
      grid.set(x - 1, y, GroundSquare.RUNNING);
      propagateWater(grid, x - 1, y);
    }
  }
  //console.log('getting bucket');
  let range = grid.getBucketRange(x, y);
  if (range[0] <= range[1]) {
    // console.log('filling bucketRange', x, y, range);
    for (let i = range[0]; i <= range[1]; i++) {
      grid.set(i, y, GroundSquare.WATER);
    }
  }
}
module.exports.calculateWetSquares = calculateWetSquares;
module.exports.calculateStandingWater = calculateStandingWater;