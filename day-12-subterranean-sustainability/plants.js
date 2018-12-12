class Transformation {
  constructor(matcher, result) {
    this.matcher = matcher;
    this.result = result;
  }
}

class State {
  constructor(initialState, firstIndex =-2) {
    //TODO - optimise and only add if nothing at the end
    this.current = initialState;
    this.firstIndex = firstIndex + 2;
    if (!this.current.startsWith('....')) {
      this.current = '....' + this.current;
      this.firstIndex = this.firstIndex - 4;
    }

    if (!this.current.endsWith('....')) {
      this.current = this.current + '....';
    }
  }

  evolve(transformations) {
    let nextString = '';
    //console.log('currLEngth:',this.current.length - 4);
    for(let i = 0; i <this.current.length - 4; i++) {
      let replacementChar = '.';
      transformations.forEach((transformation) => {
        if (this.current.substring(i,i+5) === transformation.matcher) {
          //console.log(this.current.substring(i,i+5),'matches',transformation.matcher);
          replacementChar = transformation.result;
        }
      });
      //console.log(i,'replacementChar',replacementChar);
      nextString = nextString + replacementChar;
    }
    //console.log('next String',nextString);
    return new State(nextString, this.firstIndex);
  }

  calculateSum() {
    let sum = 0;
    for(let i = 0; i <this.current.length; i++) {
      if (this.current.charAt(i) == '#') {
        //console.log('Adding',i+this.firstIndex);
        sum += i+this.firstIndex;
      }
    }
    return sum;
  }
}

function calculateSum(input, iterations = 20) {
  let inputLines = input.split(/\r?\n/);
  let state = parseInitialState(inputLines.shift());
  inputLines.shift();

  let transformations = [];
  inputLines
    .map((line) => {
    let result = line.trim().match(/(.+) => (.+)/);
    transformations.push(new Transformation(result[1],result[2]));
  });

  let actualIt = iterations;
  if (iterations > 1000) {
    iterations = 1000;
  }
  for(let i=0;i<iterations;i++) {
    state = state.evolve(transformations);
  }

  if (actualIt > 1000) {
    let currSum = state.calculateSum();
    let diff = state.evolve(transformations).calculateSum() - currSum;
    return (actualIt - iterations) * diff + currSum;
  }

  return state.calculateSum();
}

function parseInitialState(input) {
  return new State(input.replace('initial state: ',''));
}

module.exports.calculateSum = calculateSum;