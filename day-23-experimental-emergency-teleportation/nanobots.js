const FlatQueue = require('flatqueue');
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
    // console.log('manhatt min', minDistance);
    // console.log('manhatt max', maxDistance);
    // console.log('bb size', this.size);
    // console.log('range', bot.range, 'returns',  minDistance <= bot.range, '|', maxDistance <= bot.range);
    return (minDistance < this.size && maxDistance < this.size) || minDistance <= bot.range || maxDistance <= bot.range;
  }

  halve() {
    const halfX = Math.round((this.min.x + this.max.x) /2);
    const halfY = Math.round((this.min.y + this.max.y) /2);
    const halfZ = Math.round((this.min.z + this.max.z) /2);
    console.log(this.min, new Point(halfX, halfY, halfZ), this.max, this.size);
    
    if (this.size > 3) {
      return [
        new BoundingBox(this.min, new Point(halfX, halfY, halfZ)),
        new BoundingBox(new Point(this.min.x, this.min.y, halfZ), new Point(halfX, halfY, this.max.z)),
        new BoundingBox(new Point(this.min.x, halfY, this.min.z), new Point(halfX, this.max.y, halfZ)),
        new BoundingBox(new Point(this.min.x, halfY, halfZ), new Point(halfX, this.max.y, this.max.z)),
        new BoundingBox(new Point(halfX, this.min.y, this.min.z), new Point(this.max.x, halfY, halfZ)),
        new BoundingBox(new Point(halfX, this.min.y, halfZ), new Point(this.max.x, halfY, this.max.z)),
        new BoundingBox(new Point(halfX, halfY, this.min.z), new Point(this.max.x, this.max.y, halfZ)),
        new BoundingBox(new Point(halfX, halfY, halfZ), this.max)
      ];
    }

    return [
      //TODO - create constructor with different args length
      new BoundingBox(this.min, this.min),
      new BoundingBox(new Point(this.min.x, this.min.y, this.max.z), new Point(this.min.x, this.min.y, this.max.z)),
      new BoundingBox(new Point(this.min.x, this.max.y, this.min.z), new Point(this.min.x, this.max.y, this.min.z)),
      new BoundingBox(new Point(this.min.x, this.max.y, this.max.z), new Point(this.min.x, this.max.y, this.max.z)),
      new BoundingBox(new Point(this.max.x, this.min.y, this.min.z), new Point(this.max.x, this.min.y, this.min.z)),
      new BoundingBox(new Point(this.max.x, this.min.y, this.max.z), new Point(this.max.x, this.min.y, this.max.z)),
      new BoundingBox(new Point(this.max.x, this.max.y, this.min.z), new Point(this.max.x, this.max.y, this.min.z)),
      new BoundingBox(this.max, this.max)
    ];
  }

  get distanceFromOrigin() {
    let minDistance = this.min.calculateManhattenDistance(new Point(0,0,0));
    let maxDistance = this.max.calculateManhattenDistance(new Point(0,0,0));
    return minDistance + maxDistance;
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
 
  const sortX = nanobots
    .map(p => p.point.x)
    .sort((a, b) => b - a);
  let minX = sortX[sortX.length - 1];
  let maxX = sortX[0];

  const sortY = nanobots
    .map(p => p.point.y)
    .sort((a, b) => b - a);
  let minY = sortY[sortY.length - 1];
  let maxY = sortY[0];

  const sortZ = nanobots
    .map(p => p.point.z)
    .sort((a, b) => b - a);
  let minZ = sortZ[sortZ.length - 1];
  let maxZ = sortZ[0];

  const origin = new Point(0,0,0);
  let bestSoFar = origin;
  //bestSoFar = new Point(20407349, 13636438, 35377809);
  let bestInRange = nanobots.filter(bot => bot.point.calculateManhattenDistance(bestSoFar) <= bot.range).length;
 
  const bestX = 20254179;
  const bestY = 13636420;
  const bestZ = 35224657;

  minX = bestX - 754179;
  maxX = bestX + 1854179;
  minY = bestY - 754179;
  maxY = bestY + 1854179;
  minZ = bestZ - 754179;
  maxZ = bestZ + 1854179;

  let xDist = 1000000;
  let yDist = 1000000;
  let zDist = 1000000;
  while((xDist + yDist + zDist) > 500) {
    console.log('current best so far', bestSoFar, bestInRange, (xDist + yDist + zDist));
    xDist = Math.ceil((maxX - minX) / 250);
    yDist = Math.ceil((maxY - minY) / 250);
    zDist = Math.ceil((maxZ - minZ) / 250);
    // console.log('x:', minX, maxX, xDist);
    // console.log('y:', minY, maxY, yDist);
    // console.log('z:', minZ, maxZ, zDist);
    for(let x = minX; x <= maxX; x=x+xDist) {
      for(let y = minY; y <= maxY; y=y+yDist) {
        for(let z = minZ; z <= maxZ; z=z+zDist) {
          //console.log('z',z);
          //console.log(x,y,z);
          let current = new Point(x,y,z);
          let inRange = nanobots.filter(bot => bot.point.calculateManhattenDistance(current) <= bot.range).length;
          if (inRange > bestInRange) {
            bestInRange = inRange;
            bestSoFar = current;
          } else if (inRange == bestInRange) {
            //console.log('draw', current, ' vs', bestSoFar);
            if (current.calculateManhattenDistance(origin) < bestSoFar.calculateManhattenDistance(origin)) {
              bestSoFar = current;
            }
          }
        }
      }
    }
    maxX = Math.ceil(bestSoFar.x + (xDist));
    minX = Math.floor(bestSoFar.x - (xDist));
    maxY = Math.ceil(bestSoFar.y + (yDist));
    minY = Math.floor(bestSoFar.y - (yDist));
    maxZ = Math.ceil(bestSoFar.z + (zDist));
    minZ = Math.floor(bestSoFar.z - (zDist));
    //console.log('current best so far', bestSoFar, bestInRange, (xDist + yDist + zDist));
  }
  
  // let boundingBox = createAllBoundingBox(nanobots);
  // while(boundingBox.size > 300) {
  //   console.log('>>>>>>',boundingBox, nanobots.filter(bot => boundingBox.inRange(bot)).length, '=>');
  //   boundingBox.halve().forEach(box => console.log(box, nanobots.filter(bot => box.inRange(bot)).length));
  //   boundingBox = boundingBox.halve()
  //     .sort((a, b) => nanobots.filter(bot => b.inRange(bot)).length - nanobots.filter(bot => a.inRange(bot)).length
  //       || a.distanceFromOrigin - b.distanceFromOrigin)[0];
  // }
  // console.log(boundingBox, 'box bots:', boundingBox, nanobots.filter(bot => boundingBox.inRange(bot)).length);

  // console.log('current best so far', bestSoFar, bestInRange);

  //DETAILED
  for(let x = minX; x <= maxX;x++) {
    for(let y = minY; y <= maxY;y++) {
      for(let z = minZ; z <= maxZ;z++) {
        let current = new Point(x,y,z);
        let inRange = nanobots.filter(bot => bot.point.calculateManhattenDistance(current) <= bot.range).length;
        if (inRange > bestInRange) {
          bestInRange = inRange;
          bestSoFar = current;
        } else if (inRange == bestInRange) {
          if (current.calculateManhattenDistance(origin) < bestSoFar.calculateManhattenDistance(origin)) {
            bestSoFar = current;
          }
        }
      }
    }
  }

  // console.log('nanobots length', nanobots.length);
  // console.log('all bots:', boundingBox, nanobots.filter(bot => boundingBox.inRange(bot)).length);
  console.log('Answer 1 bots in range:', bestSoFar, nanobots.filter(bot => bot.point.calculateManhattenDistance(bestSoFar) <= bot.range
  ).length, bestSoFar.calculateManhattenDistance(new Point(0, 0, 0)));
  
  //Check we can't go lower
  let tempBest = new Point(bestSoFar.x-1, bestSoFar.y, bestSoFar.z);
  while (getNumberInRange(nanobots, tempBest) >= bestInRange) {
    bestInRange = tempBest;
    tempBest = new Point(bestSoFar.x-1, bestSoFar.y, bestSoFar.z);
  }

  tempBest = new Point(bestSoFar.x, bestSoFar.y-1, bestSoFar.z);
  while (getNumberInRange(nanobots, tempBest) >= bestInRange) {
    bestInRange = tempBest;
    tempBest = new Point(bestSoFar.x, bestSoFar.y-1, bestSoFar.z);
  }

  tempBest = new Point(bestSoFar.x, bestSoFar.y, bestSoFar.z-1);
  while (getNumberInRange(nanobots, tempBest) >= bestInRange) {
    bestInRange = tempBest;
    tempBest = new Point(bestSoFar.x, bestSoFar.y, bestSoFar.z-1);
  }

  //let answer = new BoundingBox(bestCoordinate, bestCoordinate);
  console.log('bots in range:', bestSoFar, nanobots.filter(bot => bot.point.calculateManhattenDistance(bestSoFar) <= bot.range
  ).length, bestSoFar.calculateManhattenDistance(new Point(0, 0, 0)));
  return bestSoFar.calculateManhattenDistance(new Point(0, 0, 0));
}

