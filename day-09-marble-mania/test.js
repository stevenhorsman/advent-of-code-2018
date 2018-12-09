const expect = require('chai').expect;
const fs = require('fs');

const marbles = require('./marbles');

describe('Day 9: Marble Mania', () => {
    
  describe('Part One', () => {
    it('should calculate high score for 9 players; last marble is worth 25 points', () => {
      const input = '9 players; last marble is worth 25 points';
      expect(marbles.calculateHighScore(input)).to.equal(32);
    });
  
    it('should calculate high score for 10 players; last marble is worth 1618 points', () => {
      const input = '10 players; last marble is worth 1618 points';
      expect(marbles.calculateHighScore(input)).to.equal(8317);
    });

    it('should calculate high score for 13 players; last marble is worth 7999 points', () => {
      const input = '13 players; last marble is worth 7999 points';
      expect(marbles.calculateHighScore(input)).to.equal(146373);
    });
  
    it('should calculate high score for 17 players; last marble is worth 1104 points', () => {
      const input = '17 players; last marble is worth 1104 points';
      expect(marbles.calculateHighScore(input)).to.equal(2764);
    });
  
    it('should calculate high score for 21 players; last marble is worth 6111 points', () => {
      const input = '21 players; last marble is worth 6111 points';
      expect(marbles.calculateHighScore(input)).to.equal(54718);
    });
  
    it('should calculate high score for 30 players; last marble is worth 5807 points', () => {
      const input = '30 players; last marble is worth 5807 points';
      expect(marbles.calculateHighScore(input)).to.equal(37305);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-09-marble-mania/input.txt').toString();
      expect(marbles.calculateHighScore(input)).to.equal(373597);
    });
  });

  describe('Part Two', () => {
    it('should calculate high score for 9 players; last marble is worth 25 points', () => {
      const input = '9 players; last marble is worth 25 points';
      expect(marbles.calculateHighScoreLL(input)).to.equal(32);
    });
    
    it('should calculate high score for 10 players; last marble is worth 1618 points', () => {
      const input = '10 players; last marble is worth 1618 points';
      expect(marbles.calculateHighScoreLL(input)).to.equal(8317);
    });

    it('should calculate high score for 13 players; last marble is worth 7999 points', () => {
      const input = '13 players; last marble is worth 7999 points';
      expect(marbles.calculateHighScoreLL(input)).to.equal(146373);
    });
  
    it('should calculate high score for 17 players; last marble is worth 1104 points', () => {
      const input = '17 players; last marble is worth 1104 points';
      expect(marbles.calculateHighScoreLL(input)).to.equal(2764);
    });
  
    it('should calculate high score for 21 players; last marble is worth 6111 points', () => {
      const input = '21 players; last marble is worth 6111 points';
      expect(marbles.calculateHighScoreLL(input)).to.equal(54718);
    });
  
    it('should calculate high score for 30 players; last marble is worth 5807 points', () => {
      const input = '30 players; last marble is worth 5807 points';
      expect(marbles.calculateHighScoreLL(input)).to.equal(37305);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-09-marble-mania/input.txt').toString();
      expect(marbles.calculateHighScoreLL(input,100)).to.equal(2954067253);
    });
  });
});
