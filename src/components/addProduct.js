import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";

class addProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barcode: "",
            product_name: "",
            image: "",
            description: "",
            sell_price: "",
            produce_date: new Date(),
            status: "",
            values: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            barcode:  this.state.barcode,
            product_name: this.state.product_name,
            image: this.state.image,
            description: this.state.description,
            sell_price: this.state.sell_price,
            produce_date: this.state.produce_date,
            status: this.state.status,
        }
        this.setState({values: [...this.state.values, formData]})
        axios.post(`http://localhost:5000/products`, formData).then(data => [
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1000)
            ]);
    }

    handleInputChanges = (e) => {
        e.preventDefault();
          this.setState({
              [e.currentTarget.name]: e.currentTarget.value,
      })
    }
    
    handleChangeDate = date => {
        this.setState({
            produce_date: date
        });
    };

    handleChangeImage = (e) => {
        this.setState({
            [e.currentTarget.name] : URL.createObjectURL(e.target.files[0])
        })
    }

    render() {
        return (
            <div>
                <div class="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 p-0 w-2/5 mx-auto">
                        <div class="inputs w-full max-w-2xl p-6 mx-auto">
                            <h2 class="text-2xl text-gray-900">Create Product</h2>
                            <form class="mt-6 border-t border-gray-400 pt-4" onSubmit={this.handleSubmit}>
                                <div class='flex flex-wrap -mx-3 mb-6'>
                                    <div class="personal w-full">
                                        <div class="flex items-center justify-between mt-4">
                                            <div class='w-full md:w-1/2 px-3 mb-6'>
                                                <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Barcode</label>
                                                <input id="barcode" onChange={(e) => this.handleInputChanges(e)} name="barcode" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' placeholder="Barcode" required/>
                                            </div>
                                            <div class='w-full md:w-1/2 px-3 mb-6'>
                                                <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Product name</label>
                                                <input id="product_name" onChange={(e) => this.handleInputChanges(e)} name="product_name" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' placeholder="Product name"  required/>
                                            </div>
                                        </div>
                                        <div class='w-full md:w-full px-3 mb-6'>
                                            <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Image</label>
                                            <input id="image" onChange={(e) => this.handleChangeImage(e)} name="image" class='appearance-none block w-full bg-white text-gray-600' type='file'  required/>
                                        </div>
                                        <div class='w-full md:w-full px-3 mb-6'>
                                            <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Description</label>
                                            <textarea id="description" onChange={(e) => this.handleInputChanges(e)} name="description" class='bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-500 focus:outline-none focus:bg-white' placeholder="Enter product description" required></textarea>
                                        </div>  
                                        <div class='w-full md:w-full px-3 mb-6'>
                                            <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-text-1'>Sell Price</label>
                                            <input id="sell_price" onChange={(e) => this.handleInputChanges(e)} name="sell_price" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' type='text' placeholder='Enter product sell price'  required/>
                                        </div>
                                        <div className="w-full md:w-full px-3 mb-6">
                                        <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Produce date</label>
                                            <DatePicker
                                                selected={this.state.produce_date}
                                                onChange={this.handleChangeDate}
                                            />                      
                                        </div>                      
                                        <div class='w-full md:w-full px-3 mb-6'>
                                            <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Status</label>
                                            <div class="flex-shrink w-full inline-block relative">
                                                <select id="status" name="status" onChange={(e) => this.handleInputChanges(e)} class="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded">
                                                    <option>Active</option>
                                                    <option>Inactive</option>
                                                </select>
                                                <div class="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex justify-end" style={{transform: "translateX(-15px)"}}>
                                            <button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-indigo-500 py-2 px-4 border border-blue hover:border-transparent rounded" type="submit">Create Product</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}

addProduct.propTypes = {
    barcode: PropTypes.string,
    product_name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    sell_price: PropTypes.number,
    produce_date: PropTypes.instanceOf(Date),
    status: PropTypes.string
};

export default withRouter(addProduct)
