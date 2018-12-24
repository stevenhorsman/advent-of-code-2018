const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);
const expect = chai.expect;
const fs = require('fs');

const nanobots = require('./nanobots');
const BoundingBox = nanobots.BoundingBox;
const Point = nanobots.Point;

const solution = require('./solution');

describe('Day 23: Experimental Emergency Teleportation', () => {
    
  describe('Part One', () => {
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

    it('Input file should return', () => {
      const input = fs.readFileSync('day-23-experimental-emergency-teleportation/input.txt').toString();
      solution.run(input);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-23-experimental-emergency-teleportation/input.txt').toString();
      expect(nanobots.getNanobotsForPoint(input, 20407349, 13636438, 35377809)).to.equal(619);
    });
  });

  describe('Part Two', () => {

    let boundingBox = new nanobots.BoundingBox(new nanobots.Point(0,0,0), new nanobots.Point(4,4,4));
    var inRangeTests = [
      {args: [1,1,1], expected:true},
      {args: [-1,-1,-1], expected:true},
      {args: [5,5,5], expected:true},
      {args: [2,2,2], expected:true},
      {args: [-2,-2,-2], expected:false},
    ];
  
    inRangeTests.forEach(function(test) {
      it('test boundingBox logic ' + test.args + ' should return ' + test.expected, function() {
        const nanobot = new nanobots.Nanobot(...test.args, 3);
        expect(boundingBox.inRange(nanobot)).to.equal(test.expected);
      });
    });
  
    it('test boundingBox halve logic ', function() {
      const boundingBox = new nanobots.BoundingBox(new nanobots.Point(0,0,0), new nanobots.Point(4,6,5));
      const expected = [
        new BoundingBox(new Point(0,0,0), new Point(2,3,3)),
        new BoundingBox(new Point(0,0,3), new Point(2,3,5)),
        new BoundingBox(new Point(0,3,0), new Point(2,6,3)),
        new BoundingBox(new Point(0,3,3), new Point(2,6,5)),
        new BoundingBox(new Point(2,0,0), new Point(4,3,3)),
        new BoundingBox(new Point(2,0,3), new Point(4,3,5)),
        new BoundingBox(new Point(2,3,0), new Point(4,6,3)),
        new BoundingBox(new Point(2,3,3), new Point(4,6,5))
      ];
      expect(boundingBox.halve()).to.deep.equalInAnyOrder(expected);
    });

    it('test boundingBox halve logic when box is 1x1x1', function() {
      const boundingBox = new nanobots.BoundingBox(new Point(13,10,10), new Point(14,11,11));
      const expected = [
        new BoundingBox(new Point(13,10,10), new Point(13,10,10)),
        new BoundingBox(new Point(13,10,11), new Point(13,10,11)),
        new BoundingBox(new Point(13,11,10), new Point(13,11,10)),
        new BoundingBox(new Point(13,11,11), new Point(13,11,11)),
        new BoundingBox(new Point(14,10,10), new Point(14,10,10)),
        new BoundingBox(new Point(14,10,11), new Point(14,10,11)),
        new BoundingBox(new Point(14,11,10), new Point(14,11,10)),
        new BoundingBox(new Point(14,11,11), new Point(14,11,11))
      ];
      expect(boundingBox.halve()).to.deep.equalInAnyOrder(expected);
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

    it('Input file should return', () => {
      const input = fs.readFileSync('day-23-experimental-emergency-teleportation/input.txt').toString();
      expect(nanobots.redditAttempt(input)).to.equal(71631000); //too low
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-23-experimental-emergency-teleportation/input.txt').toString();
      expect(nanobots.calculateBestCoordinatesWithAnswer(input)).to.equal(71631000); //too low
    }).timeout(1000000);
    //my bounding: bots in range: Point { x: 19724023, y: 14529852, z: 35378571 } 877 69632446
    //bots in range: Point { x: 19679069, y: 13956550, z: 34969677 } 904 68605296
    //bots in range: Point { x: 19679069, y: 13956554, z: 34969681 } 904 68605304
    //bots in range: Point { x: 21318514, y: 13731836, z: 36384408 } 908 71434758
    
    //Other
    //bots in range: Point { x: 20254179, y: 13636420, z: 35224657 } 938 69115256 //not correct
    //bots in range: Point { x: 21487570, y: 13660901, z: 36482529 } 937 71631000
    //max = 979 - only if assuming 1D
  });
});
