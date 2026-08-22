import HeroSection from "../Components/HeroSection";
import DestinationCard from "../Components/DestinationCard";
import HotelCard from "../Components/HotelCard";
import ActivityCard from "../Components/ActivityCard";

function Home() {
  const destinations = [
    {
      id: 1,
      name: "Cairo",
      description: "Explore the history and beauty of Cairo.",
      location: "Egypt",
    },
    {
      id: 2,
      name: "Alexandria",
      description: "Enjoy the beautiful Mediterranean coast.",
      location: "Egypt",
    },
    {
      id: 3,
      name: "Sharm El Sheikh",
      description: "Relax and enjoy the beautiful beaches.",
      location: "Egypt",
    },
  ];

  const hotels = [
    {
      id: 1,
      name: "Steigenberger Hotel",
      description: "A comfortable hotel with great service.",
      location: "Cairo, Egypt",
    },
    {
      id: 2,
      name: "Four Seasons Hotel",
      description: "Enjoy a luxurious stay in Cairo.",
      location: "Cairo, Egypt",
    },
  ];

  const activities = [
    {
      id: 1,
      name: "Nile Cruise",
      description: "Enjoy a relaxing cruise on the Nile.",
      location: "Cairo, Egypt",
    },
    {
      id: 2,
      name: "Desert Safari",
      description: "Experience an exciting desert adventure.",
      location: "Sharm El Sheikh, Egypt",
    },
  ];

  return (
    <div>
      <HeroSection />

      <section>
  <h2>Popular Destinations</h2>

  <div className="cards-container">
    {destinations.map((destination) => (
      <DestinationCard
        key={destination.id}
        destination={destination}
      />
    ))}
  </div>
</section>

<section>
  <h2>Popular Hotels</h2>

  <div className="cards-container">
    {hotels.map((hotel) => (
      <HotelCard
        key={hotel.id}
        hotel={hotel}
      />
    ))}
  </div>
</section>

<section>
  <h2>Popular Activities</h2>

  <div className="cards-container">
    {activities.map((activity) => (
      <ActivityCard
        key={activity.id}
        activity={activity}
      />
    ))}
  </div>
</section>
    </div>
  );
}

export default Home;