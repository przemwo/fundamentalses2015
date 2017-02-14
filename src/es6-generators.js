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
