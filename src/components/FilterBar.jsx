function FilterBar({ onFilter }) {
    return (
      <div>
        <select onChange={(e) => onFilter(e.target.value)}>
          <option value="">All</option>
          <option value="destination">Destinations</option>
          <option value="hotel">Hotels</option>
          <option value="activity">Activities</option>
        </select>
      </div>
    );
  }
  
  export default FilterBar;