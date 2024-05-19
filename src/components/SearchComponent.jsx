import { useState } from "react";
import { useMediaStore } from "../store/MediaStore";

//TODO Env variables are not working in Astro
export function SearchComponent() {
  const [input, setInput] = useState("");

  const keywords = useMediaStore((state) => state.keywords);
  const setKeywords = useMediaStore((state) => state.setKeywords);
  const getImages = useMediaStore((state) => state.getImages);
  const setLoading = useMediaStore((state) => state.setLoading);

  function handleSubmit() {
    setKeywords(input);
    setLoading(true);
    getImages();
  }
  return (
    <form
      action={`/search`}
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto"
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only dark:text-white"
      >
        Search
      </label>
      <div className="flex justify-between w-full text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <input
          onChange={(e) => setInput(e.target.value)}
          placeholder={keywords || "Enter your keywords..."}
          type="search"
          id="default-search"
          className="w-full p-6 rounded-lg"
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
