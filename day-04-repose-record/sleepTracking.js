function calculateMostAsleep(input) {
  let guardId = 0
  let minute = 0;
  const log = input
    .split('\n')
    .map((x) => x.trim());

  // Organise inputs - sort chron
  // foreach guard work out asleep mins
  // work out sleepiest guard
  // work out sleepiest time.

  return guardId * minute;
}

// function findGoodClaim(input) {

//   const claims = input
//     .split('\n')
//     .map((claim) => {
//       result = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
//       return {id:+result[1], x:+result[2], y:+result[3],width:+result[4],height:+result[5]}
//     });

    

//     for (let i = 0; i < claims.length; i++) {
//       overlap = false;
//       for (let j = 0; j < claims.length; j++) {
//         if (i === j) {
//           continue;
//         }
//         if (isOverlap(claims[i],claims[j])) {
//           overlap = true;
//           break;
//         }
//       }
//       if (!overlap) {
//         return claims[i].id
//       }
//     }
// }

module.exports.calculateMostAsleep = calculateMostAsleep;
//module.exports.findGoodClaim = findGoodClaim;