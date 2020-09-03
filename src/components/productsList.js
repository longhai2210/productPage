import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class productsList extends Component {
    constructor(props) {
        super(props);
        this.state = { products : [] }
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

    render() {
        const products = this.state.products;
        return (
            <div>
                {products.length === 0 && (
                    <div className="text-center">
                        <h2>No product found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Barcode</th>
                                    <th scope="col">Product name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Sell Price</th>
                                    <th scope="col">Produce Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map(product =>
                                    <tr key={product.id}>
                                        <td>{product.barcode}</td>
                                        <td>{product.product_name}</td>
                                        <td><img src={product.image} alt="Product img"/></td>
                                        <td>{product.description}</td>
                                        <td>{product.sell_price}</td>
                                        <td>{product.produce_date}</td>
                                        <td>{product.status}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${product.id}`} className="btn btn-sm btn-outline-secondary">Edit product </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteProduct(product.id)}>Delete product</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
