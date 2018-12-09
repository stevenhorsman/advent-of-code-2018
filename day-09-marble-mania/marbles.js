function calculateHighScore(input, inputFactor = 1) {
  let result = input.match(/(\d+) players; last marble is worth (\d+) points/);
  const playerCount = result[1];
  const lastMarble = result[2] * inputFactor;

  let board = [0];
  let marbleIndex = 1;
  const players = {};
  for (let i = 0; i < playerCount; i += 1) {
    players[i] = 0;
  }
  
  let p = 0;
  for(let m = 1; m <= lastMarble; m++) {
    if (m % 23 == 0) {
      let playerScore = m;
      marbleIndex = (marbleIndex - 7 + board.length) % board.length;
      playerScore += board.splice(marbleIndex,1)[0];
      //console.log(p+1,"+",playerScore);
      players[p] = players[p] + playerScore;
    } else {
      marbleIndex = (marbleIndex + 1) % board.length + 1;
      board.splice(marbleIndex,0,m);
    }
    p = (p + 1) % playerCount;
    //console.log('[',p+1,']', board.join(' '),'curr:', board[marbleIndex]);
  }
  return Math.max(...Object.values(players));
}

class Node {
  constructor(data, prev, next) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}
function calculateHighScoreLL(input, inputFactor = 1) {
  let result = input.match(/(\d+) players; last marble is worth (\d+) points/);
  const playerCount = result[1];
  const lastMarble = result[2] * inputFactor;

  let currentNode = new Node(0);
  currentNode.next = currentNode;
  currentNode.prev = currentNode;

  //const zeroPointer = currentNode;

  const players = {};
  for (let i = 0; i < playerCount; i += 1) {
    players[i] = 0;
  }
  
  let p = 0;
  for(let m = 1; m <= lastMarble; m++) {
    if (m % 23 == 0) {
      let playerScore = m;
      //console.log("cN", currentNode.data);
      //console.log("cN.prev", currentNode.prev.data);
      let remove = currentNode.prev.prev.prev.prev.prev.prev.prev;
      //console.log("About to remove", remove.data);
      currentNode = remove.next;
      playerScore += remove.data;
      currentNode.prev = remove.prev;
      remove.prev.next = currentNode;
      //console.log(p+1,"+",playerScore);
      players[p] = players[p] + playerScore;
    } else {
      //console.log(m,':',currentNode.data);
      const insert = new Node(m,currentNode.next, currentNode.next.next);
      //console.log('inserting',insert.data, "[",insert.prev.data,insert.next.data,'}')
      //console.log(currentNode.next.data,'.next',m);
      //console.log(currentNode.next.next.data,'.prev',m);
      currentNode.next.next.prev = insert;
      currentNode.next.next = insert;
      currentNode = insert;
    }
    p = (p + 1) % playerCount;
    //console.log('[',p+1,']', listToArray(zeroPointer).join(' '),'curr:', currentNode.data,"[",currentNode.prev.data,currentNode.next.data,'}');
  }
  return Math.max(...Object.values(players));
}

// function listToArray(zeroPointer) {
//   let current = zeroPointer;
//   let data = [];
//   do {
//     data.push(current.data);
//     current = current.next;
//   }
//   while (current != zeroPointer);
//   return data;
// }

module.exports.calculateHighScore = calculateHighScore;
module.exports.calculateHighScoreLL = calculateHighScoreLL;