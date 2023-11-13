class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;
  }

  foo() {
    console.log("foo bar baz");
  }
}

let s1 = new Singleton();
let s2 = new Singleton();

console.log(s1 === s2);
s1.foo();
s2.foo();
