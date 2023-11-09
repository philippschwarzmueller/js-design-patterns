// you could do static factory methods in a class
// or have a factory class like the following
// SRP - factory only creates objects, nothing else

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class PointFactory {
  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }
  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta))
  }
}

let p = PointFactory.newCartesianPoint(1, 10);
let x = PointFactory.newPolarPoint(1, 10);
console.log(p);
console.log(x);
