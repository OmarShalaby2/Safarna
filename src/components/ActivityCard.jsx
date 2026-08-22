import { Link } from "react-router-dom";

function ActivityCard({ activity }) {
  return (
    <div className="card">
      <h2>{activity.name}</h2>

      <p>{activity.description}</p>

      <p>
        <strong>Location:</strong> {activity.location}
      </p>

      <Link to={`/activities/${activity.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ActivityCard;