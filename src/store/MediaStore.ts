import { create } from "zustand";
import { defaultCollections, defaultImages } from "@/services/data";
import axios from "axios";
import { persist, devtools } from "zustand/middleware";
import type { mediaTypes } from "@/types/types";

export let API_KEY = import.meta.env.PUBLIC_UNSPLASH_API_KEY;

export const useMediaStore = create<mediaTypes>()(devtools(persist((set, get) => ({
    loading: true,
    keywords: "",
    defaultResults: defaultImages,
    selectedImage: null,
    searchResults: [],
    collectionPhotos: [],
    setKeywords: (keywords) => set({ keywords }, false, 'Keywords changes'),
    setSelectedImage: (selectedImage) => set({ selectedImage }, false, 'selectedImage'),
    setLoading: (loading) => set({ loading }, false, 'Loading'),
    getImages: (photosAPI) => {
      if (!photosAPI) {
        console.log("get searched Images");
      } else {
        console.log("get Collections Images");
      }
      const { keywords, setLoading } = get();
      const url = photosAPI ? photosAPI : `https://api.unsplash.com/search/photos?page=1&query=${keywords}&per_page=12`;
      axios
        .get(url,
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
          if (photosAPI) {
            set(state => ({ ...state, collectionPhotos: result }));
          } else {
            set(state => ({ ...state, searchResults: result }));
          }
        })
        .catch((error) => new Error("Error fetching images", error.status)).finally(() => setLoading(false));
    },
  }), {name: "mediaStore"})));
