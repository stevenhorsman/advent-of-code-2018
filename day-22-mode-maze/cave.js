const enumify = require('enumify');
const FlatQueue = require('flatqueue');

class Tool extends enumify.Enum { }
Tool.initEnum(['TORCH', 'CLIMBING', 'NEITHER']);

class Type extends enumify.Enum { }
Type.initEnum({
  ROCKY: {
    get symbol() { return '.'; },
    get risk() { return 0; },
    isToolValid(tool) { return tool != Tool.NEITHER; }
  },
  WET: {
    get symbol() { return '='; },
    get risk() { return 1; },
    isToolValid(tool) { return tool != Tool.TORCH; }
  },
  NARROW: {
    get symbol() { return '|'; },
    get risk() { return 2; },
    isToolValid(tool) { return tool != Tool.CLIMBING; }
  },
  VOID: {
    get symbol() { return '!'; }
  },
});

function getType(risk) {
  for (const d of Type.enumValues) {
    if (d.risk === risk) {
      return d;
    }
  }
}

class Grid {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.grid = Array(this.height);
    for (let j = 0; j < this.height; j++) {
      this.grid[j] = new Array(this.width);
    }
  }

  set(x, y, value) {
    if (x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length) {
      this.grid[y][x] = value;
    }
  }

  get(x, y) {
    if (x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length) {
      return this.grid[y][x];
    }
    return Type.VOID;
  }

  print() {
    for (let y = 0; y < this.grid.length; y++) {
      console.log(this.grid[y]);
    }
    console.log('');
  }

  printType() {
    for (let y = 0; y < this.grid.length; y++) {
      console.log(this.grid[y].map(type => type.symbol).join(''));
    }
    console.log('');
  }

  getNeighbours(x, y) {
    const adjacents = [
      { x: +x, y: +y - 1 },
      { x: +x - 1, y: +y },
      { x: +x + 1, y: +y },
      { x: +x, y: +y + 1 }
    ];
    return adjacents.filter(position => this.get(position.x, position.y) != Type.VOID);
  }
}

function parseInput(input) {
  let inputLines = input.split(/\r?\n/)
    .map((line) => line = line.trim());
  const depth = +inputLines[0].match(/depth: (\d+)/)[1];
  const result = inputLines[1].match(/target: (\d+),(\d+)/);
  const target = { x: +result[1], y: +result[2] };
  return { depth: depth, target: target };
}

function makeTypeGrid(depth, target) {
  const width = +target.x + 100;
  const height = +target.y + 100;

  console.log(depth, target, width, height);

  let typeGrid = new Grid(width, height);
  let erosionGrid = new Grid(width, height);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let geologicalIndex = 0;
      if (i == 0 && j == 0 || i == target.x && j == target.y) {
        geologicalIndex = 0;
      } else if (i == 0) {
        geologicalIndex = 48271 * j;
      } else if (j == 0) {
        geologicalIndex = 16807 * i;
      } else {
        geologicalIndex = erosionGrid.get(i - 1, j) * erosionGrid.get(i, j - 1);
      }
      const erosionLevel = (geologicalIndex + depth) % 20183;
      erosionGrid.set(i, j, erosionLevel);
      typeGrid.set(i, j, getType(erosionLevel % 3));
    }
  }
  return typeGrid;
}

function calculateRiskLevel(input) {
  const parameters = parseInput(input);
  const typeGrid = makeTypeGrid(parameters.depth, parameters.target);

  let totalRisk = 0;
  for (let x = 0; x <= parameters.target.x; x++) {
    for (let y = 0; y <= parameters.target.y; y++) {
      totalRisk += typeGrid.get(x, y).risk;
    }
  }
  return totalRisk;
}


function calculateFastestRoute(input) {
  const parameters = parseInput(input);
  const typeGrid = makeTypeGrid(parameters.depth, parameters.target);
  const target = getNode(parameters.target.x, parameters.target.y, Tool.TORCH);

  let tool = Tool.TORCH;

  let dist = {};
  dist[getNodeName(getNode(0, 0, tool))] = 0;
  let queue = new FlatQueue();

  queue.push(getNode(0, 0, tool), 0);

  while (queue.length > 0) {
    let currDist = queue.peekValue();
    let u = queue.pop();
    let uName = getNodeName(u);
    if (dist[uName] && currDist > dist[uName]) {
      continue;
    }
    if (u.x == target.x && u.y == target.y && u.tool == target.tool) {
      return dist[uName];
    }
    //Add this, but with the valid tool
    for (const altTool of Tool.enumValues) {
      if (altTool != u.tool && typeGrid.get(u.x, u.y).isToolValid(altTool)) {
        let toolNode = getNode(u.x, u.y, altTool);
        let toolName = getNodeName(toolNode);
        if (!dist[toolName] || dist[toolName] > dist[uName] + 7) {
          queue.push(toolNode, dist[uName] + 7);
          dist[toolName] = dist[uName] + 7;
        }
      }
    }
    //Add neighbours
    typeGrid.getNeighbours(u.x, u.y)
      .filter(neighbour => typeGrid.get(neighbour.x, neighbour.y).isToolValid(u.tool))
      .forEach(neighbour => {
        let neighbourNode = getNode(neighbour.x, neighbour.y, u.tool);
        let neighbourName = getNodeName(neighbourNode);
        if (!dist[neighbourName] || dist[neighbourName] > dist[uName] + 1) {
          queue.push(neighbourNode, dist[uName] + 1);
          dist[neighbourName] = dist[uName] + 1;
        }
      });
  }
  return dist[getNodeName(target)];
}

function getNode(x, y, tool) {
  return { x: x, y: y, tool: tool };
}

function getNodeName(node) {
  return `${node.x},${node.y},${node.tool}`;
}

module.exports.calculateRiskLevel = calculateRiskLevel;
module.exports.calculateFastestRoute = calculateFastestRoute;