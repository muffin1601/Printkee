"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { fabric } from "fabric";

import CanvasToolbar from "./components/CanvasToolbar";
import ThumbnailGallery from "./components/ThumbnailGallery";
import ProductCustomizer from "./components/ProductCustomizer";
import UploadControls from "./components/UploadControls";
import TextControls from "./components/TextControls";
import ColorPalette from "./components/ColorPalette";
import NameNumberInput from "./components/NameNumberInput";
import ExportButtons from "./components/ExportButtons";
import VerticalToolbar from "./components/VerticalToolbar";
import PreviewModal from "./components/PreviewModal";

import styles from "./styles/CustomizerSVG.module.css";

// ---------------- SVG MAP ----------------
const svgMap = {
  polotshirt: ["/polo/front.svg", "/polo/back.svg", "/polo/left.svg", "/polo/right.svg"],
  roundneck:  ["/round/front.svg", "/round/back.svg", "/round/left.svg", "/round/right.svg"],
  cap:        ["/cap/front.svg", "/cap/back.svg", "/cap/left.svg", "/cap/right.svg"],
};

const labelMap = {
  polotshirt: { fullTshirt: "Body", collar: "Collar", sleeves: "Sleeves" },
  roundneck:  { fullTshirt: "Body", collar: "Neck Rib", sleeves: "Sleeves" },
  cap:        { fullTshirt: "Crown", collar: "Top Button", sleeves: "Peak", border: "Sandwich" },
};

const partMapSet = {
  polotshirt: {
    collar: [
      "front-part-7","front-part-12","front-part-23","front-part-50","front-part-51",
      "front-part-36","front-part-14","front-part-15","back-part-7","back-part-12",
      "back-part-11","left-part-7","left-part-13","left-part-69","left-part-10",
      "left-part-11","right-part-12","right-part-5","right-part-50","right-part-7","right-part-11",
    ],
    sleeves: [
      "front-part-5","front-part-6","back-part-5","back-part-4","right-part-4","left-part-4",
    ],
    fullTshirt: [
      "front-part-2","front-part-8","front-part-10","back-part-2","back-part-6",
      "left-part-2","left-part-9","left-part-12","left-part-8",
      "right-part-2","right-part-9","right-part-8","right-part-6",
    ],
  },
  roundneck: {
    fullTshirt: [
      "front_path_2","front_path_6","front_path_8","back_path_2","back_path_6",
      "left_path_6","left_path_2","right_path_1","right_path_6",
    ],
    sleeves: [
      "front_path_4","front_path_5","back_path_4","back_path_5","left_path_3","right_path_3",
    ],
    collar: [
      "front_path_7","front_path_10","front_path_11","front_path_9",
      "back_path_8","back_path_11","back_path_12",
      "left_path_8","left_path_7","left_path_9",
      "right_path_8","right_path_9","right_path_7",
    ],
  },
  cap: {
    fullTshirt: [
      "path_2","path_29","path_28","path_33","path_34","path_43","path_51","path_42",
      "path_35","path_36","path_46","path_47","path_41","path_86","path_87","path_90",
      "path_91","path_32","path_38","path_37","path_40","path_52","path_53","path_55",
    ],
    sleeves: ["path_4","path_5","path_88","path_92","path_48","path_50"],
    collar:  ["path_97","path_56","path_39","path_8"],
    border:  ["path_6","path_96","path_54"],
  },
};

// Full serialisation fields — used consistently everywhere
const USER_OBJ_FIELDS = [
  "type","left","top","scaleX","scaleY","angle","flipX","flipY",
  "fontFamily","fill","text","src","width","height",
  "fontSize","fontWeight","textAlign","customPart","isUserObject",
];

const applyGlobalColors = (canvas, colors) => {
  if (!canvas || !colors) return;
  const applyColorToObj = (obj) => {
    if (obj.customPart && colors[obj.customPart]) {
      obj.set("fill", colors[obj.customPart]);
      obj.set("dirty", true);
    }
    if (obj._objects?.length) obj._objects.forEach(applyColorToObj);
  };
  canvas.getObjects().forEach(applyColorToObj);
  canvas.renderAll();
};

