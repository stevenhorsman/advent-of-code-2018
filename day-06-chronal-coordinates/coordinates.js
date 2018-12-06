let id = 0;

class Point {
  constructor(x, y) {
    this.id = id++;
    this.x = x;
    this.y = y;
    this.numberClosest = 0;
  }

  addClosestPointCount() {
    this.numberClosest++;
  }

  calculateManhattenDistance(x, y) {
    return Math.abs(this.x - x) + Math.abs(this.y - y);
  }
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setGrid(func) {
    this.grid = Array(this.height)
      .fill()
      .map((_, i) => Array(this.width));
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.grid[i][j] = func(i, j);
      }
    }
  }

  runOnGrid(func) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        func(i, j);
      }
    }
  }
}

function calculateLargestArea(input) {
  let coords = parseCoordinates(input);
  let maxX = coords.sort((a, b) => b.x - a.x)[0].x + 2;
  let maxY = coords.sort((a, b) => b.y - a.y)[0].y + 2;

  const grid = new Grid(maxX, maxY);
  grid.setGrid((i, j) => {
    let ordered = coords.sort((a, b) => a.calculateManhattenDistance(i, j) - b.calculateManhattenDistance(i, j));
    if (ordered[0].calculateManhattenDistance(i, j) !== ordered[1].calculateManhattenDistance(i, j)) {
      ordered[0].addClosestPointCount();
      return ordered[0].id;
    } else {
      return -1;
    }
  });

  //Get a list of letters on the perimeter to exclude
  let infinite = new Set([0]);
  for (let i = 0; i < maxX; i++) {
    infinite.add(grid.grid[i][0]);
    infinite.add(grid.grid[i][maxY - 1]);
  }
  for (let j = 0; j < maxY; j++) {
    infinite.add(grid.grid[0][j]);
    infinite.add(grid.grid[maxX - 1][j]);
  }

  return coords
    .filter(point => !infinite.has(point.id))
    .sort((a, b) => b.numberClosest - a.numberClosest)[0].numberClosest;
}

function calculateAreaInDistance(input, distance) {
  let coords = parseCoordinates(input);
  let maxX = coords.sort((a, b) => b.x - a.x)[0].x + 10;
  let maxY = coords.sort((a, b) => b.y - a.y)[0].y + 10;

  const grid = new Grid(maxX, maxY);
  let inRange = 0;
  grid.runOnGrid((i,j) => {
    let distanceSum = coords.reduce((acc, cur) => {
      return acc + cur.calculateManhattenDistance(i, j);
    }, 0);
    if (distanceSum < distance) {
      inRange++;
    }
  });
  return inRange;
}

function parseCoordinates(input) {
  return input
    .split('\n')
    .map((line) => {
      line = line.trim();
      let result = line.match(/(\d+), (\d+)/);
      return new Point(+result[1], +result[2]);
    });
}

module.exports.calculateLargestArea = calculateLargestArea;
module.exports.calculateAreaInDistance = calculateAreaInDistance;
