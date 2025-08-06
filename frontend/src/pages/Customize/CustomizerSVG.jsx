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
    collar: "Peak",
    sleeves: "Bottom",
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
  const [activeTool, setActiveTool] = useState("export");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [globalPartColors, setGlobalPartColors] = useState({});
  const [flag, setFlag] = useState(true);

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
    saveCurrentViewState();
    setActiveIndex(index);
    const canvas = canvasRef.current;
    const newState = viewStates[index];
    if (canvas) {
      if (newState) {
        canvas.loadFromJSON(newState, () => {
          
          canvas.mainGroup = canvas.getObjects().find(obj => obj.type === 'group');
          applyGlobalColors(canvas);
          canvas.renderAll();
        });
      } else {
        
        setTimeout(() => {
          applyGlobalColors(canvas);
        }, 100);
      }
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
    if (!canvas || !globalPartColors) return;
    const grp = canvas.mainGroup;
    if (!grp) return;

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
              <VerticalToolbar onSelectTool={setActiveTool} flag={flag} />
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