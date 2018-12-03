const expect = require('chai').expect;
const fs = require('fs');

const fabric = require('./fabric');

describe('Day 3: No Matter How You Slice It', () => {
    
  describe('Part One', () => {
    it('should calculate overlapping area', () => {
      const claims =
        `#1 @ 1,3: 4x4
         #2 @ 3,1: 4x4
         #3 @ 5,5: 2x2`;
  
         expect(fabric.calculateOverlap(claims)).to.equal(4);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-03-no-matter-how-you-slice-it/input.txt').toString();
      expect(fabric.calculateOverlap(input)).to.equal(118858);
    });
  });

  describe('Part Two', () => {
    it.only('should find if of non-overlapping claim', () => {
      const claims =
        `#1 @ 1,3: 4x4
         #2 @ 3,1: 4x4
         #3 @ 5,5: 2x2`;
  
         expect(fabric.findGoodClaim(claims)).to.equal(3);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-03-no-matter-how-you-slice-it/input.txt').toString();
      expect(fabric.findGoodClaim(input)).to.equal(3);
    });
  });
});
