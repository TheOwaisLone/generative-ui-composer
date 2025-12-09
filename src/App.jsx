import React from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Inspector from "./components/Inspector";

/**
 * Milestone 3 App: sidebar + canvas + inspector
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
              Milestone 3 — Inspector panel
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex gap-6">
          <div className="flex-1 h-[640px]">
            <Canvas />
          </div>

          <Inspector />
        </main>
      </div>
    </div>
  );
}
