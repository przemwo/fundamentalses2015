// FUNCTIONAL PROGRAMMING

const animals = [
  { name: 'Ted', species: 'dog', age: 10 },
  { name: 'Adam', species: 'rabbit', age: 15 },
  { name: 'Ewa', species: 'cat', age: 10 },
  { name: 'Max', species: 'dog', age: 20 }
];


// 1. GOAL: get all dogs

// NOT functional
// const dogs = [];
// for(let i =0; i < animals.length; i++) {
//   if(animals[i].species === 'dog') {
//     dogs.push(animals[i]);
//   }
// }

// !!! FILTER
// in this example .filter() is a Higher-order function (a function that takes another function as an argument)
const isDog = (animal) => animal.species === 'dog';
const dogs = animals.filter(isDog);

console.log(dogs);



// 2. GOAL: get all names

// Not functional
// const names = [];
// for(let i = 0; i < animals.length; i++) {
//   names.push(animals[i].name);
// }

// !!! MAP
const names = animals.map(animal => animal.name);

console.log(names);



// GOAL: sum age of all animals

// Not functional
// let total = 0;
// for(let i = 0; i < animals.length; i++) {
//   total += animals[i].age;
// }

// !!! REDUCE 1
const total = animals.reduce((sum, animal) => sum += animal.age, 0);

console.log(total);

// !!! REDUCE 2
// GOAL: take data const and transofrm it into object
const data = `
Ted	dog	10
Adam	rabbit	15
Ted	cat	10
Adam	dog	20
`;

const obj = data
  .trim()
  .split('\n')
  .map(line => line.split('\t'))
  .reduce((target, line) => {
    target[line[0]] = target[line[0]] || [];
    target[line[0]].push({
        species: line[1],
        aga: line[2]
    });
    return target;
  }, {});

console.log(JSON.stringify(obj, null, 2));



// !!! CLOSURES
const foo = () => {
  let counter = 0;
  const increment = () => {
    counter++;
  };
  const decrement = () => {
    counter--;
  };
  const show = () => {
    console.log(counter);
  };
  return {
    show,
    increment,
    decrement
  };
};

const counter = foo();
counter.show();
counter.increment();
counter.increment();
counter.decrement();
counter.show();



// !!! CURRYING - when a function pass through the application and gradually receives arguments it needs
// NO currying
let dragon = (name, size, element) => `${name} is a ${size} dragon that breaths ${element}!`;
console.log(dragon('Adam', 'big', 'lightning'));

// Currying
let otherDragon = name =>
  size =>
   element => `${name} is a ${size} dragon that breaths ${element}!`;
console.log(otherDragon('Jan')('big')('water')); //you can chain the calls...
//...or you can make every step a function
let janDragon = otherDragon('Jan');
let bigJanDragon = janDragon('big');
let waterBigJanDragon = bigJanDragon('water');
console.log(waterBigJanDragon);


// Currying Example
// GOAL: get all dogs from animals
// NO currying:
// const isAnimalSpecies = (obj, species) => {
//   return obj.species === species;
// };
// const dogsOnly = animals.filter(animal => {
//     return isAnimalSpecies(animal, 'dog');
// });
// Currying:
const isAnimalSpecies =
  species =>
    obj => obj.species === species;

const dogsOnly = animals.filter(isAnimalSpecies('dog'));

console.log(JSON.stringify(dogsOnly, null, 2));


// !!! RECURSION
// when a function call itself... until it doesn't

// Recursion - count number from 10 to 1
const countDown = (number) => {
  console.log(number);
  if(number > 1) {
    countDown(number - 1);
  }
};
countDown(10);

// Recursion - make n tree like object from input data:
const recursionInput = [
  { id: 'A', parent: null },
  { id: 'AA', parent: 'A' },
  { id: 'AAA', parent: 'AA' },
  { id: 'AAB', parent: 'AA' },
  { id: 'AAC', parent: 'AA' },
  { id: 'AB', parent: 'A' },
  { id: 'ABA', parent: 'AB' },
  { id: 'ABB', parent: 'AB' }
];

// TURN IT INTO THIS:
// A: {
//   AA: {
//     AAA: null,
//     AAB: null,
//     AAC: null
//   },
//   AB: {
//     ABA: null,
//     ABB: null
//   }
// }

const makeTree = (categories, parent) => {
  let node = {};
  categories
    .filter(c => c.parent === parent)
    .forEach(c => node[c.id] = makeTree(categories, c.id));
  if(Object.keys(node).length === 0) {
    return null;
  }
  return node;
};
console.log(
  JSON.stringify(makeTree(recursionInput, null), null, 2)
);
