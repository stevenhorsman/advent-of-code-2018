function calculateReductionLength(input) {

  let chars = input.split("");

  //console.log(chars.join(""),"length",chars.length);

  let prevChar = chars[0];
  for (let i = 0; i< chars.length-1;i++) {
    //console.log("chars",chars.join(""), "i",i);
    if(chars[i] == null) {
      console.log("error at char",i);
    }
    let val_0 = chars[i].charCodeAt(0);
    let val_1 = chars[i+1].charCodeAt(0);
    if (Math.abs(val_0 - val_1) == 32) {
      chars.splice(i,2);
      i--;
      if (i > -1) {
        //if not first char then remove
        i--;
      }
      //console.log("chars",chars.join(""), "i",i);
    }

  }
  //console.log(input,"->",chars.join(""),"=",chars.length);
  return chars.length;
}

function calculateReductionLengthWithRemoval(input) {

  minReductionLength = Array(26).fill().map((_, i) => {
    let char = String.fromCharCode('A'.charCodeAt(0) + i);
    inputcopy = input.replace(new RegExp(""+char, 'g'),"");
    char = String.fromCharCode('a'.charCodeAt(0) + i);
    inputcopy = inputcopy.replace(new RegExp(""+char, 'g'),"");
    //console.log(input,"->",inputcopy,"replacing",char);
    //inputcopy = inputcopy.replace(String.fromCharCode('a'.charCodeAt(0) + i,""));
    return calculateReductionLength(inputcopy);
  }).sort((a, b) => a -b )[0];
  return minReductionLength;
}

module.exports.calculateReductionLength = calculateReductionLength;
module.exports.calculateReductionLengthWithRemoval = calculateReductionLengthWithRemoval;