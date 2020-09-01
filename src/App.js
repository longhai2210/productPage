import React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import productsList from './components/productsList';
import addProduct from './components/addProduct';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={'/'}> Home </Link>
          </li>
          <li>
            <Link to={'/create'}> Create Customer </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={'/'} exact component={productsList} />
        <Route path={'/create'} exact component={addProduct} />
      </Switch>
    </div>
  );
}

export default App;
