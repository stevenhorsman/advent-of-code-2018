function calculateFrequency(input) {
  let result = 0;
  input.split(/\r?\n/).forEach(change => {
    result += parseInt(change);
  });
  return result;

  //Better:
  // return input
  // .split('\n')
  // .map((x) => parseInt(x))
  // .reduce((a, b) => a + b, 0);
}

function calculateFrequencyFoundTwice(input) {
  const frequencies = new Set([0]);
  let result = 0;
  let repetitionFound = false;

  const changes = input
    .split('\n')
    .map((x) => parseInt(x));

  while (!repetitionFound) {
    for (let i=0; i<changes.length; i++) {
      result += changes[i];
      if (frequencies.has(result)) {
        repetitionFound = true;
        break;
      }
      frequencies.add(result);
    }
  }
  return result;
}
   
module.exports.calculateFrequency = calculateFrequency;
module.exports.calculateFrequencyFoundTwice = calculateFrequencyFoundTwice;