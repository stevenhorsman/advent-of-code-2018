function sumMetadata(input) {
  return parseNode(input.split(' ').map(x => +x));
}

function parseNode(input) {
  let childCount = input.shift();
  let metadataCount = input.shift();
  
  let metaSum = 0;
  for (let i = 0; i < childCount; i++) {
    metaSum += parseNode(input);
  }
  
  for (let i = 0; i < metadataCount; i++) {
    metaSum += input.shift();
  }
  return metaSum;
}

function calculateMetadata(input) {
  return parseNodeWithMetaSum(input.split(' ').map(x => +x));
}

function parseNodeWithMetaSum(input) {
  let metaSum = 0;
  let childCount = input.shift();
  let metadataCount = input.shift();
  if (childCount == 0) {
    for (let i = 0; i < metadataCount; i++) {
      metaSum += input.shift();
    }
    return metaSum;
  } else {
    let childVals = new Array();
    for (let i = 0; i < childCount; i++) {
      childVals.push(parseNodeWithMetaSum(input));
    }
    for (let i = 0; i < metadataCount; i++) {
      let metadata = input.shift() - 1; //1 indexed, not zero
      if (metadata < childVals.length) {
        metaSum += childVals[metadata];
      }
    }
  }
  return metaSum;
}

module.exports.sumMetadata = sumMetadata;
module.exports.calculateMetadata = calculateMetadata;