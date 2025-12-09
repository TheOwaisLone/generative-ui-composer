import { create } from "zustand";

/**
 * Zustand store
 * blocks: array of block objects
 * selectedId: id of selected block (or null)
 * snapToGrid: boolean
 * gridSize: number
 * theme: 'light' | 'dark' | 'sunset'
 * previewSize: 'desktop' | 'tablet' | 'mobile'
 */
export const useStore = create((set, get) => ({
    blocks: [],
    selectedId: null,
    snapToGrid: true,
    gridSize: 16,
    theme: "light",
    previewSize: "desktop",

    // Add a new block
    addBlock: (block) => {
        const id = `${Date.now()}-${Math.round(Math.random() * 10000)}`;
        set({ blocks: [...get().blocks, { id, ...block }] });
    },

    // Update block by id
    updateBlock: (id, patch) => {
        set({
            blocks: get().blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        });
    },

    // Remove a block and clear selection if it was selected
    removeBlock: (id) => {
        set((state) => ({
            blocks: state.blocks.filter((b) => b.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId,
        }));
    },

    // Select a block
    selectBlock: (id) => set({ selectedId: id }),

    // Deselect
    deselect: () => set({ selectedId: null }),

    // Replace all blocks
    setBlocks: (blocks) => set({ blocks }),

    // Snap settings
    setSnapToGrid: (val) => set({ snapToGrid: !!val }),
    setGridSize: (size) => set({ gridSize: Number(size) || 8 }),

    // helper: snap a coordinate
    snap: (val) => {
        const { snapToGrid, gridSize } = get();
        if (!snapToGrid || !gridSize) return Math.round(val);
        return Math.round(val / gridSize) * gridSize;
    },

    // Theme
    setTheme: (theme) => set({ theme }),

    // Responsive preview size
    setPreviewSize: (size) => set({ previewSize: size }),
}));
