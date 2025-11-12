import React, { useContext, useRef } from "react";
import { Mail, Phone } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowMyServices = ({
  service,
  services,
  setServices,
  refreshServices,
}) => {
  const { user } = useContext(AuthContext);
  const editServiceModal = useRef(null);

  const handleDeleteService = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/addServices/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Service removed successfully.", "success");
              const remaining = services.filter((ser) => ser._id !== _id);
              setServices(remaining);
            }
          });
      }
    });
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

    fetch(`http://localhost:3000/addServices/${service._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedService),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success!", "Service updated successfully.", "success");
          editServiceModal.current.close();

          const updatedServices = services.map((s) =>
            s._id === service._id ? { ...s, ...updatedService } : s
          );
          setServices(updatedServices);
          refreshServices();
        } else {
          Swal.fire("Error", "Failed to update service.", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong.", "error");
      });
  };

  const handleBookClick = () => {
    if (user?.email === service.provider_email) {
      toast.error("❌ You can't book your own service!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    toast.success("✅ Booking process started!", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  };

  const openModal = () => editServiceModal.current.showModal();

  return (
    <>
      <div className="bg-white  shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all w-full max-w-2xl mx-auto mb-8">
        <div className="flex flex-col">
          <div className="relative">
            <img
              src={service.service_image}
              alt={service.service_Name}
              className="w-full h-64 object-cover"
            />
            <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
              {service.service_category}
            </span>
          </div>

          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {service.service_Name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                by {service.provider_Name}
              </p>
              <p className="text-gray-700 mt-4 line-clamp-3">
                {service.provider_description || "No description."}
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-2xl font-bold text-indigo-600">
                  ${service.service_price}
                </p>
                <p className="text-sm text-gray-500">per service</p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={openModal}
                  className="flex-1 sm:flex-initial bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="flex-1 sm:flex-initial bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
                  Delete
                </button>
                <button
                  onClick={handleBookClick}
                  className="flex-1 sm:flex-initial bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg hover:bg-purple-800 transition">
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-5 border-t flex items-center gap-4">
          <img
            src={service.provider_image || user?.photoURL}
            alt="provider"
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
          />
          <div className="flex-1">
            <p className="font-semibold">{service.provider_Name}</p>
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-600 mt-1">
              <span className="flex items-center gap-1">
                <Mail size={14} /> {service.provider_email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} /> {service.provider_phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      <dialog ref={editServiceModal} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="text-2xl font-bold mb-6">Edit Service</h3>
          <form onSubmit={handleEditService} className="space-y-4">
            <input
              name="service_name"
              defaultValue={service.service_Name}
              className="input input-bordered w-full"
              placeholder="Service Name"
              required
            />
            <select
              name="select"
              defaultValue={service.service_category}
              className="select select-bordered w-full">
              <option>Electrician</option>
              <option>Plumber</option>
              <option>Cleaner</option>
              <option>Gardener</option>
              <option>Other</option>
            </select>
            <input
              name="service_price"
              type="number"
              defaultValue={service.service_price}
              className="input input-bordered w-full"
              required
            />
            <textarea
              name="description"
              defaultValue={service.provider_description}
              className="textarea textarea-bordered w-full"
              rows="3"></textarea>
            <input
              name="my_image"
              type="url"
              defaultValue={service.service_image}
              className="input input-bordered w-full"
              required
            />
            <input
              name="provider_image"
              type="url"
              defaultValue={user?.photoURL}
              className="input input-bordered w-full"
            />
            <input
              name="name"
              type="text"
              defaultValue={service.provider_Name}
              className="input input-bordered w-full"
              required
            />
            <input
              name="phone"
              type="text"
              defaultValue={service.provider_phone}
              className="input input-bordered w-full"
            />
            <input
              name="provider_email"
              type="email"
              defaultValue={user?.email}
              className="input input-bordered w-full"
              readOnly
            />

            <div className="flex justify-end gap-3 mt-6">
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => editServiceModal.current.close()}
                className="btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <ToastContainer />
    </>
  );
};

export default ShowMyServices;
