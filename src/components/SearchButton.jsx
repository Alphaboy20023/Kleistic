import { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import { useSearch } from "../context/SearchContext";

const SearchBtn = () => {
  const [query, setQuery] = useState("");
  // const { setSearchTerm } = useSearch();

  const handleSearchClick = () => {
    // setSearchTerm(query.trim());
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // if (!e.target.value.trim()) setSearchTerm(""); // reset on clear
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="relative w-full sm:w-auto max-w-xs">
      <input
        type="text"
        className="w-full h-8 text-sm border rounded-md border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-red-400"
        placeholder="What are you looking for?"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <FaSearch
        onClick={handleSearchClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 cursor-pointer hover:text-black"
      />
    </div>
  );
};

export default SearchBtn;
