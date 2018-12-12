const expect = require('chai').expect;
const fs = require('fs');

const plants = require('./plants');

describe('Day 12: Subterranean Sustainability', () => {
    
  describe('Part One', () => {
    it('should calculate the sum of all pots after 20 iterations', () => {
      const input = 
      `initial state: #..#.#..##......###...###

        ...## => #
        ..#.. => #
        .#... => #
        .#.#. => #
        .#.## => #
        .##.. => #
        .#### => #
        #.#.# => #
        #.### => #
        ##.#. => #
        ##.## => #
        ###.. => #
        ###.# => #
        ####. => #`;
      expect(plants.calculateSum(input)).to.equal(325);
    });

    it('Input file should return after 20 iterations', () => {
      const input = fs.readFileSync('day-12-subterranean-sustainability/input.txt').toString();
      expect(plants.calculateSum(input)).to.equal(3221);
    });
  });

  describe('Part Two', () => {
    it('Input file should return after 50000000000 iterations', () => {
      const input = fs.readFileSync('day-12-subterranean-sustainability/input.txt').toString();
      expect(plants.calculateSum(input,50000000000)).to.equal(2600000001872);
    });
  });
});
