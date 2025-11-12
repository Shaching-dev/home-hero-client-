import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookeds, setBooked] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/booked?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          const sortedData = [...data].sort(
            (a, b) => b.customer_price - a.customer_price
          );
          setBooked(sortedData);
        });
    }
  }, [user]);

  const handleDeleteService = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/booked/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your booking has been removed.",
                icon: "success",
              });

              const remaingServices = bookeds.filter(
                (booked) => booked._id !== _id
              );
              remaingServices.sort(
                (a, b) => b.customer_price - a.customer_price
              );
              setBooked(remaingServices);
            }
          });
      }
    });
  };

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h3 className="text-4xl font-bold text-gray-800 mb-2">
          My <span className="text-blue-600">Bookings</span>
        </h3>
        <p className="text-gray-500">
          Total Bookings:{" "}
          <span className="font-semibold text-blue-500">{bookeds.length}</span>
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="bg-blue-100 text-gray-800 text-sm">
              <th className="py-3 px-4 text-left">SL No.</th>
              <th className="py-3 px-4 text-left">Service Name</th>
              <th className="py-3 px-4 text-left">Provider</th>
              <th className="py-3 px-4 text-left">My Offered Price</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookeds.length > 0 ? (
              bookeds.map((book, index) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="py-4 px-4 font-medium text-gray-600">
                    {index + 1}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200">
                        <img
                          src={book.image_url}
                          alt={book.service_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-lg">
                          {book.service_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {book.category || "General"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-gray-700">
                    {book.provider_name}
                  </td>

                  <td className="py-4 px-4 text-gray-800 font-semibold">
                    ${book.customer_price}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleDeleteService(book._id)}
                      className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200">
                      Remove Booking
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
