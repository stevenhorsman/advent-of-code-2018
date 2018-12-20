const enumify = require('enumify');

class Direction extends enumify.Enum { }

Direction.initEnum({
  NORTH: {
    get reverse() { return Direction.SOUTH; },
    get symbol() { return 'N'; }
  },
  EAST: {
    get reverse() { return Direction.WEST; },
    get symbol() { return 'E'; }
  },
  SOUTH: {
    get reverse() { return Direction.NORTH; },
    get symbol() { return 'S'; }
  },
  WEST: {
    get reverse() { return Direction.EAST; },
    get symbol() { return 'W'; }
  }
});

function parseDirection(char) {
  for (const d of Direction.enumValues) {
    if (d.symbol === char) {
      return d;
    }
  }
}

class Room {
  constructor(id) {
    //console.log('Create room', id);
    this.id = id;
    this.connections = {};
  }

  addDoor(adjacent, direction) {
    this.connections[direction] = adjacent;
    let opposite = adjacent.getRoom(direction.reverse);
    if (!opposite) {
      adjacent.addDoor(this, direction.reverse);
    } else {
      if (opposite != this) {
        console.log('>>>>>>>>>>>>>>>error!');
      }
    }
  }

  getRoom(direction) {
    return this.connections[direction];
  }

  getConnections() {
    return Object.values(this.connections);
  }
}

function getDistances(room) {
  let queue = [];
  let dist = {};
  let pred = {};
  let visited = {};

  visited[room.id] = true;
  dist[room.id] = 0;
  queue.push(room);

  while (queue.length > 0) {
    let room = queue.shift();

    room.getConnections().forEach(adj => {
      if (visited[adj.id] !== true) {
        visited[adj.id] = true;
        dist[adj.id] = dist[room.id] + 1;
        pred[adj.id] = room.id;
        queue.push(adj);
      }
    });
  }
  return Object.values(dist).sort((a, b) => b - a);
}

function constructMap(routeString) {
  let roomNo = 0;
  let startRoom = new Room(roomNo++);
  let latestRoom = startRoom;
  let stack = [];
  let chars = routeString.trim().substr(1).slice(0, -1).split('');
  chars.forEach(c => {
    switch (c) {
      case '(':
        stack.push(latestRoom);
        break;
      case ')':
        latestRoom = stack.pop();
        break;
      case '|':
        latestRoom = stack[stack.length - 1];
        break;
      default: {
        const dir = parseDirection(c);
        if (dir) {
          let room = latestRoom.getRoom(dir);
          if (!room) {
            room = new Room(roomNo++);
            //console.log(latestRoom, 'adding door room', room, 'to the', dir.name);
            latestRoom.addDoor(room, dir);
          }
          latestRoom = room;
        }
      }
    }
  });
  return startRoom;
}

function findFurthestRoom(routeString) {
  const startRoom = constructMap(routeString);
  return getDistances(startRoom)[0];
}

function findRoomsFarAway(routeString,distance = 1000) {
  const startRoom = constructMap(routeString);
  return getDistances(startRoom).filter(d => d >= distance).length;
}

module.exports.findFurthestRoom = findFurthestRoom;
module.exports.findRoomsFarAway = findRoomsFarAway;