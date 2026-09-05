"use client";
import React, { useEffect, useState } from "react";
import DiwaliCollection from "./DiwaliCollection";
import { getRecentlyViewed, toProductShape } from "../../utils/recentlyViewed";

/**
 * "Recently Viewed" — reads the visitor's local browsing history.
 *
 * Deliberately renders nothing on the server and on the first client
 * render, then fills in after mount: localStorage is unavailable during
 * SSR, so reading it during render would guarantee a hydration mismatch.
 *
 * When there is no history it falls back to the recommended products the
 * server already fetched, so the section is useful on a first visit too.
 */
const RecentlyViewed = ({ fallbackProducts = [], onEnquire }) => {
  const [viewed, setViewed] = useState(null);

  useEffect(() => {
    setViewed(getRecentlyViewed().map(toProductShape));
  }, []);

  if (viewed === null) return null;

  const hasHistory = viewed.length > 0;
  const products = hasHistory ? viewed : fallbackProducts;

  return (
    <DiwaliCollection
      id="diwali-recently-viewed"
      eyebrow={hasHistory ? "Pick up where you left off" : "Curated for you"}
      title={hasHistory ? "Recently Viewed" : "Recommended for You"}
      description={
        hasHistory
          ? "The gifts you looked at most recently, kept handy on this device."
          : "Hand-picked festive gifts our clients order most this season."
      }
      products={products.slice(0, 8)}
      onEnquire={onEnquire}
    />
  );
};

export default RecentlyViewed;
