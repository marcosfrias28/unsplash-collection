import { useMediaStore } from "@/store/MediaStore";
import moment from "moment";

export function PhotoProfile() {
  const selectedImage = useMediaStore((state) => state.selectedImage);
  return (
    <img
      className="w-12 h-12 rounded-full bg-slate-100"
      src={selectedImage?.user?.profileImage?.small}
      alt="Photo profile of the Author / Owner of this photo"
    />
  );
}

export function AuthorName() {
  const selectedImage = useMediaStore((state) => state.selectedImage);

  return (
    <>
      <a href={selectedImage?.user?.portfolioURL || 'https://unsplash.com/'} target="_blank" className="font-bold text-black dark:text-white text-lg hover:underline">
        {selectedImage?.user?.name}
      </a>
    </>
  );
}

export function PublishedDate(props) {
  const selectedImage = useMediaStore((state) => state.selectedImage);

  return (
    <>
      <small {...props} className="text-sm mb-5">
        Published on {moment(selectedImage?.createdAt).utc().format("LL")}
      </small>
    </>
  );
}
