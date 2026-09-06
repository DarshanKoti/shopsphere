import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images[0]);
      });
  }, [id]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=5&limit=4")
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data));
  }, []);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        category: product.category?.name,
        price: product.price,
        image: product.images[0],
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart");
  };

  if (!product) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading Product...
      </div>
    );
  }

  const rating = (3.5 + (product.id % 15) / 10).toFixed(1);
  const reviewCount = ((product.id * 13) % 500) + 50;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Main Section */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Images */}
        <div>
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`rounded-xl overflow-hidden border-2 cursor-pointer ${
                  selectedImage === img
                    ? "border-emerald-500"
                    : "border-gray-200"
                }`}
              >
                <img src={img} alt="" className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details */}
        <div className="flex flex-col gap-5">
          <span className="text-emerald-600 font-semibold">
            {product.category?.name}
          </span>

          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-2">
            <GoStarFill className="text-yellow-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500">({reviewCount} Reviews)</span>
          </div>

          <h2 className="text-3xl font-bold text-emerald-600">
            ${product.price}.00
          </h2>

          <p className="text-gray-600 leading-7">{product.description}</p>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                <FiMinus />
              </button>

              <span className="px-5 font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={addToCart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <MdOutlineShoppingCart className="text-xl" />
            Add to Cart
          </button>

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="font-bold text-lg mb-4">Why You'll Love It</h3>

            <ul className="space-y-3 text-gray-600">
              <li>✔ Premium quality material</li>
              <li>✔ Fast shipping across India</li>
              <li>✔ Secure checkout</li>
              <li>✔ Easy 30-day returns</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {relatedProducts.map((item) => (
            <NavLink
              key={item.id}
              to={`/products/${item.id}`}
              className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-3">
                <h3 className="font-semibold text-sm">
                  {item.title.length > 22
                    ? item.title.slice(0, 20) + "..."
                    : item.title}
                </h3>

                <p className="text-emerald-600 font-bold mt-2">
                  ${item.price}.00
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
