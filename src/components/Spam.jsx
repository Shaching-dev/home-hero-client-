import { Mail, Phone } from "lucide-react";
import React, { use, useRef } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const ShowMyServices = ({ service, services, setServices }) => {
  const { user } = use(AuthContext);
  const editServiceModal = useRef(null);

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
        fetch(`https://hero-home-server-three.vercel.app/addServices/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your service has been deleted.",
                icon: "success",
              });

              const remainingServices = services.filter(
                (ser) => ser._id !== _id
              );
              setServices(remainingServices);
            }
          });
      }
    });
  };

  const handleEditModal = () => {
    editServiceModal.current.showModal();
  };

  const handleEditService = (event) => {
    event.preventDefault();

    const updatedService = {
      service_Name: event.target.service_name.value,
      service_price: event.target.service_price.value,
      provider_description: event.target.description.value,
      service_category: event.target.select.value,
      service_image: event.target.my_image.value,
      provider_image: event.target.provider_image.value,
      provider_Name: event.target.name.value,
      provider_email: event.target.provider_email.value,
      provider_phone: event.target.phone.value,
    };

    fetch(
      `https://hero-home-server-three.vercel.app/addServices/${service._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      }
    )
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex justify-center items-center py-10 px-4">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="relative">
              <img
                src={service.service_image}
                alt={service.service_Name}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
                {service.service_category}
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                  {service.service_Name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Professional service by{" "}
                  <span className="font-medium text-gray-900">
                    {service.provider_Name}
                  </span>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {service.provider_description?.trim() ||
                    "No description available for this service."}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600">
                    ${service.service_price}
                  </h3>
                  <p className="text-sm text-gray-500">per service</p>
                </div>
                <button
                  onClick={handleEditModal}
                  className="bg-indigo-500 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-600 transition">
                  Edit Service
                </button>

                {/* MODAL */}
                <dialog
                  ref={editServiceModal}
                  className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box bg-gradient-to-br from-gray-50 to-white shadow-xl rounded-2xl">
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
                      Edit Your Service
                    </h2>

                    <form onSubmit={handleEditService} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Name
                        </label>
                        <input
                          type="text"
                          name="service_name"
                          defaultValue={service.service_Name}
                          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          name="select"
                          defaultValue={service.service_category}
                          className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500">
                          <option>Electrician</option>
                          <option>Plumber</option>
                          <option>Cleaner</option>
                          <option>Gardener</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          name="service_price"
                          type="number"
                          defaultValue={service.service_price}
                          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          defaultValue={service.provider_description}
                          rows="3"
                          className="textarea textarea-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL
                        </label>
                        <input
                          name="my_image"
                          type="url"
                          defaultValue={service.service_image}
                          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Provider Image
                        </label>
                        <input
                          name="provider_image"
                          type="url"
                          defaultValue={user?.photoURL}
                          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Provider Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          defaultValue={service.provider_Name}
                          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Provider Phone Number
                        </label>
                        <input
                          name="phone"
                          type="text"
                          defaultValue={service.provider_phone}
                          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          name="provider_email"
                          type="email"
                          defaultValue={user?.email}
                          className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <button className="btn bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg">
                        Save Changes
                      </button>
                    </form>

                    <div className="flex justify-end gap-3 pt-4">
                      <form method="dialog">
                        <button className="btn btn-ghost border border-gray-300 rounded-lg">
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>

                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="btn outline text-red-500 outline-red-600">
                  Delete Service
                </button>
              </div>
            </div>
          </div>

          <div className="border-t p-5 flex flex-col sm:flex-row items-center gap-4 bg-gray-50">
            <img
              src={service.provider_image}
              alt={service.provider_Name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800">
                {service.provider_Name}
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-gray-600 mt-1">
                <p className="flex items-center gap-2">
                  <Mail size={16} /> {service.provider_email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} /> {service.provider_phone}
                </p>
              </div>
            </div>
            <button className="hidden sm:block text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMyServices;
