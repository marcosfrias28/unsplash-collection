import { API_KEY, useMediaStore } from "@/store/MediaStore";
import type { collection } from "@/types/types";
import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

function getRandomPage() {
  return Math.floor(Math.random() * 50) + 1;
}

function CollectionLayout() {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(getRandomPage())
  const [collections, setCollections] = useState<collection[]>([]);
  const collectionPhotos = useMediaStore(state => state.collectionPhotos)
  const set = useMediaStore(state => state.setCollectionPhotos)
  const getCollectionImages = useCallback((photosAPI: string) => {
    axios.get(photosAPI,
      {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      }).then(data => {

      }).catch((error) => new Error("Error fetching images", error.status));
  }, [])
  const getCollections = useCallback(() => {
    setLoading(true);
    axios.get(
      `https://api.unsplash.com/collections?page=${currentPage}&per_page=12`,
      {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      }
    ).then(({ data }) => {
      const result = data.map(
        ({ id, title, description, total_photos, published_at, user, cover_photo, links }) => ({
          id,
          title,
          description,
          cover: cover_photo.urls.regular,
          user: {
            name: user.name,
            profile_image: user.profile_image.large,
            portfolio_url: user.portfolio_url,
          },
          total_photos,
          published_at,
          photosAPI: links.photos,
        })
      );
      setCollections(currentCollections => [...currentCollections, ...result]);
    }).catch((error) => console.log(error)).finally(() => setLoading(false));
  }, [currentPage])

  useEffect(() => {
    getCollections();
  }, [currentPage])

  function handleClick(photosAPI: string, title: string, total_photos: number) {
    getCollectionImages(photosAPI);
    location.href = `/collection/${title}?total_photos=${total_photos}`;
  }
  function handleScroll() {
    setCurrentPage(current => current + 1)
  }

  return (
    <>
      <div className="flex flex-wrap gap-8 max-w-[1280px] w-full h-full my-10 justify-center items-center">
        {collections && collections.map((collection) => {
          const { id, cover, description, photosAPI, title, total_photos } = collection;
          return (
            <article key={id} className="mb-4">
              <div className="group w-96 h-96 relative" onClick={() => handleClick(photosAPI, title, total_photos)} id={id}>
                <img className="rounded-md object-cover object-center h-full w-full" src={cover} alt={description || title || "No description "} />
              </div>
              <div className="flex flex-col gap-1 mt-3 overflow-clip w-96">
                <p className="text-black dark:text-white font-bold text-lg">{title}</p>
                <small className="text-sm font-medium">{total_photos} photos</small>
              </div>
            </article>
          )
        })
        }
      </div>
      {loading && <div className="flex justify-center items-center mb-20">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>}
      <button onClick={handleScroll} className='animated-bg rounded-3xl px-2 py-3 mb-20 hover:scale-105 transition-all bg-[url("/gradiend-bg@2x.png")] bg-cover bg-center bg-no-repeat w-fit mx-auto' ><span className="bg-white text-black px-5 py-2 rounded-3xl font-bold">Load more results</span></button >
    </>
  )
}

export default CollectionLayout;