function Stack() {
  let items = [];
  this.push = function(element) {
    items.push(element);
  };
  this.pop = function() {
    return items.pop();
  };
  this.peek = function() {
    return items[items.length - 1];
  };
  this.isEmpty = function() {
    return items.length === 0;
  };
  this.size = function() {
    return items.length;
  };
  this.clear = function() {
    items = [];
  };
  this.print = function() {
    console.log(JSON.stringify(items, null, 2));
  }
}

let stack = new Stack;
console.log(stack.isEmpty());
stack.push('a');
stack.print();
stack.push('b');
stack.print();
stack.pop();
stack.print();
console.log(stack.isEmpty());
