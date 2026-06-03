"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import styles from "../styles/SearchResults.module.css";
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
      <div className={styles["search-page"]}>
        <div className={styles["search-page__container"]}>
          <h2 className={styles["search-page__heading"]} aria-live="polite">
            {query ? (
              <>
                Search Results for:{" "}
                <span className={styles["search-page__query"]}>&quot;{query}&quot;</span>{" "}
                {category && category !== "All Categories" && (
                  <span className={styles["search-page__category"]}>in {category}</span>
                )}
              </>
            ) : (
              "Search"
            )}
          </h2>

          {loading ? (
            <div className={styles["search-page__grid"]}>
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles["search-page__card"]} ${styles["search-page__card--loading"]}`}
                  role="status"
                  aria-label="Loading search result"
                >
                  <div className={`${styles["search-page__image"]} ${styles["skeleton"]}`} />
                  <div className={styles["search-page__card-content"]}>
                    <div className={`${styles["skeleton"]} ${styles["skeleton-title"]}`} />
                    <div className={`${styles["skeleton"]} ${styles["skeleton-text"]}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className={styles["search-page__no-results"]} role="alert">No results found.</p>
          ) : (
            <section className={styles["search-page__grid"]} aria-label="Search results listing">
              {results.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/${slugify(item.category)}/${slugify(item.subcategory)}/${slugify(item.name)}`}
                  className={styles["search-page__card-link"]}
                  aria-label={`View details for ${item.name}`}
                >
                  <div className={styles["search-page__card"]}>
                    <img
                      src={item.image}
                      alt={`${item.name} - corporate gifting product`}
                      className={styles["search-page__image"]}
                    />
                    <div className={styles["search-page__card-content"]}>
                      <h3 className={styles["search-page__title"]}>{item.name}</h3>
                      <p className={styles["search-page__description"]}>{item.description}</p>
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
