const expect = require('chai').expect;
const fs = require('fs');

const nanobots = require('./nanobots');

describe.only('Day 23: Experimental Emergency Teleportation', () => {
    
  describe.skip('Part One', () => {
    it('should calculate range of nanobots', () => {
      const coords =
      `pos=<0,0,0>, r=4
       pos=<1,0,0>, r=1
       pos=<4,0,0>, r=3
       pos=<0,2,0>, r=1
       pos=<0,5,0>, r=3
       pos=<0,0,3>, r=1
       pos=<1,1,1>, r=1
       pos=<1,1,2>, r=1
       pos=<1,3,1>, r=1`;
      expect(nanobots.calculateNanobotsInRange(coords)).to.equal(7);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-23-experimental-emergency-teleportation/input.txt').toString();
      expect(nanobots.calculateNanobotsInRange(input)).to.equal(619);
    });
  });

   describe('Part Two', () => {

    let boundingBox = new nanobots.BoundingBox(new nanobots.Point(0,0,0), new nanobots.Point(4,4,4));
    var inRangeTests = [
      {arg: new nanobots.Nanobot(1,1,1,3), expected:true},
      {arg: new nanobots.Nanobot(-1,-1,-1,3), expected:true},
      {arg: new nanobots.Nanobot(5,5,5,3), expected:true},
      {arg: new nanobots.Nanobot(2,2,2,3), expected:true},
      {arg: new nanobots.Nanobot(-2,-2,-2,3), expected:true},
    ];
  
    inRangeTests.forEach(function(test) {
      it.only('test boundingBox logic ' + test.arg + ' should return ' + test.expected, function() {
        expect(boundingBox.inRange(test.arg)).to.equal(test.expected);
      });
    });

    it('should calculate co-ordinates in range of most nanobots', () => {
      const coords =
      `pos=<10,12,12>, r=2
      pos=<12,14,12>, r=2
      pos=<16,12,12>, r=4
      pos=<14,14,14>, r=6
      pos=<50,50,50>, r=200
      pos=<10,10,10>, r=5`;
      expect(nanobots.calculateBestCoordinates(coords)).to.equal(36);
    });

    it.skip('Input file should return', () => {
      const input = fs.readFileSync('day-23-experimental-emergency-teleportation/input.txt').toString();
      expect(nanobots.calculateNanobotsInRange(input)).to.equal(619);
    });
  });
});
