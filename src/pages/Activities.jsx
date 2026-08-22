import { useState } from "react";
import SearchBar from "../Components/SearchBar";
import FilterBar from "../Components/FilterBar";
import ActivityCard from "../Components/ActivityCard";

function Activities() {
  const [search, setSearch] = useState("");

  const activities = [
    {
      id: 1,
      name: "Nile Cruise",
      description: "Enjoy a relaxing cruise and beautiful views of the Nile.",
      location: "Cairo, Egypt",
    },
    {
      id: 2,
      name: "Desert Safari",
      description: "Experience an exciting adventure in the Egyptian desert.",
      location: "Sharm El Sheikh, Egypt",
    },
    {
      id: 3,
      name: "Snorkeling",
      description: "Discover colorful fish and beautiful coral reefs.",
      location: "Hurghada, Egypt",
    },
  ];

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Activities</h1>
      <p>Discover fun activities with Safarna.</p>

      <SearchBar onSearch={setSearch} />
      <FilterBar onFilter={() => {}} />

      {filteredActivities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
        />
      ))}
    </div>
  );
}

export default Activities;