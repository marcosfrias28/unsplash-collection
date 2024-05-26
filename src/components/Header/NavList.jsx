import { useEffect, useState } from "react"

const navlistOptions = [
    { name: 'Home', href: '/'},
    { name: 'Collections', href: '/collections' },
    { name: 'Search', href: '/search' },
]

function NavItem({ id, item, isChecked, onChange }) {
    return (
    <li id={id} onClick={onChange} >
        <a
          className="transition-colors has-[input:checked]:bg-cleargray has-[input:checked]:text-gray-900 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white px-4 py-2 rounded-lg dark:hover:bg-white/20"
          href={item.href}
          ><label>
            <input checked={isChecked} type="radio" name="nav-item" />{item.name}
          </label></a>
      </li>
    )
}

export const Navlist = () => {
    const [checkedID, setCheckedID] = useState('');
  ///
    const handleChecked = (e) => {
      switch (location.href) {
        case value:
          
          break;
          
          default:
            break;
          }
          e.preventDefault();
          console.log(location.href);
      setCheckedID(e.currentTarget.id);
    };
  ///
    return (
      <ul className="flex space-x-1 sm:space-x-4">
        {navlistOptions.map((item, i) => (
          <NavItem
            key={i}
            id={`item${i}`}
            item={item}
            isChecked={`item${i}` === checkedID}
            onChange={handleChecked}
          />
        ))}
      </ul>
    );
  };