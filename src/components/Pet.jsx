import { useState } from "react";
import { Link } from "react-router-dom";

import defaultImage from "../asset/default-image.png";

import { TrashIcon } from "@heroicons/react/outline";

const Pet = ({ pet: { id, category, photoUrls, tags } }) => {
  const [hover, setHover] = useState(false);

  const Tags = ({ tag }) => (
    <div className="p-2 rounded-full bg-gray-300">
      <p className="text-xs">
        {tag?.name?.length > 8 ? tag?.name?.slice(0, 8) + "..." : tag?.name}
      </p>
    </div>
  );

  const Categories = ({ category }) => (
    <div className="p-2 rounded-md bg-gray-300">
      <p className="text-xs">
        {category?.name?.length > 8
          ? category?.name?.slice(0, 8) + "..."
          : category?.name}
      </p>
    </div>
  );

  return (
    <Link
      to={`/pet/${id}`}
      className="relative cursor-zoom-in"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {photoUrls && photoUrls[0] !== "string" ? (
        <img
          src={photoUrls[0]}
          className="w-full h-full rounded-lg object-cover"
          alt="pet"
        />
      ) : (
        <img
          src={defaultImage}
          className="w-full h-full rounded-lg object-cover"
          alt="pet"
        />
      )}

      <div
        className={`z-50 flex-initial sm:${hover ? "flex flex-col" : "hidden"}`}
      >
        <button className="absolute bottom-3 right-3 flex justify-center items-center bg-white rounded-full p-2 hover:bg-gray-300 transition-all duration-300 ease-in-out">
          <TrashIcon className="w-5 h-5" />
        </button>

        <div className="absolute bottom-3 left-3 flex justify-center items-center cursor-default gap-1">
          {tags?.slice(0, 2)?.map((tag) => (
            <Tags tag={tag} key={tag.id} />
          ))}
        </div>

        <div className="absolute top-3 left-3 flex justify-center items-center cursor-default gap-1">
          {category && <Categories category={category} />}
        </div>
      </div>
    </Link>
  );
};

export default Pet;
