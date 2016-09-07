'use strict';

var obj = {
  //id: 10,
  test: 'kupa',
  get id() {
    return this.test;
  },
  set id(v) {
    this.test = v;
  }
};
console.log(obj.id);
obj.id = 'dupa';
console.log(obj.id);
console.log(obj.id);