// FAKE Promise implementation!!! For a real one look below!!!
function fakePromise(fn) {
  console.log(2);
  var callback = null;
  this.then = function(cb) {
    callback = cb;
  };

  function resolve(value) {
    console.log(5);
    // force callback to be called in the next
    // iteration of the event loop, giving
    // callback a chance to be set by then()
    setTimeout(function() {
      console.log(6);
      callback(value);
    }, 1);
  }

  console.log(3);
  fn(resolve);
}

function doSomething() {
  console.log(1);
  return new fakePromise(function(resolve) {
    console.log(4);
    var value = 42;
    resolve(value);
  });
}

// EXECUTION
// In '.then' execution the callback function is executed with the value (res) from new Promise resolve call -> resolve(value) = 42;
doSomething().then((res) => {
  console.log(7);
  console.log(res);  // 42
});



// REAL Promise
// In promises look what value promise resolves to (resolve(someVal)). This 'someVal' is pass to the callback function in '.then'
// Executing 'foo' returns new Promise.
// In '.then' execution the callback function is executed with the value (res) passed from Promise resolve call -> resolve(value) = 100;
const foo = () => {
  return new Promise(resolve => {
    resolve(100);
  });
};

foo().then((res) => {
  console.log(res);  // 100
});

// You can immidiately resolve Promise with a given value. This value will be passed to the callback function in '.then' execution.
const bar = Promise.resolve(333).then((res) => {
  console.log(res);  // 333
});

// '.then' always return a new promise (which is resolved with the value returned from the previous promise), so that you can chain promises one after another
const baz = Promise.resolve(444).then(() => 555).then(() => 666).then(res => console.log(res));  // 666


// Value passed to the resolve function is passed to the '.then' callback function eg. resolve('test') -> somePromise.then(res => ...);  res === 'test'
const somePromise = new Promise(resolve => {
  resolve('test');
});

somePromise.then(res => console.log(res));  // 'test'
