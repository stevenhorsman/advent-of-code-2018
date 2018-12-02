const expect = require('chai').expect;
const fs = require('fs');

const chronalCalibration = require('./chronal-calibration');

describe('Day 1: Chronal Calibration', () => {
  it('should calculate frequency from +1, -2, +3, +1', () => {
    const changes =
      `+1
       -2
       +3
       +1`;

    expect(chronalCalibration.calculateFrequency(changes)).to.equal(3);
  });

  it('should calculate frequency from +1, +1, +1', () => {
    const changes =
      `+1
       +1
       +1`;

    expect(chronalCalibration.calculateFrequency(changes)).to.equal(3);
  });

  it('should calculate frequency from +1, +1, -2', () => {
    const changes =
      `+1
       +1
       -2`;

    expect(chronalCalibration.calculateFrequency(changes)).to.equal(0);
  });

  it('should calculate frequency from -1, -2, -3', () => {
    const changes =
      `-1
       -2
       -3`;

    expect(chronalCalibration.calculateFrequency(changes)).to.equal(-6);
  });

  it('Input file should return 500', () => {
    const input = fs.readFileSync('day-01-chronal-calibration/input.txt').toString();
    expect(chronalCalibration.calculateFrequency(input)).to.equal(500);
  });
});

describe('Part Two', () => {
  it('should calculate first duplicate frequency from +1, -2, +3, +1', () => {
    const changes =
        `+1
         -2
         +3
         +1`;

    expect(chronalCalibration.calculateFrequencyFoundTwice(changes)).to.equal(2);
  });

  it('should calculate first duplicate frequency from +1, -1', () => {
    const changes =
        `+1
         -1`;

    expect(chronalCalibration.calculateFrequencyFoundTwice(changes)).to.equal(0);
  });

  it('should calculate first duplicate frequency from +3, +3, +4, -2, -4', () => {
    const changes =
        `+3
         +3
         +4
         -2
         -4`;

    expect(chronalCalibration.calculateFrequencyFoundTwice(changes)).to.equal(10);
  });

  it('should calculate first duplicate frequency from -6, +3, +8, +5, -6', () => {
    const changes =
        `-6
         +3
         +8
         +5
         -6`;

    expect(chronalCalibration.calculateFrequencyFoundTwice(changes)).to.equal(5);
  });

  it('should calculate first duplicate frequency from +7, +7, -2, -7, -4', () => {
    const changes =
        `+7
         +7
         -2
         -7
         -4`;

    expect(chronalCalibration.calculateFrequencyFoundTwice(changes)).to.equal(14);
  });

  it('should calculate first duplicate frequency from Input file', () => {
    const input = fs.readFileSync('day-01-chronal-calibration/input.txt').toString();
    expect(chronalCalibration.calculateFrequencyFoundTwice(input)).to.equal(709);
  });
});
