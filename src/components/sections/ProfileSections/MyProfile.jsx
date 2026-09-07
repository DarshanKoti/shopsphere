import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function MyProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    photo: "",
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));

    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedProfile = { ...profile, photo: reader.result };
      setProfile(updatedProfile);
      localStorage.setItem("profile", JSON.stringify(updatedProfile));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
      <p className="text-gray-500 mt-2">Manage your personal information.</p>

      {/* Profile Image */}
      <div className="flex flex-col items-center py-8 border-b border-gray-200">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-100"
          />
        ) : (
          <FaUserCircle className="text-[120px] text-gray-300" />
        )}

        <label className="mt-4 px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition cursor-pointer">
          Change Photo
          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="hidden"
          />
        </label>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="+91 XXXXXXXXXX"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition cursor-pointer"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default MyProfile;
