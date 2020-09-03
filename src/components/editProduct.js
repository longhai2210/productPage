import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

class editProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            product: {},
            values: [],
        }
        this.submitEditForm = this.submitEditForm.bind(this);
        this.setValues = this.setValues.bind(this);
        this.handleInputChanges = this.handleInputChanges.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/products/${this.state.id}`).then(data => {
            this.setState({ product: data.data });
        })
    }

    submitEditForm = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/products/${this.state.id}`, this.state.values).then(data => {
            setTimeout(() => {
                this.props.history.push('/');
            }, 1000)
        })
    }

    setValues = (values) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    handleInputChanges(e) {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
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
            <React.Fragment>
                {this.state.product &&
                    <div>
                        <div>
                            <div className="col-md-12 form-wrapper mt-3 border">
                                <h2> Edit Product </h2>
                                <form id="create-post-form" onSubmit={this.submitEditForm} noValidate={true}>
                                    <div className="input-group col-md-12">
                                        <label htmlFor="barcode" style={{marginRight: "20px"}}>Barcode</label>
                                        <div className="custom-file" style={{transform: "translateY(-6px)"}}>
                                            <input type="file" className="custom-file-input" id="barcode" onChange={(e) => this.handleChangeImage(e)} name="barcode" alt="Product barcode" />
                                            <label className="custom-file-label" htmlFor="barcode">Choose file</label>
                                        </div>
                                    </div>
                                    {this.state.product.barcode?
                                        <img src={this.state.product.barcode} alt="barcode"/>
                                        : null
                                    }
                                    <div className="form-group col-md-12">
                                        <label htmlFor="product_name"> Product Name </label>
                                        <input type="text" id="product_name" defaultValue={this.state.product.product_name} onChange={(e) => this.handleInputChanges(e)} name="product_name" className="form-control" placeholder="Product name" />
                                    </div>
                                    <div className="input-group col-md-12">
                                        <label htmlFor="image" style={{marginRight: "20px"}}>Image</label>
                                        <div className="custom-file" style={{transform: "translateY(-6px)"}}>
                                            <input type="file" className="custom-file-input" id="image" onChange={(e) => this.handleChangeImage(e)} name="image" alt="Product image" />
                                            <label className="custom-file-label" htmlFor="image">Choose file</label>
                                        </div>
                                    </div>
                                    {this.state.product.image?
                                        <img src={this.state.product.image} alt="product"/>
                                        : null
                                    }
                                    <div className="form-group col-md-12">
                                        <label htmlFor="description">Description</label>
                                        <input type="text" id="description" defaultValue={this.state.product.description} onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Product description" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="sell_price">Sell price</label>
                                        <input type="text" id="sell_price" defaultValue={this.state.product.sell_price} onChange={(e) => this.handleInputChanges(e)} name="sell_price" className="form-control" placeholder="Product sell price" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="produce_date" style={{marginRight: "20px"}}> Produce date </label>
                                        <DatePicker
                                            defaultValue = {this.state.product.produce_date}
                                            selected={this.state.produce_date}
                                            onChange={this.handleChangeDate}
                                        />
                                    </div>
                                    <div className="input-group mb-3 col-md-12">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="status">Status</label>
                                        </div>
                                        <select className="custom-select" id="status" name="status" onChange={(e) => this.handleInputChanges(e)}>
                                            <option selected={this.state.product.status}>{this.state.product.status}</option>
                                            {this.state.product.status === "Active" ?
                                                <option value="Inactive">Inactive</option> 
                                                : 
                                                <option value="Active">Active</option>
                                            }                           
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Product 
                                        </button>                                     
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(editProduct)