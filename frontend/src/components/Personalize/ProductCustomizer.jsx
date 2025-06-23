// ProductCustomizer.jsx
import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import "../../styles/ProductCustomizer.css";

const ProductCustomizer = ({ productImage, canvasRef }) => {
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("tshirt-canvas", {
      width: 400,
      height: 500,
    });

    canvasRef.current = canvas;

    fabric.Image.fromURL(productImage, (img) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: 400 / img.width,
        scaleY: 500 / img.height,
      });
    });

    return () => {
      canvas.dispose();
    };
  }, [productImage]);

  return (
    <div className="product-customizer" ref={canvasContainerRef}>
      <canvas id="tshirt-canvas" />
    </div>
  );
};

export default ProductCustomizer;
