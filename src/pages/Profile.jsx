import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import ProfileCard from "../components/ProfileCard";


function Profile() {

    const { user } = useAuth();


    // If user is not logged in
    // send them to login

    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    return (

        <div className="profile-page">

            <div className="profile-container">

                <div className="profile-heading">

                    <span>
                        My Account
                    </span>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        Manage your personal
                        information and account settings.
                    </p>

                </div>


                <ProfileCard />

            </div>

        </div>
    );
}


export default Profile;