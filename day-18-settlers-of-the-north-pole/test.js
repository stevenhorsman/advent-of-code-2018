const expect = require('chai').expect;
const fs = require('fs');

const lumber = require('./lumber');

describe('Day 18: Settlers of The North Pole', () => {
    
  describe('Part One', () => {
    it('should calculate number of wet tiles', () => {
      const input = 
      `.#.#...|#.
        .....#|##|
        .|..|...#.
        ..|#.....#
        #.#|||#|#|
        ...#.||...
        .|....|...
        ||...#|.#|
        |.||||..|.
        ...#.|..|.`;
      expect(lumber.calculateResourceProduct(input)).to.equal(1147);
    });

    it('Input file should return after 10 iterations', () => {
      const input = fs.readFileSync('day-18-settlers-of-the-north-pole/input.txt').toString();
      expect(lumber.calculateResourceProduct(input)).to.equal(588436);
    });
  });

  describe('Part Two', () => {

    it('Input file should return after 1000000000 iterations', () => {
      const input = fs.readFileSync('day-18-settlers-of-the-north-pole/input.txt').toString();
      expect(lumber.calculateResourceProduct(input,1000000000)).to.equal(195290);
    });
  });
});
