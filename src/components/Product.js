import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const calculateDate = (date) => {
        let dateArray = date.toString().split('-').join(',').split('T').join(',').split(',');
        let newDate;
        let newMonth = parseInt(dateArray[1]);
        let newYear = parseInt(dateArray[0])
        let newDay = parseInt(dateArray[2],10) + 1;
        if (newDay > 31) {
            newMonth += 1;
            newDay = 1;
            if (newMonth > 12) {
                newYear += 1;
                newMonth = 1;
                newDate = newMonth.toString + "-" + newDay.toString() + "-" + newYear.toString();
            }
            newDate = newMonth.toString + "-" + newDay.toString() + "-" + newYear.toString();
        }
        newDate = newMonth.toString() +  "-" + newDay.toString() + "-" + newYear.toString();    
        return newDate;
    }

    return (
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
                    {props.products && props.products.map(product => 
                        <tr key={product.id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    
                                {product.barcode}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                                {product.product_name}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                <img src={product.image} alt="Product img"/>
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                {product.description}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {product.sell_price}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                             
                                {calculateDate(product.produce_date)}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                                {product.status === "Active"?
                                    <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">{product.status}</span> 
                                    :
                                    <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">{product.status}</span>
                                }
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                <Link to={`edit/${product.id}`} className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-green-500 py-2 px-4 border border-blue hover:border-transparent rounded" style={{textDecoration: "none"}}>Edit product </Link>
                                <button className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-red-600 py-2 px-4 border border-blue hover:border-transparent rounded" onClick={() => this.deleteProduct(product.id)}>Delete product</button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
    )
}

export default Product;