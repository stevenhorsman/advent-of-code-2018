const expect = require('chai').expect;
const fs = require('fs');

const combat = require('./combat');

describe.only('Day 15: Beverage Bandits', () => {
    
   describe('Part One', () => {
    it('should calculate combat end state 27730', () => {
      const input = 
     `#######
      #.G...#
      #...EG#
      #.#.#G#
      #..G#E#
      #.....#
      #######`;
      expect(combat.game(input)).to.equal(27730);
    });

    it('should calculate combat end state 36334', () => {
      const input = 
     `#######
      #G..#E#
      #E#E.E#
      #G.##.#
      #...#E#
      #...E.#
      #######`;
      expect(combat.game(input)).to.equal(36334);
    });

    it('should calculate combat end state 39514', () => {
      const input = 
     `#######
      #E..EG#
      #.#G.E#
      #E.##E#
      #G..#.#
      #..E#.#
      #######`;
      expect(combat.game(input)).to.equal(39514);
    });

    it('should calculate combat end state 27755', () => {
      const input = 
     `#######
      #E.G#.#
      #.#G..#
      #G.#.G#
      #G..#.#
      #...E.#
      #######`;
      expect(combat.game(input)).to.equal(27755);
    });

    it('should calculate combat end state 28944', () => {
      const input = 
     `#######
      #.E...#
      #.#..G#
      #.###.#
      #E#G#G#
      #...#G#
      #######`;
      expect(combat.game(input)).to.equal(28944);
    }).timeout(10000);

    it('should calculate combat end state 18740', () => {
      const input = 
     `#########
      #G......#
      #.E.#...#
      #..##..G#
      #...##..#
      #...#...#
      #.G...G.#
      #.....G.#
      #########`;
      expect(combat.game(input)).to.equal(18740);
    }).timeout(20000);

    it('Input file should return after 20 iterations', () => {
      const input = fs.readFileSync('day-15-beverage-bandits/input.txt').toString();
      expect(combat.game(input)).to.equal(0);
    }).timeout(2000000);
  });

  // describe('Part Two', () => {
  //   it('Input file should return after 50000000000 iterations', () => {
  //     const input = fs.readFileSync('day-12-subterranean-sustainability/input.txt').toString();
  //     expect(combat.calculateSum(input,50000000000)).to.equal(2600000001872);
  //   });
  // });
});
