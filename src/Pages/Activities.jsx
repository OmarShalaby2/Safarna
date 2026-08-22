import SearchBar from "../Components/SearchBar";
import FilterBar from "../Components/FilterBar";

function Activities() {
  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  const handleFilter = (value) => {
    console.log("Filter:", value);
  };

  return (
    <div>
      <h1>Activities</h1>
      <p>Discover fun activities with Safarna.</p>

      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />

      <p>Activities will appear here.</p>
    </div>
  );
}

export default Activities;