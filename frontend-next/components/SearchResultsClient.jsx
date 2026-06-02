"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import "../styles/SearchResults.css";
import WhyChooseUs from "./WhyChooseUs";

const SearchResultsClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const category = searchParams.get("cat");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/search?q=${query}&cat=${category}`
        );
        setResults(res.data);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResults();
    else setLoading(false);
  }, [query, category]);

  return (
    <>
      <div className="search-page">
        <div className="search-page__container">
          <h2 className="search-page__heading" aria-live="polite">
            {query ? (
              <>
                Search Results for:{" "}
                <span className="search-page__query">&quot;{query}&quot;</span>{" "}
                {category && category !== "All Categories" && (
                  <span className="search-page__category">in {category}</span>
                )}
              </>
            ) : (
              "Search"
            )}
          </h2>

          {loading ? (
            <div className="search-page__grid">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="search-page__card search-page__card--loading"
                  role="status"
                  aria-label="Loading search result"
                >
                  <div className="search-page__image skeleton" />
                  <div className="search-page__card-content">
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="search-page__no-results" role="alert">No results found.</p>
          ) : (
            <section className="search-page__grid" aria-label="Search results listing">
              {results.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/${slugify(item.category)}/${slugify(item.subcategory)}/${slugify(item.name)}`}
                  className="search-page__card-link"
                  aria-label={`View details for ${item.name}`}
                >
                  <div className="search-page__card">
                    <img
                      src={item.image}
                      alt={`${item.name} - corporate gifting product`}
                      className="search-page__image"
                    />
                    <div className="search-page__card-content">
                      <h3 className="search-page__title">{item.name}</h3>
                      <p className="search-page__description">{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          )}
        </div>
      </div>
      <WhyChooseUs />
    </>
  );
};

export default SearchResultsClient;