function calculateBestCoordinatesWithAnswer(input, targetAnswer = 71631000) {
  let nanobots = parseCoordinates(input).sort((a, b) => b.range - a.range);
 
  const sortX = nanobots
    .map(p => p.point.x)
    .sort((a, b) => b - a);
  let minX = sortX[sortX.length - 1];
  let maxX = sortX[0];

  const sortY = nanobots
    .map(p => p.point.y)
    .sort((a, b) => b - a);
  let minY = sortY[sortY.length - 1];
  let maxY = sortY[0];

  const sortZ = nanobots
    .map(p => p.point.z)
    .sort((a, b) => b - a);
  let minZ = sortZ[sortZ.length - 1];
  let maxZ = sortZ[0];

  const origin = new Point(0,0,0);
  let bestSoFar = origin;
  //bestSoFar = new Point(20407349, 13636438, 35377809);
  let bestInRange = nanobots.filter(bot => bot.point.calculateManhattenDistance(bestSoFar) <= bot.range).length;
 
  const bestX = 21318514;
  const bestY = 13731836;
  const bestZ = 36384408;

  minX = bestX - 754179;
  maxX = bestX + 1854179;
  minY = bestY - 754179;
  maxY = bestY + 1854179;
  minZ = bestZ - 754179;
  maxZ = bestZ + 1854179;

  let xDist = 1000000;
  let yDist = 1000000;
  let zDist = 1000000;
  while((xDist + yDist + zDist) > 500) {
    console.log('current best so far', bestSoFar, bestInRange, (xDist + yDist + zDist));
    xDist = Math.ceil((maxX - minX) / 96);
    yDist = Math.ceil((maxY - minY) / 96);
    zDist = Math.ceil((maxZ - minZ) / 96);
    // console.log('x:', minX, maxX, xDist);
    // console.log('y:', minY, maxY, yDist);
    // console.log('z:', minZ, maxZ, zDist);
    for(let x = minX; x <= maxX; x=x+xDist) {
      for(let y = minY; y <= maxY; y=y+yDist) {
        for(let z = minZ; z <= maxZ; z=z+zDist) {
          if ((x + y + z) < targetAnswer-1000) {
            continue;
          }
          //console.log('z',z);
          //console.log(x,y,z);
          let current = new Point(x,y,z);
          let inRange = nanobots.filter(bot => bot.point.calculateManhattenDistance(current) <= bot.range).length;
          if (inRange > bestInRange) {
            bestInRange = inRange;
            bestSoFar = current;
          } else if (inRange == bestInRange) {
            //console.log('draw', current, ' vs', bestSoFar);
            if (current.calculateManhattenDistance(origin) < bestSoFar.calculateManhattenDistance(origin)) {
              bestSoFar = current;
            }
          }
        }
      }
    }
    maxX = Math.ceil(bestSoFar.x + (xDist));
    minX = Math.floor(bestSoFar.x - (xDist));
    maxY = Math.ceil(bestSoFar.y + (yDist));
    minY = Math.floor(bestSoFar.y - (yDist));
    maxZ = Math.ceil(bestSoFar.z + (zDist));
    minZ = Math.floor(bestSoFar.z - (zDist));
    //console.log('current best so far', bestSoFar, bestInRange, (xDist + yDist + zDist));
  }
  
  // let boundingBox = createAllBoundingBox(nanobots);
  // while(boundingBox.size > 300) {
  //   console.log('>>>>>>',boundingBox, nanobots.filter(bot => boundingBox.inRange(bot)).length, '=>');
  //   boundingBox.halve().forEach(box => console.log(box, nanobots.filter(bot => box.inRange(bot)).length));
  //   boundingBox = boundingBox.halve()
  //     .sort((a, b) => nanobots.filter(bot => b.inRange(bot)).length - nanobots.filter(bot => a.inRange(bot)).length
  //       || a.distanceFromOrigin - b.distanceFromOrigin)[0];
  // }
  // console.log(boundingBox, 'box bots:', boundingBox, nanobots.filter(bot => boundingBox.inRange(bot)).length);

  // console.log('current best so far', bestSoFar, bestInRange);

  //DETAILED
  for(let x = minX; x <= maxX;x++) {
    for(let y = minY; y <= maxY;y++) {
      for(let z = minZ; z <= maxZ;z++) {
        let current = new Point(x,y,z);
        let inRange = nanobots.filter(bot => bot.point.calculateManhattenDistance(current) <= bot.range).length;
        if (inRange > bestInRange) {
          bestInRange = inRange;
          bestSoFar = current;
        } else if (inRange == bestInRange) {
          if (current.calculateManhattenDistance(origin) < bestSoFar.calculateManhattenDistance(origin)) {
            bestSoFar = current;
          }
        }
      }
    }
  }

  // console.log('nanobots length', nanobots.length);
  // console.log('all bots:', boundingBox, nanobots.filter(bot => boundingBox.inRange(bot)).length);
  console.log('Answer 1 bots in range:', bestSoFar, nanobots.filter(bot => bot.point.calculateManhattenDistance(bestSoFar) <= bot.range
  ).length, bestSoFar.calculateManhattenDistance(new Point(0, 0, 0)));
  
  //Check we can't go lower
  let tempBest = new Point(bestSoFar.x-1, bestSoFar.y, bestSoFar.z);
  while (getNumberInRange(nanobots, tempBest) >= bestInRange) {
    bestInRange = tempBest;
    tempBest = new Point(bestSoFar.x-1, bestSoFar.y, bestSoFar.z);
  }

  tempBest = new Point(bestSoFar.x, bestSoFar.y-1, bestSoFar.z);
  while (getNumberInRange(nanobots, tempBest) >= bestInRange) {
    bestInRange = tempBest;
    tempBest = new Point(bestSoFar.x, bestSoFar.y-1, bestSoFar.z);
  }

  tempBest = new Point(bestSoFar.x, bestSoFar.y, bestSoFar.z-1);
  while (getNumberInRange(nanobots, tempBest) >= bestInRange) {
    bestInRange = tempBest;
    tempBest = new Point(bestSoFar.x, bestSoFar.y, bestSoFar.z-1);
  }

  //let answer = new BoundingBox(bestCoordinate, bestCoordinate);
  console.log('bots in range:', bestSoFar, nanobots.filter(bot => bot.point.calculateManhattenDistance(bestSoFar) <= bot.range
  ).length, bestSoFar.calculateManhattenDistance(new Point(0, 0, 0)));
  return bestSoFar.calculateManhattenDistance(new Point(0, 0, 0));
}

