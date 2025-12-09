import React from "react";
import { useStore } from "../store/useStore";

/**
 * Inspector panel: shows details of selected block.
 * Edit text, x, y, width, height. Delete button included.
 */
export default function Inspector() {
  const selectedId = useStore((s) => s.selectedId);
  const blocks = useStore((s) => s.blocks);
  const updateBlock = useStore((s) => s.updateBlock);
  const removeBlock = useStore((s) => s.removeBlock);
  const deselect = useStore((s) => s.deselect);

  const block = blocks.find((b) => b.id === selectedId) || null;

  function onChange(prop, value) {
    if (!block) return;
    const numericProps = ["x", "y", "width", "height"];
    const parsed = numericProps.includes(prop)
      ? parseInt(value || 0, 10)
      : value;
    updateBlock(block.id, { [prop]: parsed });
  }

  if (!block) {
    return (
      <aside className="w-72 border-l bg-white p-4">
        <div className="text-sm text-slate-500">No selection</div>
        <div className="mt-4 text-xs text-slate-400">
          Click a block to edit its properties.
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 border-l bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Inspector</h3>
        <button onClick={deselect} className="text-sm text-slate-500">
          Close
        </button>
      </div>

      <div className="mt-4 text-sm">
        <label className="block text-xs text-slate-600">Type</label>
        <div className="mt-1 text-sm">{block.type}</div>

        <label className="block text-xs text-slate-600 mt-3">Text</label>
        <input
          value={block.text}
          onChange={(e) => onChange("text", e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        />

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <label className="block text-xs text-slate-600">X</label>
            <input
              value={block.x}
              onChange={(e) => onChange("x", e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600">Y</label>
            <input
              value={block.y}
              onChange={(e) => onChange("y", e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <label className="block text-xs text-slate-600">Width</label>
            <input
              value={block.width}
              onChange={(e) => onChange("width", e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600">Height</label>
            <input
              value={block.height}
              onChange={(e) => onChange("height", e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => {
              removeBlock(block.id);
            }}
            className="flex-1 py-2 text-sm rounded bg-red-100 text-red-700"
          >
            Delete
          </button>

          <button
            onClick={() => {
              // quick nudge: center on canvas (optional)
              updateBlock(block.id, { x: 40, y: 40 });
            }}
            className="py-2 px-3 text-sm rounded bg-slate-100"
          >
            Reset pos
          </button>
        </div>
      </div>
    </aside>
  );
}
