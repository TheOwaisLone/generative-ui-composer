import { create } from "zustand";

/**
 * Simple Zustand store for blocks on the canvas.
 * Each block: { id, type, x, y, width, height, text }
 */
export const useStore = create((set, get) => ({
    blocks: [],
    addBlock: (block) => {
        const id = `${Date.now()}-${Math.round(Math.random() * 10000)}`;
        set({ blocks: [...get().blocks, { id, ...block }] });
    },
    updateBlock: (id, patch) => {
        set({
            blocks: get().blocks.map(b => (b.id === id ? { ...b, ...patch } : b))
        });
    },
    removeBlock: (id) => {
        set({ blocks: get().blocks.filter(b => b.id !== id) });
    },
    setBlocks: (blocks) => set({ blocks }),
}));
