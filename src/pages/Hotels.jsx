import { useState } from "react";
import SearchBar from "../Components/SearchBar";
import FilterBar from "../Components/FilterBar";
import HotelCard from "../Components/HotelCard";

function Hotels() {
  const [search, setSearch] = useState("");

  const hotels = [
    {
      id: 1,
      name: "Steigenberger Hotel",
      description: "A comfortable hotel with great views and excellent service.",
      location: "Cairo, Egypt",
    },
    {
      id: 2,
      name: "Four Seasons Hotel",
      description: "Enjoy a luxurious stay in the heart of Cairo.",
      location: "Cairo, Egypt",
    },
    {
      id: 3,
      name: "Rixos Premium",
      description: "Relax and enjoy a beautiful resort experience.",
      location: "Sharm El Sheikh, Egypt",
    },
  ];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Hotels</h1>
      <p>Discover the best hotels with Safarna.</p>

      <SearchBar onSearch={setSearch} />
      <FilterBar onFilter={() => {}} />

      {filteredHotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

export default Hotels;