import { Link, useParams } from "react-router-dom";

function ActivityDetails() {
  const { id } = useParams();

  const activities = {
    1: {
      name: "Nile Cruise",
      location: "Cairo, Egypt",
      description:
        "Enjoy a relaxing cruise on the Nile and discover beautiful views of Cairo.",
      duration: "2 Hours",
      price: "$30",
    },

    2: {
      name: "Desert Safari",
      location: "Sharm El Sheikh, Egypt",
      description:
        "Experience an exciting desert adventure with amazing views and activities.",
      duration: "5 Hours",
      price: "$60",
    },

    3: {
      name: "Snorkeling",
      location: "Hurghada, Egypt",
      description:
        "Discover colorful fish and beautiful coral reefs in the Red Sea.",
      duration: "3 Hours",
      price: "$45",
    },
  };

  const activity = activities[id];

  if (!activity) {
    return (
      <div>
        <h1>Activity Not Found</h1>
        <Link to="/activities">Back to Activities</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{activity.name}</h1>

      <h3>Location</h3>
      <p>{activity.location}</p>

      <h3>About</h3>
      <p>{activity.description}</p>

      <h3>Duration</h3>
      <p>{activity.duration}</p>

      <h3>Price</h3>
      <p>{activity.price}</p>

      <Link to="/activities">← Back to Activities</Link>
    </div>
  );
}

export default ActivityDetails;