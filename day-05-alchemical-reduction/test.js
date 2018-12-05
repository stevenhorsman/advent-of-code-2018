const expect = require('chai').expect;
const fs = require('fs');

const polymer = require('./polymer');

describe('Day 5: Alchemical Reduction', () => {
    
  describe('Part One', () => {
    it('should calculate polymer from aA', () => {
      expect(polymer.calculateReductionLength('aA')).to.equal(0);
    });
  
    it('should calculate polymer from abBA', () => {
      expect(polymer.calculateReductionLength('abBA')).to.equal(0);
    });
  
    it('should calculate polymer from abAB', () => {
      expect(polymer.calculateReductionLength('abAB')).to.equal(4);
    });
  
    it('should calculate polymer from aabAAB', () => {
      expect(polymer.calculateReductionLength('aabAAB')).to.equal(6);
    });
  
    it('should calculate polymer from dabAcCaCBAcCcaDA', () => {
      expect(polymer.calculateReductionLength('dabAcCaCBAcCcaDA')).to.equal(10);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-05-alchemical-reduction/input.txt').toString();
      expect(polymer.calculateReductionLength(input)).to.equal(10972);
    });
  });

  describe('Part Two', () => {
    it('should calculate polymer from dabAcCaCBAcCcaDA', () => {
      expect(polymer.calculateReductionLengthWithRemoval('dabAcCaCBAcCcaDA')).to.equal(4);;
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-05-alchemical-reduction/input.txt').toString();
      expect(polymer.calculateReductionLengthWithRemoval(input)).to.equal(5278);
    });
  });
});
