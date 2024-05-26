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
  setSelectedImage: (selectedImage) => set({ selectedImage: <Result>{} }, false, 'selectedImage'),
  setLoading: (loading) => set({ loading }, false, 'Loading'),
  getImages: () => {
    console.log("get searched Images");
    const { keywords, setLoading } = get();
    setLoading(true);
    api.search.getPhotos({ query: keywords, page: 1, perPage: 12 }).then(({ response }) => {
      const result = response.results.map(
        ({ id, urls, links, alt_description, user, created_at }) => ({
          id: id,
          urls: {
            small: urls.small,
            regular: urls.regular,
          },
          alt_description: alt_description || "",
          user: {
            name: user.name,
            profile_image: user.profile_image.large,
            portfolio_url: user.portfolio_url,
          },
          created_at: created_at,
          link: links.download,
        })
      );
      set(state => ({ ...state, searchResults: result }));
    }).finally(() => setLoading(false));
  }
}), { name: "mediaStore" })));
