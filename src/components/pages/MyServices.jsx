import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ShowMyServices from "./ShowMyServices";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://hero-home-server-three.vercel.app/addServices?email=${user.email}`
      );
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-secondary">
          My Services
        </h1>

        {loading ? (
          <p className="text-center">Loading your services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven't added any services yet.
          </p>
        ) : (
          <div className="flex flex-col md:flex-row gap-10">
            {services.map((service) => (
              <ShowMyServices
                key={service._id}
                service={service}
                services={services}
                setServices={setServices}
                refreshServices={fetchServices}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyServices;
