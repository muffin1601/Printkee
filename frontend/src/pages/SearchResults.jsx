import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const { search } = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("q");
  const category = queryParams.get("cat");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/search?q=${query}&cat=${category}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query, category]);

  return (
    <div className="search-page">
      <Helmet>
        <title>{query ? `Search Results for "${query}" | MF Global Services` : 'Search | MF Global Services'}</title>
        <meta
          name="description"
          content={
            query
              ? `Find the best results for "${query}"${category && category !== "All Categories" ? ` in ${category}` : ""} at MF Global Services – Corporate gifting solutions tailored for you.`
              : "Explore premium corporate gifts with MF Global Services. Search by product name or category."
          }
        />
      </Helmet>

      <div className="search-page__container">
        <h2 className="search-page__heading">
          Search Results for: <span className="search-page__query">"{query}"</span>{" "}
          {category && category !== "All Categories" && (
            <span className="search-page__category">in {category}</span>
          )}
        </h2>

        {loading ? (
          <p className="search-page__loading">Loading...</p>
        ) : results.length === 0 ? (
          <p className="search-page__no-results">No results found.</p>
        ) : (
          <div className="search-page__grid">
            {results.map((item, idx) => (
              <div key={idx} className="search-page__card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="search-page__image"
                />
                <h3 className="search-page__title">{item.name}</h3>
                <p className="search-page__description">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
