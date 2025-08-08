import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import "./styles/CustomizerSVG.css";


const svgMap = {
  polotshirt: [
    "/polo/front.svg",
    "/polo/back.svg",
    "/polo/left.svg",
    "/polo/right.svg",
  ],
  roundneck: [
    "/round/front.svg",
    "/round/back.svg",
    "/round/left.svg",
    "/round/right.svg",
  ],
  cap: [
    "/cap/front.svg",
    "/cap/back.svg",
    "/cap/left.svg",
    "/cap/right.svg",
  ],
};

const labelMap = {
  polotshirt: {
    fullTshirt: "Body",
    collar: "Collar",
    sleeves: "Sleeves",
  },
  roundneck: {
    fullTshirt: "Body",
    collar: "Neck Rib",
    sleeves: "Sleeves",
  },
  cap: {
    fullTshirt: "Crown",
    collar: "Top Button",
    sleeves: "Peak",
    border: "Sandwich",
  },
};

const partMapSet = {
  polotshirt: {
    collar: [
      "front-part-7", "front-part-12", "front-part-23", "front-part-50",
      "front-part-51", "front-part-36", "front-part-14", "front-part-15",
      "back-part-7", "back-part-12", "back-part-11", "left-part-7", "left-part-13",
      "left-part-69", "left-part-10", "left-part-11", "right-part-12", "right-part-5",
      "right-part-50", "right-part-7", "right-part-11"
    ],
    sleeves: [
      "front-part-5", "front-part-6", "back-part-5", "back-part-4",
      "right-part-4", "left-part-4"
    ],
    fullTshirt: [
      "front-part-2", "front-part-8", "front-part-10",
      "back-part-2", "back-part-6",
      "left-part-2", "left-part-9", "left-part-12", "left-part-8",
      "right-part-2", "right-part-9", "right-part-8", "right-part-6",
    ]
  },
  roundneck: {
    fullTshirt: [
      "front_path_2", "front_path_6", "front_path_8", "back_path_2",
      "back_path_6",
      "left_path_6", "left_path_2", "right_path_1", "right_path_6"
    ],
    sleeves: [
      "front_path_4", "front_path_5", "back_path_4", "back_path_5",
      "left_path_3", "right_path_3"
    ],
    collar: [
      "front_path_7", "front_path_10", "front_path_11", "front_path_9", "back_path_8",
      "back_path_11", "back_path_12", "left_path_8", "left_path_7", "left_path_9",
      "right_path_8",
      "right_path_9", "right_path_7"

    ]
  },

   cap: {
    fullTshirt: [
      "path_2", "path_29", "path_28", "path_33",
      "path_34", "path_43","path_51", "path_42", "path_35", "path_36",
      "path_46", "path_47", "path_41", "path_86", "path_87", "path_90", "path_91","path_32","path_38", "path_37", "path_40", "path_52",
      "path_53", "path_55"
    ],
    sleeves: [
       "path_4", "path_5",  "path_88",
       "path_92","path_48",  "path_50"
    ],
    collar: [
      "path_97", "path_56", "path_39", "path_8",
    ],
    border: [
      "path_6","path_96","path_54"
    ]
  },
};


