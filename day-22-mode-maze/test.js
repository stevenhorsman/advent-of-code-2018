const expect = require('chai').expect;
const fs = require('fs');

const cave = require('./cave');

describe('Day 22: Mode Maze', () => {
    
  describe('Part One', () => {
    it('sample\'s risk Level should be 114', () => {
      const input = 
      `depth: 510
      target: 10,10`;
      expect(cave.calculateRiskLevel(input)).to.equal(114);
    });

    it('Input file risk Level should be', () => {
      const input = fs.readFileSync('day-22-mode-maze/input.txt').toString();
      expect(cave.calculateRiskLevel(input)).to.equal(11843);
    });
  });

  describe('Part Two', () => {

    it('sample\'s quickest route should be 45', () => {
      const input = 
      `depth: 510
      target: 10,10`;
      expect(cave.calculateFastestRoute(input)).to.equal(45);
    });

    it('Input file\'s quickest route should be', () => {
      const input = fs.readFileSync('day-22-mode-maze/input.txt').toString();
      expect(cave.calculateFastestRoute(input)).to.equal(1078);
    });
  });
});
