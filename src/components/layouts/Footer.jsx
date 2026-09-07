import React from "react";
import { NavLink } from "react-router-dom";
import footerLogo from "../../assets/images/footer-logo.png";

// Icons
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";

function Footer() {
  const linkClass = "hover:text-emerald-500 transition";

  return (
    <footer className="bg-[#0A0A0A] text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-gray-800 pb-10">
          {/* Brand */}
          <div>
            <img src={footerLogo} alt="ShopSphere Logo" className="h-16 mb-4" />

            <p className="text-sm text-gray-400 leading-6">
              Your one-stop destination for premium products at the best prices.
            </p>

            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaInstagram, FaYoutube].map((Icon, index) => (
                <span
                  key={index}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:text-emerald-500 transition"
                >
                  <Icon />
                </span>
              ))}
            </div>
          </div>

          {/* Shopping */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-5">Shopping</h2>

            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/products" className={linkClass}>
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/products?category=men" className={linkClass}>
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink to="/products?category=women" className={linkClass}>
                  Women
                </NavLink>
              </li>
              <li>
                <NavLink to="/products?category=footwear" className={linkClass}>
                  Shoes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products?category=accessories"
                  className={linkClass}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-5">Company</h2>

            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  Careers
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  Press
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  Sustainability
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-5">
              Customer Service
            </h2>

            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/contact" className={linkClass}>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  Shipping Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  Returns & Refunds
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming-soon" className={linkClass}>
                  Track Order
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-5">
              Support & Contact
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-[#0C2919] text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <FaLocationDot />
                </span>

                <p className="text-gray-400">
                  123 ShopSphere Street,
                  <br />
                  Bengaluru, Karnataka 560001
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <span className="w-10 h-10 rounded-full bg-[#0C2919] text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <FaPhone />
                </span>

                <p className="text-gray-400">+91 9876543210</p>
              </div>

              <div className="flex gap-3 items-center">
                <span className="w-10 h-10 rounded-full bg-[#0C2919] text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <MdMailOutline />
                </span>

                <p className="text-gray-400">support@shopsphere.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-sm text-gray-500">
          <p>© 2026 ShopSphere. All rights reserved.</p>

          <div className="flex gap-6">
            <NavLink to="/coming-soon" className={linkClass}>
              Privacy Policy
            </NavLink>

            <NavLink to="/coming-soon" className={linkClass}>
              Terms of Service
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
