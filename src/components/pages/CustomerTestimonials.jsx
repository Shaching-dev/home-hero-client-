import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sadia Rahman",
    text: "HomeHero helped me find a reliable electrician within minutes! The service was professional and affordable.",
    image:
      "https://i.ibb.co.com/hJQ6P2V4/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair-285396-896.jpg",
  },
  {
    name: "Rafiul Karim",
    text: "Booking a plumber has never been easier. Loved the quick response and quality work!",
    image: "https://i.ibb.co.com/ksyN3VCY/photo-1507003211169-0a1dd7228f2d.jpg",
  },
  {
    name: "Jannat Ara",
    text: "Very convenient and transparent service. I’ll definitely use HomeHero again for cleaning services!",
    image: "https://i.ibb.co.com/Df53y1PF/photo-1602442787305-decbd65be507.jpg",
  },
];

const CustomerTestimonials = () => {
  return (
    <section className="py-16 bg-blue-100 rounded-md">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-10 text-gray-800">
          What Our Customers Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-3">"{t.text}"</p>
              <h4 className="text-lg font-semibold text-gray-800">
                — {t.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
