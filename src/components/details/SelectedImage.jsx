import useSelectedImage from "@/hooks/useSelectedImage";

function SelectedImage({ id }) {
  const selectedPhoto = useSelectedImage(id);

  return (
    <img
      className="object-cover w-full h-full rounded-lg"
      src={selectedPhoto?.link}
      alt={selectedPhoto?.alt_description}
    />
  );
}

export default SelectedImage;
