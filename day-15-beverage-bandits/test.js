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
      expect(combat.game(input, false, 50)).to.equal(27730);
    });

    it.skip('should calculate combat end state 27730', () => {
      const input =
        `#######
        #..G..#
        #...G.#
        #.#G#G#
        #...#E#
        #.....#
        #######`;
      expect(combat.game(input,false,1)).to.equal(27730);
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

    it('Input file', () => {
      const input = fs.readFileSync('day-15-beverage-bandits/input.txt').toString();
      expect(combat.game(input)).to.equal(248848);
    }).timeout(2000000);
  });

  describe('Part Two', () => {
    it('should calculate combat end state 4988', () => {
      const input =
        `#######
      #.G...#
      #...EG#
      #.#.#G#
      #..G#E#
      #.....#
      #######`;
      expect(combat.game(input, true)).to.equal(4988);
    });

    it('should calculate combat end state 31284', () => {
      const input =
        `#######
      #E..EG#
      #.#G.E#
      #E.##E#
      #G..#.#
      #..E#.#
      #######`;
      expect(combat.game(input, true)).to.equal(31284);
    });

    it('should calculate combat end state 3478', () => {
      const input =
        `#######
      #E.G#.#
      #.#G..#
      #G.#.G#
      #G..#.#
      #...E.#
      #######`;
      expect(combat.game(input, true)).to.equal(3478);
    });

    it('should calculate combat end state 6474', () => {
      const input =
        `#######
      #.E...#
      #.#..G#
      #.###.#
      #E#G#G#
      #...#G#
      #######`;
      expect(combat.game(input, true)).to.equal(6474);
    }).timeout(10000);

    it('should calculate combat end state 1140', () => {
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
      expect(combat.game(input, true)).to.equal(1140);
    }).timeout(20000);

    it('Input file with no dead elves', () => {
      const input = fs.readFileSync('day-15-beverage-bandits/input.txt').toString();
      expect(combat.game(input, true)).to.equal(64848);
    }).timeout(2000000);
  });
});