import React, { use, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import ReviewForm from "../pages/ReviewForm";

const AllServiceDetails = () => {
  const [loading, setLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);
  const service = useLoaderData();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const bookModalRef = useRef(null);
  const [services, setService] = useState([]);

  const {
    category,
    description,
    email,
    image_url,
    price,
    provider_name,
    service_name,
    _id: serviceId,
  } = service;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/services/booked/${serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      });
  }, [serviceId]);

  const handleBack = () => {
    setNavLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 600);
  };

  if (loading || navLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleBookModalOpen = () => {
    bookModalRef.current.showModal();
  };

  const handleBookSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const price = event.target.price.value;
    const details = event.target.details.value;
    const photo = event.target.photo.value;

    const newBooked = {
      service: serviceId,
      customer_name: name,
      customer_email: email,
      customer_price: price,
      customer_requirements: details,
      customer_photo: photo,
      status: "sucess",
      service_name: service_name,
      provider_name: provider_name,
      image_url: image_url,
    };

    fetch("http://localhost:3000/booked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooked),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bookModalRef.current.close();
          Swal.fire({
            title: "Service Booked Successfully",
            icon: "success",
            draggable: true,
          });
          event.target.reset();
          //   add the new booked state

          newBooked._id = data.insertedId;
          const newBookeds = [...services, newBooked].sort(
            (a, b) => b.customer_price - a.customer_price
          );
          setService(newBookeds);
        }
      });
  };

  return (
    <>
      <div>
        <h2 className="text-4xl text-center font-bold text-primary mt-10">
          Service Details
        </h2>
      </div>
      <div>
        <h2
          onClick={handleBack}
          className="text-left my-5 text-4xl font-semibold flex gap-3 items-center cursor-pointer">
          <span>
            <FaArrowLeft />
          </span>
          <p>Back to home</p>
        </h2>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4 flex justify-center items-center">
        <div className="max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">
          <div className="relative">
            <img
              src={image_url}
              alt={service_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end justify-start p-4">
              <span className="text-white text-sm bg-gray-800/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                {category}
              </span>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {service_name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Provided by{" "}
                <span className="font-medium text-gray-900">
                  {provider_name}
                </span>
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  ${price}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    /service
                  </span>
                </h3>
                <p className="text-sm text-gray-500">Contact: {email}</p>
                <p className="text-sm text-gray-500">
                  Service id: {serviceId}{" "}
                </p>
              </div>

              <button
                onClick={handleBookModalOpen}
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transform transition cursor-pointer">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <dialog
          ref={bookModalRef}
          className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">
              Fill Your Details to Book
            </h3>
            <div>
              <form onSubmit={handleBookSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.displayName}
                    readOnly
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    readOnly
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your photo
                  </label>
                  <input
                    type="text"
                    name="photo"
                    defaultValue={user?.photoURL}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+880182...."
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your starting price
                  </label>
                  <input
                    type="text"
                    name="price"
                    placeholder="price"
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Notes
                  </label>
                  <textarea
                    placeholder="Any specific requirements..."
                    name="details"
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
                  Confirm Booking
                </button>
              </form>
            </div>
            <div className="">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn w-full my-5 text-white font-semibold bg-red-500">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <div>
        <h3 className="text-5xl my-5 font-bold text-center">
          People who interested this service: <span>{services.length}</span>
        </h3>

        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Name & Photo</th>
                  <th>Email</th>
                  <th>Offered Price</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={service.customer_photo}
                              alt="Buyer-name"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {service.customer_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{service.customer_email}</td>
                    <td>{service.customer_price}</td>
                    <th>
                      <div className="badge badge-success">
                        {service.status}
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="my-10">
        <ReviewForm />
      </div>
    </>
  );
};

export default AllServiceDetails;
