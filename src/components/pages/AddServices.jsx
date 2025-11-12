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

  const categories = ["Electrician", "Plumber", "Cleaner", "Gardener"];

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

    fetch("http://localhost:3000/addServices", {
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
            title: "Service Added Successfully!",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          title: "Failed to add service",
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
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#3b82f6" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div
        onClick={handleBack}
        className="text-2xl font-bold mb-6 text-primary flex items-center cursor-pointer">
        <span className="text-3xl font-bold">
          <MoveLeft />
        </span>
        <h3>Back to home</h3>
      </div>

      <div>
        <h3 className="text-4xl text-center mb-5 font-semibold">
          Add <span className="text-secondary">Services</span>
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {/* Service Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Service Name</label>
          <input
            type="text"
            name="serviceName"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter service name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Category</label>
          <select
            name="category"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Price</label>
          <input
            type="number"
            name="price"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Provider Name</label>
          <input
            type="text"
            name="providerName"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue={user?.displayName}
            readOnly
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium">Description</label>
          <textarea
            name="description"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter description"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Provider Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue={user?.photoURL}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue={user?.email}
            readOnly
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Provider Contact Number</label>
          <input
            type="text"
            name="phone"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your contact number"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Service Image</label>
          <input
            type="text"
            name="serviceImg"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your service image URL"
            required
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}>
            {loading ? "Adding Service..." : "Add Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
