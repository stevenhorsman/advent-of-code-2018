class FuelCellGrid {
  constructor(serialNo, length = 300, subsectionSize = 3) {
    this.serial = serialNo;
    this.length = length;
    this.subsectionSize = subsectionSize;
    this.grid = Array
      .from({ length })
      .map(() => Array
        .from({ length }));
    for(let x = 0; x < 300; x++) {
      for(let y = 0; y < 300; y++) {
        this.grid[x][y] = calculateFuelCellValue(this.serial, x+1, y+1);
        if(x >=32 && x<=34 && y>=44 && y <= 46) {
          // console.log(calculateFuelCellValue(this.serial, x+1, y+1),'=',this.getValue(x,y));
        }
      //getGridValue(grid,32,44);
      }
    }
  }

  getMaxSubSectionCoordinate(size=this.subsectionSize) {
    let currMax = -Infinity;
    let coord;
    for(let x = 0; x < this.length-size; x++) {
      for(let y = 0; y < this.length-size; y++) {
        let curr = this.sumSubSection(x, y,size);
        if (curr > currMax) {
          currMax = curr;
          coord = `${x+1},${y+1}`;
        }
      }
    }
    return {coord:coord, power:currMax};
  }

  sumSubSection(xStart, yStart,size=this.subsectionSize) {
    let sum = 0;
    for(let x = 0; x < size; x++) {
      for(let y = 0; y < size; y++) {
        sum += this.grid[x+xStart][y+yStart];
      }
    }
    return sum;
  }

  getValue(x,y) {
    let value = this.grid[x][y];
    console.log(`${x+1},${y+1}=${value}`);
    return value;
  }

}

function calculateFuelCellValue(serial, x, y) {
  const rackId = (x + 10);
  let workingResult = ((rackId * y) + serial) * rackId;
  return getHundredsValue(workingResult) - 5;
}

function getHundredsValue(input) {
  let workingResult = input % 1000;
  return (workingResult - (workingResult % 100)) / 100;
}

function calculateMaxFuelGrid3(serial) {
  const grid = new FuelCellGrid(serial);
  return grid.getMaxSubSectionCoordinate().coord;
}

function calculateMaxFuelGrid(serial) {
  const grid = new FuelCellGrid(serial);

  const maxPowers = [];
  for(let i = 1; i <= 300; i++) {
    let max_i = grid.getMaxSubSectionCoordinate(i);
    maxPowers.push({size:i,coord:max_i.coord, power:max_i.power});
  }
  let max = maxPowers.sort((a, b) => b.power - a.power)[0];

  return max.coord + ',' + max.size;
}

module.exports.calculateFuelCellValue = calculateFuelCellValue;
module.exports.calculateMaxFuelGrid3 = calculateMaxFuelGrid3;
module.exports.calculateMaxFuelGrid = calculateMaxFuelGrid;