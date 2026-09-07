import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [heroProducts, setHeroProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Premium & eye-catching DummyJSON products
    const heroIds = [78, 101, 97, 88];

    Promise.all(
      heroIds.map((id) =>
        fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json()),
      ),
    ).then((data) => setHeroProducts(data));
  }, []);

  useEffect(() => {
    if (!heroProducts.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroProducts.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [heroProducts]);

  if (!heroProducts.length) {
    return (
      <div className="h-[260px] md:h-[400px] lg:h-[480px] bg-gray-100 rounded-3xl animate-pulse" />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#F8FAF8] to-[#EEF7F1] border border-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
      {/* Premium Background Effects */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-3xl" />

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-full flex flex-col-reverse md:flex-row items-center justify-between px-8 py-8 md:px-14 lg:px-20 relative z-10"
          >
            {/* Left Content */}
            <div className="max-w-lg text-center md:text-left mt-8 md:mt-0">
              <p className="text-emerald-600 font-semibold uppercase tracking-[0.25em] text-sm">
                {product.category.replace(/-/g, " ")}
              </p>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mt-3 leading-tight text-gray-900">
                {product.title}
              </h1>

              <p className="text-gray-600 mt-5 text-base md:text-lg line-clamp-3">
                {product.description}
              </p>

              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                Shop Now →
              </button>
            </div>

            {/* Right Image */}
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-[220px] md:h-[340px] lg:h-[600px] object-contain hover:scale-105 transition duration-300 drop-shadow-[0_25px_40px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              current === index
                ? "w-8 h-2 bg-emerald-600 shadow-md"
                : "w-2 h-2 bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
