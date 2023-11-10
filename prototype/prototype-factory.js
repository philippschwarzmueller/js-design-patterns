class Address {
  constructor(streetAddress, city, suite) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.suite = suite;
  }

  deepCopy() {
    return new Address(this.streetAddress, this.city, this.suite);
  }

  toString() {
    return `Address: ${this.streetAddress}, City: ${this.city}, Suite: ${this.suite}`
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  deepCopy() {
    return new Employee(this.name, this.address);
  }

  toString() {
    return `Name: ${this.name}\n  ${this.address.toString()}`
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1) {
      object['typeIndex'] = idx;
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

class EmployeeFactory {
  static _newEmployee(proto, name, suite) {
    let copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.main, name, suite);
  }
  static newAuxOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.aux, name, suite);
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(null, new Address('123 East Dr', 'London', null));
EmployeeFactory.aux = new Employee(null, new Address('200 London Rd', 'Oxford', null));

let john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 5678);

console.log(john.toString());
console.log(jane.toString());
