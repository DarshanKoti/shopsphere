import React from "react";
import { NavLink } from "react-router-dom";
import { MdConstruction } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";

function Construction() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-[#EDF8F1] flex items-center justify-center">
          <MdConstruction className="text-5xl text-emerald-600" />
        </div>

        <h1 className="text-4xl font-bold mt-6">Page Under Construction</h1>

        <p className="text-gray-500 mt-4 leading-7">
          We're working on this section and it'll be available soon. Thanks for
          your patience.
        </p>

        <NavLink
          to="/"
          className="inline-flex items-center gap-2 mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          <FaArrowLeft />
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}

export default Construction;
