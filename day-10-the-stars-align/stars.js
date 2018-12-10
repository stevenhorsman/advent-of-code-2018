class MovingPoint {
  constructor(x, y, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
  }
}

function modelStars(input, maxIters) {

  let stars = [];

  input.split('\n')
  .map((line) => {
    let result = line.trim().match(/position\=<(.+),(.+)> velocity=<(.+),(.+)>/);
    stars.push(new MovingPoint(+result[1], +result[2], +result[3], +result[4]));
  });



  for(let i = 0; i <= maxIters; i++) {
    stars.map((star) => {
      star.x += star.xVel;
      star.y += star.yVel;
    });

    const sortX = stars
      .map(p => p.x)
      .sort((a, b) => b - a);
    const minX = sortX[sortX.length-1];
    const maxX = sortX[0];

    const sortY = stars
      .map(p => p.y)
      .sort((a, b) => b - a);
    const minY = sortY[sortY.length-1];
    const maxY = sortY[0];

    //console.log(i, stars);
    //console.log(i, '(',minX,minY,'),(',maxX,maxY,')');
    if (maxY - minY <= 9 && maxX - minX < 100) {
      //Might be a good guess
      console.log("At iteration",i+1);
      drawStars(stars, minX, maxX, minY, maxY);
    }
  }
}

function drawStars(stars, minX, maxX, minY, maxY) {

  let starVals = {};
  stars.map((star) => starVals[`${star.x},${star.y}`]=1);

  for (let y = minY; y <= maxY; y++) {
    const line = [];
    for (let x = minX; x <= maxX; x++) {
      if (starVals[`${x},${y}`] == 1) {
        line.push('#');
      }
      else {
        line.push('.');
      }
    }
    console.log(line.join(''));
  }
}

module.exports.modelStars = modelStars;