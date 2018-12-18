const expect = require('chai').expect;
const fs = require('fs');

const lumber = require('./lumber');

describe.only('Day 18: Settlers of The North Pole', () => {
    
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

    // it('Input file should return after 20 iterations', () => {
    //   const input = fs.readFileSync('day-18-settlers-of-the-north-pole/input.txt').toString();
    //   expect(lumber.calculateWetSquares(input)).to.equal(32552);
    // }).timeout(10000);
  });

  // describe('Part Two', () => {
  //   it('should calculate number of wet tiles', () => {
  //     const input = 
  //     `x=495, y=2..7
  //     y=7, x=495..501
  //     x=501, y=3..7
  //     x=498, y=2..4
  //     x=506, y=1..2
  //     x=498, y=10..13
  //     x=504, y=10..13
  //     y=13, x=498..504`;
  //     expect(lumber.calculateStandingWater(input)).to.equal(29);
  //   });

  //   it('Input file should return after 20 iterations', () => {
  //     const input = fs.readFileSync('day-18-settlers-of-the-north-pole/input.txt').toString();
  //     expect(lumber.calculateStandingWater(input)).to.equal(26405);
  //   }).timeout(10000);
  // });
});
