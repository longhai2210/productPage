import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <div>
      <div className="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs mb-10">
        <div className="ml-8 text-lg text-gray-700 hidden md:flex">Product CRUD</div>
          <div className="flex flex-row-reverse mr-8 md:flex">
            <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 hover:text-black-500"><Link to={'/create'} style={{textDecoration: "none"}}> Create  </Link></div>
            <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 hover:text-black-500"><Link to={'/'} style={{textDecoration: "none"}}> Home </Link></div>
          </div>
      </div>
      <Switch>
        <Route path={'/'} exact component={ProductsList} />
        <Route path={'/create'} exact component={AddProduct} />
        <Route path={'/edit/:id'} exact component={EditProduct} />
      </Switch>
    </div>
  );
}

export default App;
