function DestinationCard({ destination }) {
    return (
      <div>
        <h2>{destination.name}</h2>
        <p>{destination.description}</p>
        <p>Location: {destination.location}</p>
      </div>
    );
  }
  
  export default DestinationCard;