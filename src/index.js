import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

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

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todoReducer(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(todo => todoReducer(todo, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;

  }
};

const todoApp = combineReducers({todos, visibilityFilter});

// ACTION CREATORS
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text: text
  };
};

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  }
};

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id: id
  }
};


const Todo = ({
  onClick,
  text,
  completed
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
    {text}
  </li>
);

() => {
  store.dispatch({
    type: 'TOGGLE_TODO',
    id: todo.id
  });
}

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
       />
    )}
  </ul>
);

let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
          input = node;
        }} />
      <button onClick={()=>{
          dispatch(addTodo(input.value));
          input.value = '';
        }}>Add todo</button>
    </div>
  );
};
const mapDispatchToAddTodoProps = (dispatch) => {
  return { dispatch };
};
AddTodo = connect()(AddTodo) // if no arguments is provided to connect - dispatch is sending via props


const Link = ({
  active,
  onClick,
  children
}) => {
  if(active) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      {children}
    </a>
  );
};

// class FilterLink extends React.Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
//   }
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//   render () {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();
//     return (
//       <Link
//         active={
//           props.filter === state.visibilityFilter
//         }
//         onClick={() =>
//           store.dispatch({
//             type: 'SET_VISIBILITY_FILTER',
//             filter: props.filter
//           })
//         }
//       >
//         {props.children}
//       </Link>
//     );
//   }
// }
// FilterLink.contextTypes = {
//   store: React.PropTypes.object
// };
const mapStateToLinkProps = (state, ownProps) => {
  return {
    active:ownProps.filter === state.visibilityFilter
  };
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};
 const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);


const Footer = () => (
    <p>
      Show:
      {' '}
      <FilterLink
        filter='SHOW_ALL'
      >
        All
      </FilterLink>
      {' '}
      <FilterLink
        filter='SHOW_ACTIVE'
      >
        Active
      </FilterLink>
      {' '}
      <FilterLink
        filter='SHOW_COMPLETED'
      >
        Completed
      </FilterLink>
    </p>
);


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};
const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

// It's all is done by connect React-Redux function
// class VisibleTodoList extends React.Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
//   }
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//
//   render () {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();
//
//     return (
//       <TodoList
//         todos={
//           getVisibleTodos(state.todos, state.visibilityFilter)
//         }
//         onTodoClick={(id) => {
//           store.dispatch({
//             type: 'TOGGLE_TODO',
//             id: id
//           })
//         }}
//
//         />
//     );
//   }
// }
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// };

const TodoApp = () => (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
);

// Implementation of React-Redux Provider
// class Provider extends React.Component {
//   getChildContext() {
//     return {
//       store: this.props.store
//     };
//   }
//   render () {
//     return this.props.children;
//   }
// }
// Provider.childContextTypes = {
//   store: React.PropTypes.object
// };

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
