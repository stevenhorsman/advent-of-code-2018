function calculateOverlap(input) {
  const claims = input
    .split('\n')
    .map((claim) => {
      result = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
      return {id:+result[1], x:+result[2], y:+result[3],width:+result[4],height:+result[5]}
    });

  let squares = {}

  claims.forEach(claim => {
    for (let i = claim.x; i < (claim.x + claim.width); i++) {
     for (let j = claim.y; j < (claim.y + claim.height); j++) {
        squares[`${i},${j}`] = (squares[`${i},${j}`] || 0) + 1;
      }
    }
  });

  //console.log(squares);

  return Object.values(squares).filter(count => count > 1).length;
}

function findGoodClaim(input) {

  const claims = input
    .split('\n')
    .map((claim) => {
      result = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
      return {id:+result[1], x:+result[2], y:+result[3],width:+result[4],height:+result[5]}
    });

    return 0;
}

module.exports.calculateOverlap = calculateOverlap;
module.exports.findGoodClaim = findGoodClaim;