// ---------------- COMPONENT ----------------
const CustomizerSVG = () => {
  const { productType } = useParams();

  const canvasRef      = useRef(null);
  const thumbnailCanvasRefs = useRef([
    React.createRef(), React.createRef(), React.createRef(), React.createRef(),
  ]);
  // Track StaticCanvas instances so we can dispose before recreating (BUG 7 fix)
  const thumbStaticCanvases = useRef([null, null, null, null]);

  const selectedSVGs  = svgMap[productType]  || svgMap.polotshirt;
  const colorLabels   = labelMap[productType] || labelMap.polotshirt;
  const partMap       = partMapSet[productType] || partMapSet.polotshirt;

  const [viewStates,      setViewStates]      = useState([null, null, null, null]);
  const [activeIndex,     setActiveIndex]     = useState(0);
  const [globalPartColors, setGlobalPartColors] = useState({});
  const [isPreviewOpen,   setIsPreviewOpen]   = useState(false);

  // FIX B6: Derive initial tool directly from productType — no useEffect flash
  const [activeTool, setActiveTool] = useState(() =>
    ["polotshirt", "roundneck"].includes((productType || "").toLowerCase())
      ? "export"
      : "color"
  );

  // FIX B1 + B4: viewStatesRef mirrors viewStates so all reads are fresh
  const viewStatesRef = useRef([null, null, null, null]);
  const syncViewStates = useCallback((updater) => {
    setViewStates((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      viewStatesRef.current = next;
      return next;
    });
  }, []);

  // FIX B1: Undo/Redo stacks
  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);

  // Capture a history snapshot before a destructive operation
  const captureHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snapshot = {
      json: canvas.toJSON(["id", "customPart"]),
      globalPartColors: { ...globalPartColors },
      userObjects: canvas.getObjects()
        .filter((o) => o.isUserObject)
        .map((o) => o.toObject(USER_OBJ_FIELDS)),
    };
    undoStackRef.current = [...undoStackRef.current, snapshot];
    redoStackRef.current = [];                // clear redo on new action
  }, [globalPartColors]);

  const restoreSnapshot = useCallback((snapshot) => {
    const canvas = canvasRef.current;
    if (!canvas || !snapshot) return;
    setGlobalPartColors(snapshot.globalPartColors || {});
    canvas.loadFromJSON(snapshot.json, () => {
      fabric.util.enlivenObjects(snapshot.userObjects || [], (objs) => {
        objs.forEach((obj) => {
          obj.isUserObject = true;
          obj.set({ selectable: true, evented: true });
          canvas.add(obj);
        });
        applyGlobalColors(canvas, snapshot.globalPartColors || {});
        canvas.renderAll();
      });
    });
  }, []);

  const handleUndo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || undoStackRef.current.length === 0) return;
    // Push current state onto redo stack
    const current = {
      json: canvas.toJSON(["id", "customPart"]),
      globalPartColors: { ...globalPartColors },
      userObjects: canvas.getObjects()
        .filter((o) => o.isUserObject)
        .map((o) => o.toObject(USER_OBJ_FIELDS)),
    };
    redoStackRef.current = [...redoStackRef.current, current];
    const prev = undoStackRef.current[undoStackRef.current.length - 1];
    undoStackRef.current = undoStackRef.current.slice(0, -1);
    restoreSnapshot(prev);
  }, [globalPartColors, restoreSnapshot]);

  const handleRedo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || redoStackRef.current.length === 0) return;
    const current = {
      json: canvas.toJSON(["id", "customPart"]),
      globalPartColors: { ...globalPartColors },
      userObjects: canvas.getObjects()
        .filter((o) => o.isUserObject)
        .map((o) => o.toObject(USER_OBJ_FIELDS)),
    };
    undoStackRef.current = [...undoStackRef.current, current];
    const next = redoStackRef.current[redoStackRef.current.length - 1];
    redoStackRef.current = redoStackRef.current.slice(0, -1);
    restoreSnapshot(next);
  }, [globalPartColors, restoreSnapshot]);

  // ---------- EXTRACT USER OBJECTS ----------
  const extractUserObjects = (canvas) =>
    canvas.getObjects().filter((o) => o.isUserObject);

  // ---------- SAVE CURRENT VIEW ----------
  const saveCurrentViewState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const userObjects = extractUserObjects(canvas).map((o) =>
      o.toObject(USER_OBJ_FIELDS)
    );
    const json = canvas.toJSON(["id", "customPart"]);
    syncViewStates((prev) => {
      const updated = [...prev];
      updated[activeIndex] = { ...json, userObjects, globalPartColors: { ...globalPartColors } };
      return updated;
    });
  }, [activeIndex, globalPartColors, syncViewStates]);

  // ---------- SWITCH VIEW ----------
  const handleThumbnailClick = useCallback((index) => {
    if (index === activeIndex) return;
    saveCurrentViewState();
    setActiveIndex(index);
  }, [activeIndex, saveCurrentViewState]);

  // ---------- UPDATE THUMBNAIL (FIX B4 + B7) ----------
  const updateThumbnail = useCallback((index) => {
    const mainCanvas  = canvasRef.current;
    const thumbEl     = thumbnailCanvasRefs.current[index]?.current;
    if (!mainCanvas || !thumbEl) return;

    // FIX B4: Read from ref — always fresh
    const state = viewStatesRef.current[index];
    if (!state) return;

    const tempCanvas = new fabric.Canvas(document.createElement("canvas"), {
      width:  thumbEl.width  || 120,
      height: thumbEl.height || 120,
    });

    tempCanvas.loadFromJSON(state, () => {
      applyGlobalColors(tempCanvas, state.globalPartColors || {});

      setTimeout(() => {
        const imgURL = tempCanvas.toDataURL();

        // FIX B7: Dispose existing StaticCanvas before creating a new one
        if (thumbStaticCanvases.current[index]) {
          try { thumbStaticCanvases.current[index].dispose(); } catch (_) {}
          thumbStaticCanvases.current[index] = null;
        }

        const staticThumb = new fabric.StaticCanvas(thumbEl);
        thumbStaticCanvases.current[index] = staticThumb;

        fabric.Image.fromURL(imgURL, (img) => {
          const w = thumbEl.width  || 120;
          const h = thumbEl.height || 120;
          const scale = Math.min(w / img.width, h / img.height);
          img.scale(scale);
          img.set({
            left: (w - img.width  * scale) / 2,
            top:  (h - img.height * scale) / 2,
          });
          staticThumb.clear();
          staticThumb.add(img);
          staticThumb.renderAll();
        });

        tempCanvas.dispose();
      }, 50);
    });
  }, []);

  const updateAllThumbnails = useCallback(() =>
    thumbnailCanvasRefs.current.forEach((_, i) => updateThumbnail(i)),
  [updateThumbnail]);

  // ---------- GLOBAL COLOR UPDATE (FIX B2) ----------
  const handleGlobalColorChange = useCallback((newColors) => {
    captureHistory();                         // snapshot before change

    setGlobalPartColors(newColors);
    const canvas = canvasRef.current;
    if (canvas) applyGlobalColors(canvas, newColors);

    syncViewStates((prev) =>
      prev.map((state, i) => {
        if (!state) return state;
        return {
          ...state,
          globalPartColors: newColors,
          // FIX B2: use the same full field list as saveCurrentViewState
          userObjects:
            i === activeIndex && canvas
              ? extractUserObjects(canvas).map((o) => o.toObject(USER_OBJ_FIELDS))
              : state.userObjects,
        };
      })
    );

    // thumbnails will read fresh state from viewStatesRef after syncViewStates
    requestAnimationFrame(() => updateAllThumbnails());
  }, [activeIndex, captureHistory, syncViewStates, updateAllThumbnails]);

  // ---------- LOAD VIEW (FIX B3) ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = viewStatesRef.current[activeIndex];
    if (!state) return;

    // FIX B3: use state.globalPartColors, not the stale closure value
    const colors = state.globalPartColors || {};
    setGlobalPartColors(colors);

    canvas.loadFromJSON(state, () => {
      fabric.util.enlivenObjects(state.userObjects || [], (objs) => {
        objs.forEach((obj) => {
          obj.isUserObject = true;
          obj.set({ selectable: true, evented: true });
          canvas.add(obj);
        });
        applyGlobalColors(canvas, colors);   // use fresh colors, not stale closure
        canvas.renderAll();
      });
    });
  }, [activeIndex]);

  useEffect(() => updateAllThumbnails(), [globalPartColors, updateAllThumbnails]);

  // ---------- PREVIEW ----------
  useEffect(() => {
    if (activeTool === "preview") {
      saveCurrentViewState();
      setIsPreviewOpen(true);
    } else {
      setIsPreviewOpen(false);
    }
  }, [activeTool, saveCurrentViewState]);

  // Cleanup static canvases on unmount
  useEffect(() => {
    return () => {
      thumbStaticCanvases.current.forEach((sc) => {
        if (sc) { try { sc.dispose(); } catch (_) {} }
      });
    };
  }, []);

  return (
    <div className={styles["customizer-page"]}>
      <h2 className={styles["customizer-title"]}>Create your design</h2>

      <div className={styles["customizer-container"]}>
        <div className={styles["top-tools-bar"]}>
          {/* FIX B1: pass real undo/redo handlers */}
          <CanvasToolbar canvasRef={canvasRef} onUndo={handleUndo} onRedo={handleRedo} />

          <ThumbnailGallery
            thumbnailCanvasRefs={thumbnailCanvasRefs}
            activeIndex={activeIndex}
            initialSVGs={selectedSVGs}
            onThumbnailClick={handleThumbnailClick}
          />
        </div>

        <div className={styles["customizer-main"]}>
          <div className={styles["vertical-toolbar"]}>
            {/* FIX B5: pass activeTool so active button is highlighted */}
            <VerticalToolbar
              onSelectTool={setActiveTool}
              activeTool={activeTool}
              flag={true}
              productType={productType}
            />
          </div>

          <div className={styles["customizer-controls"]}>
            {activeTool === "upload" && (
              <UploadControls
                canvasRef={canvasRef}
                updateThumbnail={() => updateThumbnail(activeIndex)}
                saveCurrentViewState={saveCurrentViewState}
                captureHistory={captureHistory}
              />
            )}

            {activeTool === "text" && (
              <TextControls
                canvasRef={canvasRef}
                updateThumbnail={() => updateThumbnail(activeIndex)}
                saveCurrentViewState={saveCurrentViewState}
                captureHistory={captureHistory}
              />
            )}

            {activeTool === "color" && (
              <ColorPalette
                labels={colorLabels}
                globalPartColors={globalPartColors}
                setGlobalPartColors={handleGlobalColorChange}
              />
            )}

            {activeTool === "name" && (
              <NameNumberInput
                canvasRef={canvasRef}
                updateThumbnail={() => updateThumbnail(activeIndex)}
                saveCurrentViewState={saveCurrentViewState}
                captureHistory={captureHistory}
              />
            )}

            {activeTool === "export" && (
              <ExportButtons
                canvasRef={canvasRef}
                thumbnailCanvasRefs={thumbnailCanvasRefs}
                viewStates={viewStates}
                onOpenPreview={() => setIsPreviewOpen(true)}
              />
            )}
          </div>

          <div className={styles["canvas-wrapper"]}>
            <ProductCustomizer
              canvasRef={canvasRef}
              partMap={partMap}
              savedState={viewStates[activeIndex]}
              globalPartColors={globalPartColors}
              mainImageUrl={selectedSVGs[activeIndex]}
            />
          </div>
        </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            // FIX B8: only reset tool if it was "preview" — preserve "export" context
            if (activeTool === "preview") setActiveTool("export");
          }}
          viewStates={viewStates}
          originalSVGs={selectedSVGs}
          globalPartColors={globalPartColors}
        />
      </div>
    </div>
  );
};

export default CustomizerSVG;
