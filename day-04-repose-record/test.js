const expect = require('chai').expect;
const fs = require('fs');

const sleepTracking = require('./sleepTracking');

describe('Day 4: Repose Record', () => {
    
  describe('Part One', () => {
    it('should determine sleepiest guard (strategy 1)', () => {
      const schedule =
        `[1518-11-01 00:00] Guard #10 begins shift
         [1518-11-01 00:05] falls asleep
         [1518-11-01 00:25] wakes up
         [1518-11-01 00:30] falls asleep
         [1518-11-01 00:55] wakes up
         [1518-11-01 23:58] Guard #99 begins shift
         [1518-11-02 00:40] falls asleep
         [1518-11-02 00:50] wakes up
         [1518-11-03 00:05] Guard #10 begins shift
         [1518-11-03 00:24] falls asleep
         [1518-11-03 00:29] wakes up
         [1518-11-04 00:02] Guard #99 begins shift
         [1518-11-04 00:36] falls asleep
         [1518-11-04 00:46] wakes up
         [1518-11-05 00:03] Guard #99 begins shift
         [1518-11-05 00:45] falls asleep
         [1518-11-05 00:55] wakes up`;
  
         expect(sleepTracking.calculateMostAsleep(schedule)).to.equal(240);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-04-repose-record/input.txt').toString();
      expect(sleepTracking.calculateMostAsleep(input)).to.equal(19830);
    });
  });

  describe('Part Two', () => {
    it('should determine sleepiest guard (strategy 2)', () => {
      const schedule =
        `[1518-11-01 00:00] Guard #10 begins shift
         [1518-11-01 00:05] falls asleep
         [1518-11-01 00:25] wakes up
         [1518-11-01 00:30] falls asleep
         [1518-11-01 00:55] wakes up
         [1518-11-01 23:58] Guard #99 begins shift
         [1518-11-02 00:40] falls asleep
         [1518-11-02 00:50] wakes up
         [1518-11-03 00:05] Guard #10 begins shift
         [1518-11-03 00:24] falls asleep
         [1518-11-03 00:29] wakes up
         [1518-11-04 00:02] Guard #99 begins shift
         [1518-11-04 00:36] falls asleep
         [1518-11-04 00:46] wakes up
         [1518-11-05 00:03] Guard #99 begins shift
         [1518-11-05 00:45] falls asleep
         [1518-11-05 00:55] wakes up`;
  
         expect(sleepTracking.calculateSleepyistMinute(schedule)).to.equal(4455);
    });

    it('Input file should return', () => {
      const input = fs.readFileSync('day-04-repose-record/input.txt').toString();
      expect(sleepTracking.calculateSleepyistMinute(input)).to.equal(43695);
    });
  });
});
