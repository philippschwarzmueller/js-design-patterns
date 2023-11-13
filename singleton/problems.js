const fs = require('fs');
const path = require('path');

class MyDatabase {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;
    console.log("Init DB");
    this.capitals = {};
    let lines = fs.readFileSync(path.join(__dirname, 'capitals.txt')).toString().split('\r\n');
    for (let i = 0; i < lines.length / 2; ++i) {
      this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
    }
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

// db is low level module rn
// below is the high level module

// problematic because it hurts the dependency inversion principle
class SingletonRecordFinder {
  totalPopulation(cities) {
    return cities.map(
      city => new MyDatabase().getPopulation(city)
    ).reduce((x, y) => x + y);
  }
}

// better way of doing it
class ConfiguarableRecordFinder {
  constructor(database) {
    this.database = database;
  }
  totalPopulation(cities) {
    return cities.map(
      city => this.database.getPopulation(city)
    ).reduce((x, y) => x + y);
  }
}

let srf = new SingletonRecordFinder();
console.log(srf.totalPopulation(['Stuttgart', 'Heilbronn']))
