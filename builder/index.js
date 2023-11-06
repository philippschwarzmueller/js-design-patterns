// Related to composition. Have a function add a method to an object
const bug1 = {
  name: "Buggy McFly",
  phrase: "Your debugger doesn't bug me",
}

const bug2 = {
  name: "BuggerDriver",
  phrase: "Cant bug this",
}

const addFlyingAbility = obj => {
  obj.fly = () => console.log(`Now ${obj.name} can fly`);
}

const addSpeechAbility = obj => {
  obj.speak = () => console.log(`Now ${obj.name} can speak`);
}

addFlyingAbility(bug1);
bug1.fly();
