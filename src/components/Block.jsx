import React, { useRef, useEffect, useState } from "react";
import { useStore } from "../store/useStore";

/**
 * Draggable Block using pointer events.
 * - block: { id, type, x, y, width, height, text }
 * - canvasRef: ref to parent canvas for bounds
 */
export default function Block({ block, canvasRef }) {
  const updateBlock = useStore((s) => s.updateBlock);
  const removeBlock = useStore((s) => s.removeBlock);
  const elRef = useRef(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    // Keep element style synced from block props
    el.style.transform = `translate(${block.x}px, ${block.y}px)`;
    el.style.width = `${block.width}px`;
    el.style.height = `${block.height}px`;
  }, [block.x, block.y, block.width, block.height]);

  // Drag logic using pointer events
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;
    let dragging = false;

    function onPointerDown(e) {
      // only primary button
      if (e.button && e.button !== 0) return;
      e.stopPropagation();
      el.setPointerCapture(e.pointerId);
      dragging = true;

      startX = e.clientX;
      startY = e.clientY;
      originX = block.x;
      originY = block.y;

      // bump element visually
      el.style.zIndex = 40;
      el.classList.add("shadow-2xl");
    }

    function onPointerMove(e) {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newX = originX + dx;
      let newY = originY + dy;

      // optional: keep within canvas bounds
      const canvas = canvasRef?.current;
      if (canvas) {
        const canvasRect = canvas.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        // clamp
        const minX = 0;
        const minY = 0;
        const maxX = canvasRect.width - elRect.width;
        const maxY = canvasRect.height - elRect.height;
        if (newX < minX) newX = minX;
        if (newY < minY) newY = minY;
        if (newX > maxX) newX = maxX;
        if (newY > maxY) newY = maxY;
      }

      // immediate visual
      el.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      el.style.zIndex = 10;
      el.classList.remove("shadow-2xl");

      // compute final position
      const style = el.style.transform; // translate(xpx, ypx)
      const match = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(style);
      if (match) {
        const finalX = parseFloat(match[1]);
        const finalY = parseFloat(match[2]);
        updateBlock(block.id, { x: Math.round(finalX), y: Math.round(finalY) });
      }
    }

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [block, canvasRef, updateBlock]);

  function doubleClickToEdit() {
    if (block.type === "text" || block.type === "card") {
      setEditing(true);
    }
  }

  function saveEdit(e) {
    e.preventDefault();
    const value = e.target.elements.text.value;
    updateBlock(block.id, { text: value });
    setEditing(false);
  }

  return (
    <div
      ref={elRef}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${block.x}px, ${block.y}px)`,
        width: `${block.width}px`,
        height: `${block.height}px`,
      }}
      className="block-el select-none pointer-events-auto z-10"
      onDoubleClick={doubleClickToEdit}
    >
      <div
        className={`w-full h-full rounded-lg border p-3 flex flex-col justify-between bg-white`}
      >
        {/* Header area */}
        <div className="flex items-start justify-between gap-2">
          <div className="text-sm font-medium break-words">{block.text}</div>

          <div className="ml-2 flex gap-1">
            <button
              onClick={() => removeBlock(block.id)}
              title="Remove"
              className="text-xs px-2 py-1 rounded bg-red-100 text-red-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Edit form (modal-like inside block) */}
        {editing && (
          <form onSubmit={saveEdit} className="mt-2">
            <input
              name="text"
              defaultValue={block.text}
              className="w-full border rounded px-2 py-1 text-sm"
              autoFocus
            />
            <div className="mt-2 flex gap-2">
              <button type="submit" className="text-xs px-2 py-1 rounded bg-sky-600 text-white">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-xs px-2 py-1 rounded bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Card extra placeholder */}
        {block.type === "card" && !editing && (
          <div className="mt-3 text-xs text-slate-500">Card content preview</div>
        )}
      </div>
    </div>
  );
}
