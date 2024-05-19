import { useMediaStore } from "@/store/MediaStore";
import moment from "moment";

export function PhotoProfile() {
  const selectedImage = useMediaStore((state) => state.selectedImage);
  return (
    <img
      className="w-12 h-12 rounded-full bg-slate-100"
      src={selectedImage?.user.profile_image}
      alt="Photo profile of the Author / Owner of this photo"
    />
  );
}

export function AuthorName() {
  const selectedImage = useMediaStore((state) => state.selectedImage);

  return (
    <>
      <h3 className="font-bold text-black dark:text-white">
        {selectedImage?.user.name}
      </h3>
    </>
  );
}

export function PublishedDate() {
  const selectedImage = useMediaStore((state) => state.selectedImage);

  return (
    <>
      <small className="text-sm">
        Published on{" "}
        {moment(selectedImage?.created_at).utc().format("YYYY-MM-DD")}
      </small>
    </>
  );
}
