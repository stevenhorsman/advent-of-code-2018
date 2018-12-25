class Point {
  constructor(x, y, z, t) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.t = t;
  }

  calculateManhattenDistance(point) {
    return (
      Math.abs(this.x - point.x) +
      Math.abs(this.y - point.y) +
      Math.abs(this.z - point.z) +
      Math.abs(this.t - point.t)
    );
  }
}

class Constellation {
  constructor(points) {
    this.points = points;
  }

  addPoint(point) {
    this.points.push(point);
  }

  addPoints(points) {
    this.points = this.points.concat(points);
  }

  getPointDistance(point) {
    let minDist = Number.MAX_SAFE_INTEGER;
    this.points.forEach(member => {
      const dist = point.calculateManhattenDistance(member);
      if (dist < minDist) {
        minDist = dist;
      }
    });
    return minDist;
  }

  canMerge(constellation) {
    //console.log('can merge', this, constellation);
    return this.points.some(myPoint => {
      return constellation.points.some(point => {
        //console.log('distance', myPoint.calculateManhattenDistance(point));
        return myPoint.calculateManhattenDistance(point) <= 3;
      });
    });
  }
}

function consellationCount(input) {
  let constellations = [];
  let points = parseCoordinates(input);
  points.forEach(point => {
    //Add to first constellation that fits
    const joined = constellations.some(constellation => {
      if (constellation.getPointDistance(point) <= 3) {
        constellation.addPoint(point);
        return true;
      }
      return false;
    });
    if (!joined) {
      constellations.push(new Constellation([point]));
    }
  });

  //Now merge
  let merge = false;
  do {
    merge = false;
    constellations.forEach(constellationA => {
      constellations.forEach(constellationB => {
        if (
          constellationA !== constellationB &&
          constellationA.canMerge(constellationB)
        ) {
          merge = true;
          constellationA.addPoints(constellationB.points);
          const index = constellations.indexOf(constellationB);
          constellations.splice(index, 1);
        }
      });
    });
  } while (merge);
  return constellations.length;
}

function parseCoordinates(input) {
  return input.split(/\r?\n/).map(line => {
    line = line.trim();
    return new Point(...line.split(','));
  });
}

module.exports.consellationCount = consellationCount;
