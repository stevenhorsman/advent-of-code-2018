class SummedAreaTable {
  constructor(serialNo, length = 300, subsectionSize = 3) {
    this.serial = serialNo;
    this.length = length;
    this.subsectionSize = subsectionSize;
    this.sum = Array
      .from({ length })
      .map(() => Array
        .from({ length }));
    for(let y = 0; y < length; y++) {
      for(let x = 0; x < length; x++) {
        this.sum[y][x] = calculateFuelCellValue(this.serial, x+1, y+1) + this.getSumValue(y - 1,x) + this.getSumValue(y,x - 1) - this.getSumValue(y - 1,x - 1);
        //console.log(x,y,':',calculateFuelCellValue(this.serial, x+1, y+1), '+', this.getSumValue(y - 1,x), '+', this.getSumValue(y,x - 1) ,'-', this.getSumValue(y - 1,x - 1),'=',this.sum[y][x]);
      }
    }
  }

  getMaxSubSectionCoordinate(size=this.subsectionSize) {
    let currMax = -Infinity;
    let coord;
    for(let x = 0; x < this.length-size; x++) {
      for(let y = 0; y < this.length-size; y++) {
        let curr = this.sumSubSection(y, x,size);
        if (curr > currMax) {
          currMax = curr;
          coord = `${x+2},${y+2}`;//no idea why this is +2 rather than +1!
        }
      }
    }
    return {coord:coord, power:currMax};
  }

  sumSubSection(y, x,size=this.subsectionSize) {
    return this.sum[y][x] + this.sum[y + size][x + size] - this.sum[y + size][x] - this.sum[y][x + size];
  }

  getSumValue(y,x) {
    if (x < 0 || y < 0) {
      return 0;
    }
    return this.sum[y][x];
  }

  getValue(x,y) {
    return this.sumSubSection(y-1,x-1,1);
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
  const grid = new SummedAreaTable(serial);
  return grid.getMaxSubSectionCoordinate().coord;
}

function calculateMaxFuelGrid(serial) {
  const grid = new SummedAreaTable(serial);

  const maxPowers = [];
  for(let i = 1; i <= 300; i++) {
    //console.log(i);
    let max_i = grid.getMaxSubSectionCoordinate(i);
    maxPowers.push({size:i,coord:max_i.coord, power:max_i.power});
  }
  let max = maxPowers.sort((a, b) => b.power - a.power)[0];
  //console.log(maxPowers);
  return max.coord + ',' + max.size;
}

function calculateMaxFuelSum(serial) {
  const sum = new SummedAreaTable(serial);
  const maxPowers = [];
  for(let i = 1; i <= 300; i++) {
    //console.log(i);
    let max_i = sum.getMaxSubSectionCoordinate(i);
    maxPowers.push({size:i,coord:max_i.coord, power:max_i.power});
  }
  let max = maxPowers.sort((a, b) => b.power - a.power)[0];
  //console.log(maxPowers);
  return max.coord + ',' + max.size;
}

module.exports.calculateFuelCellValue = calculateFuelCellValue;
module.exports.calculateMaxFuelGrid3 = calculateMaxFuelGrid3;
module.exports.calculateMaxFuelGrid = calculateMaxFuelGrid;
module.exports.calculateMaxFuelSum = calculateMaxFuelSum;