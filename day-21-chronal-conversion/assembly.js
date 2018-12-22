class Opcode {
  constructor(name, runFunction) {
    this.name = name;
    this.runFunction = runFunction;
  }

  run(input1, input2, output, registers) {
    registers[output] = this.runFunction(input1, input2, registers);
  }
}

const opcodes = {};
addOpCode('addr', (a, b, registers) => {
  return registers[a] + registers[b];
});
addOpCode('addi', (a, b, registers) => {
  return registers[a] + b;
});
addOpCode('mulr', (a, b, registers) => {
  return registers[a] * registers[b];
});
addOpCode('muli', (a, b, registers) => {
  return registers[a] * b;
});
addOpCode('banr', (a, b, registers) => {
  return registers[a] & registers[b];
});
addOpCode('bani', (a, b, registers) => {
  return registers[a] & b;
});
addOpCode('borr', (a, b, registers) => {
  return registers[a] | registers[b];
});
addOpCode('bori', (a, b, registers) => {
  return registers[a] | b;
});
addOpCode('setr', (a, b, registers) => {
  return registers[a];
});
addOpCode('seti', (a) => {
  return a;
});

addOpCode('gtir', (a, b, registers) => {
  return a > registers[b] ? 1 : 0;
});
addOpCode('gtri', (a, b, registers) => {
  return registers[a] > b ? 1 : 0;
});
addOpCode('gtrr', (a, b, registers) => {
  return registers[a] > registers[b] ? 1 : 0;
});

addOpCode('eqir', (a, b, registers) => {
  return a === registers[b] ? 1 : 0;
});
addOpCode('eqri', (a, b, registers) => {
  return registers[a] === b ? 1 : 0;
});
addOpCode('eqrr', (a, b, registers) => {
  return registers[a] === registers[b] ? 1 : 0;
});

function addOpCode(name, op) {
  opcodes[name] = new Opcode(name, op);
}

function runInstruction(input) {
  let inputLines = input.split(/\r?\n/).map((line) => line.trim());
  let registers = setUpRegisters(inputLines.shift());
  let instruction = inputLines.shift().split(' ');
  opcodes[instruction[0]].run(+instruction[1], +instruction[2], +instruction[3], registers);
  return registers;
}

function setUpRegisters(line) {
  const parse = line.replace(/ /g, '').match(/(.+):\[(.+)\]/);
  return parse[2].split(',').map(Number);
}

function part1(input) {
  let inputLines = input.split(/\r?\n/);
  let result = inputLines.shift().match(/#ip (\d+)/);
  inputLines = inputLines.map((line) => line.trim());

  const ipBind = result[1];
  console.log('IP bound to ', ipBind);
  let ip = 0;
  let registers = [0, 0, 0, 0, 0, 0];
  while (ip >= 0 && ip < inputLines.length) {
    console.log('ip=' + ip, registers.slice(), inputLines[ip]);
    let instruction = inputLines[ip].split(' ');

    //OPTIMISER
    if (ip == 8) {
      while (registers[3] > 0) {
        registers[5] = (((registers[5] + (registers[3] & 255)) & 0xFFFFFF) * 65899) & 0xFFFFFF;
        registers[3] = registers[3] >> 8;
      }
      ip = 28;
      continue;
    }

    if (ip == 28) {
      return registers[+instruction[1]];
    }
    opcodes[instruction[0]].run(+instruction[1], +instruction[2], +instruction[3], registers);
    if (instruction == 28) {
      console.log('res', registers);
    }
    registers[ipBind]++;
    ip = registers[ipBind];
  }
}

function part2(input) {
  let inputLines = input.split(/\r?\n/);
  let result = inputLines.shift().match(/#ip (\d+)/);
  inputLines = inputLines.map((line) => line.trim());

  const ipBind = result[1];
  console.log('IP bound to ', ipBind);
  let ip = 0;
  let registers = [0, 0, 0, 0, 0, 0];
  const prevResults = [];
  while (ip >= 0 && ip < inputLines.length) {
    //console.log('ip='+ip,registers.slice(), inputLines[ip]);
    let instruction = inputLines[ip].split(' ');
    //OPTIMISER
    if (ip == 8) {
      registers[5] = (((registers[5] + (registers[3] & 255)) & 16777215) * 65899) & 16777215;
      while (256 <= registers[3]) {
        registers[1] = 0;
        do {
          registers[2] = (registers[1] + 1) * 256;
          registers[1]++;
        } while (registers[2] <= registers[3]);
        registers[1]--;
        registers[3] = registers[1];
        registers[5] = (((registers[5] + (registers[3] & 255)) & 16777215) * 65899) & 16777215;
      }
      registers[ipBind] = 28;
      ip = registers[ipBind];
      continue;
    }

    if (ip == 18) {
      registers[2] = (registers[1] + 1) * 256;
      while (registers[2] <= registers[3]) {
        registers[1]++;
        registers[2] = (registers[1] + 1) * 256;
      }
      registers[ipBind] = 26;
      ip = registers[ipBind];
      continue;
    }
    if (ip == 28) {
      const r5 = registers[+instruction[1]];
      if (prevResults.indexOf(r5) > -1) {
        return prevResults[prevResults.length - 1];
      }
      prevResults.push(r5);
    }
    opcodes[instruction[0]].run(+instruction[1], +instruction[2], +instruction[3], registers);
    if (instruction == 28) {
      console.log('res', registers);
    }
    registers[ipBind]++;
    ip = registers[ipBind];
  }
}

module.exports.runInstruction = runInstruction;
module.exports.part1 = part1;
module.exports.part2 = part2;