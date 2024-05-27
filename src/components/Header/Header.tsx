import React, { useState, useEffect } from 'react';
import Logo from '../icons/Logo';

const navlistOptions = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Search", href: "/search" },
];
const Navbar = () => {
  // Estado para almacenar la página seleccionada actualmente
  const [selectedPage, setSelectedPage] = useState(null);

  // Función para manejar el cambio de selección de página
  const handlePageChange = (value: string, href: string) => {
    const selectedPageValue = value;

    // Actualizar el estado con la página seleccionada
    setSelectedPage(selectedPageValue);

    // Guardar la página seleccionada en localStorage
    localStorage.setItem('selectedPage', selectedPageValue);
    location.href = href;
  };

  // Efecto para cargar la página seleccionada al montar el componente
  useEffect(() => {
    const savedPage = localStorage.getItem('selectedPage');
    if (savedPage) {
      setSelectedPage(savedPage);
    }
  }, []);

  return (
    <>
      <header className="relative top-0 pt-5 w-full max-w-[1280px] mx-auto z-50">
        <div
          className="transition-all flex justify-between items-center mx-5 sm:mx-20 gap-5 sm:gap-0"
        >
          <div>
            <span className="sr-only">Home</span>
            <Logo className="fill-[#101828] dark:fill-white" />
          </div>
          <div className="flex space-x-1 sm:space-x-4">
            {
              navlistOptions.map((item, i) => (
                <label
                  key={i}
                  className="transition-all has-[input:checked]:bg-cleargray has-[input:checked]:text-gray-900 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white px-4 py-2 rounded-lg dark:hover:bg-white/20"
                >
                  <input
                    hidden
                    type="radio"
                    name="nav"
                    value={`page${i}`}
                    checked={selectedPage === `page${i}`}
                    onChange={(e) => handlePageChange(e.currentTarget.value, item.href)}
                  />
                  {item.name}
                </label>
              ))
            }
          </div>
        </div>
      </header>
      <hr className="border-1 border-gray-300 mt-5 w-full" />
    </>
  );
};

export default Navbar;
