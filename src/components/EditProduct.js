import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
class EditProduct extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.state = {
      id,
      product: {},
      values: [],
      urlApi: `http://localhost:5000/products/${id}`,
    };
    this.submitEditForm = this.submitEditForm.bind(this);
    this.setValues = this.setValues.bind(this);
    this.handleInputChanges = this.handleInputChanges.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.state.urlApi)
      .then((data) => {
        this.setState({ product: data.data });
      })
      .catch((res) => {});
  }

  submitEditForm = async (e) => {
    e.preventDefault();
    await axios.patch(this.state.urlApi, this.state.values).then((data) => {
      setTimeout(() => {
        this.props.history.push("/");
      }, 1000);
    });
  };

  setValues = (values) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };

  handleInputChanges(e) {
    e.preventDefault();
    this.setValues({ [e.currentTarget.id]: e.currentTarget.value });
  }

  handleChangeDate = (date) => {
    this.setValues({
      produce_date: date,
    });
  };

  handleChangeImage = (e) => {
    this.setState({
      product: {
        ...this.state.product,
        image: URL.createObjectURL(e.target.files[0]),
      },
    });
    this.setValues({
      [e.currentTarget.name]: URL.createObjectURL(e.target.files[0]),
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.product && (
          <div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 p-0 w-2/5 mx-auto">
            <div className="inputs w-full max-w-2xl p-6 mx-auto">
              <h2 className="text-2xl text-gray-900">Edit Product</h2>
              <form
                className="mt-6 border-t border-gray-400 pt-4"
                onSubmit={this.submitEditForm}
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="personal w-full">
                    <div className="flex items-center justify-between mt-4">
                      <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Barcode
                        </label>
                        <input
                          id="barcode"
                          defaultValue={this.state.product.barcode}
                          onChange={(e) => this.handleInputChanges(e)}
                          name="barcode"
                          className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          type="text"
                          placeholder="Barcode"
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Product name
                        </label>
                        <input
                          id="product_name"
                          defaultValue={this.state.product.product_name}
                          onChange={(e) => this.handleInputChanges(e)}
                          name="product_name"
                          className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          type="text"
                          placeholder="Product name"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Image
                      </label>
                      <input
                        id="image"
                        onChange={(e) => this.handleChangeImage(e)}
                        name="image"
                        className="appearance-none block w-full bg-white text-gray-600"
                        type="file"
                      />
                    </div>
                    {this.state.product.image ? (
                      <img src={this.state.product.image} alt="product" />
                    ) : null}
                    <div className="w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Description
                      </label>
                      <textarea
                        id="description"
                        defaultValue={this.state.product.description}
                        onChange={(e) => this.handleInputChanges(e)}
                        name="description"
                        className="bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-500 focus:outline-none focus:bg-white"
                        placeholder="Enter product description"
                      ></textarea>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-text-1"
                      >
                        Sell Price
                      </label>
                      <input
                        id="sell_price"
                        defaultValue={this.state.product.sell_price}
                        onChange={(e) => this.handleInputChanges(e)}
                        name="sell_price"
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        id="grid-text-1"
                        type="text"
                        placeholder="Enter product sell price"
                      />
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Produce date
                      </label>
                      <DatePicker
                        selected={this.state.values.produce_date}
                        onChange={this.handleChangeDate}
                      />
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Status
                      </label>
                      <div className="flex-shrink w-full inline-block relative">
                        <select
                          id="status"
                          name="status"
                          onChange={(e) => this.handleInputChanges(e)}
                          className="block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                        >
                          <option selected={this.state.product.status}>
                            {this.state.product.status}
                          </option>
                          {this.state.product.status === "Active" ? (
                            <option value="Inactive">Inactive</option>
                          ) : (
                            <option value="Active">Active</option>
                          )}
                        </select>
                        <div className="pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex justify-end"
                      style={{ transform: "translateX(-15px)" }}
                    >
                      <button
                        className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-indigo-500 py-2 px-4 border border-blue hover:border-transparent rounded"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(EditProduct);
