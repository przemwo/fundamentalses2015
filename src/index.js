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

// let stack = new Stack();
// console.log("INIT ==============");
// stack.print();
// console.log(stack.isEmpty());
//
// console.log("PUSH ==============");
// stack.push(2);
// stack.push(3);
// stack.push(5);
// stack.print();
//
// console.log("POP ==============");
// stack.pop();
// stack.print();
//
// console.log("PEEK ==============");
// console.log(stack.peek());
// console.log(stack.isEmpty());
// console.log(stack.size());
//
// console.log("CLEAR ==============");
// stack.clear();
// stack.print();
// console.log(stack.isEmpty());



// ProjectsApi mock up
class ProjectsApi {
  constructor(data) {
    this.data = data;
  }

  getResponse(methodName, args) {
    if(!this.data || !Object.keys(this.data).find(key => key === methodName)) {
      console.warn(`Response data for api method: ${methodName} were not set in ProjectsApiStub constructor method`)
      return null;
    }
    let res;
    for(const [key, val] of Object.entries(this.data)) {
      if(key === methodName) {
        if(val.constructor === Array) {
          val.forEach(item => {
            item.params = item.params || [];
            if(JSON.stringify(item.params) === JSON.stringify(args)) {
              res = item.response;
            }
          });
        } else {
          res = val;
        }
      }
    }
    return res;
  }

  getUserName(...args) {
    const response = this.getResponse('getUserName', args) || 'error';
    return response;
  }

  getProject(...args) {
    const response = this.getResponse('getProject', args) || 'error';
    return response;
  }

  getData(...args) {
    const response = this.getResponse('getData', args) || 'error';
    return response;
  }

  dupa(...args) {
    const response = this.getResponse('dupa', args) || 'error';
    return response;
  }
}

// Initial data
const initData = {
  // many responses, for many params
  getUserName: [
    {
      response: 'podaj id',
    },
    {
      params: [1],
      response: 'Jan',
    },
    {
      params: [2],
      response: 'Adam',
    },
  ],
  // one response, no params
  getData: [
    {
      response: 'some data'
    }
  ],
  // one response, no params shortcut
  getProject: {a: 'some data'},
};
const api = new ProjectsApi(initData);

// Using api mock up
console.log('USER: ', api.getUserName(1));
console.log('PROJECT: ', api.getProject(333));
console.log('DATA: ', api.getData());
console.log('DUPA: ', api.dupa());
