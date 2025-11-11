import React, { use } from "react";
import ServicesDetails from "./ServicesDetails";

const OurServices = ({ servicesPromise }) => {
  const services = use(servicesPromise);
  //   console.log(services);

  return (
    <div>
      <h3 className="text-5xl text-center font-bold my-10">
        Our <span className="text-secondary">Services</span>{" "}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {services.map((service) => (
          <ServicesDetails
            key={service._id}
            service={service}></ServicesDetails>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
