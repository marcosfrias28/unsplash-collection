import { useMediaStore } from "@/store/MediaStore";
import { useState } from "react";

function CollectionLayout() {
    const [currentPage, setCurrentPage] = useState<Number>(1)
    const collections = useMediaStore(state => state.collections);
    const getImageCollections = useMediaStore(state => state.getImageCollections);
    const loading = useMediaStore(state => state.loading);
    const getImages = useMediaStore(state => state.getImages);
    const searchResults = useMediaStore(state => state.searchResults);
    const keywords = useMediaStore(state => state.keywords);
    const setKeywords = useMediaStore(state => state.setKeywords);
    const selectedImage = useMediaStore(state => state.selectedImage);
    const setSelectedImage = useMediaStore(state => state.setSelectedImage);
    const setLoading = useMediaStore(state => state.setLoading);


  
    return (
        <div className="flex flex-wrap gap-5 max-w-[1280px] w-full h-full">

        </div>
    )
}

export default CollectionLayout;