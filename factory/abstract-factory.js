const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/** Abstract Hot Drink Class
 * @abstract
 */
class HotDrink {
  consume() { /* placeholder for virtual method */ }
}

/** Tea class
 * @extends {HotDrink}
 */
class Tea extends HotDrink {
  consume() {
    console.log('Tea is being consumed')
  }
}

/** Coffee class
 * @extends {HotDrink}
 */
class Coffee extends HotDrink {
  consume() {
    console.log('Coffee is being consumed')
  }
}

class HotDrinkFactory {
  prepare(amount) {
    // implement
  }
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log('adding tea bag, boiling water, pouring: ' + amount)
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log('grinding the beans, pouring water, drinking: ' + amount)
    return new Coffee();
  }
}

/**
 * Enum for available drinks
 * @readonly
 * @enum {string}
 */
let AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory,
})

/** Hot drink factory */
class HotDrinkMachine {
  constructor() {
    this.factories = {};
    for (let drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink]();
    }
  }
  /** Let's you interact with the machine 
   * @param {function(drink)} consumer 
  */
  interact(consumer) {
    rl.question('Which drink and amount?  e.g., tea 50 ', (answer) => {
      let parts = answer.split(' ');
      let name = parts[0];
      let amount = parseInt(parts[1]);
      let d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    })
  }
  /** create a new Hot drink
   * @param {string} type - type of drink
   * @returns {HotDrink} new hot drink
   */
  makeDrink(type) {
    switch (type) {
      case 'tea':
        return new TeaFactory().prepare(200);
      case 'coffee':
        return new CoffeeFactory().prepare(250);
      default:
        throw new Error("I don't know that type");
    }
  }
}

let machine = new HotDrinkMachine();
machine.interact(function(drink) {
  drink.consume();
})
rl.question('Which drink? ', function(answer) {
  let drink = machine.makeDrink(answer);
  drink.consume();
  rl.close();
});