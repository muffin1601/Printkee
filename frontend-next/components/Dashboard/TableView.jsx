"use client";
import React from "react";

const TableView = ({ columns, data, onEdit, onDelete }) => (
  <table className="admin-table">
    <thead>
      <tr>
        {columns.map((col, i) => (
          <th key={i}>{col}</th>
        ))}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
            No records found
          </td>
        </tr>
      ) : (
        data.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((val, idx) => (
              <td key={idx}>{String(val)}</td>
            ))}
            <td>
              <button onClick={() => onEdit(row)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => onDelete(row._id)} className="delete-btn">
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default TableView;
