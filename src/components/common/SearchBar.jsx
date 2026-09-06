import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

function SearchBar({
  value,
  onChange = () => {},
  onSearch = () => {},
  placeholder = "Search for products, brands and more...",
  width = "w-96",
}) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(value.trim());
  };

  return (
    <div className={`flex items-center ${width}`}>
      <div className="relative flex-1">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

        <input
          type="text"
          value={value ?? ""}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-l-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-r-xl transition duration-200 cursor-pointer"
      >
        <HiOutlineSearch className="text-white text-xl" />
      </button>
    </div>
  );
}

export default SearchBar;
