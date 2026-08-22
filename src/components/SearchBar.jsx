function SearchBar({ onSearch }) {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
  
        <button>Search</button>
      </div>
    );
  }
  
  export default SearchBar;