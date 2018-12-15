function getScore(recipeNo) {
  let score = '37';
  let elf1Pointer = 0;
  let elf2Pointer = 1;
  //console.log(score, elf1Pointer,'(',score.charAt(elf1Pointer),')', elf2Pointer,'(',score.charAt(elf2Pointer),')');
  while (score.length < recipeNo+10) {
    let elf1Score = +score.charAt(elf1Pointer); 
    let elf2Score = +score.charAt(elf2Pointer); 
    score += (elf1Score + elf2Score);
    elf1Pointer = (elf1Pointer + 1 + elf1Score) % score.length;
    elf2Pointer = (elf2Pointer + 1 + elf2Score) % score.length;
    //console.log(score, elf1Pointer,'(',score.charAt(elf1Pointer),')', elf2Pointer,'(',score.charAt(elf2Pointer),')');
  }
  return score.substring(recipeNo,recipeNo+10);
}

function getScoreArray(recipeNo) {
  let recipes = [3,7];
  let elf1Pointer = 0;
  let elf2Pointer = 1;
  while (recipes.length < recipeNo+10) {
    let elf1Score = +recipes[elf1Pointer]; 
    let elf2Score = +recipes[elf2Pointer];
    (elf1Score + elf2Score).toString().split('').forEach(element => {
      recipes.push(element);
    });
    elf1Pointer = (elf1Pointer + 1 + elf1Score) % recipes.length;
    elf2Pointer = (elf2Pointer + 1 + elf2Score) % recipes.length;
  }
  return recipes.slice(recipeNo,recipeNo+10).join('');
}

//Array manipulation tons faster than string
// function getRecipeNo(target) {
//   let score = '37';
//   let elf1Pointer = 0;
//   let elf2Pointer = 1;
//   //console.log(score, elf1Pointer,'(',score.charAt(elf1Pointer),')', elf2Pointer,'(',score.charAt(elf2Pointer),')');
//   let checked = 0;
//   let found = false;
//   while (!found) {
//     if (score.length > checked + 1000) {
//       if (score.substring(checked-target.length).includes(target)) {
//         found = true;
//         break;
//       } else {
//         checked = score.length;
//       }
//     }
//     let elf1Score = +score.charAt(elf1Pointer); 
//     let elf2Score = +score.charAt(elf2Pointer); 
//     score += (elf1Score + elf2Score);
//     elf1Pointer = (elf1Pointer + 1 + elf1Score) % score.length;
//     elf2Pointer = (elf2Pointer + 1 + elf2Score) % score.length;
//     if (score.length % 1000 == 0) {
//       console.log('Attempted',score.length);
//     }
//     //console.log(recipes,':',score, elf1Pointer,'(',score.charAt(elf1Pointer),')', elf2Pointer,'(',score.charAt(elf2Pointer),')');
//   }
//   return score.indexOf(target);
// }

function getRecipeNoArray(target) {
  let recipes = [3,7];
  let elf1Pointer = 0;
  let elf2Pointer = 1;
  //console.log(score, elf1Pointer,'(',score.charAt(elf1Pointer),')', elf2Pointer,'(',score.charAt(elf2Pointer),')');
  let checked = 0;
  let found = false;
  while (!found) {
    if (recipes.length > checked + 10000) {
      if (recipes.slice(checked-target.length).join('').includes(target)) {
        found = true;
        break;
      } else {
        checked = recipes.length;
      }
    }
    let elf1Score = +recipes[elf1Pointer]; 
    let elf2Score = +recipes[elf2Pointer];
    (elf1Score + elf2Score).toString().split('').forEach(element => {
      recipes.push(element);
    });
    elf1Pointer = (elf1Pointer + 1 + elf1Score) % recipes.length;
    elf2Pointer = (elf2Pointer + 1 + elf2Score) % recipes.length;
  }
  return recipes.join('').indexOf(target);
}

module.exports.getScore = getScore;
module.exports.getScoreArray = getScoreArray;
// module.exports.getRecipeNo = getRecipeNo;
module.exports.getRecipeNoArray = getRecipeNoArray;
