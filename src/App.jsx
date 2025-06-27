import { useCallback, useEffect, useState } from "react";
import "./App.css";
import {debounce} from "lodash";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // console.log("suggestions", suggestions);

  const fetchProducts = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3333/products?search=${query}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500),
    []
  );

  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query]);

  return (
    <>
      <div>
        <h1>Autocomplete</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un prodotto..."
        />
        {suggestions.length > 0 && (
          <div className="dropdown">
            {suggestions.map((product) => (
              <p key={product.id}>{product.name}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
