import React, { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { TbMapPinFilled } from "react-icons/tb";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          We'd love to hear from you. Get in touch with us for any questions,
          support or feedback.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-7">
          <h2 className="text-2xl font-bold text-gray-900">
            Send us a Message
          </h2>

          <p className="text-sm text-gray-500 mt-2 mb-6">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="off"
                  spellCheck="false"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="off"
                  spellCheck="false"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                autoComplete="off"
                spellCheck="false"
                required
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                required
                className="w-full h-36 p-3 border border-gray-300 rounded-lg outline-none resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#EFF8F3] border border-emerald-100 rounded-2xl shadow-lg p-7">
            <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>

            <p className="text-sm text-gray-600 mt-2 mb-8">
              We're here to help. Reach out through any of the following
              channels.
            </p>

            <div className="space-y-7">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-[#DCEFE3] flex items-center justify-center text-emerald-600 text-xl">
                  <FaPhone />
                </span>

                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-sm text-gray-800">+91 9876543210</p>
                  <p className="text-xs text-gray-500">
                    Mon - Sat, 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-[#DCEFE3] flex items-center justify-center text-emerald-600 text-xl">
                  <IoMdMail />
                </span>

                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-gray-800">
                    support@shopsphere.com
                  </p>
                  <p className="text-xs text-gray-500">
                    We reply within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-[#DCEFE3] flex items-center justify-center text-emerald-600 text-xl">
                  <TbMapPinFilled />
                </span>

                <div>
                  <h4 className="font-semibold">Our Office</h4>
                  <p className="text-sm text-gray-800">
                    123, Tech Park, Electronic City
                  </p>
                  <p className="text-xs text-gray-500">
                    Bengaluru, Karnataka - 560100
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps?q=Bengaluru,Karnataka&output=embed"
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ShopSphere Office Location"
              className="border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
