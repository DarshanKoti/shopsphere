import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SiComma } from "react-icons/si";
import { GoStarFill } from "react-icons/go";

function Testimonial() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments?limit=3")
      .then((res) => res.json())
      .then((data) => setReviews(data.comments));
  }, []);

  return (
    <div className="mx-5 mb-8">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">What Our Customers Say</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="relative bg-[#EFF8F3] rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-3xl text-emerald-200">
              <SiComma />
            </div>

            {/* User */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${review.user.username}`}
                alt={review.user.username}
                className="w-14 h-14 rounded-full bg-white"
              />

              <div>
                <h3 className="font-semibold text-gray-900">
                  {review.user.username}
                </h3>

                <p className="text-xs text-emerald-600 font-semibold">
                  Verified Buyer
                </p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex text-yellow-400 gap-1 mb-3">
              {[...Array(5)].map((_, index) => (
                <GoStarFill key={index} />
              ))}
            </div>

            {/* Review */}
            <p className="text-sm text-gray-600 leading-6">
              {review.body.length > 120
                ? review.body.slice(0, 120) + "..."
                : review.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
