import SearchBar from "../Components/SearchBar";
import FilterBar from "../Components/FilterBar";

function Hotels() {
  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  const handleFilter = (value) => {
    console.log("Filter:", value);
  };

  return (
    <div>
      <h1>Hotels</h1>
      <p>Discover the best hotels with Safarna.</p>

      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />

      <p>Hotels will appear here.</p>
    </div>
  );
}

export default Hotels;