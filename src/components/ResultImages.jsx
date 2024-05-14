import { useKeywords } from '@/hooks/useKeywords'
import { useEffect } from 'react'
const API_KEY = await import.meta.env.PUBLIC_access_key;

export function ResultImages () {
  const { keywords, searchResults, setSearchResults  } = useKeywords()
  useEffect(() => {
    async function getImagesByKeywords(keywords) {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=2&query=${keywords}&per_page=12`,
        {
          method: "GET",
          headers: {
            Authorization: `Client-ID ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data.results) setSearchResults(data.results);
      else return;
    }
    getImagesByKeywords(keywords);
  }, [keywords]);



  return (
    <section className="grid auto-rows-[192px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto py-24 px-6">
  {searchResults?.map(({id, urls, alt_description}, i) => (
    <picture
      key={id}
      className={`hover:scale-105 transition-all ease-in row-span-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 ${
        i === 3 || i === 5 || i === 10 ? "col-span-1 lg:col-span-2" : ""
      } ${
        i === 2 || i === 5 || i === 10 || i === 11 ? "row-span-1 lg:row-span-2" : ""
      }`}
    >
        <img
          id={id}
          src={urls.regular}
          alt={alt_description}
          className='cursor-pointer object-cover w-full h-full rounded-xl '
        />
    </picture>
  ))}
</section>
  )
}
