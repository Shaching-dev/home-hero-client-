import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaTools, FaThumbsUp } from "react-icons/fa";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaBolt className="text-yellow-400 text-5xl" />,
      title: "Instant Booking",
      desc: "Book trusted professionals in just a few clicks — fast and hassle-free.",
    },
    {
      icon: <FaTools className="text-blue-400 text-5xl" />,
      title: "Skilled Professionals",
      desc: "All service providers are verified and experienced in their fields.",
    },
    {
      icon: <FaThumbsUp className="text-green-400 text-5xl" />,
      title: "Customer Satisfaction",
      desc: "We ensure top-rated services and transparent customer feedback.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-gray-800">
          Why Choose <span className="text-blue-500">HomeHero</span>?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex justify-center mb-4">{r.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{r.title}</h3>
              <p className="text-gray-600">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
