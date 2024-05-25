import { useCollectionStore, useMediaStore } from "@/store/MediaStore";
import type { collection } from "@/types/types";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";


function CollectionLayout() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const getImageCollections = useCollectionStore(state => state.getImageCollections);
  const getImages = useMediaStore(state => state.getImages);
  const result = useCollectionStore(state => state.result);
  const [collections, setCollections] = useState<collection[]>(result);

  useEffect(() => {
    getImageCollections(currentPage)
    setCollections(result)
  }, [])

  function handleClick(photosAPI: string, title: string, total_photos: number) {
    getImages(photosAPI);
    location.href = `/collection/${title}?total_photos=${total_photos}`;
  }
  function handleScroll() {
    setCurrentPage(currentPage + 1)
    getImageCollections(currentPage)
    setCollections([...collections, ...result])
  }
  return (
    <section className="flex flex-col justify-center items-center ">
      <div className="flex flex-wrap gap-8 max-w-[1280px] w-full h-full my-10">
        {collections.length > 0 && collections.map((collection) => {
          const { id, cover, description, photosAPI, title, published_at, total_photos } = collection;
          return (
            <article key={id} className="mb-4">
              <div className="group w-96 h-96 relative" onClick={() => handleClick(photosAPI, title, total_photos)} id={id}>
                <img className="rounded-md object-cover object-center h-full w-full" src={cover} alt={description || title || "No description "} />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <p className="text-black dark:text-white font-bold text-lg">{title}</p>
                <small className="text-sm font-medium">{total_photos} photos</small>
              </div>
            </article>
          )
        })
        }
      </div>
      <button onClick={handleScroll} className='rounded-3xl px-2 py-3 hover:scale-105 transition-all bg-gradient-to-r from-[rgba(235,199,156,1)] via-[rgba(223,149,168,1)] to-[rgba(128,57,126,1)]' ><span className="bg-white text-black px-5 py-2 rounded-3xl font-bold">Load more results</span></button>
    </section >

  )
}

export default CollectionLayout;