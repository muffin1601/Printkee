"use client";
import React from "react";
import styles from "../styles/ThumbnailGallery.module.css";

const ThumbnailGallery = ({
  activeIndex,
  onThumbnailClick,
}) => {
  const sideLabels = ["Front View", "Back View", "Left View", "Right View"];

  return (
    <div className={styles["thumbnail-navigation-container"]}>
      <div className={styles["thumbnail-buttons"]}>
        {sideLabels.map((label, index) => (
          <button
            key={index}
            className={`${styles.thumbnailButton} ${index === activeIndex ? styles.activeThumbnailButton : ""}`}
            onClick={() => onThumbnailClick(index)}
          >
            {label}
          </button>
        ))}
      </div>

    </div>
  );
};

export default ThumbnailGallery;