function getNanobotsForPoint(input, x,y,z) {
  const nanobots = parseCoordinates(input).sort((a, b) => b.range - a.range);
  const point = new Point(x,y,z);
  return getNumberInRange(nanobots, point);
}

function getNumberInRange(nanobots, point) {
  return nanobots.filter(bot => bot.point.calculateManhattenDistance(point) <= bot.range).length;
}

//Based on https://www.reddit.com/r/adventofcode/comments/a8s17l/2018_day_23_solutions/ecdqzdg/
//Convert to 1D then traverse along and look for overlaps
function redditAttempt(input) {
  let nanobots = parseCoordinates(input).sort((a, b) => b.range - a.range);
  let queue = new FlatQueue();
  const origin = new Point(0,0,0);
  nanobots.forEach(bot =>  {
    let originDistance = bot.point.calculateManhattenDistance(origin);
    queue.push(1, Math.max(0,originDistance-bot.range));
    queue.push(-1, originDistance+bot.range);
  });

  let count = 0;
  let maxCount = 0;
  let result = 0;
  while (queue.length > 0) {
    let dist = queue.peekValue();
    let e = queue.pop();
    count += e;
    if (count > maxCount) {
      result = dist;
      maxCount = count;
    }
  }
  return result;
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

module.exports.getNanobotsForPoint = getNanobotsForPoint;
module.exports.redditAttempt = redditAttempt;
module.exports.calculateBestCoordinatesWithAnswer = calculateBestCoordinatesWithAnswer;
