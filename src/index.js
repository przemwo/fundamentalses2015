// Accessor Properties
class PersonA {
  constructor(name) {
    this.name = name;
  }
  get personName() {
    return this.name;
  }
  set personName(name) {
    this.name = name;
  }
}
const fooA = new PersonA('Adam');
fooA.personName; // => Adam
fooA.personName = 'Paweł'; // => set to Paweł
fooA.personName; // => Paweł



// Computed Member Names
const methodName = 'sayHello';

class PersonB {
  [methodName] () {
    console.log('Hello!');
  }
}
const fooB = new PersonB();
fooB.sayHello();
