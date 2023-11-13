class CEO {

  get name() { return CEO._name; }
  set name(value) { CEO._name = value; }

  get age() { return CEO._age; }
  set age(value) { CEO._age = value; }

  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  }
}

CEO._age = undefined;
CEO._name = undefined;

let ceo1 = new CEO();
ceo1.name = 'Gandalf';
ceo1.age = 420;

let ceo = new CEO();
ceo.name = 'John Doe';
ceo.age = 69;

console.log(ceo.toString());
