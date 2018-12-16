class Opcode {
  constructor(name, runFunction) {
    this.name = name;
    this.runFunction = runFunction;
  }

  run(input1, input2, output, registers) {
    registers[output] = this.runFunction(input1, input2, registers);
  }
}

const opcodeMap = {};

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
  opcodes[instruction[0]].run(+instruction[1],+instruction[2],+instruction[3], registers);
  return registers;
}

function setUpRegisters(line) {
  const parse = line.replace(/ /g,'').match(/(.+):\[(.+)\]/);
  return parse[2].split(',').map(Number);
}

function find3MatchingOpcodes(input) {
  let inputLines = input.split(/\r?\n/);
  let matches3 = 0;
  
  const opCodeMatches = {};
  for(let i=0;i<16;i++) {
    opCodeMatches[i] = Object.keys(opcodes);
  }

  for(let i=0; i< inputLines.length; i=i+4) {
    const matches = findMatchingOpcodes(inputLines.slice(i,i+3).join('\n'));
    if (matches.length >= 3) {
      matches3++;
    }
    let opCode = inputLines[i+1].split(' ')[0];
    // console.log(opCode, opCodeMatches[opCode], matches, );
    opCodeMatches[opCode] = opCodeMatches[opCode].filter(inst => matches.indexOf(inst) > -1);
  }

  while(Object.values(opCodeMatches).some(matches => matches.length > 1)) {
    let sureMatches = Object.values(opCodeMatches).filter(matches => matches.length == 1).map(array => array[0]);
    Object.keys(opCodeMatches).forEach(e => {
      if (opCodeMatches[e].length > 1) {
        opCodeMatches[e] = opCodeMatches[e].filter(match => !sureMatches.includes(match));
      }
    });
  }
  
  Object.keys(opCodeMatches).forEach(e => {
    opcodeMap[e] = opcodes[opCodeMatches[e][0]];
  });  
  return matches3;
}

function findMatchingOpcodes(input) {
  let inputLines = input.split(/\r?\n/).map((line) => line.trim());
  let beforeRegisters = setUpRegisters(inputLines.shift());
  let instruction = inputLines.shift().split(' ');
  let afterRegisters = setUpRegisters(inputLines.shift());
  let matchingInstructions = [];
  Object.keys(opcodes).forEach(e => {
    let regs = beforeRegisters.slice(0);
    opcodes[e].run(+instruction[1],+instruction[2],+instruction[3], regs);
    if(arraysEqual(afterRegisters,regs)) {
      matchingInstructions.push(e);
    }
  });
  return matchingInstructions;
}

function executeProgram(trainingData, program) {
  find3MatchingOpcodes(trainingData);
  let inputLines = program.split(/\r?\n/).map((line) => line.trim());
  let registers = [0,0,0,0];
  while(inputLines.length > 0) {
    let instruction = inputLines.shift().split(' ');
    opcodeMap[instruction[0]].run(+instruction[1],+instruction[2],+instruction[3], registers);
  }
  return registers[0];
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

module.exports.runInstruction = runInstruction;
module.exports.findMatchingOpcodes = findMatchingOpcodes;
module.exports.find3MatchingOpcodes = find3MatchingOpcodes;
module.exports.executeProgram = executeProgram;
