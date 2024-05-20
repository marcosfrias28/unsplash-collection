import { useState } from "react"

export function Navlist() {
    const [checked, setChecked] = useState(false)
    return (
            <ul
      className="flex space-x-1 sm:space-x-4"
    >
      <li>
        <a
          className=" has-[input:checked]:bg-gray-600 transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white px-4 py-2 rounded-lg dark:hover:bg-white/20"
          href="/"
        >
          <input onChange={(e)=> e.currentTarget.checked} type="radio" name="nav-item" />Home</a>
      </li>
      <li>
        <a
          className="transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white px-4 py-2 rounded-lg dark:hover:bg-white/20"
          href="/collections"
          ><label>
            <input type="radio" name="nav-item" />Collections
          </label></a>
      </li>
      <li>
        <a
          data-astro-prefetch="viewport"
          className="transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white px-4 py-2 rounded-lg dark:hover:bg-white/20"
          href="/search"
          ><label>
            <input type="radio" name="nav-item" />Search
          </label></a>
      </li>
    </ul>
    )
}