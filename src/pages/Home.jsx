import React from "react";
import Hero from "../components/sections/Hero";
import Categories from "../components/sections/Categories";
import Trending from "../components/sections/Trending";
import BestSeller from "../components/sections/BestSeller";
import Offers from "../components/sections/Offers";
import Testimonial from "../components/sections/Testimonial";
import NewsLetter from "../components/sections/NewsLetter";
import Footer from "../components/layouts/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Trending />
      <Offers />
      <BestSeller />
      <Testimonial />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default Home;
