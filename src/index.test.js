import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore } from 'redux';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).toEqual(true);
  });
});

const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {id: action.id, text: action.text, completed: false};
    case 'TOGGLE_TODO':
      if(state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {completed: !state.completed});
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todoReducer(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(todo => todoReducer(todo, action));
    default:
      return state;
  }
};

const visibilityFilterReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;

  }
};

const todoAppReducer = (state = {}, action) => {
  return {
    todos: todosReducer(state.todos, action),
    visibility: visibilityFilterReducer(state.visibility, action)
  };
};

const combineReducers = (reducers = {}) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Some text'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Some text',
      completed: false
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Some text 1',
      completed: false
    },
    {
      id: 1,
      text: 'Some text 2',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Some text 1',
      completed: false
    },
    {
      id: 1,
      text: 'Some text 2',
      completed: true
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log('All tests passed');
