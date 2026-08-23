import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { validateRegister } from "../utils/validation";


function RegisterForm() {

    const { register } = useAuth();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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


        const validationErrors =
            validateRegister(formData);

        setErrors(validationErrors);


        if (Object.keys(validationErrors).length > 0) {
            return;
        }


        try {

            const newUser = {

                name: formData.name,

                email: formData.email,

                password: formData.password
            };


            await register(newUser);


            // After registration
            // go to home/login
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

                <label>Full Name</label>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                />

                {errors.name && (
                    <p className="error">
                        {errors.name}
                    </p>
                )}

            </div>


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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {errors.password && (
                    <p className="error">
                        {errors.password}
                    </p>
                )}

            </div>


            <div className="form-group">

                <label>Confirm Password</label>

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                {errors.confirmPassword && (
                    <p className="error">
                        {errors.confirmPassword}
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
                Create Account
            </button>

        </form>
    );
}


export default RegisterForm;