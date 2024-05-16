import { useEffect, useState } from 'react'
import { useMediaStore } from '../store/MediaStore'
import { useStore } from 'zustand'
import axios from 'axios'

let API_KEY = '';

if (import.meta.env.PROD) {
  API_KEY = import.meta.env.UNSPLASH_API_KEY;
} else {
  API_KEY = import.meta.env.PUBLIC_UNSPLASH_API_KEY;
}


//TODO Env variables are not working in Astro
export function SearchComponent () {
  const [input, setInput] = useState('')


  const saveLocalStorage = (searchResults) => {
    window.localStorage.setItem("searchResults", JSON.stringify(searchResults));
  }

  const {keywords, setKeywords, setSearchResults, setLoading} = useStore(useMediaStore, (state) => state)

  useEffect(() => {
    setLoading(true)
    axios.get(
      `https://api.unsplash.com/search/photos?page=2&query=${keywords}&per_page=12`,
      {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      }
    ).then(({data}) => {
      const result = data.results.map(({id, urls, links, alt_description, user, created_at
      }) => ({
        id: id,
        urls: {
          small:urls.small,
          regular:urls.regular,
        },
        alt_description: alt_description || '',
        user: {
          name: user.name,
          profile_image: user.profile_image.small,
          portfolio_url: user.portfolio_url
        },
        created_at: created_at,
        link: links.download
      }))
      console.log(result);
      saveLocalStorage(result)
      setSearchResults(result)
      setLoading(false)
    }).catch(error => console.log(error));
  }, [keywords]);


  function handleSubmit (e) {
    setKeywords(e.target[0].value)
   }
  return (
    <form
      action={`/search?keywords=${keywords}`}
      onSubmit={e => handleSubmit(e)}
      className='min-w-xl mx-auto w-full sm:w-[550px]'
    >
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative w-full'>
        <input
          onChange={e => setInput(e.target.value)}
          value={'' || input}
          type='search'
          id='default-search'
          className='w-[400px] sm:w-full p-6 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Enter your keywords...'
          required
        />
        <button className='absolute cursor-pointer inset-y-0 end-0 mr-4 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-6 h-6 text-gray-400 stroke-black dark:stroke-white'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='11' cy='11' r='7' strokeWidth='2'></circle>
            <path d='M20 20L17 17' strokeWidth='2' strokeLinecap='round'></path>
          </svg>
        </button>
      </div>
    </form>
  )
}
