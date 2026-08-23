import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";


function Login() {

    return (

        <div className="auth-page">

            <div className="auth-container">

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
                            Welcome Back! 👋
                        </h1>

                        <p>
                            Log in to continue planning
                            your perfect trip.
                        </p>

                    </div>


                    <LoginForm />


                    <p className="switch-text">

                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>

                    </p>

                </div>


                {/* RIGHT SIDE */}

                <div className="auth-image">

                    <div className="image-text">

                        <h2>
                            Travel more.
                        </h2>

                        <h2>
                            Spend smarter.
                        </h2>

                        <p>
                            Plan your perfect trip
                            with Safarna.
                        </p>

                    </div>

                </div>


            </div>

        </div>
    );
}


export default Login;