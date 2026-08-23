import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validation";


function LoginForm() {

    const { login } = useAuth();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [errors, setErrors] = useState({});

    const [serverError, setServerError] = useState("");


    function handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    }


    async function handleSubmit(event) {

        event.preventDefault();

        setServerError("");


        // Validate form
        const validationErrors =
            validateLogin(formData);

        setErrors(validationErrors);


        // Stop if there are errors
        if (Object.keys(validationErrors).length > 0) {
            return;
        }


        try {

            await login(
                formData.email,
                formData.password
            );

            // Go to profile after login
            navigate("/profile");

        }
        catch (error) {

            setServerError(error.message);

        }
    }


    return (

        <form
            className="auth-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {errors.email && (
                    <p className="error">
                        {errors.email}
                    </p>
                )}

            </div>


            <div className="form-group">

                <label>Password</label>

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {errors.password && (
                    <p className="error">
                        {errors.password}
                    </p>
                )}

            </div>


            {serverError && (
                <p className="error">
                    {serverError}
                </p>
            )}


            <button
                type="submit"
                className="main-button"
            >
                Login
            </button>

        </form>
    );
}


export default LoginForm;