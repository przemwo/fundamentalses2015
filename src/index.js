import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import Generators from './es6-generators';

const App = ({children}) => {
  return(
    <div>
      <Link to="/">Home</Link>
      {' '}
      <Link to="/generators">ES6 Generators</Link>
      {children}
    </div>
  );
};

const Home = () => {
  return(
    <h1>Home</h1>
  );
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="generators" component={Generators} />
    </Route>
  </Router>,
  document.getElementById('app')
);