const CustomizerSVG = () => {
  const canvasRef = useRef(null);
  const thumbnailCanvasRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const { productType } = useParams();
  console.log("Product Type:", productType);
  
  const selectedSVGs = svgMap[productType] || svgMap.polotshirt;
  const colorLabels = labelMap[productType] || labelMap.polotshirt;
  const partMap = partMapSet[productType] || partMapSet.polotshirt;
  const [viewStates, setViewStates] = useState([null, null, null, null]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTool, setActiveTool] = useState("color");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [globalPartColors, setGlobalPartColors] = useState({});
  const [flag, setFlag] = useState(true);

  useEffect(() => {
      const allowedExportProductType = ["polotshirt", "roundneck"];
      if (allowedExportProductType.map(c => c.toLowerCase()).includes(productType.toLowerCase())) {
        setActiveTool("export");
      }
    }, [productType]);

  const saveCurrentViewState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const json = canvas.toJSON(['id', 'customPart']); 
    const newStates = [...viewStates];
    newStates[activeIndex] = json;
    setViewStates(newStates);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length === 0) return;

    const prevState = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);

    const currentState = canvas.toJSON(['id', 'customPart']);
    setUndoStack(newUndoStack);
    setRedoStack(prev => [...prev, currentState]);

    canvas.loadFromJSON(prevState, () => {
      canvas.renderAll();
      updateThumbnail(activeIndex);
    });
  };

  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;

    const nextState = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);

    const currentState = canvas.toJSON(['id', 'customPart']);
    setRedoStack(newRedoStack);
    setUndoStack(prev => [...prev, currentState]);

    canvas.loadFromJSON(nextState, () => {
      canvas.renderAll();
      updateThumbnail(activeIndex);
    });
  };

  useEffect(() => {
    window.updateThumbnailFromCanvas = () => updateThumbnail(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const saveState = () => {
      const json = canvas.toJSON(['id', 'customPart']);
      setUndoStack(prev => [...prev, json]);
      setRedoStack([]); 
    };

    canvas.on('object:modified', saveState);
    canvas.on('object:added', saveState);

    return () => {
      canvas.off('object:modified', saveState);
      canvas.off('object:added', saveState);
    };
  }, []);

  const handleThumbnailClick = (index) => {
  if (index === activeIndex) return;
  
  // Save current state before switching
  saveCurrentViewState();
  setActiveIndex(index);
  
  const canvas = canvasRef.current;
  if (!canvas) return;

  // Store current viewport settings
  const currentZoom = canvas.getZoom();
  const currentPan = canvas.viewportTransform;
  const currentActiveObject = canvas.getActiveObject();

  // Get all user-added objects (text, logos, etc.)
  const userObjects = canvas.getObjects().filter(obj => {
    return !obj.isPartOfGroup && obj !== canvas.mainGroup;
  });

  // Store their properties including positions
  const userObjectsData = userObjects.map(obj => ({
    obj,
    original: obj.toObject(['left', 'top', 'scaleX', 'scaleY', 'angle', 'flipX', 'flipY'])
  }));

  const newState = viewStates[index];
  
  if (newState) {
    // Load the new state while preserving user objects
    canvas.loadFromJSON(newState, () => {
      // Restore the main group reference
      canvas.mainGroup = canvas.getObjects().find(obj => obj.type === 'group');
      
      // Re-add and reposition user objects
      userObjectsData.forEach(({obj, original}) => {
        const newObj = new fabric[obj.type](obj.toObject());
        newObj.set(original);
        canvas.add(newObj);
      });

      // Restore viewport settings
      canvas.setZoom(currentZoom);
      canvas.viewportTransform = currentPan;
      
      // Restore active object if it was a user object
      if (currentActiveObject && !currentActiveObject.isPartOfGroup) {
        const restoredObj = canvas.getObjects().find(o => 
          o.type === currentActiveObject.type && 
          o.left === currentActiveObject.left && 
          o.top === currentActiveObject.top
        );
        if (restoredObj) canvas.setActiveObject(restoredObj);
      }

      applyGlobalColors(canvas);
      canvas.renderAll();
    });
  } else {
    // For new views without saved state
    canvas.clear();
    
    // Re-add user objects to blank canvas
    userObjectsData.forEach(({obj, original}) => {
      const newObj = new fabric[obj.type](obj.toObject());
      newObj.set(original);
      canvas.add(newObj);
    });

    // Load the default view
    setTimeout(() => {
      applyGlobalColors(canvas);
      canvas.setZoom(currentZoom);
      canvas.viewportTransform = currentPan;
      canvas.renderAll();
    }, 100);
  }
};

  const updateThumbnail = (index) => {
    const srcCanvas = canvasRef.current;
    const dstCanvas = thumbnailCanvasRefs.current[index]?.current;
    if (!srcCanvas || !dstCanvas) return;

    const dataUrl = srcCanvas.toDataURL({ format: "png" });

    const thumbCanvas = new fabric.StaticCanvas(dstCanvas);
    fabric.Image.fromURL(dataUrl, (img) => {
      const scale = Math.min(
        dstCanvas.width / img.width,
        dstCanvas.height / img.height
      );
      img.scale(scale);
      img.set({
        left: (dstCanvas.width - img.width * scale) / 2,
        top: (dstCanvas.height - img.height * scale) / 2,
      });

      thumbCanvas.clear();
      thumbCanvas.add(img);
      thumbCanvas.renderAll();
    });
  };

  const applyGlobalColors = (canvas) => {
  if (!canvas || !globalPartColors || Object.keys(globalPartColors).length === 0) return;
  
  // Apply colors to both the main group AND any user-added objects that have customPart
  const applyColor = (o) => {
    // Skip if object is locked or doesn't have customPart
    if (o.locked || !o.customPart) return;
    
    const part = o.customPart;
    if (globalPartColors[part]) {
      o.set("fill", globalPartColors[part]);
      o.dirty = true;
    }
    
    // Recursively apply to child objects (for groups)
    if (o._objects) {
      o._objects.forEach(applyColor);
    }
  };

  // Apply to main SVG group
  const grp = canvas.mainGroup;
  if (grp) applyColor(grp);

  // Apply to all other objects (including user-added ones that might have customPart)
  canvas.getObjects().forEach(obj => {
    // Skip main group (already processed) and objects without customPart
    if (obj !== grp && obj.customPart) {
      applyColor(obj);
    }
  });

  canvas.requestRenderAll();
};

  useEffect(() => {
    if (activeTool === "preview") {
      saveCurrentViewState();
      setIsPreviewOpen(true);
    } else {
      setIsPreviewOpen(false);
    }
  }, [activeTool]);

  useEffect(() => {
    if (!isPreviewOpen) {
      
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.renderAll();
        canvas.calcOffset(); 
      }
    }
  }, [isPreviewOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const applyGlobalColors = () => {
      const grp = canvas.mainGroup;
      if (!grp || !globalPartColors || Object.keys(globalPartColors).length === 0) return;

      const applyColor = (o) => {
        const part = o.customPart;
        if (part && globalPartColors[part]) {
          o.set("fill", globalPartColors[part]);
          o.dirty = true;
        }
        if (o._objects) o._objects.forEach(applyColor);
      };

      applyColor(grp);
      canvas.requestRenderAll();
      updateThumbnail(activeIndex);
    };

    applyGlobalColors();
  }, [globalPartColors, activeIndex]); 

  return (
    
      <div className="customizer-page">
        <h2 className="customizer-title">Create your design</h2>

        <div className="customizer-container">
          <div className="top-tools-bar">
            <CanvasToolbar
              canvasRef={canvasRef}
              onUndo={handleUndo}
              onRedo={handleRedo}
            />
            <ThumbnailGallery
              thumbnailCanvasRefs={thumbnailCanvasRefs}
              activeIndex={activeIndex}
              initialSVGs={selectedSVGs}
              onThumbnailClick={handleThumbnailClick}
            />
          </div>

          <div className="customizer-main">

            <div className="vertical-toolbar">
              <VerticalToolbar onSelectTool={setActiveTool} flag={flag} productType = {productType} />
            </div>

            <div className="customizer-controls">
              {activeTool === "upload" && (
                <UploadControls
                  canvasRef={canvasRef}
                  updateThumbnail={() => updateThumbnail(activeIndex)}
                />
              )}
              {activeTool === "text" && (
                <TextControls
                  canvasRef={canvasRef}
                  updateThumbnail={() => updateThumbnail(activeIndex)}
                />
              )}
              {activeTool === "color" && (
                <ColorPalette
                  canvasRef={canvasRef}
                  updateThumbnail={() => updateThumbnail(activeIndex)}
                  labels={colorLabels}
                  globalPartColors={globalPartColors}
                  setGlobalPartColors={setGlobalPartColors}
                  saveCurrentViewState={saveCurrentViewState}
                  viewStates={viewStates}
                  setViewStates={setViewStates}
                />
              )}
              {activeTool === "name" && (
                <NameNumberInput
                  canvasRef={canvasRef}
                  updateThumbnail={() => updateThumbnail(activeIndex)}
                />
              )}
              {activeTool === "export" && (
                <ExportButtons
                  canvasRef={canvasRef}
                  thumbnailCanvasRefs={thumbnailCanvasRefs}
                  viewStates={viewStates}
                  
                />
              )}
            </div>
            <div className="canvas-wrapper">
              <ProductCustomizer
                canvasRef={canvasRef}
                mainImageUrl={selectedSVGs[activeIndex]}
                partMap={partMap}
                savedState={viewStates[activeIndex]}
                globalPartColors={globalPartColors}
              />
            </div>
          </div>

          <PreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setActiveTool("export")}
            viewStates={viewStates}
            originalSVGs={selectedSVGs}
          />
        </div>
      </div>
      
  );
};

export default CustomizerSVG;                                                                                                                                                                                                                                                                                                                                                                                                                                           