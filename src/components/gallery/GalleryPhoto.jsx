import { useMediaStore } from "@/store/MediaStore";
import axios from "axios";
import { useEffect } from "react";

let API_KEY = "";

if (import.meta.env.PROD) {
  API_KEY = import.meta.env.UNSPLASH_API_KEY;
} else {
  API_KEY = import.meta.env.PUBLIC_UNSPLASH_API_KEY;
}

export function ImagesLayout() {
  const {
    loading,
    setLoading,
    keywords,
    defaultResults,
    searchResults,
    setSearchResults,
  } = useMediaStore((state) => state);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=2&query=${keywords}&per_page=12`,
        {
          method: "GET",
          headers: {
            Authorization: `Client-ID ${API_KEY}`,
          },
        }
      )
      .then(({ data }) => {
        const result = data.results.map(
          ({ id, urls, links, alt_description, user, created_at }) => ({
            id: id,
            urls: {
              small: urls.small,
              regular: urls.small,
            },
            alt_description: alt_description || "",
            user: {
              name: user.name,
              profile_image: user.profile_image.medium,
              portfolio_url: user.portfolio_url,
            },
            created_at: created_at,
            link: links.download,
          })
        );
        setSearchResults(result);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [keywords]);

  const gallery = searchResults || defaultResults;

  return (
    <>
      {gallery.map((actualImage, i) => {
        const { id, urls, alt_description } = actualImage;
        return (
          <picture
            key={id}
            className={`hover:shadow-md drop-shadow-xl overflow-hidden hover:shadow-zinc-900 transition-all ease-in row-span-1 rounded-xl bg-neutral-700 ${
              i === 3 || i === 5 || i === 10 ? "col-span-1 lg:col-span-2" : ""
            } ${
              i === 2 || i === 5 || i === 10 || i === 11
                ? "row-span-2 sm:row-span-3 lg:row-span-4"
                : "row-span-2"
            }`}
          >
            <a href={id}>
              <img
                id={id}
                src={urls.regular}
                alt={alt_description}
                className={`object-cover ${
                  loading
                    ? "blur-3xl animate-pulse"
                    : "hover:scale-105 duration-150"
                }  w-full h-full rounded-xl cursor-pointer transition-all duration-1000`}
              />
            </a>
          </picture>
        );
      })}
    </>
  );
}
