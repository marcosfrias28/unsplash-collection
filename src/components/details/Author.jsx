import { useMediaStore } from "@/store/MediaStore";
import moment from "moment";

export function AuthorProfile() {
  const selectedImage = useMediaStore((state) => state.selectedImage);
  return (
    <>
      <div className="flex flex-row gap-4 items-center">
        <img
          className="w-12 h-12 rounded-full bg-slate-100"
          src={selectedImage?.user?.profile_image?.medium}
          alt={selectedImage?.alt_description}
        />
        <a href={selectedImage?.user?.portfolio_url || 'https://unsplash.com/'} target="_blank" className="font-bold text-black dark:text-white text-lg hover:underline">
          {selectedImage?.user?.name}
        </a>
      </div>
      <small className="text-sm mb-5">
        Published on {moment(selectedImage?.created_at).utc().format("LL")}
      </small>
    </>

  );
}
