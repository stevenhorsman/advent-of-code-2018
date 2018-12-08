const expect = require('chai').expect;
const fs = require('fs');

const coordinates = require('./coordinates');

describe('Day 6: Chronal Coordinates', () => {
    
  describe('Part One', () => {
    it('should calculate largest area', () => {
      const coords =
      `1, 1
      1, 6
      8, 3
      3, 4
      5, 5
      8, 9`;
      expect(coordinates.calculateLargestArea(coords)).to.equal(17);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-06-chronal-coordinates/input.txt').toString();
      expect(coordinates.calculateLargestArea(input)).to.equal(5532);
    });
  });

  describe('Part Two', () => {
    it('should calculate largest area', () => {
      const coords =
      `1, 1
      1, 6
      8, 3
      3, 4
      5, 5
      8, 9`;
      expect(coordinates.calculateAreaInDistance(coords,32)).to.equal(16);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-06-chronal-coordinates/input.txt').toString();
      expect(coordinates.calculateAreaInDistance(input, 10000)).to.equal(36216);
    });
  });
});
