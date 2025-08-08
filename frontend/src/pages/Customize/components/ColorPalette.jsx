import React from "react";
import "../styles/ColorPalette.css";

const ColorPalette = ({
  canvasRef,
  updateThumbnail,
  labels = {},
  globalPartColors = {},
  setGlobalPartColors = () => {},
  viewStates = [],
  setViewStates = () => {},
  activeIndex = 0 // Add activeIndex as prop with default
}) => {
  const colorSet = () => [
    "#ffc5d6", "#ffa1bd", "#ccf11e", "#3472c1", "#ffb52c", "#8a141b",
    "#ff7331", "#fdfdfc", "#257137", "#ffd500", "#e21215",
    "#2430b9", "#d4b5cc", "#99b4d0", "#209866", "#212322", "#eca134",
    "#585757", "#989595", "#92435e", "#ebff00", "#ec4e74", "#5c3c31",
    "#aaaaa8", "#2f4340", "#dad1bc", "#663698", "#5ca5f7", "#e06d8c",
  ];

  const changePartColor = (part, color) => {
    // Store global color
    setGlobalPartColors(prev => ({
      ...prev,
      [part]: color,
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Save all user objects (text, logos) that aren't part of the main group
    const userObjects = canvas.getObjects().filter(
      obj => obj !== canvas.mainGroup && !obj.isPartOfGroup
    );

    // 2. Serialize user objects with all important properties
    const userObjectsData = userObjects.map(obj => {
      const baseProps = obj.toObject([
        'type', 'left', 'top', 'scaleX', 'scaleY', 'angle', 
        'flipX', 'flipY', 'fontFamily', 'fill', 'text', 
        'src', 'width', 'height'
      ]);
      
      // For text objects, preserve additional properties
      if (obj.type === 'textbox' || obj.type === 'text') {
        baseProps.fontSize = obj.fontSize;
        baseProps.fontWeight = obj.fontWeight;
        baseProps.textAlign = obj.textAlign;
      }
      
      return baseProps;
    });

    // 3. Save current view state
    const currentZoom = canvas.getZoom();
    const currentViewportTransform = [...canvas.viewportTransform];
    const currentActiveObject = canvas.getActiveObject();

    // 4. Update all view states with new color
    const newViewStates = viewStates.map(state => {
      if (!state) return state;

      const newState = JSON.parse(JSON.stringify(state));

      const updateObjects = (objs) => {
        objs.forEach(obj => {
          if (obj.customPart === part) {
            obj.fill = color;
          }
          if (obj.objects) {
            updateObjects(obj.objects);
          }
        });
      };

      if (newState.objects) {
        updateObjects(newState.objects);
      }

      return newState;
    });

    setViewStates(newViewStates);

    // 5. Apply changes to current canvas
    const applyChanges = () => {
      // Apply color to main group
      const grp = canvas.mainGroup;
      if (grp) {
        const applyColor = (o) => {
          if (o.customPart === part) {
            o.set("fill", color);
            o.dirty = true;
          }
          if (o._objects) o._objects.forEach(applyColor);
        };
        applyColor(grp);
      }

      // Restore zoom/pan
      canvas.setZoom(currentZoom);
      canvas.viewportTransform = currentViewportTransform;

      // Try to restore active object
      if (currentActiveObject && !currentActiveObject.isPartOfGroup) {
        const similarObj = canvas.getObjects().find(o => 
          o.type === currentActiveObject.type &&
          Math.abs(o.left - currentActiveObject.left) < 5 &&
          Math.abs(o.top - currentActiveObject.top) < 5
        );
        if (similarObj) canvas.setActiveObject(similarObj);
      }

      canvas.requestRenderAll();
      updateThumbnail();
    };

    // 6. If we have a saved state, load it first
    const currentState = viewStates[activeIndex];
    if (currentState) {
      canvas.loadFromJSON(currentState, () => {
        // Restore main group reference
        canvas.mainGroup = canvas.getObjects().find(obj => obj.type === 'group');

        // Restore user objects
        fabric.util.enlivenObjects(userObjectsData, (enlivenedObjects) => {
          enlivenedObjects.forEach(obj => {
            obj.set({
              selectable: true,
              evented: true,
            });
            canvas.add(obj);
          });
          
          applyChanges();
        });
      });
    } else {
      // No saved state, just apply color changes
      applyChanges();
    }
  };

  return (
    <div className="color-palette-container">
      {Object.entries(labels).map(([part, label]) => (
        <div className="color-palette-row" key={part}>
          <label className="color-palette-label">{label}</label>
          <div className="color-swatches">
            {colorSet().map((c) => (
              <div
                key={c}
                className="color-swatch"
                style={{ backgroundColor: c }}
                onClick={() => changePartColor(part, c)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;