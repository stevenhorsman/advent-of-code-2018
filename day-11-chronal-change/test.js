const expect = require('chai').expect;

const fuelcells = require('./fuelcells');

describe.only('Day 11: Chronal Charge', () => {
    
  describe('Calculate fuel cell value', () => {
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
    // it('print grid 33,45, serial 18', () => {
    //   let serial = 18;
    //   let xStart = 1;
    //   let yStart = 1;
    //   for(let y = yStart;y<yStart+3;y++) {
    //     let row = [];
    //     for(let x = xStart;x<xStart+3;x++) {
    //       row.push(fuelcells.calculateFuelCellValue(serial, x, y));
    //     }
    //     console.log(row.join(' '));
    //   }
    // });

    it('should get x,y of largest total power for serial number 18', () => {
      expect(fuelcells.calculateMaxFuelGrid3(18)).to.equal('33,45');
    });
  
    it('should get x,y of largest total power for serial number 42', () => {
      expect(fuelcells.calculateMaxFuelGrid3(42)).to.equal('21,61');
    });
    
    it('should get x,y of largest total power for serial number 2187', () => {
      expect(fuelcells.calculateMaxFuelGrid3(2187)).to.equal('235,85');
    });
  });

  describe('Part Two', () => {    
    it('should get x,y of largest total power for serial number 18', () => {
      expect(fuelcells.calculateMaxFuelSum(18)).to.equal('90,269,16');
    }).timeout(500000);

    it('should get x,y of largest total power for serial number 42', () => {
      expect(fuelcells.calculateMaxFuelSum(42)).to.equal('232,251,12');
    }).timeout(500000);

    it('should get x,y of largest total power for serial number 2187', () => {
      expect(fuelcells.calculateMaxFuelSum(2187)).to.equal('233,40,13');
    }).timeout(500000);
  });
});
