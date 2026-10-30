import { NavLink } from "react-router-dom";

function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          About <span className="text-emerald-600">ShopSphere</span>
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto">
          Your one-stop destination for quality products and a smooth online
          shopping experience.
        </p>
      </div>

      {/* About Content */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>

          <p className="text-gray-600 leading-7 mb-4">
            ShopSphere is an online shopping platform designed to make shopping
            simple, convenient and enjoyable. We bring a variety of products
            together so customers can easily find what they need.
          </p>

          <p className="text-gray-600 leading-7">
            Our goal is to provide a user-friendly shopping experience with easy
            navigation, a simple checkout process and convenient order
            management.
          </p>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-10 text-center">
          <h2 className="text-4xl font-bold text-emerald-600 mb-3">
            ShopSphere
          </h2>
          <p className="text-gray-600">Smart Shopping. Simple Experience.</p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-[#EDF4EE] border border-gray-100 rounded-2xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-emerald-600">
          Our Mission
        </h2>

        <p className="text-gray-600 text-center max-w-3xl mx-auto leading-7">
          Our mission is to make online shopping accessible and convenient by
          providing a simple platform where customers can discover products,
          manage their wishlist and enjoy an easy shopping experience.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why Choose ShopSphere?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Easy Shopping",
              description:
                "Browse and explore products with a simple and user-friendly interface.",
            },
            {
              title: "Wishlist",
              description:
                "Save your favourite products and access them whenever you want.",
            },
            {
              title: "Easy Checkout",
              description:
                "Enjoy a simple checkout process and manage your orders conveniently.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-emerald-600 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Products */}
      <div className="text-center bg-emerald-50 rounded-2xl p-10">
        <h2 className="text-2xl font-bold mb-3">
          Start Shopping with ShopSphere
        </h2>

        <p className="text-gray-600 mb-6">
          Explore our collection and find products you love.
        </p>

        <NavLink
          to="/products"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-7 py-3 rounded-lg transition"
        >
          Explore Products
        </NavLink>
      </div>
    </div>
  );
}

export default About;
