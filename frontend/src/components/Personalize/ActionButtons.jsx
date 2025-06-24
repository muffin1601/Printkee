// ActionButtons.jsx
import React from "react";
import {
  FaInfoCircle, FaEraser, FaTh, FaAlignCenter, FaExchangeAlt, FaArrowsAltV,
  FaUndo, FaClone, FaLock, FaUnlock, FaObjectGroup, FaTrash, FaEye
} from "react-icons/fa";
import "../../styles/ActionButtons.css";

const ActionButtons = ({ canvas }) => {
  const getActive = () => canvas?.getActiveObject();

  const toggleGrid = (canvas) => {
    // Grid toggling could be implemented if grid lines exist
    alert("Grid toggle is not yet implemented.");
  };

  const centerHorizontally = (canvas) => {
    const obj = canvas.getActiveObject();
    if (obj) {
      obj.centerH();
      canvas.renderAll();
    }
  };

  const flip = (canvas, axis) => {
    const obj = canvas.getActiveObject();
    if (!obj) return;
    if (axis === "x") obj.set("flipX", !obj.flipX);
    if (axis === "y") obj.set("flipY", !obj.flipY);
    canvas.renderAll();
  };

  const clone = (canvas) => {
    const active = canvas.getActiveObject();
    if (!active) return;
    active.clone((cloned) => {
      cloned.set({ left: active.left + 20, top: active.top + 20 });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
    });
  };

  const lock = (canvas) => {
    const obj = canvas.getActiveObject();
    if (obj) {
      obj.set({ selectable: false, evented: false });
      canvas.renderAll();
    }
  };

  const unlock = (canvas) => {
    canvas.getObjects().forEach((obj) => obj.set({ selectable: true, evented: true }));
    canvas.renderAll();
  };

  const group = (canvas) => {
    const objs = canvas.getActiveObjects();
    if (objs.length > 1) {
      const group = new fabric.Group(objs);
      canvas.discardActiveObject();
      objs.forEach((obj) => canvas.remove(obj));
      canvas.add(group);
      canvas.setActiveObject(group);
    }
  };

  const remove = (canvas) => {
    const obj = canvas.getActiveObject();
    if (obj) {
      canvas.remove(obj);
    }
  };

  const preview = (canvas) => {
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1
    });
    const w = window.open();
    w.document.write(`<img src="${dataURL}" style="max-width:100%;" />`);
  };

  return (
    <div className="action-toolbar">
      <button title="Info" onClick={() => alert("Customizer powered by Fabric.js")}><FaInfoCircle /></button>
      <button title="Clear All" onClick={() => canvas.clear()}><FaEraser /></button>
      <button title="Toggle Grid" onClick={() => toggleGrid(canvas)}><FaTh /></button>
      <button title="Center Horizontally" onClick={() => centerHorizontally(canvas)}><FaAlignCenter /></button>
      <button title="Flip Horizontal" onClick={() => flip(canvas, "x")}><FaExchangeAlt /></button>
      <button title="Flip Vertical" onClick={() => flip(canvas, "y")}><FaArrowsAltV /></button>
      <button title="Undo" onClick={() => canvas.undo?.()}><FaUndo /></button>
      <button title="Clone" onClick={() => clone(canvas)}><FaClone /></button>
      <button title="Lock" onClick={() => lock(canvas)}><FaLock /></button>
      <button title="Unlock" onClick={() => unlock(canvas)}><FaUnlock /></button>
      <button title="Group" onClick={() => group(canvas)}><FaObjectGroup /></button>
      <button title="Delete" onClick={() => remove(canvas)}><FaTrash /></button>
      <button title="Preview" onClick={() => preview(canvas)}><FaEye /></button>
    </div>
  );
};

export default ActionButtons;
