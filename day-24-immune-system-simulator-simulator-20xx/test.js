const expect = require('chai').expect;
const fs = require('fs');

const immuneSystem = require('./immuneSystem');

describe.only('Day 24: Immune System Simulator 20XX', () => {
    
  describe('Part One', () => {
    it('should calculate largest area', () => {
      const sample =
      `Immune System:
      17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
      989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3
      
      Infection:
      801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
      4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;
      expect(immuneSystem.part1(sample)).to.equal(17);
    });

    it.skip('Input file should return', () => {
      const input = fs.readFileSync('day-06-chronal-coordinates/input.txt').toString();
      expect(immuneSystem.calculateLargestArea(input)).to.equal(5532);
    });
  });

  describe.skip('Part Two', () => {
    it('should calculate largest area', () => {
      const coords =
      `1, 1
      1, 6
      8, 3
      3, 4
      5, 5
      8, 9`;
      expect(immuneSystem.calculateAreaInDistance(coords,32)).to.equal(16);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-06-chronal-coordinates/input.txt').toString();
      expect(immuneSystem.calculateAreaInDistance(input, 10000)).to.equal(36216);
    });
  });
});
