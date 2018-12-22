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
  opcodes[instruction[0]].run(+instruction[1],+instruction[2],+instruction[3], registers);
  return registers;
}

function setUpRegisters(line) {
  const parse = line.replace(/ /g,'').match(/(.+):\[(.+)\]/);
  return parse[2].split(',').map(Number);
}

function executeProgram(input, register0Value = 0) {
  let inputLines = input.split(/\r?\n/);
  let result = inputLines.shift().match(/#ip (\d+)/);
  inputLines = inputLines.map((line) => line.substring(0, line.indexOf('/')).split(':')[1]);
  inputLines.forEach((val, index) => console.log(index, val));
  return 0;
  
  const ipBind = result[1];
  console.log('IP bound to ',ipBind);
  let registers = [register0Value,0,0,0,0,0];
  let ip = registers[ipBind];
  //console.log('ip='+ip,registers.slice(), inputLines[ip]);
  while(ip >= 0 && ip < inputLines.length) {
    let instruction = inputLines[ip].split(' ');
    //if (instruction == 29) {
    console.log('ip='+ip,registers.slice(), inputLines[ip], instruction);
    //}
    //     //OPTIMISER
    // if (ip == 2 && registers[1] != 0) {
    //   //console.log('>>>>>in optimizer');
    //   if ((registers[4] % registers[1])==0){
    //     registers[0] += registers[1];
    //   }
    //   registers[5] = 0;
    //   registers[3] = registers[4];
    //   ip=12;
    //   continue;
    // }

    opcodes[instruction[0]].run(+instruction[1],+instruction[2],+instruction[3], registers);
    if (instruction == 29) {
      console.log('res',registers);
    }
    registers[ipBind]++;
    ip = registers[ipBind];
  }
  return registers[0];
}

module.exports.runInstruction = runInstruction;
module.exports.executeProgram = executeProgram;
