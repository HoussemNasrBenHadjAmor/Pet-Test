import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOnePet } from "../lib/pets";

import { ServerDown } from "./";

import defaultImage from "../asset/default-image.png";

import { TrashIcon } from "@heroicons/react/outline";

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(false);

  const Tags = ({ tag }) => (
    <div className="p-2 rounded-full bg-gray-300">
      <p className="text-xs">{tag?.name}</p>
    </div>
  );

  const getPetDetail = async () => {
    const data = await getOnePet(id);
    setPet(data);
  };

  useEffect(() => {
    Promise.all([getPetDetail()]).catch(() => setError(true));
  }, []);

  if (error) {
    return <ServerDown />;
  }
  return (
    <div className="mt-10 flex flex-col md:flex-row rounded-2xl bg-white shadow-xl gap-3">
      <div className="flex justify-center items-center">
        {pet?.photoUrls && pet?.photoUrls[0] !== "string" ? (
          <img
            src={pet?.photoUrls[0]}
            alt="pet"
            className="h-full w-full md:h-64 md:w-h-64 object-cover md:rounded-tl-2xl md:rounded-bl-2xl"
          />
        ) : (
          <img
            src={defaultImage}
            alt="pet"
            className="h-full w-full md:h-64 md:w-h-64 object-cover md:rounded-tl-2xl md:rounded-bl-2xl"
          />
        )}
      </div>

      <div className="w-full flex-1 p-5 gap-3">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer flex justify-center items-center bg-gray-200 p-2 rounded-full hover:shadow-md">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>

          <p className="underline underline-offset-4">
            {pet?.category && pet?.category?.name?.length > 12
              ? pet?.category?.name?.slice(0, 12) + "..."
              : pet?.category?.name}
          </p>
        </div>

        <div className="my-5 flex flex-col">
          <h1 className="text-2xl font-semibold">{pet?.name.toUpperCase()}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {pet?.tags?.map((tag) => (
            <Tags tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
