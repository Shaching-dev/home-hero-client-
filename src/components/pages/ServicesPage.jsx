import React from "react";
import { Link } from "react-router";

const ServicesPage = ({ service }) => {
  const { category, image_url, price, provider_name, _id } = service;
  return (
    <div>
      <div className="w-[400px]  mx-auto bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative">
          <img
            src={image_url}
            alt={category}
            className="w-full h-56 object-cover"
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Provider: <span className="text-blue-600">{provider_name}</span>
          </h2>

          <p className="text-gray-600 text-sm">
            Starting at{" "}
            <span className="text-blue-600 font-bold text-base">${price}</span>
          </p>

          <Link to={`/allServiceDetails/${_id}`}>
            <button className="w-full mt-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
