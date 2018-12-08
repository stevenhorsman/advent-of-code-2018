class Graph {
  constructor() {
    this.visited = new Set();
    this.unvisited = new Set();
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

  findNextNode() {
    return Array.from(this.unvisited).sort((a, b) => a.id - b.id).filter((node) => node.isNodeUnblocked(this.visited) && !this.visited.has(node))[0];
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
}

function calculateOrder(input) {
  let graph = new Graph();

  input.split('\n')
    .map((line) => {
      let result = line.trim().match(/Step (\w) must be finished before step (\w) can begin/);
      graph.addConnection(result[1].charCodeAt(0), result[2].charCodeAt(0));
    });

    
  while (graph.unvisited.size != 0) {
    let next = graph.findNextNode();
    graph.visitNode(next);
  }

  return Array.from(graph.visited).map((node) => String.fromCharCode(node.id)).join('');
}

module.exports.calculateOrder = calculateOrder;
