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
          setBooked(data);
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
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remaingServices = bookeds.filter(
                (booked) => booked._id !== _id
              );
              remaingServices.sort(
                (a, b) => a.customer_price - b.customer_price
              );
              setBooked(remaingServices);
            }
          });
      }
    });
  };

  return (
    <div>
      <div>
        <h3>My Bookings {bookeds.length} </h3>
      </div>

      <div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Service Name</th>
                  <th>Provider Name</th>
                  <th>My offered price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookeds.map((book, index) => (
                  <tr key={book._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={book.image_url} alt="service-name" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{book.service_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{book.provider_name}</td>
                    <td>{book.customer_price}</td>
                    <th>
                      <button
                        onClick={() => handleDeleteService(book._id)}
                        className="btn outline outline-red-500 text-red-500">
                        Remove Service
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
