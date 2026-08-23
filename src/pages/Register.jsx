import { Link } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";


function Register() {

    return (

        <div className="auth-page">

            <div className="auth-container">


                {/* LEFT SIDE */}

                <div className="auth-content">

                    <div className="logo">

                        <span>📍</span>

                        <div>
                            <h2>Safarna</h2>

                            <small>
                                Smart Travel Budget Planner
                            </small>
                        </div>

                    </div>


                    <div className="auth-heading">

                        <h1>
                            Create Account ✈️
                        </h1>

                        <p>
                            Join Safarna and start
                            planning your amazing trips.
                        </p>

                    </div>


                    <RegisterForm />


                    <p className="switch-text">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </p>

                </div>


                {/* RIGHT SIDE */}

                <div className="auth-image register-image">

                    <div className="image-text">

                        <h2>
                            Your next adventure
                        </h2>

                        <h2>
                            starts here.
                        </h2>

                        <p>
                            Plan your trip.
                            Manage your budget.
                        </p>

                    </div>

                </div>


            </div>

        </div>
    );
}


export default Register;