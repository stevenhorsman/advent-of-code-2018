const expect = require('chai').expect;
const fs = require('fs');

const assembly = require('./assembly');

describe('Day 16: Chronal Classification', () => {

  describe('Test instructions all work', () => {
    it('should run addr op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
     addr 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 5]);
    });

    it('should run addi op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
    addi 0 7 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 10]);
    });

    it('should run mulr op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
    mulr 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 6]);
    });

    it('should run muli op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
    muli 0 3 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 9]);
    });

    it('should run banr op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
    banr 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 2]);
    });

    it('should run bani op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
    bani 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 1]);
    });

    it('should run borr op correctly', () => {
      const input =
        `Before: [1, 2, 1, 1]
    borr 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([1, 2, 1, 3]);
    });

    it('should run bori op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
    bori 0 4 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 7]);
    });

    it('should run setr op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
    setr 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 3]);
    });

    it('should run seti op correctly', () => {
      const input =
        `Before: [3, 2, 1, 1]
    seti 4 4 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 4]);
    });

    it('should run gtir op correctly', () => {
      let input =
        `Before: [3, 2, 1, 1]
    gtir 3 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 1]);
      input =
        `Before: [3, 2, 1, 1]
    gtir 1 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 0]);
    });

    it('should run gtri op correctly', () => {
      let input =
        `Before: [3, 2, 1, 1]
    gtri 0 2 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 1]);
      input =
        `Before: [3, 2, 1, 1]
    gtir 0 4 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 0]);
    });

    it('should run gtrr op correctly', () => {
      let input =
        `Before: [3, 2, 1, 1]
    gtrr 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 1]);
      input =
        `Before: [3, 4, 1, 1]
    gtir 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 4, 1, 0]);
    });

    it('should run eqir op correctly', () => {
      let input =
        `Before: [3, 3, 1, 1]
    eqir 3 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 3, 1, 1]);
      input =
        `Before: [3, 2, 1, 1]
    eqir 1 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 0]);
    });

    it('should run eqri op correctly', () => {
      let input =
        `Before: [3, 2, 1, 1]
    eqri 0 3 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 1]);
      input =
        `Before: [3, 2, 1, 1]
    eqri 0 4 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 2, 1, 0]);
    });

    it('should run eqrr op correctly', () => {
      let input =
        `Before: [3, 3, 1, 1]
    eqrr 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 3, 1, 1]);
      input =
        `Before: [3, 4, 1, 1]
    eqrr 0 1 3`;
      expect(assembly.runInstruction(input)).to.eql([3, 4, 1, 0]);
    });
  });


  describe('Part One', () => {
    it('should calculate the number of opcodes that match sample', () => {
      const input = 
      `Before: [3, 2, 1, 1]
      9 2 1 2
      After:  [3, 2, 2, 1]`;
      expect(assembly.findMatchingOpcodes(input).sort()).to.eql(['addi','mulr','seti']);
    });

    it('How many instructions in inputFile have 3 matches', () => {
      const input = fs.readFileSync('day-16-chronal-classification/input1.txt').toString();
      expect(assembly.find3MatchingOpcodes(input)).to.equal(567);
    });
  });

  describe('Part Two', () => {
    it('Decode program and execute', () => {
      const training = fs.readFileSync('day-16-chronal-classification/input1.txt').toString();
      const input = fs.readFileSync('day-16-chronal-classification/program.txt').toString();
      expect(assembly.executeProgram(training,input)).to.equal(610);
    });
  });
});
