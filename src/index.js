import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

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
const store = createStore(todoApp);

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

const AddTodo = ({
  onAddClick
}) => {
  let input;
  return (
    <div>
      <input ref={node => {
          input = node;
        }} />
      <button onClick={()=>{
          onAddClick(input.value);
          input.value = '';
        }}>Add todo</button>
    </div>
  );
};

const FilterLink = ({filter, currentFilter, onClick, children}) => {
  if(filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick(filter);
      }}>
      {children}
    </a>
  );
};

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter='SHOW_ALL'
        currentFilter={visibilityFilter}
        onClick={onFilterClick}>
        All
      </FilterLink>
      {' '}
      <FilterLink
        filter='SHOW_ACTIVE'
        currentFilter={visibilityFilter}
        onClick={onFilterClick}>
        Active
      </FilterLink>
      {' '}
      <FilterLink
        filter='SHOW_COMPLETED'
        currentFilter={visibilityFilter}
        onClick={onFilterClick}>
        Completed
      </FilterLink>
    </p>
  );
};

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

let nextTodoId = 0;

const TodoApp = ({
  todos,
  visibilityFilter
}) => (
    <div>
      <AddTodo
        onAddClick={text =>
          store.dispatch({
            type: 'ADD_TODO',
            text: text,
            id: nextTodoId++
          })
        }
      />
      <TodoList
        todos={
          getVisibleTodos(todos, visibilityFilter)
        }
        onTodoClick={(id) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: id
          });
        }} />
      <Footer
        visibilityFilter={visibilityFilter}
        onFilterClick={(filter) => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: filter
          });
        }} />
    </div>
);

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('app')
  );
  console.log(store.getState());
};

store.subscribe(render);
render();
