import { useKeywords } from '@/hooks/useKeywords'
import { useEffect } from 'react'
const API_KEY = await import.meta.env.PUBLIC_access_key;

export function ResultImages () {
  const { keywords, searchResults, setSearchResults  } = useKeywords()
  useEffect(() => {
    async function getImagesByKeywords(keywords) {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=2&query=${keywords}&per_page=8`,
        {
          headers: {
            Authorization: `Client-ID ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.results);
    }
      //getImagesByKeywords(keywords);
      console.log(searchResults);
  }, [keywords]);



  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-10 auto-rows-[200px] gap-4 mx-auto p-20 max-w-[1400px]'>
      {searchResults.map(({ id, urls, alt_description }, index) => (
        <picture key={id} className={`w-full row-span-${index % 2 === 0 ? 1 : 2} col-span-${index % 2 === 0 ? 4 : 2}`}>
        <img
          id={id}
          src={urls.small}
          alt={alt_description}
          className='cursor-pointer object-cover w-full object-center rounded-lg shadow-xl hover:scale-110 transition-all duration-500 ease-in-out'
        />
      </picture>
      ))}
    </section>
  )
}
