const expect = require('chai').expect;
const fs = require('fs');

const immuneSystem = require('./immuneSystem');

describe('Day 24: Immune System Simulator 20XX', () => {
    
  describe('Part One', () => {
    it('should calculate part1', () => {
      const sample =
      `Immune System:
      17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
      989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3
      
      Infection:
      801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
      4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;
      expect(immuneSystem.part1(sample)).to.equal(5216);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-24-immune-system-simulator-simulator-20xx/input.txt').toString();
      expect(immuneSystem.part1(input)).to.equal(21199);
    }).timeout(100000);
  });

  describe('Part Two', () => {
    it('should calculate part2', () => {
      const sample =
      `Immune System:
      17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
      989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3
      
      Infection:
      801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
      4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;
      expect(immuneSystem.part2(sample)).to.equal(51);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-24-immune-system-simulator-simulator-20xx/input.txt').toString();
      expect(immuneSystem.part2(input)).to.equal(5761);
    });
  });
});
