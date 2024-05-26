import { check } from "astro/jsx/server.js";
import { useEffect, useState } from "react"

const navlistOptions = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'Search', href: '/search' },
]

export const Navlist = () => {

  const handleChecked = (e) => {
    console.log(location.href.split('/').pop());
    e.currentTarget.checked = true;
  };

  return (
    <ul className="flex space-x-1 sm:space-x-4">
      {navlistOptions.map((item, i) => (
        <li key={i}>
          <a
            className="transition-colors has-[input:checked]:bg-cleargray has-[input:checked]:text-gray-900 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white px-4 py-2 rounded-lg dark:hover:bg-white/20"
            href={item.href}
          ><label>
              <input onChange={handleChecked} type="radio" name="nav-item" />{item.name}
            </label></a>
        </li>
      ))}
    </ul>
  );
};