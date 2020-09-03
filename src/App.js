import React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import productsList from './components/productsList';
import addProduct from './components/addProduct';
import editProduct from './components/editProduct';

function App() {
  return (
    <div>
      <div className="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs mb-10">
        <div className="ml-8 text-lg text-gray-700 hidden md:flex">Product CRUD</div>
          <div className="flex flex-row-reverse mr-8 hidden md:flex">
            <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 hover:text-black-500"><Link to={'/create'} style={{textDecoration: "none"}}> Create  </Link></div>
            <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 hover:text-black-500"><Link to={'/'} style={{textDecoration: "none"}}> Home </Link></div>
          </div>
      </div>
      <Switch>
        <Route path={'/'} exact component={productsList} />
        <Route path={'/create'} exact component={addProduct} />
        <Route path={'/edit/:id'} exact component={editProduct} />
      </Switch>
    </div>
  );
}

export default App;
