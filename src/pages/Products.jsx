import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import SearchBar from "../components/common/SearchBar";
import { getWishlist } from "../utils/wishlist";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { value: "all", name: "All" },
  { value: "men", name: "Men" },
  { value: "women", name: "Women" },
  { value: "footwear", name: "Shoes" },
  { value: "watches", name: "Watches" },
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

// Broad shop categories mapped onto the category names DummyJSON uses.
const CATEGORY_GROUPS = {
  men: ["mens-shirts", "mens-shoes", "mens-watches"],
  women: [
    "womens-dresses",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
    "womens-watches",
  ],
  footwear: ["mens-shoes", "womens-shoes"],
  watches: ["mens-watches", "womens-watches"],
  electronics: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  beauty: ["beauty", "skin-care", "fragrances"],
  accessories: ["mobile-accessories", "sports-accessories", "sunglasses"],
};

const SORTERS = {
  "low-high": (a, b) => a.price - b.price,
  "high-low": (a, b) => b.price - a.price,
  newest: (a, b) => b.id - a.id,
  az: (a, b) => a.title.localeCompare(b.title),
  za: (a, b) => b.title.localeCompare(a.title),
};

function matchesCategory(product, selected) {
  if (selected === "all") return true;

  const group = CATEGORY_GROUPS[selected];
  return group
    ? group.includes(product.category)
    : product.category === selected;
}

function Products() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [search, setSearch] = useState("");
  const [likedIds, setLikedIds] = useState(() =>
    getWishlist(user?.id).map((item) => item.id),
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const syncWishlist = () =>
      setLikedIds(getWishlist(user?.id).map((item) => item.id));

    window.addEventListener("wishlistUpdated", syncWishlist);
    return () => window.removeEventListener("wishlistUpdated", syncWishlist);
  }, [user?.id]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => setError("Couldn't load products. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const selectCategory = (value) => {
    setSearchParams(value === "all" ? {} : { category: value });
  };

  const query = search.trim().toLowerCase();

  const visibleProducts = products.filter(
    (item) =>
      matchesCategory(item, selectedCategory) &&
      item.title.toLowerCase().includes(query),
  );

  if (SORTERS[sortBy]) {
    visibleProducts.sort(SORTERS[sortBy]);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
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

      <div className="mb-6">
        <SearchBar
          width="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
        <div className="overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-3 w-max">
            {CATEGORIES.map((category) => (
              <li key={category.value}>
                <button
                  type="button"
                  onClick={() => selectCategory(category.value)}
                  className={`px-5 py-2 rounded-full border text-sm font-semibold cursor-pointer whitespace-nowrap transition ${
                    selectedCategory === category.value
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-400"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">
          Showing {String(visibleProducts.length).padStart(2, "0")} products
        </p>
      </div>

      {loading && <p className="py-16 text-center text-gray-500">Loading...</p>}

      {error && <p className="py-16 text-center text-red-600">{error}</p>}

      {!loading && !error && visibleProducts.length === 0 && (
        <p className="py-16 text-center text-gray-500">
          No products match your search.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            liked={likedIds.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
