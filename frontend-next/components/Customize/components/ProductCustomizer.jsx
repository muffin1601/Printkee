"use client";
import React, { useEffect, useCallback } from "react";
import { fabric } from "fabric";
import styles from "../styles/ProductCustomizer.module.css";

const isCanvasUsable = (canvas) =>
  Boolean(canvas && canvas.lowerCanvasEl && canvas.contextContainer);

const ProductCustomizer = ({
  canvasRef,
  mainImageUrl,
  partMap = {},
  savedState,
  globalPartColors = {},
}) => {
  const applyGlobalColors = useCallback((canvas) => {
    if (!isCanvasUsable(canvas)) return;
    const applyColor = (o) => {
      if (o.customPart && globalPartColors[o.customPart]) {
        o.set("fill", globalPartColors[o.customPart]);
        o.dirty = true;
        o.setCoords();
      }
      if (o._objects) o._objects.forEach(applyColor);
    };
    canvas.getObjects().forEach(applyColor);
    if (isCanvasUsable(canvas)) canvas.requestRenderAll();
  }, [globalPartColors]);

  const loadSVG = useCallback(async (url, canvas) => {
    try {
      const response = await fetch(url);
      if (!isCanvasUsable(canvas)) return;

      const svgText = await response.text();
      if (!isCanvasUsable(canvas)) return;

      const cleaned = svgText
        .replace(/<\?xml[^>]+\?>/, "")
        .replace(/<!DOCTYPE[^>[]+(\[[^]]+\])?>/, "")
        .replace(/<\/*\s*[\w\-]+:/g, (match) => match.toLowerCase());

      fabric.loadSVGFromString(
        cleaned,
        (objects, options) => {
          if (!isCanvasUsable(canvas)) return;
          if (!objects || objects.length === 0) return;

          const assignParts = (obj) => {
            if (obj.id) {
              for (const [part, ids] of Object.entries(partMap)) {
                if (ids.includes(obj.id)) {
                  obj.customPart = part;
                  break;
                }
              }
            }
            obj.set({ objectCaching: true, selectable: false, evented: false });
            if (obj._objects) obj._objects.forEach(assignParts);
          };

          objects.forEach(assignParts);

          const group = new fabric.Group(objects, {
            ...options,
            selectable: false,
            evented: false,
            isSvgGroup: true,   // custom flag — reliable after JSON round-trip
          });

          const canvasWidth = canvas.getWidth();
          const canvasHeight = canvas.getHeight();
          const boundingRect = group.getBoundingRect();
          const scale = Math.min(
            (canvasWidth * 0.9) / boundingRect.width,
            (canvasHeight * 0.9) / boundingRect.height
          );

          group.scale(scale);
          group.set({
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            originX: "center",
            originY: "center",
          });

          canvas.clear();
          canvas.add(group);
          canvas.mainGroup = group;

          applyGlobalColors(canvas);
          if (isCanvasUsable(canvas)) canvas.renderAll();
        },
        null,
        {
          crossOrigin: "anonymous",
          suppressPreamble: true,
        }
      );
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  }, [partMap, applyGlobalColors]);

  useEffect(() => {
    const canvasEl = document.getElementById("product-customizer-canvas");
    if (!canvasEl) return;

    const calculateSize = () => {
      const screenWidth = window.innerWidth;
      let width = 550;
      let height = 580;
      if (screenWidth < 768) {
        width = screenWidth * 0.9;
        height = width * 1.26;
      }
      return { width, height };
    };

    const { width, height } = calculateSize();

    if (!isCanvasUsable(canvasRef.current)) {
      canvasRef.current = new fabric.Canvas(canvasEl, {
        width,
        height,
        preserveObjectStacking: true,
      });
    } else {
      canvasRef.current.setWidth(width);
      canvasRef.current.setHeight(height);
      if (isCanvasUsable(canvasRef.current)) canvasRef.current.renderAll();
    }

    const handleResize = () => {
      if (!isCanvasUsable(canvasRef.current)) return;
      const { width, height } = calculateSize();
      canvasRef.current.setWidth(width);
      canvasRef.current.setHeight(height);
      if (isCanvasUsable(canvasRef.current)) canvasRef.current.renderAll();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isCanvasUsable(canvas) || !mainImageUrl) return;

    let cancelled = false;
    const isCurrentCanvasUsable = () =>
      !cancelled && canvasRef.current === canvas && isCanvasUsable(canvas);

    if (savedState) {
      const savedUserObjectsData = Array.isArray(savedState.userObjects)
        ? savedState.userObjects
        : [];

      canvas.loadFromJSON(savedState, () => {
        if (!isCurrentCanvasUsable()) return;
        // FIX B10: use custom flag "isSvgGroup" (set at creation) rather than
        // unreliable Fabric internal "isPartOfGroup" which isn't reliably restored
        canvas.mainGroup = canvas.getObjects().find(
          (obj) => obj.isSvgGroup || obj.type === "group"
        ) || null;
        fabric.util.enlivenObjects(savedUserObjectsData, (objects) => {
          if (!isCurrentCanvasUsable()) return;
          objects.forEach((obj) => {
            obj.set({ selectable: true, evented: true });
            canvas.add(obj);
          });
          applyGlobalColors(canvas);
          if (isCurrentCanvasUsable()) canvas.renderAll();
        });
      });
      return () => {
        cancelled = true;
      };
    }

    const isSvg = mainImageUrl.toLowerCase().endsWith(".svg");
    if (isSvg) {
      loadSVG(mainImageUrl, canvas);
    } else {
      fabric.Image.fromURL(
        mainImageUrl,
        (img) => {
          if (!isCurrentCanvasUsable()) return;

          const canvasWidth = canvas.getWidth();
          const canvasHeight = canvas.getHeight();
          const scale = Math.min(
            canvasWidth / img.width,
            canvasHeight / img.height
          );

          img.set({
            originX: "center",
            originY: "center",
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            evented: false,
          });

          canvas.setBackgroundImage(img, () => {
            if (isCurrentCanvasUsable()) canvas.renderAll();
          });
        },
        { crossOrigin: "anonymous" }
      );
    }

    return () => {
      cancelled = true;
    };
  }, [mainImageUrl, partMap, savedState, loadSVG, applyGlobalColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isCanvasUsable(canvas)) return;
    applyGlobalColors(canvas);
  }, [globalPartColors, applyGlobalColors]);

  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
    };
  }, [canvasRef]);

  return (
    <canvas
      id="product-customizer-canvas"
      className={styles["product-customizer-canvas"]}
    />
  );
};

export default ProductCustomizer;
