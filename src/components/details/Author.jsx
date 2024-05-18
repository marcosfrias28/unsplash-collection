import useSelectedImage from "@/hooks/useSelectedImage";
import moment from "moment";

export function PhotoProfile({ id }) {
  const { currentImage } = useSelectedImage(id);
  console.log(currentImage);
  return (
    <img
      class="w-12 h-12 rounded-full bg-slate-100"
      src={currentImage.user?.profile_image}
      alt="Photo profile of the Author / Owner of this photo"
    />
  );
}

export function AuthorName({ id }) {
  const { currentImage } = useSelectedImage(id);
  console.log(currentImage);
  return (
    <>
      <h3 className="font-bold text-black dark:text-white">
        {currentImage.user?.name}
      </h3>
    </>
  );
}

export function PublishedDate({ id }) {
  const { currentImage } = useSelectedImage(id);
  console.log(currentImage);
  return (
    <>
      <small class="text-sm">
        Published on{" "}
        {moment(currentImage.created_at).utc().format("YYYY-MM-DD")}
      </small>
    </>
  );
}
