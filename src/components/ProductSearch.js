import React, { useState } from "react";

const ProductSearch = (props) => {
  const { onValueChange, onFilter } = props;
  const [keySearch, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    onValueChange(e.target.value);
  };

  const handleFilter = () => {
    onFilter(keySearch);
  };

  return (
    <span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex mx-auto">
      <input
        type="search"
        name="search"
        placeholder="Search"
        className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
        onChange={(e) => handleInputChange(e)}
      />
      <i
        className="fas fa-search m-2 mr-3 text-lg text-gray-700 w-2 h-2"
        style={{ transform: "translate(5px,2px)" }}
        onClick={() => handleFilter()}
      ></i>
      <div
        className="group inline-block"
        style={{ transform: "translate(20px,10px)" }}
      >
        <span>
          <svg
            className="fill-current h-4 w-4 transform group-hover:-rotate-90
                        transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
        <ul
          className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                    transition duration-150 ease-in-out origin-top min-w-32"
        >
          <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Barcode</li>
          <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
            Product name
          </li>
          <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
            Description
          </li>
          <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
            <button className="w-full text-left flex items-center outline-none focus:outline-none">
              <span className="pr-1 flex-1 status">Status</span>
              <span className="mr-auto">
                <svg
                  className="fill-current h-4 w-4"
                  style={{ transform: "rotate(-90deg)" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            </button>
            <ul
              className="bg-white border rounded-sm absolute top-0 right-0 
                            transition duration-150 ease-in-out origin-top-left
                            min-w-32"
            >
              <li className="px-3 py-1 hover:bg-gray-100">Active</li>
              <li className="px-3 py-1 hover:bg-gray-100">Inactive</li>
            </ul>
          </li>
        </ul>
      </div>
    </span>
  );
};

export default ProductSearch;
