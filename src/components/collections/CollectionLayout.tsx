import { API_KEY, useMediaStore } from "@/store/MediaStore";
import type { collection } from "@/types/types";
import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";


function getRandomPage() {
  return Math.floor(Math.random() * 50) + 1;
}


function CollectionLayout() {
  const [initialRender, setInitialRender] = useState(true)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(getRandomPage())
  const getImages = useMediaStore(state => state.getImages);
  const [collections, setCollections] = useState<collection[]>([]);

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
    console.log(collections);
  }, [currentPage])

  function handleClick(photosAPI: string, title: string, total_photos: number) {
    getImages(photosAPI);
    location.href = `/collection/${title}?total_photos=${total_photos}`;
  }
  function handleScroll() {
    setCurrentPage(current => current + 1)
    getCollections()
  }

  return (
    <section className="flex flex-col justify-center items-center ">
      <div className="flex flex-wrap gap-8 max-w-[1280px] w-full h-full my-10">
        {collections.length > 0 && collections.map((collection) => {
          const { id, cover, description, photosAPI, title, total_photos } = collection;
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
      <div className="flex justify-center items-center">
        {loading && <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>}
      </div>
      <button onClick={handleScroll} className='rounded-3xl px-2 py-3 hover:scale-105 transition-all bg-gradient-to-r from-[rgba(235,199,156,1)] via-[rgba(223,149,168,1)] to-[rgba(128,57,126,1)]' ><span className="bg-white text-black px-5 py-2 rounded-3xl font-bold">Load more results</span></button>
    </section >

  )
}

export default CollectionLayout;