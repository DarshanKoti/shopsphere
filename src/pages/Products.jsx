import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import SearchBar from "../components/common/SearchBar";

function Products() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [likedProducts, setLikedProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();
  const categoryFromUrl = Number(searchParams.get("category")) || 0;
  const [selectCategory, setSelectCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setSelectCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=42")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Clothes" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Furniture" },
    { id: 4, name: "Footwears" },
  ];

  // Category + Search Filter
  const filteredProducts = products.filter((item) => {
    const categoryMatch =
      selectCategory === 0 || item.category?.id === selectCategory;

    const searchMatch = item.title.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "low-high":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "high-low":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "newest":
      sortedProducts.sort(
        (a, b) => new Date(b.creationAt) - new Date(a.creationAt),
      );
      break;

    case "az":
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "za":
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;

    default:
      break;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-sm text-gray-600 font-medium mt-1">
            Discover our complete collection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Sort by:</span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 outline-none hover:border-emerald-500 cursor-pointer transition"
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="az">Name: A-Z</option>
            <option value="za">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          width="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={() => {}}
          placeholder="Search products..."
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
        <ul className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => setSelectCategory(category.id)}
              className={`px-5 py-2 rounded-full border font-semibold text-sm cursor-pointer transition ${
                selectCategory === category.id
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-400"
              }`}
            >
              {category.name}
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 font-semibold">
          Showing{" "}
          {sortedProducts.length < 10
            ? `0${sortedProducts.length}`
            : sortedProducts.length}{" "}
          products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            liked={likedProducts.includes(product.id)}
            likedProducts={likedProducts}
            setLikedProducts={setLikedProducts}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
