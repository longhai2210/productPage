import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

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
        this.handleChangeDate = this.handleChangeDate.bind(this);

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
        }
        this.setState({values: [...this.state.values, formData]})
        axios.post(`http://localhost:5000/customers`, formData).then(data => [
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1500)
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
                <div className={"col-md-12 form-wrapper mt-3 border"}>
                    <h2 className={"mt-1"}> Create Product </h2>
                    <form id="create-post-form" onSubmit={this.handleSubmit} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="barcode" style={{marginRight: "20px"}}>Barcode</label>
                            <input type="file" id="barcode" onChange={(e) => this.handleChangeImage(e)} name="barcode" alt="Product barcode"></input>
                            {this.state.barcode?
                                <img src={this.state.barcode} alt="barcode"/>
                                : null
                            }
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="product_name">Product name</label>
                            <input type="text" id="product_name" onChange={(e) => this.handleInputChanges(e)} name="product_name" className="form-control" placeholder="Enter product's name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="image" style={{marginRight: "20px"}}> Image </label>
                            <input type="file" id="image" onChange={(e) => this.handleChangeImage(e)} name="image" alt="Product image"></input>
                            {this.state.image ?
                                <img src={this.state.image} alt="product"/>
                                : null
                            }
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter product's description" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="sell_price"> Sell price </label>
                            <input type="text" id="sell_price" onChange={(e) => this.handleInputChanges(e)} name="sell_price" className="form-control" placeholder="Enter product's sell price" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="produce_date" style={{marginRight: "20px"}}> Produce date </label>
                            <DatePicker
                                selected={this.state.produce_date}
                                onChange={this.handleChangeDate}
                            />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Customer
                            </button>         
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(addProduct)
