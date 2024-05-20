import { useMediaStore } from "@/store/MediaStore";
import SelectedImage from "../details/SelectedImage";

export function CollectionLayout() {
  const collections = useMediaStore((state) => state.collections);

  const gallery = searchResults.length >= 1 ? searchResults : defaultResults;

  return (
    <>
      {collections?.map((actualImage, i) => {
        const { id, urls, alt_description } = actualImage;
        return (
          <picture
            transition:name={`image ${id}`}
            onClick={() => setSelectedImage(actualImage)}
            key={id}
            className={`hover:shadow-md drop-shadow-xl overflow-hidden hover:shadow-zinc-900 transition-all ease-in row-span-1 rounded-xl bg-neutral-700 ${
              i === 3 || i === 5 || i === 10 ? "col-span-1 lg:col-span-2" : ""
            } ${
              i === 2 || i === 5 || i === 10 || i === 11
                ? "row-span-2 sm:row-span-3 lg:row-span-4"
                : "row-span-2"
            }`}
          >
            <SelectedImage
              id={id}
              url={urls.small}
              alt_description={alt_description}
            />
          </picture>
        );
      })}
    </>
  );
}