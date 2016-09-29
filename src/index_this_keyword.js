// THIS

// 1. function() - ask how the function is INVOKED?
  // 1.1 fn() --> functino invocation: 'this' is global object or undefined (in strict mode, ES6 modules)
  // 1.2 obj.fn() --> method invocation: 'this' is obj
  // 1.3 const obj = new ClassName() --> constructor invocation: 'this' is newly created object (obj)
  // 1.4 fn.call(context, arg) / fn.apply(context, [arg]) --> indirect invocation: 'this' is the firt argument of call/apply (context)
  // 1.5 foo = fn.bind(context) --> bound function: return a copy of fn function where 'this' is the first argument of bind

// 2. arrow function: () => {} - ask what is 'this' where the arrow function is DEFINED?


// EXAMPLES
let fn;
let obj;

// 1.
// 1.1
fn = function() {
  console.log(1.1, this === undefined); // true in strict mode/ES6 modules, otherwise global (window in a browser)
};
fn();

// 1.2
obj = {
  fn: function() {
    console.log(1.2, this === obj); // true
  }
};
obj.fn();

// 1.3
let ClassName = function() {
  this.fn = function() {
    console.log(1.3, this === classIntance); // true
  };
};
let classIntance = new ClassName();
classIntance.fn();

// 1.4
fn = function() {
  console.log(1.4, this === 'test'); // true
};
fn.call('test');

// 1.5
fn = function() {
  console.log(1.5, this === 'another test'); // true
};
fn = fn.bind('another test'); // !!! .bind return a copy of a function so you need to assign it to some variable
fn();


// 2
obj = {
  fn: () => {
    console.log(2, this === undefined); // true in strict mode/ES6 modules, otherwise global (window in a browser)
  }
};
obj.fn(); // it's not "normal" method invocation (see 1.2), fn is an arrow so 'this' is set to 'this' where fn is DEFINED
