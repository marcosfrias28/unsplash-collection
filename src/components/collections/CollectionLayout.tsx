import { useMediaStore } from "@/store/MediaStore";
import { useEffect, useState } from "react";

function CollectionLayout() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const collections = useMediaStore(state => state.collections);
    const getImageCollections = useMediaStore(state => state.getImageCollections);
    const getImages = useMediaStore(state => state.getImages);
    useEffect(() => {
      console.log(currentPage, collections);
      getImageCollections(currentPage);
      console.log(collections);
    }, [currentPage])

    function handleClick(photosAPI: string) {
      getImages(photosAPI);
      location.href = "/search";
    }
    return (
      <section>
        <div className="flex flex-wrap gap-5 max-w-[1280px] w-full h-full">
          {
          collections.map((collection) => {
            const {id, cover, description, photosAPI, title, published_at, total_photos, user  } = collection;
            return (
              <div onClick={()=> handleClick(photosAPI)} id={id}>
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