import React from "react";
import "../styles/VerticalToolbar.css";
import { FaUpload, FaFont, FaPalette, FaUserEdit, FaSave, FaEye } from "react-icons/fa";

const VerticalToolbar = ({ onSelectTool, activeTool, flag }) => {
    const tools = [
        { id: "upload", icon: <FaUpload className="vertical-toolbar-icon" />, label: "Upload" },
        { id: "text", icon: <FaFont className="vertical-toolbar-icon" />, label: "Text" },
        { id: "color", icon: <FaPalette className="vertical-toolbar-icon" />, label: "Color" },
        { id: "name", icon: <FaUserEdit className="vertical-toolbar-icon" />, label: "Name" },
        { id: "export", icon: <FaSave className="vertical-toolbar-icon" />, label: "Save" },
        { id: "preview", icon: <FaEye className="vertical-toolbar-icon" />, label: "Preview" },
    ];

    const visibleTools = flag ? tools : tools.filter(tool => tool.id !== "color" && tool.id !== "name" && tool.id !== "preview");

    return (
        <div className="vertical-toolbar-container">
            {visibleTools.map(({ id, icon, label }) => (
                <button
                    key={id}
                    className={`vertical-toolbar-btn ${activeTool === id ? "active-tool" : ""}`}
                    onClick={() => onSelectTool(id)}
                >
                    {icon}
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
};

export default VerticalToolbar;
