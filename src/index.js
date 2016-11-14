function Promise(fn) {
  console.log(1);
  var callback = null;
  this.then = function(cb) {
    callback = cb;
  };

  function resolve(value) {
    console.log(3);
    // force callback to be called in the next
    // iteration of the event loop, giving
    // callback a chance to be set by then()
    setTimeout(function() {
      callback(value);
    }, 1);
  }

  fn(resolve);
}

function doSomething() {
  return new Promise(function(resolve) {
    console.log(2);
    var value = 42;
    resolve(value);
  });
}
doSomething().then((res) => {
  console.log(4);
  console.log(res);
});
