class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  calculateManhattenDistance(point) {
    //console.log(this, point, Math.abs(this.x - point.x), Math.abs(this.y - point.y), Math.abs(this.z - point.z),'=',Math.abs(this.x - point.x) + Math.abs(this.y - point.y) + Math.abs(this.z - point.z));
    return Math.abs(this.x - point.x) + Math.abs(this.y - point.y) + Math.abs(this.z - point.z);
  }
}

class BoundingBox {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.size = this.min.calculateManhattenDistance(this.max);
  }

  inRange(bot) {
    let minDistance = this.min.calculateManhattenDistance(bot.point);
    let maxDistance = this.max.calculateManhattenDistance(bot.point);
    console.log('manhatt min', minDistance);
    console.log('manhatt max', maxDistance);
    console.log('bb size', this.size);
    console.log('range', bot.range, 'returns',  minDistance <= bot.range, '|', maxDistance <= bot.range);
    return minDistance <= bot.range || maxDistance <= bot.range;
  }
}

class Nanobot {
  constructor(x, y, z, range) {
    this.point = new Point(x, y, z);
    this.range = range;
  }

  calculateManhattenDistance(bot) {
    return this.point.calculateManhattenDistance(bot.point);
  }
}

function calculateNanobotsInRange(input) {
  let nanobots = parseCoordinates(input).sort((a, b) => b.range - a.range);
  let biggestRange = nanobots[0];
  return nanobots.filter(bot => bot.calculateManhattenDistance(biggestRange) <= biggestRange.range).length;
}

function calculateBestCoordinates(input) {
  let nanobots = parseCoordinates(input).sort((a, b) => b.range - a.range);
  let all = createAllBoundingBox(nanobots);

  console.log('nanobots length', nanobots.length);
  //console.log('all bots:', all, nanobots.filter(bot => all.inRange(bot)).length);

  let bestCoordinate = new Point(12, 12, 12);
  let answer = new BoundingBox(bestCoordinate, bestCoordinate);
  console.log('smal bots:', answer, nanobots.filter(bot => answer.inRange(bot)).length);
  return bestCoordinate.calculateManhattenDistance(new Point(0, 0, 0));



  //console.log(nanobots[0]);
  // let maxX = coords.sort((a, b) => b.x - a.x)[0].x + 2;
  // let maxY = coords.sort((a, b) => b.y - a.y)[0].y + 2;

  // const grid = new Grid(maxX, maxY);
  // grid.setGrid((i, j) => {
  //   let ordered = coords.sort((a, b) => a.calculateManhattenDistance(i, j) - b.calculateManhattenDistance(i, j));
  //   if (ordered[0].calculateManhattenDistance(i, j) !== ordered[1].calculateManhattenDistance(i, j)) {
  //     ordered[0].addClosestPointCount();
  //     return ordered[0].id;
  //   } else {
  //     return -1;
  //   }
  // });

  // //Get a list of letters on the perimeter to exclude
  // let infinite = new Set([0]);
  // for (let i = 0; i < maxX; i++) {
  //   infinite.add(grid.grid[i][0]);
  //   infinite.add(grid.grid[i][maxY - 1]);
  // }
  // for (let j = 0; j < maxY; j++) {
  //   infinite.add(grid.grid[0][j]);
  //   infinite.add(grid.grid[maxX - 1][j]);
  // }

  // return coords
  //   .filter(point => !infinite.has(point.id))
  //   .sort((a, b) => b.numberClosest - a.numberClosest)[0].numberClosest;
}

function createAllBoundingBox(nanobots) {
  const sortX = nanobots
    .map(p => p.point.x)
    .sort((a, b) => b - a);
  const minX = sortX[sortX.length - 1];
  const maxX = sortX[0];

  const sortY = nanobots
    .map(p => p.point.y)
    .sort((a, b) => b - a);
  const minY = sortY[sortY.length - 1];
  const maxY = sortY[0];

  const sortZ = nanobots
    .map(p => p.point.z)
    .sort((a, b) => b - a);
  const minZ = sortZ[sortZ.length - 1];
  const maxZ = sortZ[0];

  return new BoundingBox(new Point(minX, minY, minZ), new Point(maxX, maxY, maxZ));
}

function parseCoordinates(input) {
  return input.split(/\r?\n/)
    .map((line) => {
      line = line.trim();
      let result = line.match(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/);
      return new Nanobot(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
    });
}

module.exports.calculateNanobotsInRange = calculateNanobotsInRange;
module.exports.calculateBestCoordinates = calculateBestCoordinates;
module.exports.Point = Point;
module.exports.BoundingBox = BoundingBox;
module.exports.Nanobot = Nanobot;
