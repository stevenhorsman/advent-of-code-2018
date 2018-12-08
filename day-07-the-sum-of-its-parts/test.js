const expect = require('chai').expect;
const fs = require('fs');

const sleighKit = require('./sleighKit');
const sum = require('./sum');

describe('Day 7: The Sum of Its Parts', () => {
    
  describe.only('Part One', () => {
    it('should determine order of steps', () => {
      const instructions =
      `Step C must be finished before step A can begin.
       Step C must be finished before step F can begin.
       Step A must be finished before step B can begin.
       Step A must be finished before step D can begin.
       Step B must be finished before step E can begin.
       Step D must be finished before step E can begin.
       Step F must be finished before step E can begin.`;
      expect(sleighKit.calculateOrder(instructions)).to.equal('CABDFE');
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-07-the-sum-of-its-parts/input.txt').toString();
      expect(sleighKit.calculateOrder(input)).to.equal('LFMNJRTQVZCHIABKPXYEUGWDSO');
    });
  });

  describe('Part Two', () => {
    it('should do something', () => {
      const instructions =
      `Step C must be finished before step A can begin.
       Step C must be finished before step F can begin.
       Step A must be finished before step B can begin.
       Step A must be finished before step D can begin.
       Step B must be finished before step E can begin.
       Step D must be finished before step E can begin.
       Step F must be finished before step E can begin.`;
      expect(sleighKit.calculateOrder(instructions)).to.equal('CABDFE');
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-07-the-sum-of-its-parts/input.txt').toString();
      expect(sleighKit.calculateOrder(input)).to.equal(5532);
    });
  });
});
