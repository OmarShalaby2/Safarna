function HotelCard({ hotel }) {
    return (
      <div>
        <h2>{hotel.name}</h2>
        <p>{hotel.description}</p>
        <p>Location: {hotel.location}</p>
      </div>
    );
  }
  
  export default HotelCard;