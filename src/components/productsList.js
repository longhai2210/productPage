import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class productsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products : [],
            product: {},
            inputValue: '',
            sortValue: '',
            loading: false,         
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

    handleInputValueChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    filterProduct = async (param) => {
        
        await axios.get(`http://localhost:5000/products/?q=${param}`).then(data => {
            this.setState({products: data.data,inputValue: " "})
        })
        console.log(this.state.inputValue);
    }

    render() {
        const products = this.state.products;
        return (
            <div>
                <span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex mx-auto">
                    <input type="search" name="serch" placeholder="Search"
                        className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none" onChange={(e) => this.handleInputValueChange(e)}/>
                    <i className="fas fa-search m-3 mr-5 text-lg text-gray-700 w-4 h-4" style={{transform: "translate(13px,-6px)"}} onClick={() => this.filterProduct(this.state.inputValue)}>
                    </i>
                </span>
                {products.length === 0 && (
                    <div className="text-center">
                        <h2>No product found at the moment</h2>
                    </div>
                )}
                <table className="border-collapse w-full">
                    <thead>
                        <tr>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Barcode</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product name</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Image</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Description</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Sell price</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">produce date</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">status</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.map(product => 
                        <tr key={product.id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    
                                {product.barcode}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {product.product_name}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <img src={product.image} alt="Product img"/>
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {product.description}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {product.sell_price}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {product.produce_date}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {product.status === "Active"?
                                    <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">{product.status}</span> 
                                    :
                                    <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">{product.status}</span>
                                }
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <Link to={`edit/${product.id}`} className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-indigo-500 py-2 px-4 border border-blue hover:border-transparent rounded" style={{textDecoration: "none"}}>Edit product </Link>
                                <button className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-indigo-500 py-2 px-4 border border-blue hover:border-transparent rounded" onClick={() => this.deleteProduct(product.id)}>Delete product</button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
