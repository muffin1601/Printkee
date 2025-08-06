import React, { useEffect } from "react";
import { fabric } from "fabric";
import "../styles/UploadControls.css";

const UploadControls = ({ canvasRef, updateThumbnail }) => {
  const deleteObject = (eventData, transform) => {
    const target = transform.target;
    const canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
    updateThumbnail();
  };

  const renderDeleteIcon = (ctx, left, top) => {
    const size = 20;
    ctx.save();
    ctx.translate(left, top);
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2, true);
    ctx.fillStyle = "#db0e0eff";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-6, -6);
    ctx.lineTo(6, 6);
    ctx.moveTo(6, -6);
    ctx.lineTo(-6, 6);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  };

  const addImageToCanvas = (dataUrl) => {
    fabric.Image.fromURL(dataUrl, (img) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
        hasBorders: true,
        hasControls: true,
        cornerStyle: "circle",
      });

      img.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -10,
        offsetX: 10,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderDeleteIcon,
        cornerSize: 24,
      });

      canvasRef.current.add(img).setActiveObject(img);
      canvasRef.current.requestRenderAll();

      setTimeout(() => updateThumbnail(), 150);
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => addImageToCanvas(reader.result);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const canvasEl = canvasRef.current?.lowerCanvasEl;
    if (!canvasEl) return;

    const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => addImageToCanvas(reader.result);
        reader.readAsDataURL(file);
      }
    };

    canvasEl.addEventListener("drop", handleDrop);
    canvasEl.addEventListener("dragover", (e) => e.preventDefault());

    return () => {
      canvasEl.removeEventListener("drop", handleDrop);
      canvasEl.removeEventListener("dragover", (e) => e.preventDefault());
    };
  }, [canvasRef]);

  return (
    <div className="upload-controls-container">
      <input
        className="upload-file-input"
        type="file"
        onChange={handleUpload}
        accept="image/*"
      />
    </div>
  );
};

export default UploadControls;
