import {useState} from "react";
import {FaSearch} from "react-icons/fa";


const SearchBtn = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearchClick = async () => {
        if (query.trim()) {
            setIsSearching(true);
            console.log("searching for", query)

            // api

        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim()) {
            handleSearchClick();
        }
    };

    const handleBlur = () => {
        if (query.trim()) handleSearchClick();
    }

    return (
        <>
            <div className="relative w-full sm:w-auto max-w-xs">
                    <input 
                    type="text"
                    className="w-full h-8 text-sm border rounded-md border-gray-300  px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-red-400"
                    placeholder="what are you looking for?"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                    onClick={handleSearchClick}
                    />
                    <FaSearch 
                        onClick={handleSearchClick}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 cursor-pointer hover:text-black"
                    />
            </div>
        </>
    )
}

export default SearchBtn