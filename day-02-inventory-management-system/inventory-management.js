function calculateChecksum(input) {
  const boxIds = input
    .split('\n')
    .map((x) => x.trim());

  let twoTimes = 0;
  let threeTimes = 0;

  boxIds.forEach(id => {
    let map = new Map();
    id.split('').forEach(char => {
      if (map.has(char)) {
        map.set(char, map.get(char) + 1);
      } else {
        map.set(char, 1);
      }
    });

    const counts = Array.from(map.values());
    let found2 = Object.values(counts).includes(2);
    let found3 = counts.filter(count => count === 3).length > 0;

    if (found2) {
      twoTimes++;
    }
    if (found3) {
      threeTimes++;
    }
  });
  return twoTimes * threeTimes;
}

function findCommonLetters(input) {

  const ids = input
    .split('\n')
    .map((x) => x.trim());

  for (let i = 0; i < ids.length; i++) {
    for (let j = 0; j < ids.length; j++) {
      //Calculate number of diffs
      let diffs = 0;
      let common = '';
      for (var x = 0; x < ids.length && diffs < 2; x++) {
        if (ids[i].charAt(x) != ids[j].charAt(x)) {
          diffs++;
        } else {
          common = common + ids[i].charAt(x);
        }
      }
      if (diffs == 1) {
        return common;
      }
    }
  }
}

module.exports.calculateChecksum = calculateChecksum;
module.exports.findCommonLetters = findCommonLetters;