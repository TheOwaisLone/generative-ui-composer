import React from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Inspector from "./components/Inspector";
import ExportPanel from "./components/ExportPanel";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ResponsivePreview from "./components/ResponsivePreview";
import { useStore } from "./store/useStore";

/**
 * Milestone 6 App: Responsive preview + Theme palette changer
 */
export default function App() {
  const snapToGrid = useStore((s) => s.snapToGrid);
  const gridSize = useStore((s) => s.gridSize);
  const setSnapToGrid = useStore((s) => s.setSnapToGrid);
  const setGridSize = useStore((s) => s.setGridSize);

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b bg-white app-panel">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold">Generative UI Composer</h1>
              <div className="text-sm text-slate-500">
                Milestone 6 — Responsive preview & Themes
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={snapToGrid}
                    onChange={(e) => setSnapToGrid(e.target.checked)}
                  />
                  Snap to grid
                </label>

                <label className="text-sm flex items-center gap-2">
                  Grid:
                  <input
                    type="number"
                    value={gridSize}
                    onChange={(e) => setGridSize(Number(e.target.value || 8))}
                    className="w-20 border rounded px-2 py-1 text-sm"
                    min="1"
                  />
                </label>
              </div>

              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full p-6">
          <div className="flex gap-6">
            {/* Left: responsive preview (contains real Canvas) */}
            <div className="flex-1">
              <ResponsivePreview>
                <Canvas />
              </ResponsivePreview>
            </div>

            {/* Right: inspector + export */}
            <div className="w-[360px] flex flex-col gap-6">
              <Inspector />
              <ExportPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
