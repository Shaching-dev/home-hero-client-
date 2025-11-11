import React, { Suspense } from "react";
import AllServices from "./AllServices";
import { ClipLoader } from "react-spinners";

const LoadingFallback = () => {
  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-50">
      <ClipLoader color="#2563eb" size={60} />
      <p className="ml-4 text-gray-600 text-lg font-medium">
        Loading all services...
      </p>
    </div>
  );
};

const withDelay = (promise, ms) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(await promise);
    }, ms);
  });
};

const Services = () => {
  const allServicesPromise = withDelay(
    fetch("http://localhost:3000/services").then((res) => res.json()),
    1500
  );

  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingFallback />}>
        <AllServices allServicesPromise={allServicesPromise} />
      </Suspense>
    </div>
  );
};

export default Services;
