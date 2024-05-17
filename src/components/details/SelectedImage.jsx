import { useMediaStore } from "@/store/MediaStore";

function SelectedImage({ id }) {
  const { searchResults } = useMediaStore((state) => state);
  const selectedPhoto = searchResults.find((image) => image.id === id);

  return (
    <img
      className="object-cover w-full h-full rounded-xl"
      src={selectedPhoto?.link}
      alt={selectedPhoto?.alt_description}
    />
  );
}

export default SelectedImage;
