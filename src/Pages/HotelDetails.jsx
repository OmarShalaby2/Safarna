import { useParams } from "react-router-dom";

function HotelDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Hotel Details</h1>
      <p>Hotel ID: {id}</p>
      <p>Hotel information will appear here.</p>
    </div>
  );
}

export default HotelDetails;