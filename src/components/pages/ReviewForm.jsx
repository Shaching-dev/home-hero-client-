import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ReviewForm = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    if (!serviceId) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/reviews/${serviceId}`);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const newReview = {
      name: form.name.value,
      email: form.email.value,
      description: form.description.value,
      rating: parseInt(form.rating.value) || 5,
      serviceId: String(serviceId),
    };

    try {
      const res = await fetch("http://localhost:3000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const savedReview = await res.json();

      console.log("Saved review from backend:", savedReview);

      if (!savedReview._id) {
        savedReview._id = `temp-${Date.now()}`;
      }
      if (!savedReview.createdAt) {
        savedReview.createdAt = new Date().toISOString();
      }

      setReviews((prevReviews) => [savedReview, ...prevReviews]);

      form.reset();

      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your review has been submitted.",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        fetchReviews();
      }, 1500);
    } catch (err) {
      console.error("Submit error:", err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to submit review. Please check console for details.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Leave a Review
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              placeholder="Your Name"
              required
              className="px-5 py-3 border-2 rounded-xl focus:border-blue-500 outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="px-5 py-3 border-2 rounded-xl focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-4 items-center">
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              defaultValue="5"
              required
              className="w-32 px-5 py-3 border-2 rounded-xl focus:border-blue-500 outline-none"
            />
            <span className="text-gray-600">Rate 1-5 stars</span>
          </div>
          <textarea
            name="description"
            rows="5"
            placeholder="Write your experience..."
            required
            className="w-full px-5 py-3 border-2 rounded-xl focus:border-blue-500 outline-none resize-none"></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all">
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800">
            Customer Reviews ({reviews.length})
          </h3>
          <button
            onClick={fetchReviews}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg">
            Refresh Reviews
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-xl text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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

export default ReviewForm;
