import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { getAllPets } from "./lib/pets";

import {
  PetDetail,
  NotFound,
  ServerDown,
  CreatePet,
  Navbar,
  Pets,
} from "./components";

const App = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);

  const getPets = async () => {
    const data = await getAllPets();
    setPets(data);
  };

  useEffect(() => {
    setRefresh(false);
    Promise.all([getPets()]).catch(() => setError(true));
  }, [refresh]);

  if (error) {
    return <ServerDown />;
  }

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-3 gap-10">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route
          path="/"
          element={
            <Pets pets={pets} searchTerm={searchTerm} setRefresh={setRefresh} />
          }
        />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/create-pet" element={<CreatePet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
