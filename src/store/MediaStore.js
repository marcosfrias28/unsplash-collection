import { create } from "zustand";
import { defaultImages } from "@/services/data";

export const useMediaStore = create((set, get) => ({
  loading: true,
  keywords: "",
  defaultResults: defaultImages,
  searchResults: [],
  setKeywords: (keywords) => set({ keywords }),
  setLoading: (loading) => set({ loading }),
  setSearchResults: (searchResults) => set({ searchResults }),
}));
