import { useParams } from "react-router-dom";

function ActivityDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Activity Details</h1>
      <p>Activity ID: {id}</p>
      <p>Activity information will appear here.</p>
    </div>
  );
}

export default ActivityDetails;