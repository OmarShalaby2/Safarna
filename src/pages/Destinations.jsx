import { useState } from "react";
import SearchBar from "../Components/SearchBar";
import FilterBar from "../Components/FilterBar";
import DestinationCard from "../Components/DestinationCard";

function Destinations() {
  const [search, setSearch] = useState("");

  const destinations = [
    {
      id: 1,
      name: "Cairo",
      description: "Explore the heart of Egypt and discover its rich history.",
      location: "Egypt",
    },
    {
      id: 2,
      name: "Alexandria",
      description: "Enjoy the Mediterranean sea and beautiful coastal views.",
      location: "Egypt",
    },
    {
      id: 3,
      name: "Sharm El Sheikh",
      description: "Relax on beautiful beaches and enjoy amazing activities.",
      location: "Egypt",
    },
  ];

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Destinations</h1>
      <p>Explore amazing destinations with Safarna.</p>

      <SearchBar onSearch={setSearch} />
      <FilterBar onFilter={() => {}} />

      {filteredDestinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
        />
      ))}
    </div>
  );
}

export default Destinations;