const expect = require('chai').expect;
const fs = require('fs');

const license = require('./license');

describe('Day 8: Memory Maneuver', () => {
    
  describe('Part One', () => {
    it('should sum the metadata', () => {
      const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
      expect(license.sumMetadata(input)).to.equal(138);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-08-memory-maneuver/input.txt').toString();
      expect(license.sumMetadata(input)).to.equal(47112);
    });
  });

  describe('Part Two', () => {
    it('should sum the metadata', () => {
      const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
      expect(license.calculateMetadata(input)).to.equal(66);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-08-memory-maneuver/input.txt').toString();
      expect(license.calculateMetadata(input)).to.equal(28237);
    });
  });
});
