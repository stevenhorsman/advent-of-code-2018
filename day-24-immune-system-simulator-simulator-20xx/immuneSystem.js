const enumify = require('enumify');

class AttackType extends enumify.Enum { }
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
  constructor(groupId, units, hitPoints, weaknesses, immunities, attack, attackType, initiative) {
    this.id = groupId;
    this.units = units;
    this.hitPoints = hitPoints;
    this.weaknesses = weaknesses;
    this.immunities = immunities;
    this.attack = attack;
    this.attackType = attackType;
    this.initiative = initiative;
  }
}

function part1(input) {
  let [immune, infection] = parseInput(input);

  console.log('immune', immune);
  console.log('infection', infection);
}

function parseInput(input) {
  let lines = input.split(/\r?\n/).map(line => line = line.trim());
  let immune = lines.slice(1,lines.indexOf(''));
  let infection = lines.slice(lines.indexOf('')+2);

  let groupId = 1;
  immune = immune.map(line => createGroup(line, groupId++));
  groupId = 1;
  infection = infection.map(line => createGroup(line, groupId++));

  return(immune, infection);
}

function createGroup(line, groupId) {
  let result = line.match(/(\d+) units each with (\d+) hit points (\([^)]*\))? with an attack that does (\d+) (\w+) damage at initiative (\d+)/);
  let weaknesses = [];
  let immunities = [];
  if(result[3].length > 2) {
    let trimmed = result[3].substring(1, result[3].length-1).split(';');
    trimmed.map(part => part.trim()).forEach(part => {
      if (part.startsWith('weak to')) {
        weaknesses = parseTypes(part.substring(7).trim());
      } else if (part.startsWith('immune to')) {
        immunities = parseTypes(part.substring(9).trim());
      }
    });
  }
  return new Group(groupId, result[1],result[2], weaknesses, immunities, result[4], getAttack(result[5]),result[6]);
}

function parseTypes(typeList) {
  return typeList.split(',').map(type => getAttack(type.trim()));
}

module.exports.part1 = part1;
