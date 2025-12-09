import React from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Inspector from "./components/Inspector";
import ExportPanel from "./components/ExportPanel";

/**
 * Milestone 4 App: canvas + inspector + export panel
 */
export default function App() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b bg-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Generative UI Composer</h1>
            <div className="text-sm text-slate-500">
              Milestone 4 — Export to React component
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex gap-6">
          <div className="flex-1 h-[640px]">
            <Canvas />
          </div>

          <div className="flex flex-col gap-6">
            <Inspector />
            <ExportPanel />
          </div>
        </main>
      </div>
    </div>
  );
}
