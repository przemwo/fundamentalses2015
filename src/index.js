let Stack = (function() {
  const items = new WeakMap();
  class Stack {
    constructor() {
      items.set(this, []);
    }
    push(element) {
      let s = items.get(this);
      s.push(element);
    };
    pop () {
      let s = items.get(this);
      let r = s.pop();
      return r;
    };
    peek () {
      let s = items.get(this);
      return s[s.length - 1];
    };
    isEmpty () {
      let s = items.get(this);
      return s.length === 0;
    };
    size () {
      let s = items.get(this);
      return s.length;
    };
    clear () {
      items.set(this, []);
    };
    print () {
      console.log(JSON.stringify(items.get(this), null, 2));
    }
  }
  return Stack;
})();

let stack = new Stack();
console.log("INIT ==============");
stack.print();
console.log(stack.isEmpty());

console.log("PUSH ==============");
stack.push(2);
stack.push(3);
stack.push(5);
stack.print();

console.log("POP ==============");
stack.pop();
stack.print();

console.log("PEEK ==============");
console.log(stack.peek());
console.log(stack.isEmpty());
console.log(stack.size());

console.log("CLEAR ==============");
stack.clear();
stack.print();
console.log(stack.isEmpty());
