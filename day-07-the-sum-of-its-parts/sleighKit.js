class Graph {
  constructor(input) {
    this.visited = new Set();
    this.unvisited = new Set();
    this.processing = new Set();

    input.split('\n')
    .map((line) => {
      let result = line.trim().match(/Step (\w) must be finished before step (\w) can begin/);
      this.addConnection(result[1].charCodeAt(0), result[2].charCodeAt(0));
    });
  }

  addConnection(u, v) {
    let inNode = this.getNode(u);
    let outNode = this.getNode(v);

    inNode.addConnectionOut(outNode);
    outNode.addDependency(inNode);
  }

  getNode(id) {
    let node;
    let match = Array.from(this.unvisited).filter((node) => node.id === id);
    if (match.length > 0) {
      node = match[0];
    } else {
      node = new Node(id);
      this.unvisited.add(node);
    }
    return node;
  }

  processingNode(node) {
    this.processing.add(node);
  }

  findNextNode() {
    return Array.from(this.unvisited).sort((a, b) => a.id - b.id).filter((node) => node.isNodeUnblocked(this.visited) && !this.visited.has(node)  && !this.processing.has(node))[0];
  }

  visitNode(node) {
    this.unvisited.delete(node);
    this.visited.add(node);
  }
}

class Node {
  constructor(id) {
    this.id = id;
    this.dependencies = [];
    this.connections = [];
  }

  addConnectionOut(node) {
    this.connections.push(node);
  }

  addDependency(node) {
    this.dependencies.push(node);
  }

  isNodeUnblocked(visited) {
    let available = true;
    this.dependencies.forEach((dependency) => {
      available = available && visited.has(dependency);
    });
    return available;
  }

  toString() {
    return String.fromCharCode(this.id);
  }
}

function calculateOrder(input) {
  let graph = new Graph(input);

  while (graph.unvisited.size != 0) {
    let next = graph.findNextNode();
    graph.visitNode(next);
  }

  return Array.from(graph.visited).map((node) => String.fromCharCode(node.id)).join('');
}

function calculateTime(input, workerCount, stepDelay) {
  let graph = new Graph(input);

  let tick = -1;
  let workers = new Array(workerCount).fill({part:undefined,remaining:0});
  while (graph.unvisited.size != 0) {
    tick++;
    for(let w = 0; w < workers.length; w++) {
      if (workers[w].remaining == 0) {
        let node = workers[w].part;
        if (node != undefined) {
          //console.log(tick,':',String.fromCharCode(node.id));
          graph.visitNode(node);
          graph.processing.delete(node);
        }
        let next = graph.findNextNode();
        if (next) {
          workers[w] = {part:next, remaining:next.id - 65 + stepDelay};
          graph.processingNode(next);
        } else {
          workers[w] = {part:undefined,remaining:0};
        }
      } else {
        workers[w].remaining--;
      }
    }
    //console.log(tick,':',workers);
  }

  return tick;
}

module.exports.calculateOrder = calculateOrder;
module.exports.calculateTime = calculateTime;