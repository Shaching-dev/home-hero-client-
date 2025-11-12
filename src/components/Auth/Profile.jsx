import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been successfully updated.",
        confirmButtonColor: "#2563eb",
      });

      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message,
      });
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500 animate-pulse">
          Loading user profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center transform transition-all hover:scale-[1.01] hover:shadow-blue-200">
        <h3 className="text-4xl font-bold text-blue-600 mb-8">My Profile</h3>

        <img
          src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-400 shadow-md object-cover"
        />

        <div className="mt-6 space-y-2">
          <h3 className="text-2xl font-semibold text-gray-800">
            {user.displayName || "No Name"}
          </h3>
          <h4 className="text-gray-500">{user.email}</h4>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
          Update Profile
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-lg relative">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">
              Edit Profile
            </h3>

            <form onSubmit={handleUpdate}>
              <label className="block text-left mb-2 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
                required
              />

              <label className="block text-left mb-2 font-medium">
                Photo URL
              </label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
                required
              />

              {photo && (
                <img
                  src={photo}
                  alt="Preview"
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border"
                />
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
