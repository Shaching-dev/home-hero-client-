import React, { Suspense } from "react";
import HeroSection from "../HeroSection/HeroSection";
import OurServices from "../pages/OurServices";
import WhyChooseUs from "../pages/WhyChooseUs";
import CustomerTestimonials from "../pages/CustomerTestimonials";
import { ThreeDots } from "react-loader-spinner";

const servicesPromise = fetch("http://localhost:3000/our-services").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div>
      {" "}
      <HeroSection />{" "}
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        }>
        {" "}
        <OurServices servicesPromise={servicesPromise} />{" "}
      </Suspense>{" "}
      <WhyChooseUs /> <CustomerTestimonials />{" "}
    </div>
  );
};

export default Home;
