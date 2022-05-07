import { useState } from "react";

import { FileUploader } from "react-drag-drop-files";
import { Oval } from "react-loader-spinner";

import { createPet } from "../lib/pets";

import { ServerDown } from "./";
import { TrashIcon } from "@heroicons/react/outline";

const CreatePet = () => {
  const fileTypes = ["JPG", "PNG", "JPEG"];

  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tagsA, setTagsA] = useState([]);
  const [data, setData] = useState({
    tags: "",
    category: "",
    name: "",
  });

  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const resetFields = () => {
    setData({
      ...data,
      tags: "",
      category: "",
      name: "",
    });
    setFile(null);
    setTagsA([]);
  };

  const uploadFile = (e) => {
    setFile(URL.createObjectURL(e));
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      const tags = {
        name: data.tags,
      };

      setTagsA([...tagsA, tags]);

      setData({ ...data, tags: "" });
    }
  };

  const savePet = () => {
    if (data.name === "" || data.category === "" || !file || !tagsA.length) {
      setErrorMessage("Fields* And Image Are Required*");
    } else {
      setErrorMessage("");
      setLoading(true);

      const pet = {
        category: {
          name: data.category,
        },
        name: data.name,
        photoUrls: [file],
        tags: tagsA,
        status: "available",
      };

      createPet(pet)
        .then(() => {
          setLoading(false);
          resetFields();
        })
        .catch(() => setError(true));
    }
  };

  const Tags = ({ tag }) => (
    <div className="p-2 rounded-lg bg-gray-300 raltive">
      <p className="text-xs">{tag.name}</p>
    </div>
  );

  if (error) {
    return <ServerDown />;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center bg-white p-3 shadow-xl">
        <div className="flex justify-center items-center mb-5 lg:mb-0">
          <div
            className={`${!file && "lg:bg-gray-200 p-2"} ${file && "relative"}
            w-full h-full lg:h-[400px] flex justify-center items-center`}
          >
            {!file ? (
              <FileUploader
                handleChange={uploadFile}
                name="file"
                types={fileTypes}
                multiple={false}
              />
            ) : (
              <>
                <img
                  src={file}
                  alt="uploaded"
                  className="w-full h-full rounded-lg"
                />

                <button className="items-center flex justify-center absolute bottom-3 right-3 bg-gray-200 rounded-full p-2 hover:shadow-md hover:bg-gray-300 transition-all duration-300 ease-in-out ">
                  <TrashIcon
                    className="h-5 w-5"
                    onClick={() => setFile(null)}
                  />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-5 lg:px-5">
          <input
            type="text"
            placeholder="Add your pet name*"
            className={`w-full p-2 outline-none border-b-2 border-slate-200 rounded-lg lg:text-2xl lg:font-semibold
            `}
            name="name"
            onChange={(e) => changeData(e)}
            value={data.name}
          />
          <input
            type="text"
            placeholder="Your pet's category*"
            className={`w-full p-2 outline-none border-b-2 border-slate-200 rounded-lg `}
            name="category"
            onChange={(e) => changeData(e)}
            value={data.category}
          />

          <div className="flex flex-wrap items-center gap-1">
            {tagsA?.map((tag) => (
              <Tags tag={tag} key={tag.id} />
            ))}
          </div>

          <input
            type="text"
            placeholder="Your pet's tags*"
            className={`w-full p-2 outline-none border-b-2 border-slate-200 rounded-lg `}
            name="tags"
            onChange={(e) => changeData(e)}
            onKeyDown={keyPress}
            value={data.tags}
          />

          {errorMessage && errorMessage && (
            <p className="text-red-400"> {errorMessage} </p>
          )}

          <div className="flex items-center sm:justify-end gap-3">
            <button
              className="bg-red-500 p-2 px-5 rounded-xl text-white hover:bg-red-700 transition-all duration-300 ease-in-out"
              onClick={savePet}
            >
              {loading ? <Oval height={20} width={20} color="white" /> : "Save"}
            </button>
            <button
              className="bg-slate-700 p-2 px-5 rounded-xl text-white hover:bg-gray-900 transition-all duration-300 ease-in-out"
              onClick={resetFields}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePet;
