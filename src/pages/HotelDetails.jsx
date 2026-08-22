import { Link, useParams } from "react-router-dom";

function HotelDetails() {
  const { id } = useParams();

  const hotels = {
    1: {
      name: "Steigenberger Hotel",
      location: "Cairo, Egypt",
      description:
        "A comfortable hotel with great views, modern rooms, and excellent service.",
      rating: "4.5 / 5",
      price: "$120 per night",
    },

    2: {
      name: "Four Seasons Hotel",
      location: "Cairo, Egypt",
      description:
        "A luxurious hotel offering comfortable rooms, great facilities, and excellent service.",
      rating: "4.8 / 5",
      price: "$250 per night",
    },

    3: {
      name: "Rixos Premium",
      location: "Sharm El Sheikh, Egypt",
      description:
        "A beautiful resort with beaches, pools, restaurants, and many activities.",
      rating: "4.7 / 5",
      price: "$180 per night",
    },
  };

  const hotel = hotels[id];

  if (!hotel) {
    return (
      <div>
        <h1>Hotel Not Found</h1>
        <Link to="/hotels">Back to Hotels</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{hotel.name}</h1>

      <h3>Location</h3>
      <p>{hotel.location}</p>

      <h3>About</h3>
      <p>{hotel.description}</p>

      <h3>Rating</h3>
      <p>⭐ {hotel.rating}</p>

      <h3>Price</h3>
      <p>{hotel.price}</p>

      <Link to="/hotels">← Back to Hotels</Link>
    </div>
  );
}

export default HotelDetails;