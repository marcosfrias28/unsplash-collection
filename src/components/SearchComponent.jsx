import { useState } from "react";
import { useMediaStore } from "../store/MediaStore";

//TODO Env variables are not working in Astro
export function SearchComponent(props) {
  const [input, setInput] = useState("");

  const keywords = useMediaStore((state) => state.keywords);
  const setKeywords = useMediaStore((state) => state.setKeywords);
  const getImages = useMediaStore((state) => state.getImages);

  function handleSubmit(event) {
    if (location.href === "/search") {
      event.preventDefault();
    }
    setKeywords(input);
    getImages();
  }
  return (
    <form
      {...props}
      action="/search"
      style={{ viewTransitionName: 'search-form' }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto px-5 sm:px-0"
    >
      <label
        htmlFor="input-keywords"
        className="mb-2 text-sm font-medium sr-only dark:text-white"
      >
        Search
      </label>
      <div className="flex justify-between text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <input
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Enter your keywords..."}
          defaultValue={keywords || ""}
          type="search"
          id="input-keywords"
          className="p-6 w-full border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <button className="cursor-pointer mr-4 flex items-center ps-3">
          <svg
            className="w-6 h-6 text-gray-400 stroke-black dark:stroke-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
            <path d="M20 20L17 17" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
          Search
        </button>
      </div>
    </form>
  );
}
