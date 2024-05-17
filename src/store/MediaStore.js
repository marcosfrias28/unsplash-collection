import { create, useStore } from "zustand";
import { defaultImages } from "@/services/data";

export const useMediaStore = create((set) => ({
  laoding: false,
  keywords: "Water",
  searchResults: defaultImages,
  setKeywords: (keywords) => set({ keywords }),
  setLoading: (loading) => set({ loading }),
  setSearchResults: (searchResults) => set({ searchResults }),
}));
