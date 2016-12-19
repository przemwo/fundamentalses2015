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
  constructor(apiMethodsConfig) {
    this.apiMethodsConfig = apiMethodsConfig;
  }

  // Prepares response for a method call
  getResponse(methodName, args) {
    // When provided no responses for the method
    if(!this.apiMethodsConfig || !this.apiMethodsConfig[methodName]) {
      console.warn(`Response data for api method:${methodName} were not set.`)
      return null;
    }

    // When provided only one response as an object
    if(this.apiMethodsConfig[methodName].constructor !== Array) {
      return this.apiMethodsConfig[methodName];
    }

    // When provided reponse(s) as an array
    const apiMethodCall = this.apiMethodsConfig[methodName].filter(apiMethodCallConfig => {
      if(apiMethodCallConfig.params) {
        return JSON.stringify(apiMethodCallConfig.params) === JSON.stringify(args);
      } else {
        return args.length === 0;
      }
    });
    return ((apiMethodCall[0] && apiMethodCall[0].response) || null);
  }

  // API methods
  getUserName(...args) {
    const response = this.getResponse('getUserName', args) || 'default response';
    return response;
  }

  getProject(...args) {
    const response = this.getResponse('getProject', args) || 'default response';
    return response;
  }

  getData(...args) {
    const response = this.getResponse('getData', args) || 'default response';
    return response;
  }

  dupa(...args) {
    const response = this.getResponse('dupa', args) || 'default response';
    return response;
  }
}

// Initial data
const apiMethodsConfig = {
  // many responses, for many params
  getUserName: [
    {
      response: 'name when no params',
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
  // // one response, no params shortcut
  getProject: {a: 'some data'},
};
const api = new ProjectsApi(apiMethodsConfig);

// Using api mock up
console.log('USER: ', api.getUserName());
console.log('PROJECT: ', api.getProject(333));
console.log('DATA: ', api.getData());
console.log('DUPA: ', api.dupa());

// EXAMPLES
// Always return 'Tomasz', no matter what args are
api.apiMethodsConfig.getUserName = 'Tomasz';
console.log('=====================================');
console.log('USER: ', api.getUserName());  //Tomasz
console.log('USER: ', api.getUserName(1));  //Tomasz
console.log('USER: ', api.getUserName(333));  //Tomasz

// Returns Piotr when no args, otherwise default value
api.apiMethodsConfig.getUserName = [
  {
    response: 'Piotr',
  }
];
console.log('=====================================');
console.log('USER: ', api.getUserName());  //Piotr
console.log('USER: ', api.getUserName(1));  //default value
console.log('USER: ', api.getUserName(333));  //default value

// Returns Wojciech for arg === 1, otherwise default value
api.apiMethodsConfig.getUserName = [
  {
    params: [1],
    response: 'Wojciech',
  }
];
console.log('=====================================');
console.log('USER: ', api.getUserName());  //default value
console.log('USER: ', api.getUserName(1));  //Wojciech
console.log('USER: ', api.getUserName(333));  //default value

// Returns Piotr when no args, Wojciech for arg === 1,  otherwise default value
api.apiMethodsConfig.getUserName = [
  {
    response: 'Piotr',
  },
  {
    params: [1],
    response: 'Wojciech',
  }
];
console.log('=====================================');
console.log('USER: ', api.getUserName());  //Piotr
console.log('USER: ', api.getUserName(1));  //Wojciech
console.log('USER: ', api.getUserName(333));  //default value
