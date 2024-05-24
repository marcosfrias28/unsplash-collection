import { useMediaStore } from "@/store/MediaStore";
import SelectedImage from "../details/SelectedImage";

export function ImagesLayout() {
  const loading = useMediaStore((state) => state.loading);
  const defaultResults = useMediaStore((state) => state.defaultResults);
  const searchResults = useMediaStore((state) => state.searchResults);
  const setSelectedImage = useMediaStore((state) => state.setSelectedImage);

  const gallery = searchResults.length >= 1 ? searchResults : defaultResults;

  return (
    <>
      {gallery.map((actualImage, i) => {
        const { id, urls, alt_description } = actualImage;
        return (
          <picture
            onClick={() => setSelectedImage(actualImage)}
            key={id}
            style={{viewTransitionName: `image-${id}`}}
            className={`hover:shadow-md drop-shadow-xl overflow-hidden hover:shadow-zinc-900 transition-all ease-in row-span-1 rounded-xl bg-neutral-700 ${
              i === 3 || i === 5 || i === 10 ? "col-span-1 lg:col-span-2" : ""
            } ${
              i === 2 || i === 5 || i === 10 || i === 11
                ? "row-span-2 sm:row-span-3 lg:row-span-4"
                : "row-span-2"
            }`}
          >
         <a href={'image-'+id}>
            <SelectedImage
              id={id}
              url={urls.small}
              alt_description={alt_description}
            />
          </a>
          </picture>
        );
      })}
    </>
  );
}
