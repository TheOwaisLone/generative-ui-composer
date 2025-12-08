import React from "react";

/**
 * Minimal demo App to verify Tailwind is working.
 * We'll expand this in Milestone 2.
 */
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold mb-2">Generative UI Composer</h1>
        <p className="text-sm text-slate-600 mb-6">
          Milestone 1 — Vite + React (JavaScript) + Tailwind v3 setup.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">What next</h3>
            <ul className="mt-2 text-sm text-slate-600 list-disc list-inside">
              <li>Canvas & add-block buttons</li>
              <li>Drag & Drop (basic)</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Commands</h3>
            <pre className="mt-2 text-xs bg-slate-100 p-2 rounded">
              {`npm run dev
npm run build
git status`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
