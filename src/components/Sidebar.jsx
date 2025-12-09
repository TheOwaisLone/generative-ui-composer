import React from "react";
import { useStore } from "../store/useStore";

export default function Sidebar() {
  const addBlock = useStore((s) => s.addBlock);

  function addTextBlock() {
    addBlock({
      type: "text",
      x: 40,
      y: 40,
      width: 220,
      height: 60,
      text: "Double-click to edit",
    });
  }

  function addCardBlock() {
    addBlock({
      type: "card",
      x: 80,
      y: 120,
      width: 260,
      height: 140,
      text: "Card title",
    });
  }

  return (
    <aside className="w-64 border-r bg-white p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Add Blocks</h2>

      <button
        onClick={addTextBlock}
        className="py-2 px-3 bg-sky-600 text-white rounded shadow hover:bg-sky-700"
      >
        + Add Text
      </button>

      <button
        onClick={addCardBlock}
        className="py-2 px-3 bg-emerald-600 text-white rounded shadow hover:bg-emerald-700"
      >
        + Add Card
      </button>

      <div className="mt-4 text-sm text-slate-600">
        Tip: Drag blocks around. Double-click a text block to edit.
      </div>
    </aside>
  );
}
