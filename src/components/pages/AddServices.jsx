import React, { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";

const AddServices = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const categories = ["Electrician", "Plumber", "Cleaner", "Gardener", "Other"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const addServices = {
      service_Name: form.serviceName.value,
      service_category: form.category.value,
      service_price: form.price.value,
      provider_Name: form.providerName.value,
      provider_description: form.description.value,
      provider_image: form.imageUrl.value,
      provider_email: form.email.value,
      provider_phone: form.phone.value,
      service_image: form.serviceImg.value,
    };

    fetch("https://hero-home-server-three.vercel.app/addServices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addServices),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId) {
          form.reset();
          Swal.fire({
            title: "✅ Service Added Successfully!",
            icon: "success",
            confirmButtonColor: "#4f46e5",
          });
        }
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          title: "❌ Failed to add service",
          icon: "error",
        });
      });
  };

  const handleBack = () => {
    setRedirecting(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  if (redirecting) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
        <ClipLoader size={60} color="#4f46e5" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex justify-center items-center px-4 py-10">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-indigo-100">
        {/* Back button */}
        <div
          onClick={handleBack}
          className="text-indigo-600 flex items-center gap-2 cursor-pointer hover:text-indigo-800 transition mb-6">
          <MoveLeft size={24} />
          <span className="font-medium">Back to Home</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Add <span className="text-indigo-600">New Service</span>
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {/* Service Name */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter service name"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Category</label>
            <select
              name="category"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Provider Name */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Provider Name
            </label>
            <input
              type="text"
              name="providerName"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Write about the service..."
              rows={4}
              required
            />
          </div>

          {/* Provider Image */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Provider Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              defaultValue={user?.photoURL}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100"
              defaultValue={user?.email}
              readOnly
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Provider Contact
            </label>
            <input
              type="text"
              name="phone"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your contact number"
              required
            />
          </div>

          {/* Service Image */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">
              Service Image URL
            </label>
            <input
              type="text"
              name="serviceImg"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your service image URL"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition duration-300 ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}>
              {loading ? "Adding Service..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServices;
