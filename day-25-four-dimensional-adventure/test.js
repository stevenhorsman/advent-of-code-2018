const expect = require('chai').expect;
const fs = require('fs');

const fourd = require('./fourd');

describe('Day 25: Four-Dimensional Adventure', () => {
    
  describe('Part One', () => {
    it('should calculate number of constellations', () => {
      const coords =
      `0,0,0,0
      3,0,0,0
      0,3,0,0
      0,0,3,0
      0,0,0,3
      0,0,0,6
      9,0,0,0
     12,0,0,0`;
      expect(fourd.consellationCount(coords)).to.equal(2);
    });

    it('should calculate number of constellations', () => {
      const coords =
      `-1,2,2,0
      0,0,2,-2
      0,0,0,-2
      -1,2,0,0
      -2,-2,-2,2
      3,0,2,-1
      -1,3,2,2
      -1,0,-1,0
      0,2,1,-2
      3,0,0,0`;
      expect(fourd.consellationCount(coords)).to.equal(4);
    });

    it('should calculate number of constellations', () => {
      const coords =
      `1,-1,0,1
      2,0,-1,0
      3,2,-1,0
      0,0,3,1
      0,0,-1,-1
      2,3,-2,0
      -2,2,0,0
      2,-2,0,-1
      1,-1,0,-1
      3,2,0,2`;
      expect(fourd.consellationCount(coords)).to.equal(3);
    });

    it('should calculate number of constellations', () => {
      const coords =
      `1,-1,-1,-2
      -2,-2,0,1
      0,2,1,3
      -2,3,-2,1
      0,2,3,-2
      -1,-1,1,-2
      0,-2,-1,0
      -2,2,3,-1
      1,2,2,0
      -1,-2,0,-2`;
      expect(fourd.consellationCount(coords)).to.equal(8);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-25-four-dimensional-adventure/input.txt').toString();
      expect(fourd.consellationCount(input)).to.equal(346);
    });
  });
});
