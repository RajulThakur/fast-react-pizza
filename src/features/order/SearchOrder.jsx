import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="focus:outline-none w-28 rounded-full bg-yellow-100 px-3 py-2 text-sm text-yellow-800 placeholder:text-stone-400 focus:outline-offset-1 focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72 transition-all duration-300in"
          type="text"
          placeholder="Search Order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchOrder;
