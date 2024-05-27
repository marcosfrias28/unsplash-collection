import type { SetStateAction } from "react";
import type { Result, User } from "./response";

export interface collection {
  id: string;
  title: string;
  description: string;
  cover: string;
  user: {
    name: string;
    profile_image: string;
    portfolio_url: string;
  },
  total_photos: number;
  published_at: string;
  photosAPI: string;
}

export interface mediaTypes {
  loading: boolean;
  keywords: string;
  defaultResults: any[];
  searchResults: any[];
  collectionPhotos: any[];
  selectedImage: Result | null;
  setKeywords: (keywords: string) => void;
  setCollectionPhotos: (collectionPhotos: any[]) => void;
  setSelectedImage: (selectedImage: any[]) => void;
  getImages: () => void;
  setLoading: (loading: boolean) => void;
}
