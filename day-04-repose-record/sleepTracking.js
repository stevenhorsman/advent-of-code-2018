//Re-work based on https://github.com/mariotacke/advent-of-code-2018/blob/master/day-04-repose-record/sleep.js
class Guard {
  constructor (id) {
    this.id = id;
    this.sleep = Array.from({ length: 60 }).map(() => 0);
  }

  get totalSleepMinutes() {
    return this.sleep.reduce((a, b) => a + b, 0);
  }

  get sleepiestMinute() {
    return this.sleep
      .map((frequency, minute) => ({ minute, frequency }))
      .sort((a, b) => b.frequency - a.frequency)[0].minute;
  }
}

function calculateMostAsleep(input) {
  const logs = sortInputByDate(input);
  let guards = createGuardsMaps(logs);

  const sleepiestGuard = Object
    .keys(guards)
    .map((guardId) => guards[guardId])
    .sort((a, b) => b.totalSleepMinutes - a.totalSleepMinutes)[0];

  console.log("Sleepiest guard is",sleepiestGuard.id,"sleepiest Min",sleepiestGuard.sleepiestMinute)
  return sleepiestGuard.id * sleepiestGuard.sleepiestMinute;
}

function calculateSleepyistMinute(input) {
  const logs = sortInputByDate(input);
  let guards = createGuardsMaps(logs);
  
  const sleepiestGuard = Object
  .keys(guards)
  .map((guardId) => guards[guardId])
  .sort((a, b) => b.sleep[b.sleepiestMinute] - a.sleep[a.sleepiestMinute])[0];

  console.log("Sleepiest guard is",sleepiestGuard.id,"sleepiest Min",sleepiestGuard.sleepiestMinute)
  return sleepiestGuard.id * sleepiestGuard.sleepiestMinute;
}

function sortInputByDate(input) {
  return input
  .split('\n')
  .map((line) => {
    line = line.trim();
    result = line.match(/\[(.+)\] (.+)/);
    return {date: new Date(result[1]), event: result[2]}
  })
  .sort((a, b) => a.date - b.date);
}

function createGuardsMaps(logs) {
  const guards = {}

  let guardId = -1;
  let fallsAsleep;
  logs.forEach(log => {
    const guardMatch = log.event.match(/(Guard #|)(\d+)( begins shift)/);
    if (guardMatch != null) {
      guardId = guardMatch[2];
      if (guards[guardId] == null) {
        guards[guardId] = new Guard(guardId);
      }
    }
    else if (log.event === "falls asleep") {
      fallsAsleep = log.date.getMinutes();
    }
    else if (log.event === "wakes up") {
      for (let i = fallsAsleep; i < log.date.getMinutes(); i++) {
        let guardRec = guards[guardId];
        let minCount = (guardRec.sleep[i] || 0) + 1;
        guardRec.sleep[i] = minCount;
      }
    }
  });
  return guards;
}

module.exports.calculateMostAsleep = calculateMostAsleep;
module.exports.calculateSleepyistMinute = calculateSleepyistMinute;