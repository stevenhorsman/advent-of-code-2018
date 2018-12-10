class MovingPoint {
  constructor(x, y, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
  }
}

function modelStars(input) {

  let stars = [];

  input.split('\n')
  .map((line) => {
    let result = line.trim().match(/position\=<(.+),(.+)> velocity=<(.+),(.+)>/);
    stars.push(new MovingPoint(+result[1], +result[2], +result[3], +result[4]));
  });

  for(let i = 0; i <= 3; i++) {
    stars.map((star) => {
      star.px += star.xVel;
      star.py += star.yVel;
    });
  }


}

module.exports.modelStars = modelStars;