import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero1 from "../../assets/Hero/Hero1.png";
import Hero2 from "../../assets/Hero/Hero2.png";
import Hero3 from "../../assets/Hero/Hero3.png";
import Hero4 from "../../assets/Hero/Hero4.png";

function Hero() {
  const heroImages = [Hero1, Hero2, Hero3, Hero4];
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      onClick={() => navigate("/products")}
      className="relative overflow-hidden rounded-lg cursor-pointer"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero ${index + 1}`}
            className="w-full h-[450px] flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 right-2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(index);
            }}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? "w-6 h-2 bg-emerald-600/50"
                : "w-2 h-2 bg-emerald-900"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
