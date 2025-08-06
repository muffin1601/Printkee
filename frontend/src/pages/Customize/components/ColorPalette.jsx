import React from "react";
import "../styles/ColorPalette.css";

const ColorPalette = ({
  canvasRef,
  updateThumbnail,
  labels = {},
  globalPartColors = {},
  setGlobalPartColors = () => {},
  viewStates = [], // Add default value
  setViewStates = () => {} // Add default value
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

    // Apply to all view states
    const newViewStates = viewStates.map(state => {
      if (!state) return state;

      // Clone the state to avoid mutation
      const newState = JSON.parse(JSON.stringify(state));

      // Find and update all objects with matching customPart
      if (newState.objects) {
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
        updateObjects(newState.objects);
      }

      return newState;
    });

    setViewStates(newViewStates);

    // Apply to current canvas
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
      canvas.requestRenderAll();
      updateThumbnail();
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
