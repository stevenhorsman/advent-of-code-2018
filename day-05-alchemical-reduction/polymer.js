function calculateReductionLength(input) {
  for (let i = 0; i< input.length-1;i++) {
    if (Math.abs(input.charCodeAt(i) - input.charCodeAt(i+1)) === 32) {
      input = input.substr(0,i) + input.substr(i+2);
      i=i-2;
    }
  }
  return input.length;
}

function calculateReductionLengthWithRemoval(input) {

  const minReductionLength = Array(26).fill()
    .map((_, i) => input.replace(new RegExp(String.fromCharCode(65 + i), 'gi'),'')) //i ignores case
    .map((input) => calculateReductionLength(input))
    .sort((a, b) => a - b )[0];
  return minReductionLength;
}

module.exports.calculateReductionLength = calculateReductionLength;
module.exports.calculateReductionLengthWithRemoval = calculateReductionLengthWithRemoval;