import { useAuth } from "../context/AuthContext";


function ProfileCard() {

    const { user, logout } = useAuth();


    return (

        <div className="profile-card">

            <div className="profile-avatar">

                {user.name
                    .charAt(0)
                    .toUpperCase()
                }

            </div>


            <h2>
                {user.name}
            </h2>


            <p className="profile-email">
                {user.email}
            </p>


            <div className="profile-details">

                <div className="profile-row">

                    <span>Name</span>

                    <strong>
                        {user.name}
                    </strong>

                </div>


                <div className="profile-row">

                    <span>Email</span>

                    <strong>
                        {user.email}
                    </strong>

                </div>


                <div className="profile-row">

                    <span>Account Type</span>

                    <strong>
                        User
                    </strong>

                </div>

            </div>


            <button
                className="logout-button"
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
}


export default ProfileCard;