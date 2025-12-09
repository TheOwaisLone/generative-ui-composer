import React from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";

/**
 * Milestone 2 App: sidebar + canvas + simple drag
 */
export default function App() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b bg-white">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Generative UI Composer</h1>
            <div className="text-sm text-slate-500">
              Milestone 2 — Canvas & simple drag
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-6xl mx-auto w-full p-6">
          <div className="h-[640px]">
            <Canvas />
          </div>
        </main>
      </div>
    </div>
  );
}
