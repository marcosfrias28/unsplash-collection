import { API_KEY, useMediaStore } from "@/store/MediaStore";
import type { collection } from "@/types/types";
import { api } from "@/utils/unsplash";
import axios from "axios";
import { log } from "node_modules/astro/dist/core/logger/core";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

function getRandomPage() {
  return Math.floor(Math.random() * 50) + 1;
}

function CollectionLayout() {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(getRandomPage())
  const [collections, setCollections] = useState<collection[]>([]);
  const setCollectionPhotos = useMediaStore(state => state.setCollectionPhotos)

  const getCollectionImages = useCallback((id: any) => {
    setLoading(true);
    api.collections.getPhotos({ collectionId: id }).then(({ response }) => {
      const result = response.results.map(({ id, urls }) => ({
        id,
        urls
      })
      )
      setCollectionPhotos(result);
    }).catch(() => {
      throw new Error("Error fetching collection photos");
    }).finally(() => setLoading(false))
  }, [])

  const getCollections = useCallback(() => {
    setLoading(true);
    api.collections.list({ page: currentPage, perPage: 12 }).then(({ response: CollectionList }) => {
      const result = CollectionList.results.map(
        ({ id, title, description, total_photos, published_at, user, cover_photo, links, preview_photos }) => ({
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
          preview_photos
        })
      );
      setCollections(currentCollections => [...currentCollections, ...result]);
    }).finally(() => setLoading(false))
  }, [currentPage])

  useEffect(() => {
    getCollections();
  }, [currentPage])

  function handleClick(id: any, title: string, total_photos: number) {
    getCollectionImages(id);
    location.href = `/collection/${title}?total_photos=${total_photos}`;
  }
  function handleScroll() {
    setCurrentPage(current => current + 1)
  }

  return (
    <>
      <div className="flex flex-wrap gap-8 max-w-[1280px] w-full h-full my-10 justify-center items-center">
        {collections && collections.map((collection) => {
          const { id, cover, description, title, total_photos, preview_photos } = collection;
          return (
            <article key={id} className="mb-4">
              <div id={id} className="group w-96 h-96 grid grid-cols-2 grid-rows-2 gap-1 hover:scale-105 transition-all rounded-lg overflow-hidden" onClick={() => handleClick(id, title, total_photos)} >
                {
                  preview_photos && preview_photos?.map((photo, i) => {
                    if (i > 2) return;
                    return (
                      <img id={photo.id} key={photo.id} className={`${i === 0 ? 'row-span-2' : ''} object-cover object-center h-full w-full`} src={photo?.urls?.thumb} alt={description || title || "No description "} />
                    )
                  }) || <img className={`object-cover object-center h-full w-full`} src={cover} alt={description || title || "No description "} />
                }
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
      <button onClick={handleScroll} className='animated-bg rounded-3xl px-2 py-3 mb-20 hover:scale-105 transition-all w-fit mx-auto' ><span className="bg-white text-black px-5 py-2 rounded-3xl font-bold">Load more results</span></button >
    </>
  )
}

export default CollectionLayout;