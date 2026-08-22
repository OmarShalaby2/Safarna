import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <div className="card">
      <h2>{destination.name}</h2>

      <p>{destination.description}</p>

      <p>
        <strong>Location:</strong> {destination.location}
      </p>

      <Link to={`/destinations/${destination.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default DestinationCard;