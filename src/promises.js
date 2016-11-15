// PROMISES
// In promises look what value promise resolves to (resolve(someVal)). This 'someVal' is pass to the callback function in '.then'
// Executing 'foo' returns new Promise.
// In '.then' execution the callback function is executed with the value (res) passed from Promise resolve call -> resolve(value) = 100;
let foo = () => {
  return new Promise(resolve => {
    resolve(100);
  });
};

foo().then((res) => {
  console.log(res);  // 100
});


// You can immidiately RESOLVE Promise with a given value. This value will be passed to the callback function in '.then' execution.
Promise.resolve(333).then((res) => {
  console.log(res);  // 333
});


// '.then' ALWAYS return a NEW promise (which is resolved with the value returned from the previous promise), so that you can chain promises one after another
Promise.resolve(444).then(() => 555).then(() => 666).then(res => console.log(res));  // 666


// Value passed to the resolve function is passed to the '.then' callback function eg. resolve('test') -> somePromise.then(res => ...);  res === 'test'
const somePromise = new Promise(resolve => {
  resolve('test');
});
somePromise.then(res => console.log(res));  // 'test'


// REJECTING PROMISE
// Reject works similar to resolve. If you execute reject with some value (1), that value is passed to the '.then' SECOND callback function as parameter (2)
// Resolve should be in try-catch block in order if something unpredictable happened
bar = new Promise((resolve, reject) => {
  try {
    throw 'Some error!';
    resolve('OK!')
  } catch (e) {
    reject(e);  // (1)
  }
});
bar.then(
  (res) => {
    console.log(res);
  },
  (err) => {  // (2)
    console.log(err);  // >>> 'Some error!'
  });

// Similarly you can immidiately REJECT Promise with a given value. This value will be passed to the SECOND callback function in '.then' execution.
Promise.reject('Error!').then(null, (err) => console.log(err));  // >>> 'Error!'


// If you don't have SECOND callback in 'then', the rejection propagates to the next promise in the chain
Promise.reject('ERROR!').then((res) => {}).then((res) => {}).then((res) => {}, (err) => console.log(err));  // >>> 'ERROR!'


// Different ways to resolve a promise
// I.
// 1. Assign function returning promise to 'foo' variable (1)
// 2. Call 'foo' later to resolve Promise LATER in the program and THEN call '.then' with the value passed to resolve (2)
foo = () => {
  return new Promise((resolve, reject) => {
    resolve(1000);
  });
};
foo().then(res => console.log(res));  // >>> 1000 (2)

// II.
// 1. Assign PROMISE to 'foo' variable (1) and resolve Promise IMMIDIATELY (1)
// 2. Call 'foo.then' later in the program with the value passed to resolve (2)
foo = new Promise((resolve, reject) => {
  resolve(2000);
});
foo.then(res => console.log(res));  // >>> 2000 (2)

// III.
// Resolve promise IMMIDIATELY and call '.then' with the value passed to resovle
Promise.resolve(3000).then(res => console.log(res));


// Promise ALWAYS require at least one more iteration of the event loop to resolve.
// Code below will print: 'test1' -> 'test3' -> 'test2'
const someFn = (val) => console.log(val);
someFn('test1');
Promise.resolve('test2').then((res) => console.log(res));
someFn('test3');


// ****** EXAMPLES ******
// Example 01
foo = (status) => {
  return new Promise((resolve, reject) => {
    const myVal = 'my value';
    if(status === true) {
        resolve(myVal)
    } else {
      reject('my value Error!');
    }
  });
};

foo(true).then(
  (res) => {
    console.log(res);  // >>> 'my value'
  },
  (err) => {
    console.log(err);
  });

foo(false).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);  // >>> 'my value error'
  });

  // Example 02
  let resolvedCallback = (res) => console.log(res);
  let rejectedCallback = (err) => console.log(err);
  foo = Promise.resolve('resolved value').then(resolvedCallback, rejectedCallback);  // >>> 'resolved value'
  foo = Promise.reject('rejected value').then(resolvedCallback, rejectedCallback);  // >>> 'rejected value'





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
