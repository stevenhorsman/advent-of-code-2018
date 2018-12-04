function calculateMostAsleep(input) {
  let minute = 0;

  //Sort by date
  const logs = input
  .split('\n')
  .map((line) => {
    line = line.trim();
    result = line.match(/\[(.+)\] (.+)/);
    return {date: new Date(result[1]), event: result[2]}
  })
  .sort((a, b) => a.date - b.date);

  let guards = new Map();
  let guardId = -1;
  let fallsAsleep;
  logs.forEach(log => {
    const guardMatch = log.event.match(/(Guard #|)(\d+)( begins shift)/);
    if(guardMatch != null) {
      guardId = guardMatch[2];
      if(!guards.has(guardId)) {
        guards.set(guardId, new Map());
      }
    } else if(log.event === "falls asleep") {
      fallsAsleep = log.date.getMinutes();
    } else if(log.event === "wakes up") {
      for (let i = fallsAsleep; i < log.date.getMinutes(); i++) {
        let guardRec = guards.get(guardId);
        let minCount = (guardRec.get(i) || 0) + 1
        guardRec.set(i, minCount);
      }
    }
  })

  let maxGuardId = -1;
  let maxGuardMins = -1;
  guardSum = {}
  guards.forEach((value,key) => {
    const counts = Array.from(value.values());
    if (counts.length == 0) {
      return;
    }
      const sum = counts.reduce((total, amount) => total + amount); 
      if (sum > maxGuardMins) {
        maxGuardId = key;
        maxGuardMins= sum
      }
  });

  maxGuardMins = -1;
  guards.get(maxGuardId).forEach((value,key) => {
    if (value > maxGuardMins) {
      minute = key;
      maxGuardMins = value;
    }
  });

  console.log("Sleepiest guard is",maxGuardId,"sleepiest Min",minute)
  return maxGuardId * minute;
}

function calculateSleepyistMinute(input) {

  let minute = 0;

  //Sort by date
  const logs = input
  .split('\n')
  .map((line) => {
    line = line.trim();
    result = line.match(/\[(.+)\] (.+)/);
    return {date: new Date(result[1]), event: result[2]}
  })
  .sort((a, b) => a.date - b.date);

  let guards = new Map();
  let guardId = -1;
  let fallsAsleep;
  logs.forEach(log => {
    const guardMatch = log.event.match(/(Guard #|)(\d+)( begins shift)/);
    if(guardMatch != null) {
      guardId = guardMatch[2];
      if(!guards.has(guardId)) {
        guards.set(guardId, new Map());
      }
    } else if(log.event === "falls asleep") {
      fallsAsleep = log.date.getMinutes();
    } else if(log.event === "wakes up") {
      for (let i = fallsAsleep; i < log.date.getMinutes(); i++) {
        let guardRec = guards.get(guardId);
        let minCount = (guardRec.get(i) || 0) + 1
        guardRec.set(i, minCount);
      }
    }
  });

  let maxGuardId = -1;
  let maxGuardMins = -1;
  guardSum = {}
  guards.forEach((map,guardId) => {
    map.forEach((frequency,min) => {
      if (frequency > maxGuardMins) {
        minute = min;
        maxGuardMins = frequency;
        maxGuardId = guardId;
      }
    });
  });

  console.log("Sleepiest guard is",maxGuardId,"sleepiest Min",minute)
  return maxGuardId * minute;

}

module.exports.calculateMostAsleep = calculateMostAsleep;
module.exports.calculateSleepyistMinute = calculateSleepyistMinute;