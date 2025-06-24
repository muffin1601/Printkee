// ProductCustomizer.jsx
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "../../styles/ProductCustomizer.css";

const ProductCustomizer = ({ productImage, canvasRef, subImages = [] }) => {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [mainImage, setMainImage] = useState(productImage);

  useEffect(() => {
    const canvas = new fabric.Canvas("tshirt-canvas", {
      width: 400,
      height: 500,
      preserveObjectStacking: true,
      selection: true,
    });

    canvasRef.current = canvas;

    const loadImage = (url) => {
      fabric.Image.fromURL(url, (img) => {
        const scaleX = 400 / img.width;
        const scaleY = 500 / img.height;
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX,
          scaleY,
          originX: "left",
          originY: "top",
        });
      });
    };

    loadImage(mainImage);

    return () => canvas.dispose();
  }, [mainImage]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.setZoom(zoom);
    }
  }, [zoom]);

  return (
    <div className="product-customizer-wrapper" ref={containerRef}>
      <div className="canvas-wrapper">
        <canvas id="tshirt-canvas" />
      </div>

      <div className="bottom-panel">
        <div className="thumbnail-strip">
          {subImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-${i}`}
              className={`thumb ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        <div className="zoom-control">
          <label>
            <i className="zoom-icon">🔍</i>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
            {Math.round(zoom * 100)}%
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
