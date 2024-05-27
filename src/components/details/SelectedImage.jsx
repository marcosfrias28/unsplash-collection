import { useMediaStore } from "@/store/MediaStore";

function SelectedImage({ id, url, alt_description, className }) {
  const selectedImage = useMediaStore((state) => state.selectedImage);
  const loading = useMediaStore((state) => state.loading);
  return (
    <img id={id} src={url || selectedImage?.urls?.regular} alt={alt_description || selectedImage?.altDescription} className={`object-cover ${loading ? "blur-3xl animate-pulse" : "hover:scale-105 duration-150"
      }  w-full h-full rounded-xl cursor-pointer transition-all duration-1000 ${className}`}></img>
  );
}

export default SelectedImage;
