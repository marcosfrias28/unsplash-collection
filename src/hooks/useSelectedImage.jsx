import { useMediaStore } from "@/store/MediaStore";

function useSelectedImage(id) {
  const { searchResults } = useMediaStore((state) => state);
  const currentImage = searchResults?.find((image) => image.id === id);
  return { currentImage: currentImage || {} };
}

export default useSelectedImage;
