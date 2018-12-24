const enumify = require('enumify');

class AttackType extends enumify.Enum {}
AttackType.initEnum(['SLASHING', 'RADIATION', 'FIRE', 'COLD', 'BLUDGEONING']);

function getAttack(string) {
  for (const d of AttackType.enumValues) {
    if (d.name.toLowerCase() === string.toLowerCase()) {
      return d;
    }
  }
  throw new Error(['Weird type', string]);
}

class Group {
  constructor(
    groupId,
    units,
    hitPoints,
    weaknesses,
    immunities,
    attack,
    attackType,
    initiative
  ) {
    this.id = groupId;
    this.units = units;
    this.hitPoints = hitPoints;
    this.weaknesses = weaknesses;
    this.immunities = immunities;
    this.attack = attack;
    this.attackType = attackType;
    this.initiative = initiative;
  }

  get effectivePower() {
    return this.units * this.attack;
  }

  calculateDamage(target) {
    let attack = this.effectivePower;
    if (target.immunities.indexOf(this.attackType) !== -1) {
      attack = 0;
    } else if (target.weaknesses.indexOf(this.attackType) !== -1) {
      attack = attack * 2;
    }
    // console.log(this.id + ' would deal defending ' + target.id + ' ' + attack + ' damage');
    return attack;
  }

  receiveDamage(attacker) {
    const damage = attacker.calculateDamage(this);
    let unitsKilled = Math.floor(damage / this.hitPoints);
    if (unitsKilled > this.units) {
      unitsKilled = this.units;
    }
    this.units = this.units - unitsKilled;
    return unitsKilled;
    // console.log(attacker.id + ' attacks defending ' + this.id + ', killing ' + unitsKilled + ' units');
  }
}

function part1(input) {
  return round(input).reduce((a, b) => a + b, 0);
}

function part2(input) {
  var low = 0;
  var high = Number.MAX_SAFE_INTEGER / 2;
  while (high - low > 1) {
    var immuneBoost = Math.round((high + low) / 2);
    const result = round(input, immuneBoost);
    //console.log('With boost',immuneBoost, ':', result);
    if (result[0] > 0) {
      high = immuneBoost;
    } else {
      low = immuneBoost;
    }
  }
  return round(input, high)[0];



  // let immuneBoost = -1;
  // let immuneAlive = 0;

  // //TODO - binary search
  // while(immuneAlive == 0) {
  //   immuneBoost++;
  //   const result = round(input, immuneBoost);
  //   console.log('With boost',immuneBoost, ':', result);
  //   immuneAlive = result[0];
  // }
  // return immuneAlive;
}

function round(input, immuneBoost = 0) {
  let [immune, infection] = parseInput(input, immuneBoost);

  // console.log('immune', immune);
  // console.log('infection', infection);

  let allSystems = new Map();
  immune.map(group => allSystems.set(group.id, group));
  infection.map(group => allSystems.set(group.id, group));
 
  while (immune.length > 0 && infection.length > 0) {
    // console.log('\nImmune System:');
    // immune.forEach(group => console.log(group.id + ' contains ' + group.units + ' units'));
    // console.log('Infection System:');
    // infection.forEach(group => console.log(group.id + ' contains ' + group.units + ' units'));
    // console.log();

    immune = immune.filter(group => group.units > 0);
    infection = infection.filter(group => group.units > 0);

    const targets = new Map();
    createTargetMap(targets, infection, immune);
    createTargetMap(targets, immune, infection);

    // console.log('targets', targets);
    let unitsKilled = 0;
    //console.log('allsystems', allSystems);
    Array.from(allSystems.values())
      .sort((a, b) => b.initiative - a.initiative)
      .forEach(attacker => {
        const target = allSystems.get(targets.get(attacker.id));
        //console.log('>>>>>attack!',attacker, target);
        if (target) {
          unitsKilled += target.receiveDamage(attacker);
        }
      });
    if (unitsKilled == 0) {
      return [-1,-1];
    }
    immune = immune.filter(group => group.units > 0);
    infection = infection.filter(group => group.units > 0);
  }
  // console.log('\nImmune System:');
  // immune.forEach(group => console.log(group.id + ' contains ' + group.units + ' units'));
  // console.log('Infection System:');
  // infection.forEach(group => console.log(group.id + ' contains ' + group.units + ' units'));
  // console.log();

  return [immune.reduce((a, b) => a + b.units, 0), infection.reduce((a, b) => a + b.units, 0)];
}

function createTargetMap(targets, aggressors, aggressees) {
  aggressors.sort(
    (a, b) => b.effectivePower - a.effectivePower || b.initiative - a.initiative
  );

  aggressors.forEach(attacker => {
    // aggressees.forEach(target => console.log(targets, target.id, Array.from(targets.values()), Array.from(targets.values()).indexOf(target.id) ));

    let target = aggressees
      .filter(target => Array.from(targets.values()).indexOf(target.id) == -1 )
      .sort(
        (a, b) =>
          attacker.calculateDamage(b) - attacker.calculateDamage(a) ||
          b.effectivePower - a.effectivePower ||
          b.initiative - a.initiative
      )[0];
    if (target && attacker.calculateDamage(target) > 0) {
      targets.set(attacker.id, target.id);
    }
  });
}

function parseInput(input, immuneBoost = 0) {
  let lines = input.split(/\r?\n/).map(line => (line = line.trim()));
  let immune = lines.slice(1, lines.indexOf(''));
  let infection = lines.slice(lines.indexOf('') + 2);

  let groupId = 1;
  immune = immune.map(line => createGroup(line, 'Immune System Group ' + groupId++, immuneBoost));
  groupId = 1;
  infection = infection.map(line => createGroup(line, 'Infection Group' + groupId++));

  return [immune, infection];
}

function createGroup(line, groupId, immuneBoost = 0) {
  let result = line.match(
    /(\d+) units each with (\d+) hit points (\([^)]*\) )?with an attack that does (\d+) (\w+) damage at initiative (\d+)/
  );
  //console.log(result);
  let weaknesses = [];
  let immunities = [];
  if (result[3] && result[3].length > 2) {
    let trimmed = result[3].trim().substring(1, result[3].length - 2).split(';');
    trimmed
      .map(part => part.trim())
      .forEach(part => {
        if (part.startsWith('weak to')) {
          weaknesses = parseTypes(part.substring(7).trim());
        } else if (part.startsWith('immune to')) {
          immunities = parseTypes(part.substring(9).trim());
        }
      });
  }
  return new Group(
    groupId,
    +result[1],
    +result[2],
    weaknesses,
    immunities,
    +result[4] + immuneBoost,
    getAttack(result[5]),
    +result[6]
  );
}

function parseTypes(typeList) {
  return typeList.split(',').map(type => getAttack(type.trim()));
}

module.exports.part1 = part1;
module.exports.part2 = part2;