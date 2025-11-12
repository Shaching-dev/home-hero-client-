import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: "Find Trusted Electricians Near You",
    desc: "Connect instantly with certified electricians who can handle all your electrical needs efficiently and safely.",
    img: "https://i.ibb.co.com/35NvpVpN/emmanuel-ikwuegbu-0-kl1-Bjv-Fc-unsplash.jpg",
  },
  {
    id: 2,
    title: "Professional Cleaning Services",
    desc: "Get your home sparkling clean with reliable and affordable cleaning experts available in your area.",
    img: "https://i.ibb.co.com/9FVQ1Cf/premium-photo-1683141112334-d7d404f6e716.jpg",
  },
  {
    id: 3,
    title: "Plumbing Solutions Made Simple",
    desc: "Whether it’s a leaking tap or a full installation, find experienced plumbers at your fingertips.",
    img: "https://i.ibb.co.com/0TNx37N/plumbing-professional-doing-his-job.jpg",
  },
  {
    id: 4,
    title: "Home Repairs & Maintenance",
    desc: "Hire skilled professionals for painting, carpentry, and general repairs with just a few clicks.",
    img: "https://i.ibb.co.com/tPBj6SZx/raze-solar-Scaj0-T40n-FI-unsplash.jpg",
  },
  {
    id: 5,
    title: "Book Reliable Local Services Anytime",
    desc: "HomeHero helps you find and book trustworthy service providers around you quickly and conveniently.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
];

const HeroSection = () => {
  return (
    <section className="w-full h-[70vh] relative my-10 rounded-md">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-full"
        onSwiper={(swiper) => {
          swiper.el.addEventListener("mouseenter", () =>
            swiper.autoplay.stop()
          );

          swiper.el.addEventListener("mouseleave", () =>
            swiper.autoplay.start()
          );
        }}>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}>
              <div className="absolute inset-0 bg-black/50"></div>

              <div className="relative z-10 text-center max-w-3xl text-white px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6">{slide.desc}</p>
                <Link className="cursor-pointer" to={"/services"}>
                  <button className="px-6 py-3 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-full text-white font-semibold transition">
                    Explore More
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
