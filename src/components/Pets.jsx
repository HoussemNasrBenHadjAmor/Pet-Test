import { Pet } from ".";

const pets = ({ pets, searchTerm }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-3">
      {pets
        ?.filter((pet) =>
          pet?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.map((pet) => (
          <Pet pet={pet} key={pet.id} />
        ))}
    </div>
  );
};

export default pets;
