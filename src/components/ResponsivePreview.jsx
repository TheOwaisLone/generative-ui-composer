import React from "react";
import { useStore } from "../store/useStore";

/**
 * ResponsivePreview wraps children and constrains width based on previewSize
 * sizes:
 *  - desktop: 100% (full)
 *  - tablet: 900px
 *  - mobile: 390px
 *
 * This component adds a device-like frame and shows the size label.
 */
export default function ResponsivePreview({ children }) {
  const previewSize = useStore((s) => s.previewSize);
  const setPreviewSize = useStore((s) => s.setPreviewSize);

  const sizes = {
    desktop: { label: "Desktop", width: "100%", maxW: "100%" },
    tablet: { label: "Tablet", width: "900px", maxW: "100%" },
    mobile: { label: "Mobile", width: "390px", maxW: "100%" },
  };

  const active = sizes[previewSize] || sizes.desktop;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-1 rounded text-sm border ${
            previewSize === "desktop" ? "bg-sky-600 text-white" : ""
          }`}
          onClick={() => setPreviewSize("desktop")}
        >
          Desktop
        </button>

        <button
          className={`px-3 py-1 rounded text-sm border ${
            previewSize === "tablet" ? "bg-sky-600 text-white" : ""
          }`}
          onClick={() => setPreviewSize("tablet")}
        >
          Tablet
        </button>

        <button
          className={`px-3 py-1 rounded text-sm border ${
            previewSize === "mobile" ? "bg-sky-600 text-white" : ""
          }`}
          onClick={() => setPreviewSize("mobile")}
        >
          Mobile
        </button>
      </div>

      <div
        className="bg-white rounded-lg shadow-sm border overflow-hidden relative"
        style={{
          width: active.width,
          maxWidth: active.maxW,
          minHeight: "420px",
        }}
      >
        {/* device label */}
        <div className="absolute top-2 right-3 text-xs text-slate-500">
          {active.label}
        </div>

        {/* actual canvas slot */}
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}
