import { Link, useParams } from "react-router-dom";

function DestinationDetails() {
  const { id } = useParams();

  const destinations = {
    1: {
      name: "Cairo",
      location: "Egypt",
      description:
        "Cairo is the capital of Egypt and one of the most historic cities in the world.",
      highlights: "Pyramids of Giza, Egyptian Museum, Nile River",
    },

    2: {
      name: "Alexandria",
      location: "Egypt",
      description:
        "Alexandria is a beautiful Mediterranean city famous for its beaches and history.",
      highlights: "Bibliotheca Alexandrina, Mediterranean Sea, Qaitbay Citadel",
    },

    3: {
      name: "Sharm El Sheikh",
      location: "Egypt",
      description:
        "Sharm El Sheikh is a popular destination known for its beaches, diving, and coral reefs.",
      highlights: "Naama Bay, Ras Mohammed, Diving",
    },
  };

  const destination = destinations[id];

  if (!destination) {
    return (
      <div>
        <h1>Destination Not Found</h1>
        <Link to="/destinations">Back to Destinations</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{destination.name}</h1>

      <h3>Location</h3>
      <p>{destination.location}</p>

      <h3>About</h3>
      <p>{destination.description}</p>

      <h3>Highlights</h3>
      <p>{destination.highlights}</p>

      <Link to="/destinations">← Back to Destinations</Link>
    </div>
  );
}

export default DestinationDetails;