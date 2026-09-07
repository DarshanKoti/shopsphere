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
  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectCategory, setSelectCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setSelectCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Load wishlist
  useEffect(() => {
    const loadWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setLikedProducts(wishlist.map((item) => item.id));
    };

    loadWishlist();

    window.addEventListener("wishlistUpdated", loadWishlist);

    return () => window.removeEventListener("wishlistUpdated", loadWishlist);
  }, []);

  // Load products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const categories = [
    { value: "all", name: "All" },
    { value: "men", name: "Men" },
    { value: "women", name: "Women" },
    { value: "footwear", name: "Shoes" },
    { value: "electronics", name: "Electronics" },
    { value: "furniture", name: "Furniture" },
    { value: "beauty", name: "Beauty" },
    { value: "accessories", name: "Accessories" },
    { value: "groceries", name: "Groceries" },

    { value: "smartphones", name: "Smartphones" },
    { value: "laptops", name: "Laptops" },
    { value: "tablets", name: "Tablets" },
    { value: "mobile-accessories", name: "Mobile Accessories" },
    { value: "mens-shirts", name: "Men's Shirts" },
    { value: "mens-watches", name: "Men's Watches" },
    { value: "womens-dresses", name: "Women's Dresses" },
    { value: "womens-bags", name: "Women's Bags" },
    { value: "womens-jewellery", name: "Women's Jewellery" },
    { value: "womens-watches", name: "Women's Watches" },
    { value: "fragrances", name: "Fragrances" },
    { value: "skin-care", name: "Skin Care" },
    { value: "sports-accessories", name: "Sports Accessories" },
    { value: "sunglasses", name: "Sunglasses" },
  ];

  // Category + Search Filter
  const filteredProducts = products.filter((item) => {
    let categoryMatch = true;

    switch (selectCategory) {
      case "men":
        categoryMatch = ["mens-shirts", "mens-shoes", "mens-watches"].includes(
          item.category,
        );
        break;

      case "women":
        categoryMatch = [
          "womens-dresses",
          "womens-shoes",
          "womens-bags",
          "womens-jewellery",
          "womens-watches",
        ].includes(item.category);
        break;

      case "footwear":
        categoryMatch = ["mens-shoes", "womens-shoes"].includes(item.category);
        break;

      case "electronics":
        categoryMatch = [
          "smartphones",
          "laptops",
          "tablets",
          "mobile-accessories",
        ].includes(item.category);
        break;

      case "beauty":
        categoryMatch = ["beauty", "skin-care", "fragrances"].includes(
          item.category,
        );
        break;

      case "accessories":
        categoryMatch = [
          "mobile-accessories",
          "sports-accessories",
          "sunglasses",
        ].includes(item.category);
        break;

      default: {
        const apiCategories = [
          "smartphones",
          "laptops",
          "tablets",
          "mobile-accessories",
          "mens-shirts",
          "mens-shoes",
          "mens-watches",
          "womens-dresses",
          "womens-shoes",
          "womens-bags",
          "womens-jewellery",
          "womens-watches",
          "fragrances",
          "skin-care",
          "sports-accessories",
          "sunglasses",
          "groceries",
          "furniture",
          "beauty",
        ];

        categoryMatch = apiCategories.includes(selectCategory)
          ? item.category === selectCategory
          : selectCategory === "all";
      }
    }

    const searchMatch = item.title.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "low-high":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "high-low":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "newest":
      sortedProducts.sort((a, b) => b.id - a.id);
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
          <p className="text-sm text-gray-600 mt-1">
            Discover our complete collection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Sort by:</span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer outline-none hover:border-emerald-500"
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

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          width="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={() => {}}
          placeholder="Search products..."
        />
      </div>

      {/* Categories */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
        <div className="overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-3 w-max">
            {categories.map((category) => (
              <li
                key={category.value}
                onClick={() => setSelectCategory(category.value)}
                className={`px-5 py-2 rounded-full border text-sm font-semibold cursor-pointer whitespace-nowrap transition ${
                  selectCategory === category.value
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-400"
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">
          Showing {String(sortedProducts.length).padStart(2, "0")} products
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
