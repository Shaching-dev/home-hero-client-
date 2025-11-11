import React, { use } from "react";
import ServicesPage from "./ServicesPage";

const AllServices = ({ allServicesPromise }) => {
  const allServices = use(allServicesPromise);
  console.log(allServices);

  return (
    <div>
      <h3 className="text-4xl text-center text-secondary font-bold my-10">
        All Services
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allServices.map((service) => (
          <ServicesPage key={service._id} service={service}></ServicesPage>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
