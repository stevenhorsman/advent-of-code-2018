const expect = require('chai').expect;
const fs = require('fs');

const inventoryManagment = require('./inventory-management');

describe('Day 2: Inventory Management System', () => {
    
  describe('Part One', () => {
    it('should calculate checksum from box ids', () => {
      const boxIds =
        `abcdef
        bababc
        abbcde
        abcccd
        aabcdd
        abcdee
        ababab`;

      expect(inventoryManagment.calculateChecksum(boxIds)).to.equal(12);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-02-inventory-management-system/input.txt').toString();
      expect(inventoryManagment.calculateChecksum(input)).to.equal(5904);
    });
  });

  describe('Part Two', () => {
    it('should find common characters', () => {
      const boxIds =
        `abcde
         fghij
         klmno
         pqrst
         fguij
         axcye
         wvxyz`;

      expect(inventoryManagment.findCommonLetters(boxIds)).to.equal('fgij');
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-02-inventory-management-system/input.txt').toString();
      expect(inventoryManagment.findCommonLetters(input)).to.equal('jiwamotgsfrudclzbyzkhlrvp');
    });
  });
});
