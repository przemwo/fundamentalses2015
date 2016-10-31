// CLASSES

// Class declarations are not hoisted.
// Class syntax has two components: class declaration and class expression.
// Body of class is executed in strict mode.
// constructor can use 'super' keyword to call the constructor of a parent class

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



// Static methods
// Static method are called without instantiating their class.
// Are often used to create utility functions for an application
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}

const p1 = new Point(5,5);
const p2 = new Point(10,10);
let distance = Point.distance(p1, p2); // I can use 'distance' property without instantiating a class!
console.log(distance);

// More on static methods
class Circle {
  // static method, alias for: Circle.foo = function() {...};
  static foo() {
    console.log(`I'm foo!`);
  }
  // instance method
  bar() {
    console.log(`I'm bar!`);
  }
}
const circle = new Circle();
Circle.foo(); // => I'm foo
// circle.foo(); // => TypeError: circle.foo is not a function !!!
circle.bar(); // => I'm bar



// Subclasses with 'extends'
// super keyword is used to call functions on an object's parent
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a noise`
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // you HAVE to user super before using parent's properties in the child constructor
    this.name = `Dog ${this.name}`;
  }
  speak() {
    let tmp = super.speak();
    return `${tmp} and barks.`
  }
}
const dog = new Dog('Laki');
console.log(dog.speak());





//*****************************
// OBJECTS
//*****************************

// PROTOTYPES
// Object.create(obj) - create new object with obj as prototype
// Object.defineProperty - use when you want to add property to the object and add some configuration like writable, enumerable etc.
// Object.getPrototypeOf(obj) - return prototype object of the obj
// Object.setPrototypeOf(objChild, objPar) - set prototype of objChild to objPar
// obj.hasOwnProperty(prop) - check if 'prop' property was defined on the 'obj' object itself (not up in the prototype chain)
let Vehicle = Object.create(null); //create empty object
// Add 'color' property to the 'Vehicle' object, you can add additional writable, enumerable etc. values to the property
Object.defineProperty(Vehicle, 'color', {
  value: 'red'
});
let Car = Object.create(Vehicle); //create object with Vehicle as prototype
Object.defineProperty(Car, 'made', {
  value: 'Ford'
});
Object.defineProperty(Car, 'horn', {
  value: function() {
    return 'beeeep!';
  }
});
Object.getPrototypeOf(Car); // => returns Vehicle object
Car.color; // => 'red'
Car.made; // => 'Ford'
Car.horn(); // => 'beeeep!'

//OBJECT LITERALS
let person = {
  name: 'Adam',
  age: '38'
};
// the above is equal to:
let person2 = Object.create(Object.prototype); //!!! when using object literals JS always set object prototype to Object.prototype !!!
person2.name = 'Adam';
person2.age = '38';

//we can override default prototype methods, eg. toString method
let person3 = {
  name: 'Jan',
  toString: function() { //override toString method
    return this.name;
  }
};

let test = {
  test: 'some test text'
};
Object.setPrototypeOf(test, Vehicle);


// *********
// Function object as prototype for new object
// *********

// This is a constructor
let Person = function(name, age) {
  this.name = name;
  this.age = age;
};

Person.prototype = {
  getPerson: function() {
    return `${this.name} is ${this.age} old`;
  }
};
let jan = new Person('Jan', '32'); // 'Person' object is a prototype for 'jan' object
