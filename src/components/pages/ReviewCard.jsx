import React from "react";
import { motion } from "framer-motion";

const ReviewCard = ({ review }) => {
  const stars = "★★★★★".substring(0, review.rating || 5);
  const emptyStars = "☆☆☆☆☆".substring(0, 5 - (review.rating || 5));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-500">{review.email}</p>
        </div>
        <div className="text-right">
          <span className="text-3xl text-yellow-500 font-bold">{stars}</span>
          <span className="text-3xl text-gray-300">{emptyStars}</span>
          <p className="text-sm text-gray-600 mt-1">{review.rating}/5</p>
        </div>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-4 rounded-xl">
        "{review.description}"
      </p>
      <p className="text-xs text-gray-400 mt-4 text-right">
        {review.createdAt
          ? new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Just now"}
      </p>
    </motion.div>
  );
};

export default ReviewCard;
