import React, { useRef } from "react";
import { useStore } from "../store/useStore";
import Block from "./Block";

export default function Canvas() {
  const blocks = useStore((s) => s.blocks);
  const deselect = useStore((s) => s.deselect);
  const canvasRef = useRef(null);

  return (
    <div
      ref={canvasRef}
      id="canvas"
      className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 p-6"
      onClick={() => {
        // clicking background deselects
        deselect();
      }}
    >
      <div className="h-full w-full border-2 border-dashed border-slate-200 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#0000, #0000 23px, rgba(0,0,0,0.01) 24px)] pointer-events-none" />

        {blocks.map((b) => (
          <Block key={b.id} block={b} canvasRef={canvasRef} />
        ))}

        {blocks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-slate-400 text-sm">
              Canvas is empty — add a block.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
