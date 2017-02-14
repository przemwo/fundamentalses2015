import React from 'react';

const Generators = () => {
  return(
    <h2>Generators</h2>
  );
};

export default Generators;


// Simple generator
function *foo() {
  yield 1;
  yield 2;
}
// Get iterator of *foo
var it = foo();
// Use it iterator to start iterating on our generator
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: undefined, done: true }


console.log('==================================');

// When you call .next() with some value eg. .next(12) this value is passed to the last (waiting) yield and put in its place
// So first call .next() with any value, this value is ignored as there is no waiting yield expression.
// 1. call .next()
// 2. execute function until first yield expression
// 3. send back value of the yield expression
// 4. another call .next(6)
// 5. waiting yield expression is switch with the value passed by .next call (6)

// More complex example
function *bar(x) {
  var y = 2 * (yield (x + 1));
  var z = yield(y / 3);
  return (x + y + z);
}
it = bar(5);
console.log(it.next()); //6, false
console.log(it.next(12)); // 8, false
console.log(it.next(13)); // 42, true
console.log(it.next(100)); // undefined, true


console.log('==================================');


// Error handling

// 1. Inside generator
// 1.1 Passed from outside by .throw(), handled by generator
function *baz() {
  try {
    var x = yield 3;
    console.log('hi!'); //we never get here
  } catch(err) {
    console.log('Error: ' + err);
  }
}
it = baz();
console.log(it.next());
it.throw('Problem!');

// 2. Outside generator
// 2.1 Passed from outside, handled by the outside (thanks to right back propagation)
// If not caught eventually will end up as an unhandled rejection
function *fooa() {
  var x = yield 4;
  console.log('hi!'); //we never get here
}
it = fooa();
console.log(it.next());
try {
  it.throw('Another problem!');
} catch(err) {
  console.log('Error: ' + err);
}

// 2.2 From inside generator, handled by the outside
function *foob() {
  var x = yield 3;
  var z = x.tuUpperCase();
  console.log('hi!'); // never get here
}
it = foob();
console.log(it.next());
try {
  it.next(5); //we passe 5 to the foob. x becomes 5. Next we try to call .toUpperCase on 5 which trhows an error!
} catch(err) {
  console.log('Error: ' + err);
}


console.log('==================');


// Delegating Generators using yield*
function *baza() {
  yield 3;
  yield 4;
  return 'baza!';
}

function *bazb() {
  yield 1;
  yield 2;
  var x = yield *baza(); //here we delegate iteration control (the next() calls) to baza
  console.log(x);
  yield 5;
  return 'bazb!!!';
}
it = bazb();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());


// Another example
function *bazc() {
  yield 1;
  yield 2;
  yield *['a', 'b', 'c']; // here can be any iterable object (eg. an array)
  yield 3;
}
it = bazc();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
