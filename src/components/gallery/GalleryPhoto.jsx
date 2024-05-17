import { useMediaStore } from "@/store/MediaStore";
import axios from "axios";
import { useEffect } from "react";

let API_KEY = "";

if (import.meta.env.PROD) {
  API_KEY = import.meta.env.UNSPLASH_API_KEY;
} else {
  API_KEY = import.meta.env.PUBLIC_UNSPLASH_API_KEY;
}

export function GalleryPhoto({ index }) {
  const { keywords, searchResults, loading, setSearchResults, setLoading } =
    useMediaStore((state) => state);

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
              regular: urls.regular,
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

  return (
    <a href={searchResults[index].id} className={`${loading ? "blur-lg" : ""}`}>
      <img
        src={
          loading === true
            ? searchResults[index].urls.thumbnail
            : searchResults[index].urls.regular
        }
        alt={searchResults[index].alt_description}
        className={`object-cover ${
          loading ? " animate-pulse" : "hover:scale-105 duration-150"
        }  w-full h-full rounded-xl cursor-pointer transition-all duration-1000`}
      />
    </a>
  );
}
