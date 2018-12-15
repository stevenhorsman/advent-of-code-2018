const expect = require('chai').expect;
const fs = require('fs');

const mineCart = require('./mineCart');
const direction = require('./direction');

describe('Day 13: Mine Cart Madness', () => {
 
  var directionTests = [
    {arg: '^', parse:direction.Direction.UP,    clockwise: '>', antiClockwise: '<'},
    {arg: '>', parse:direction.Direction.RIGHT, clockwise: 'v', antiClockwise: '^'},
    {arg: 'v', parse:direction.Direction.DOWN,  clockwise: '<', antiClockwise: '>'},
    {arg: '<', parse:direction.Direction.LEFT,  clockwise: '^', antiClockwise: 'v'},
  ];

  directionTests.forEach(function(test) {
    it('direction.parse ' + test.arg + ' should return ' + test.parse, function() {
      expect(direction.parse(test.arg)).to.equal(test.parse);
    });
  });

  directionTests.forEach(function(test) {
    it('direction.clockwise ' + test.arg + ' should return ' + test.clockwise, function() {
      expect(direction.parse(test.arg).clockwise.symbol).to.equal(test.clockwise);
    });
  });

  directionTests.forEach(function(test) {
    it('direction.antiClockwise ' + test.arg + ' should return ' + test.antiClockwise, function() {
      expect(direction.parse(test.arg).antiClockwise.symbol).to.equal(test.antiClockwise);
    });
  });

  var directionChangeTests = [
    {args: ['/', '^'], expected: '>'},
    {args: ['/', '>'], expected: '^'},
    {args: ['/', 'v'], expected: '<'},
    {args: ['/', '<'], expected: 'v'},
    {args: ['|', '^'], expected: '^'},
    {args: ['|', '>'], expected: '>'},
    {args: ['-', 'v'], expected: 'v'},
    {args: ['-', '<'], expected: '<'},
    {args: ['\\', '^'], expected: '<'},
    {args: ['\\', '>'], expected: 'v'},
    {args: ['\\', 'v'], expected: '>'},
    {args: ['\\', '<'], expected: '^'}
  ];

  directionChangeTests.forEach(function(test) {
    it('direction ' + test.args + ' should return ' + test.expected, function() {
      expect(direction.changeDirection(test.args[0], direction.parse(test.args[1])).symbol).to.equal(test.expected);
    });
  });

  it('Point tests', () => {
    //to.eql tests deep equality
    expect(new direction.Point(3,4).update(direction.Direction.RIGHT)).to.eql(new direction.Point(4,4));
    expect(new direction.Point(3,4).update(direction.Direction.LEFT)).to.eql(new direction.Point(2,4));
    expect(new direction.Point(3,4).update(direction.Direction.UP)).to.eql(new direction.Point(3,3));
    expect(new direction.Point(3,4).update(direction.Direction.DOWN)).to.eql(new direction.Point(3,5));
  });

  const displayHelper = (input) => {
    const padding = input
      .split('\n')
      .map((line) => line
        .split('')
        .findIndex((value) => value !== ' '))
      .sort((a, b) => b - a)[0];
  
    return input
      .split('\n')
      .map((line) => line
        .split('')
        .slice(padding - 2, line.length)
        .join(''))
      .join('\n');
  };

  describe('Part One', () => {
    it('should determine the location of the first crash', () => {
      const tracks = displayHelper(String.raw`
        /->-\
        |   |  /----\
        | /-+--+-\  |
        | | |  | v  |
        \-+-/  \-+--/
          \------/
      `);
  
      expect(mineCart.getFirstCrashLocation(tracks)).to.equal('7,3');
    });

    it('should determine the location of the first crash', () => {
      const tracks = displayHelper(String.raw`
        /-->\
        |   |  /----\
        | /-+--+-\  |
        | | |  | v  |
        \-+-/  \-+--/
          \------/
      `);
  
      expect(mineCart.getFirstCrashLocation(tracks)).to.equal('7,3');
    });

    it('Input file should return first crash location', () => {
      const input = fs.readFileSync('day-13-mine-cart-madness/input.txt').toString();
      expect(mineCart.getFirstCrashLocation(input)).to.equal('102,114');
    });
  });

  describe('Part Two', () => {
    it('should determine the location of the last cart', () => {
      const tracks = displayHelper(String.raw`
        />-<\
        |   |
        | /<+-\
        | | | v
        \>+</ |
          |   ^
          \<->/
      `);
      expect(mineCart.getLastCartLocation(tracks)).to.equal('6,4');
    });

    it('Input file determine the location of the last cart', () => {
      const input = fs.readFileSync('day-13-mine-cart-madness/input.txt').toString();
      expect(mineCart.getLastCartLocation(input)).to.equal('146,87');
    });
  });
});