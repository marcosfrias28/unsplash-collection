import { useMediaStore } from "@/store/MediaStore";

function SelectedImage() {
  const selectedImage = useMediaStore((state) => state.selectedImage);

  return (
    <img
      className="object-cover w-full h-full rounded-lg"
      src={selectedImage?.link}
      alt={selectedImage?.alt_description}
    />
  );
}

export default SelectedImage;
