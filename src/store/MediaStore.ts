import { create } from "zustand";
import { defaultImages } from "@/services/data";
import axios from "axios";
import { persist, devtools } from "zustand/middleware";

let API_KEY = import.meta.env.PUBLIC_UNSPLASH_API_KEY;

interface collections {
  id:string;
  title:string;
  description:string;
  cover:string;
  user: {
    name:string;
    profile_image:string;
    portfolio_url:string;
  },
  total_photos:number;
  published_at: string;
  photosAPI: string;
}

interface mediaTypes {
  loading: boolean;
  keywords: string;
  defaultResults: any[];
  searchResults: any[];
  collections: null | collections[];
  selectedImage: object | null;
  setKeywords: (keywords: string) => void;
  getImageCollections: (page: number) => void;
  getImages: (photosAPI: string) => void;
  setLoading: (loading: boolean) => void;
  setSelectedImage: (selectedImage: object) => void;
}



export const useMediaStore = create<mediaTypes>()(devtools(persist((set, get) => ({
    loading: true,
    keywords: "",
    defaultResults: defaultImages,
    selectedImage: null,
    collections: null,
    searchResults: [],
    getImageCollections: (page) => {
      console.log("get Collections");
      const { setLoading } = get();
      setLoading(true);
      axios
        .get(
          `https://api.unsplash.com/collections?page=${page}&per_page=12`,
          {
            method: "GET",
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
            },
          }
        )
        .then(({ data }) => {
          const result = data.map(
            ({ id, title, description, total_photos, published_at, user, cover_photo, links }) => ({
              id,
              title,
              description,
              cover: cover_photo.urls.regular,
              user: {
                name: user.name,
                profile_image: user.profile_image.large,
                portfolio_url: user.portfolio_url,
              },
              total_photos,
              published_at,
              photosAPI: links.photos,
            })
          );
          set(state => ({ ...state, collections: [...state.collections, result] }));
        })
        .catch((error) => console.log(error)).finally(() => setLoading(false));
    },
    setKeywords: (keywords) => set({ keywords }, false, 'Keywords changes'),
    setSelectedImage: (selectedImage) => set({ selectedImage }, false, 'selectedImage'),
    setLoading: (loading) => set({ loading }, false, 'Loading'),
    getImages: (photosAPI) => {
      console.log("get Images");
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
          set(state => ({ ...state, searchResults: result }));
          setLoading(false);
        })
        .catch((error) => console.log(error));
    },
  }), {name: "mediaStore"})));
