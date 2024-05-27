import { create } from "zustand";
import { defaultImages } from "@/services/data";
import { persist, devtools } from "zustand/middleware";
import type { mediaTypes } from "@/types/types";
import { api } from "@/utils/unsplash";
import type { Result } from "@/types/response";

export let API_KEY = import.meta.env.PUBLIC_UNSPLASH_API_KEY;

export const useMediaStore = create<mediaTypes>()(devtools(persist((set, get) => ({
  loading: true,
  keywords: "",
  defaultResults: defaultImages,
  selectedImage: null,
  searchResults: [],
  collectionPhotos: [],
  setKeywords: (keywords) => set({ keywords }, false, 'Keywords changes'),
  setCollectionPhotos: (collectionPhotos) => set({ collectionPhotos }, false, 'Photo Collections changes'),
  setSelectedImage: (selectedImage: any) => set({ selectedImage }, false, 'selectedImage'),
  setLoading: (loading) => set({ loading }, false, 'Loading'),
  getImages: () => {
    const { keywords, setLoading } = get();
    setLoading(true);
    api.search.getPhotos({ query: keywords, page: 1, perPage: 12 })
      .then(({ response }) => set(state => ({ ...state, searchResults: response.results })))
      .catch(() => {
        throw new Error("Error fetching images");
      })
      .finally(() => setLoading(false));
  }
}), { name: "mediaStore" })));
