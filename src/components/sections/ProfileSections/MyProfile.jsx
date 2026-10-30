import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { readJSON, writeJSON } from "../../../utils/storage";

const inputClass =
  "w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition";

const getProfileKey = (userId) => `profile_${userId}`;

const createDefaultProfile = (user) => ({
  name: user?.name || "",
  email: user?.email || "",
  phone: "",
  alternatePhone: "",
  dob: "",
  gender: "Male",
  photo: "",
  address: {
    house: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  },
});

function MyProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(() => {
    const saved = user?.id ? readJSON(getProfileKey(user.id), {}) : {};

    return {
      ...createDefaultProfile(user),
      ...saved,
      address: {
        ...createDefaultProfile(user).address,
        ...(saved.address || {}),
      },
    };
  });

  useEffect(() => {
    if (!user?.id) return;

    const saved = readJSON(getProfileKey(user.id), {});
    const defaults = createDefaultProfile(user);

    setProfile({
      ...defaults,
      ...saved,
      address: {
        ...defaults.address,
        ...(saved.address || {}),
      },
    });
  }, [user?.id]);

  const saveProfile = (updatedProfile) => {
    if (!user?.id) return;

    writeJSON(getProfileKey(user.id), updatedProfile);
    window.dispatchEvent(new Event("profileUpdated"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    // Keep uploaded images reasonably small for localStorage.
    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const updated = {
        ...profile,
        photo: reader.result,
      };

      setProfile(updated);
      saveProfile(updated);
    };

    reader.onerror = () => {
      alert("Unable to upload image.");
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    saveProfile(profile);
    alert("Profile updated successfully!");
  };

  if (!user) return null;

  return (
    <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>

      <p className="text-gray-500 mt-2">
        Manage your personal information and delivery address.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Profile Photo */}
        <section className="flex flex-col items-center py-6 border-b border-gray-200">
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
          <p className="mt-2 text-xs text-gray-400">Maximum image size: 2 MB</p>
        </section>

        {/* Personal Information */}
        <section>
          <h3 className="text-xl font-semibold mb-5">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Enter full name"
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
                required
                className={inputClass}
                placeholder="Enter email"
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
                required
                className={inputClass}
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Alternate Phone
              </label>
              <input
                type="tel"
                name="alternatePhone"
                value={profile.alternatePhone}
                onChange={handleChange}
                className={inputClass}
                placeholder="Alternate contact number"
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
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>
        </section>

        {/* Delivery Address */}
        <section className="border-t border-gray-200 pt-7">
          <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>

          <p className="text-sm text-gray-500 mb-5">
            Save your address to make checkout faster.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                House / Flat Number
              </label>
              <input
                name="house"
                value={profile.address.house}
                onChange={handleAddressChange}
                className={inputClass}
                placeholder="House / Flat number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Street / Area
              </label>
              <input
                name="street"
                value={profile.address.street}
                onChange={handleAddressChange}
                className={inputClass}
                placeholder="Street or area"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Landmark
              </label>
              <input
                name="landmark"
                value={profile.address.landmark}
                onChange={handleAddressChange}
                className={inputClass}
                placeholder="Nearby landmark"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">City</label>
              <input
                name="city"
                value={profile.address.city}
                onChange={handleAddressChange}
                required
                className={inputClass}
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">State</label>
              <input
                name="state"
                value={profile.address.state}
                onChange={handleAddressChange}
                required
                className={inputClass}
                placeholder="State"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                PIN Code
              </label>
              <input
                type="text"
                name="pincode"
                value={profile.address.pincode}
                onChange={handleAddressChange}
                required
                maxLength={6}
                pattern="[0-9]{6}"
                className={inputClass}
                placeholder="6-digit PIN code"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Country
              </label>
              <input
                name="country"
                value={profile.address.country}
                onChange={handleAddressChange}
                required
                className={inputClass}
                placeholder="Country"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default MyProfile;
