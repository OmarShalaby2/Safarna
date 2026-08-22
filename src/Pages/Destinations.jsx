import SearchBar from "../Components/SearchBar";
import FilterBar from "../Components/FilterBar";

function Destinations() {
  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  const handleFilter = (value) => {
    console.log("Filter:", value);
  };

  return (
    <div>
      <h1>Destinations</h1>
      <p>Explore amazing destinations with Safarna.</p>

      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />

      <p>Destinations will appear here.</p>
    </div>
  );
}

export default Destinations;