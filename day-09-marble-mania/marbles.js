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
      players[p] = players[p] + playerScore;
    } else {
      marbleIndex = (marbleIndex + 1) % board.length + 1;
      board.splice(marbleIndex,0,m);
    }
    p = (p + 1) % playerCount;
  }
  return Math.max(...Object.values(players));
}

module.exports.calculateHighScore = calculateHighScore;