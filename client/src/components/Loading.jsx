import React from "react";
import "../css/loading.css";

/**
 * Reusable Loading Spinner Component
 * @param {string} size - "small", "medium", or "large" (default: "medium")
 * @param {boolean} overlay - Show as full-page overlay (default: true)
 */
export default function Loading({ size = "medium", overlay = true }) {
  return (
    <>
      {overlay ? (
        <div className="loading-overlay">
          <div className={`loading-spinner ${size}`}></div>
        </div>
      ) : (
        <div className={`loading-spinner ${size}`}></div>
      )}
    </>
  );
}
