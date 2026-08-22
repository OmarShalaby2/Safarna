function ActivityCard({ activity }) {
    return (
      <div>
        <h2>{activity.name}</h2>
        <p>{activity.description}</p>
        <p>Location: {activity.location}</p>
      </div>
    );
  }
  
  export default ActivityCard;