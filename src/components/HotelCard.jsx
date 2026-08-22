import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  return (
    <div className="card">
      <h2>{hotel.name}</h2>

      <p>{hotel.description}</p>

      <p>
        <strong>Location:</strong> {hotel.location}
      </p>

      <Link to={`/hotels/${hotel.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default HotelCard;