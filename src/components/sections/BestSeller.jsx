import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import ProductTile from "../common/ProductTile";

function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=6&skip=20")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Best Seller</h1>

        <NavLink
          to="/products"
          className="text-emerald-600 font-semibold text-sm flex items-center gap-1 hover:scale-105 transition"
        >
          View All <FaArrowRightLong />
        </NavLink>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
