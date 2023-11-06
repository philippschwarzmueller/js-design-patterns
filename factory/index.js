// produce related object without specifying concrete class, create objs
// that have some properties and methods in common

class Car {
  constructor() {
    this.name = "Car";
    this.wheels = 4;
  }
  makeSound() {
    console.log("honk honk");
  }
}

class Truck {
  constructor() {
    this.name = "Truck";
    this.wheels = 6;
  }
  makeSound() {
    console.log("loudhonk loudhonk");
  }
}

class Bike {
  constructor() {
    this.name = "Bike";
    this.wheels = 2;
  }
  makeSound() {
    console.log("ring ring");
  }
}
