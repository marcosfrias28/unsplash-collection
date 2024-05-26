import { useMediaStore } from "@/store/MediaStore";
import SelectedImage from "../details/SelectedImage";

export function CollectionPhotosLayout() {
  const collectionPhotos = useMediaStore((state) => state.collectionPhotos);
  return (
    <>
      {collectionPhotos.length > 0 && collectionPhotos.map((actualImage, i) => {
        const { id, urls, alt_description } = actualImage;
        return (
          <picture
            key={id}
            style={{ viewTransitionName: `image-${id}` }}
            className={`overflow-hidden pointer-events-none row-span-1 rounded-xl bg-neutral-700 ${i === 3 || i === 5 || i === 10 ? "col-span-1 lg:col-span-2" : ""
              } ${i === 2 || i === 5 || i === 10 || i === 11
                ? "row-span-2 sm:row-span-3 lg:row-span-4"
                : "row-span-2"
              }`}
          >
            <SelectedImage
              id={id}
              url={urls.regular}
              alt_description={alt_description}
            />
          </picture>
        );
      })}
    </>
  );
}
