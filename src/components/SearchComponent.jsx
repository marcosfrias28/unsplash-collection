import { useKeywords } from '../hooks/useKeywords'
import { getImagesByKeywords } from '../services/getImagesBy'

//TODO Env variables are not working in Astro
export function SearchComponent () {
  const { keywords, setKeywords } = useKeywords()

  function handleSubmit (e) {
    e.preventDefault()
    if ((window.location.href = '/')) {
      window.location.href = `/searchresult?keywords=${keywords}`
    }
  }

  return (
    <form
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
          onChange={e => setKeywords(e.target.value)}
          value={keywords}
          type='search'
          id='default-search'
          className='block w-full p-6 pe-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
