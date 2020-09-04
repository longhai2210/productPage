import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product';
import ProductSearch from './ProductSearch';

export default class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products : [],
            product: {},
            inputValue: '',
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/products`).then(data => {
            this.setState({ products: data.data })
        })
    }

    deleteProduct = (id) => {
        axios.delete(`http://localhost:5000/products/${id}`).then(data => {
            const index = this.state.products.findIndex(product => product.id === id);
            this.state.products.splice(index, 1);
            this.props.history.push('/');
        })
    }

    handleInputValueChange = (param) => {
        this.setState({
            inputValue: param
        })
    }

    filterProduct = async (param) => {
        
        await axios.get(`http://localhost:5000/products?q=${param}`).then(data => {
            this.setState({products: data.data,inputValue: " "})
        })
        console.log(this.state.inputValue);
    }

    render() {
        const products = this.state.products;
        return (
            <div>
                <ProductSearch 
                    onValueChange={this.handleInputValueChange}
                    onFilter={this.filterProduct}
                />
                {products.length === 0 && (
                    <div className="text-center">
                        <h2>No product found at the moment</h2>
                    </div>
                )}
                <Product 
                    products = {this.state.products}
                />
            </div>
        )
    }
}
