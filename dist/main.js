"use strict";

var foo = function foo() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$x = _ref.x;
  var x = _ref$x === undefined ? 10 : _ref$x;

  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? { y: 10 } : arguments[1];

  var y = _ref2.y;

  console.log(x, y);
};

var bar = function bar() {
  var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref3$x = _ref3.x;
  var x = _ref3$x === undefined ? 10 : _ref3$x;
  var _ref3$y = _ref3.y;
  var y = _ref3$y === undefined ? 20 : _ref3$y;

  console.log(x, y);
};
bar({ y: 200 });