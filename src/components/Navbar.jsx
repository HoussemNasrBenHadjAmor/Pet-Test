import { Link, useLocation } from "react-router-dom";

import { PlusIcon } from "@heroicons/react/outline";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { pathname } = useLocation();
  return (
    <nav className="flex justify-between items-center p-4 gap-3 sm:gap-5">
      <Link to={"/"} className="text-3xl text-red-500 font-bold">
        Pets
      </Link>

      {pathname === "/" && (
        <input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none p-2 w-full border-2 rounded-xl focus:border-black"
        />
      )}

      <Link
        to={`/create-pet`}
        className="flex justify-center items-center text-black bg-gray-100 rounded-full p-3 hover:bg-black hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
      >
        <PlusIcon className="w-5 h-5" />
      </Link>
    </nav>
  );
};

export default Navbar;
