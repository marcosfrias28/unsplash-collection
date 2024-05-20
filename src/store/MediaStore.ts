import { create } from "zustand";
import { defaultImages } from "@/services/data";
import axios from "axios";
import { persist, devtools } from "zustand/middleware";

interface mediaTypes {
  loading: boolean;
  keywords: string;
  defaultResults: any[];
  searchResults: any[];
  collections: any[];
  selectedImage: object | null;
  setKeywords: (keywords: string) => void;
  getImages: () => void;
  setLoading: (loading: boolean) => void;
  setSelectedImage: (selectedImage: object) => void;
}

export const useMediaStore = create<mediaTypes>()(devtools(persist((set, get) => ({
    loading: true,
    keywords: "",
    defaultResults: defaultImages,
    selectedImage: null,
    collections: [],
    searchResults: [],
    setKeywords: (keywords) => set({ keywords }, false, 'Keywords changes'),
    setSelectedImage: (selectedImage) => set({ selectedImage }, false, 'selectedImage'),
    setLoading: (loading) => set({ loading }, false, 'Loading'),
    getImages: () => {
      console.log("getImages");
      let API_KEY = "";
      if (import.meta.env.PROD) {
        API_KEY = import.meta.env.UNSPLASH_API_KEY;
      } else {
        API_KEY = import.meta.env.PUBLIC_UNSPLASH_API_KEY;
      }
      const { keywords, setLoading } = get();
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=2&query=${keywords}&per_page=12`,
          {
            method: "GET",
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
            },
          }
        )
        .then(({ data }) => {
          const result = data.results.map(
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
          set(state => ({ ...state, searchResults: result }), false, 'Search results');
          set(state => ({ collections: [...state.collections, result] }), false, 'Collection added')
          setLoading(false);
        })
        .catch((error) => console.log(error));
    },
  }), {name: "mediaStore"})));
