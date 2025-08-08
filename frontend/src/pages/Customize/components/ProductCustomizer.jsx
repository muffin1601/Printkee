import React, { useEffect } from "react";
import { fabric } from "fabric";
import "../styles/ProductCustomizer.css";

const ProductCustomizer = ({
  canvasRef,
  mainImageUrl,
  partMap = {},
  savedState,
  globalPartColors = {},
}) => {
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

    if (!canvasRef.current) {
      const canvas = new fabric.Canvas(canvasEl, {
        width,
        height,
        preserveObjectStacking: true,
      });
      canvasRef.current = canvas;
    } else {
      canvasRef.current.setWidth(width);
      canvasRef.current.setHeight(height);
      canvasRef.current.renderAll();
    }

    const handleResize = () => {
      const { width, height } = calculateSize();
      canvasRef.current.setWidth(width);
      canvasRef.current.setHeight(height);
      canvasRef.current.renderAll();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const applyGlobalColors = (canvas) => {
    if (!canvas) return;
    
    // Apply to all objects, not just main group
    canvas.getObjects().forEach(obj => {
      const applyColor = (o) => {
        if (o.customPart && globalPartColors[o.customPart]) {
          o.set("fill", globalPartColors[o.customPart]);
          o.dirty = true;
        }
        if (o._objects) o._objects.forEach(applyColor);
      };
      applyColor(obj);
    });
    canvas.requestRenderAll();
  };

  const loadSVG = async (url, canvas) => {
    try {
      const response = await fetch(url);
      const svgText = await response.text();
      
      // Save user objects before clearing
      const userObjects = canvas.getObjects().filter(obj => !obj.isPartOfGroup);
      const userObjectsData = userObjects.map(obj => obj.toObject());

      const cleaned = svgText
        .replace(/<\?xml[^>]+\?>/, '')
        .replace(/<!DOCTYPE[^>[]+(\[[^]]+\])?>/, '')
        .replace(/<\/*\s*[\w\-]+:/g, match => match.toLowerCase());

      fabric.loadSVGFromString(cleaned, (objects, options) => {
        if (!objects || objects.length === 0) {
          console.error("No objects loaded from SVG");
          return;
        }

        // Assign parts to objects
        const assignParts = (obj) => {
          if (obj.id) {
            for (const [part, ids] of Object.entries(partMap)) {
              if (ids.includes(obj.id)) {
                obj.customPart = part;
                break;
              }
            }
          }
          obj.set({ 
            objectCaching: true, 
            selectable: false,
            evented: false
          });
          if (obj._objects) obj._objects.forEach(assignParts);
        };

        objects.forEach(assignParts);

        const group = new fabric.Group(objects, {
          ...options,
          selectable: false,
          evented: false,
          isPartOfGroup: true // Mark as part of main group
        });

        // Calculate scaling
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
          originX: 'center',
          originY: 'center',
        });

        canvas.clear();
        canvas.add(group);
        canvas.mainGroup = group;

        // Restore user objects
        fabric.util.enlivenObjects(userObjectsData, (objects) => {
          objects.forEach(obj => {
            obj.set({
              selectable: true,
              evented: true
            });
            canvas.add(obj);
          });
          applyGlobalColors(canvas);
          canvas.renderAll();
        });
      }, null, {
        crossOrigin: 'anonymous',
        suppressPreamble: true,
      });
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mainImageUrl) return;

    console.log("Loading image:", mainImageUrl);

    // Handle saved JSON state
    if (savedState) {
      // Save current user objects
      const userObjects = canvas.getObjects().filter(obj => !obj.isPartOfGroup);
      const userObjectsData = userObjects.map(obj => obj.toObject());

      canvas.loadFromJSON(savedState, () => {
        // Restore main group reference
        canvas.mainGroup = canvas.getObjects().find(obj => obj.isPartOfGroup);
        
        // Restore user objects
        fabric.util.enlivenObjects(userObjectsData, (objects) => {
          objects.forEach(obj => {
            obj.set({
              selectable: true,
              evented: true
            });
            canvas.add(obj);
          });
          applyGlobalColors(canvas);
          canvas.renderAll();
        });
      });
      return;
    }

    // Detect file type
    const isSvg = mainImageUrl.toLowerCase().endsWith(".svg");

    if (isSvg) {
      loadSVG(mainImageUrl, canvas);
    } else {
      // For non-SVG images, preserve existing objects
      const existingObjects = canvas.getObjects();
      const existingObjectsData = existingObjects.map(obj => obj.toObject());

      fabric.Image.fromURL(mainImageUrl, (img) => {
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
          // Restore objects
          fabric.util.enlivenObjects(existingObjectsData, (objects) => {
            objects.forEach(obj => {
              obj.set({
                selectable: true,
                evented: true
              });
              canvas.add(obj);
            });
            canvas.renderAll();
          });
        });
      }, { 
        crossOrigin: "anonymous",
        error: (err) => console.error("Error loading image:", err)
      });
    }
  }, [mainImageUrl, partMap, savedState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Apply global colors when they change
    applyGlobalColors(canvas);

    const handleChange = () => {
      if (typeof window.updateThumbnailFromCanvas === "function") {
        window.updateThumbnailFromCanvas();
      }
    };

    canvas.on("object:modified", handleChange);
    canvas.on("object:added", handleChange);

    return () => {
      canvas.off("object:modified", handleChange);
      canvas.off("object:added", handleChange);
    };
  }, [globalPartColors]);

  return (
    <canvas
      id="product-customizer-canvas"
      className="product-customizer-canvas"
    />
  );
};

export default ProductCustomizer;