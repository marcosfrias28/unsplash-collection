import { useCollectionStore, useMediaStore } from "@/store/MediaStore";
import Image from "astro/components/Image.astro";
import moment from "moment";
import { useEffect, useState } from "react";
function CollectionLayout() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const collections = useCollectionStore(state => state.collections);
  const getImageCollections = useCollectionStore(state => state.getImageCollections);
  const getImages = useMediaStore(state => state.getImages);
  useEffect(() => {
    getImageCollections(currentPage);
  }, [currentPage])

  function handleClick(photosAPI: string, title: string) {
    getImages(photosAPI);
    location.href = `/collection/${title}`;
  }
  return (
    <section>

      <div className="flex flex-wrap gap-8 max-w-[1280px] w-full h-full">
        {collections && collections.map((collection) => {
          const { id, cover, description, photosAPI, title, published_at, total_photos } = collection;
          return (
            <article key={id} className="mb-4">
              <div className="group w-96 h-96 relative" onClick={() => handleClick(photosAPI, title)} id={id}>
                <Image width='100' height='100' class="rounded-md object-cover object-center h-full w-full" src={cover} alt={description || title || "No description found"} />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <p className="text-black dark:text-white font-bold text-lg">{title}</p>
                <small className="text-sm font-medium">{total_photos} photos</small>
                {/* <small className="text-sm mb-5 font-extralight">
                  Published on {moment(published_at).utc().format("LL")}
                </small> */}
              </div>
            </article>
          )
        })
        }
      </div>
      <button className='rounded-3xl px-2 py-3 hover:scale-105 transition-all bg-gradient-to-r from-[rgba(235,199,156,1)] via-[rgba(223,149,168,1)] to-[rgba(128,57,126,1)]' onClick={() => {
        setCurrentPage(currentPage + 1);
        getImageCollections(currentPage);
      }}><span className="bg-white text-black px-5 py-2 rounded-3xl font-bold">Load more results</span></button>
    </section>
  )
}

export default CollectionLayout;