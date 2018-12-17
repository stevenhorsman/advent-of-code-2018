const expect = require('chai').expect;
const fs = require('fs');

const reservoir = require('./reservoir');

describe('Day 17: Reservoir Research', () => {
    
  describe('Part One', () => {
    it('should calculate number of wet tiles', () => {
      const input = 
      `x=495, y=2..7
      y=7, x=495..501
      x=501, y=3..7
      x=498, y=2..4
      x=506, y=1..2
      x=498, y=10..13
      x=504, y=10..13
      y=13, x=498..504`;
      expect(reservoir.calculateWetSquares(input)).to.equal(57);
    });

    it('Input file should return after 20 iterations', () => {
      const input = fs.readFileSync('day-17-reservoir-research/input.txt').toString();
      expect(reservoir.calculateWetSquares(input)).to.equal(32552);
    }).timeout(10000);
  });

  describe('Part Two', () => {
    it('should calculate number of wet tiles', () => {
      const input = 
      `x=495, y=2..7
      y=7, x=495..501
      x=501, y=3..7
      x=498, y=2..4
      x=506, y=1..2
      x=498, y=10..13
      x=504, y=10..13
      y=13, x=498..504`;
      expect(reservoir.calculateStandingWater(input)).to.equal(29);
    });

    it('Input file should return after 20 iterations', () => {
      const input = fs.readFileSync('day-17-reservoir-research/input.txt').toString();
      expect(reservoir.calculateStandingWater(input)).to.equal(26405);
    }).timeout(10000);
  });
});
