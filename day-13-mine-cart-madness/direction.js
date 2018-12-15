const enumify = require('enumify');

class Direction extends enumify.Enum {}

Direction.initEnum({
  UP: {
    get clockwise() { return Direction.RIGHT; },
    get antiClockwise() { return Direction.LEFT; },
    get symbol() {return '^'; }
  },
  RIGHT: {
    get clockwise() { return Direction.DOWN; },
    get antiClockwise() { return Direction.UP; },
    get symbol() {return '>'; }
  },
  DOWN: {
    get clockwise() { return Direction.LEFT; },
    get antiClockwise() { return Direction.RIGHT; },
    get symbol() {return 'v'; }
  },
  LEFT: {
    get clockwise() { return Direction.UP; },
    get antiClockwise() { return Direction.DOWN; },
    get symbol() {return '<'; }
  }
});

function changeDirection(nextTrackPiece, currDirection) {
  if (nextTrackPiece === '/') {
    if (currDirection === Direction.UP || currDirection === Direction.DOWN) {
      return currDirection.clockwise;
    } else if (currDirection === Direction.RIGHT || currDirection === Direction.LEFT) {
      return currDirection.antiClockwise;
    }
  } else if (nextTrackPiece === '\\') {
    if (currDirection === Direction.UP || currDirection === Direction.DOWN) {
      return currDirection.antiClockwise;
    } else if (currDirection === Direction.RIGHT || currDirection === Direction.LEFT) {
      return currDirection.clockwise;
    }
  }
  return currDirection;
}

function parse(char) {
  for (const d of Direction.enumValues) {
    if(d.symbol === char) {
      return d;
    }
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(direction) {
    switch (direction) {
      case Direction.UP:
        this.y--;
        break;
      case Direction.RIGHT:
        this.x++;
        break;
      case Direction.DOWN:
        this.y++;
        break;
      case Direction.LEFT:
        this.x--;
        break;
    }
    return new Point(this.x, this.y);
  }

  equals(point) {
    return this.x == point.x && this.y == point.y;
  }
}

module.exports.changeDirection = changeDirection;
module.exports.parse = parse;
module.exports.Direction = Direction;
module.exports.Point = Point;