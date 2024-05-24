import { create } from "zustand";
import { defaultCollections, defaultImages } from "@/services/data";
import axios from "axios";
import { persist, devtools } from "zustand/middleware";

let API_KEY = import.meta.env.PUBLIC_UNSPLASH_API_KEY;

interface collection {
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
  selectedImage: object | null;
  setKeywords: (keywords: string) => void;
  getImages: (photosAPI: string) => void;
  setLoading: (loading: boolean) => void;
  setSelectedImage: (selectedImage: object) => void;
}
interface collectionTypes {
  collections: collection[];
  getImageCollections: (page: number) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

export const useCollectionStore = create<collectionTypes>()(devtools((set, get) => ({
  loading: true,
  collections: [],
  setLoading: (loading) => set({ loading }, false, 'Loading'),
  getImageCollections: (page) => {
    console.log("get Collections");
    const { setLoading, collections } = get();
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
        const response = data.map(
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
       const result = response.filter((obj:collection) => collections.filter(collection => collection.id !== obj.id))
      set((state) => ({...state, collections: [...collections, ...result]}));
      })
      .catch((error) => console.log(error)).finally(() => setLoading(false));
  }
})) )

export const useMediaStore = create<mediaTypes>()(devtools(persist((set, get) => ({
    loading: true,
    keywords: "",
    defaultResults: defaultImages,
    selectedImage: null,
    searchResults: [],
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
        })
        .catch((error) => new Error("Error fetching images", error.status)).finally(() => setLoading(false));
    },
  }), {name: "mediaStore"})));
