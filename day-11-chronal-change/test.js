const expect = require('chai').expect;

const fuelcells = require('./fuelcells');

describe('Day 11: Chronal Charge', () => {
    
  describe.only('Calculate fuel cell value', () => {
    it('fuel cell at 3,5 in a grid with serial number 8', () => {
      test(4, 8, 3, 5);
    });
  
    it('Fuel cell at  122,79, grid serial number 57: power level -5', () => {
      test(-5, 57, 122, 79);
    });

    it('Fuel cell at 217,196, grid serial number 39: power level  0', () => {
      test(0, 39, 217,196);
    });

    it('Fuel cell at 101,153, grid serial number 71: power level  4', () => {
      test(4, 71, 101, 153);
    });

    function test(expected, serial, x, y) {
      expect(fuelcells.calculateFuelCellValue(serial, x, y)).to.equal(expected);
    }

  });

  describe('Part One', () => {
    it('should get x,y of largest total power for serial number 18', () => {
      expect(fuelcells.calculateMaxFuelGrid(18)).to.equal('33,45');
    });
  
    it('should get x,y of largest total power for serial number 42', () => {
      expect(fuelcells.calculateMaxFuelGrid(42)).to.equal('21,61');
    });
    
    it('should get x,y of largest total power for serial number 2187', () => {
      expect(fuelcells.calculateMaxFuelGrid(2187)).to.equal('21,61');
    });
  });

  // describe('Part Two', () => {
  //   it('should calculate high score for 9 players; last marble is worth 25 points', () => {
  //     const input = '9 players; last marble is worth 25 points';
  //     expect(marbles.calculateHighScoreLL(input)).to.equal(32);
  //   });
    
  //   it('should calculate high score for 10 players; last marble is worth 1618 points', () => {
  //     const input = '10 players; last marble is worth 1618 points';
  //     expect(marbles.calculateHighScoreLL(input)).to.equal(8317);
  //   });

  //   it('should calculate high score for 13 players; last marble is worth 7999 points', () => {
  //     const input = '13 players; last marble is worth 7999 points';
  //     expect(marbles.calculateHighScoreLL(input)).to.equal(146373);
  //   });
  
  //   it('should calculate high score for 17 players; last marble is worth 1104 points', () => {
  //     const input = '17 players; last marble is worth 1104 points';
  //     expect(marbles.calculateHighScoreLL(input)).to.equal(2764);
  //   });
  
  //   it('should calculate high score for 21 players; last marble is worth 6111 points', () => {
  //     const input = '21 players; last marble is worth 6111 points';
  //     expect(marbles.calculateHighScoreLL(input)).to.equal(54718);
  //   });
  
  //   it('should calculate high score for 30 players; last marble is worth 5807 points', () => {
  //     const input = '30 players; last marble is worth 5807 points';
  //     expect(marbles.calculateHighScoreLL(input)).to.equal(37305);
  //   });

  //   it('Input file should return', () => {
  //     const input = fs.readFileSync('day-09-marble-mania/input.txt').toString();
  //     expect(marbles.calculateHighScoreLL(input,100)).to.equal(2954067253);
  //   });
  // });
});
