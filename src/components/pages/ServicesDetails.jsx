import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Oval } from "react-loader-spinner";
import { SkewLoader } from "react-spinners";

const ServicesDetails = ({ service }) => {
  const { category, image_url, price, provider_name, _id } = service;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    setLoading(true);

    // Simulate loading delay (you can remove this if you have real fetch logic)
    setTimeout(() => {
      navigate(`/allServiceDetails/${_id}`);
      setLoading(false);
    }, 1000);
  };

  // ✅ Full-screen loader
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <SkewLoader
          height={80}
          width={80}
          color="#2563eb"
          secondaryColor="#93c5fd"
          strokeWidth={5}
          strokeWidthSecondary={4}
          visible={true}
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="sm:max-w-sm lg:w-[400px] mx-auto bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
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

        <button
          onClick={handleViewDetails}
          className="w-full mt-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ServicesDetails;
