import type { SetStateAction } from "react";

export interface collection {
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

  export interface mediaTypes {
    loading: boolean;
    keywords: string;
    defaultResults: any[];
    searchResults: any[];
    collectionPhotos: any[];
    selectedImage: object | null;
    setKeywords: (keywords: string) => void;
    getImages: (photosAPI?: string) => void;
    setLoading: (loading: boolean) => void;
    setSelectedImage: (selectedImage: object) => void;
  }
  export interface collectionTypes {
    getImageCollections: (page: number) => SetStateAction<any>;
    setLoading: (loading: boolean) => void;
    loading: boolean;
    firstRender: boolean;
  }