import { useMediaStore } from "@/store/MediaStore";
import { useEffect, useState } from "react";

function CollectionLayout() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const collections = useMediaStore(state => state.collections);
    const getImageCollections = useMediaStore(state => state.getImageCollections);
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
        <div className="flex flex-wrap gap-5 max-w-[1280px] w-full h-full">
          {collections && collections?.map((collection) => {
            const {id, cover, description, photosAPI, title, published_at, total_photos, user  } = collection;
            return (
              <div onClick={()=> handleClick(photosAPI, title)} id={id}>
                <img src={cover} alt={description} />
              </div>
            )
          })
          }
        </div>
        <button onClick={()=> {
          setCurrentPage(currentPage + 1);
          getImageCollections(currentPage);
        }}>Load more results</button>
      </section>
    )
}

export default CollectionLayout;