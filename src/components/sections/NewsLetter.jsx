import React, { useState } from "react";
import { TfiEmail } from "react-icons/tfi";

function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div className="mx-5 my-10 rounded-2xl bg-[#EDF8F1] border border-emerald-100 shadow-lg p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <TfiEmail className="text-3xl text-emerald-600" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">Stay Updated</h3>

            <p className="text-sm text-gray-600 mt-1">
              Subscribe to our newsletter and get 10% off your first order.
            </p>
          </div>
        </div>

        {/* Right */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full lg:w-auto gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            autoComplete="off"
            spellCheck="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-80 lg:w-96 px-4 py-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ml-40"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;
