const expect = require('chai').expect;
const fs = require('fs');

const assembly = require('./assembly');

describe('Day 19: Go With The Flow', () => {

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
    it('execute sample program and return reg 0', () => {
      const input = 
      `#ip 0
      seti 5 0 1
      seti 6 0 2
      addi 0 1 0
      addr 1 2 3
      setr 1 0 0
      seti 8 0 4
      seti 9 0 5`;
      expect(assembly.executeProgram(input)).to.equal(7);
    });

    it('execute input file program and return reg 0', () => {
      const input = fs.readFileSync('day-19-go-with-the-flow/input.txt').toString();
      expect(assembly.executeProgram(input)).to.equal(1248);
    }).timeout(10000);
  });

  describe('Part Two', () => {
    it('execute input file program and return reg 0', () => {
      const input = fs.readFileSync('day-19-go-with-the-flow/input.txt').toString();
      expect(assembly.executeProgram(input,1)).to.equal(14952912);
    }).timeout(100000);
  });
});
