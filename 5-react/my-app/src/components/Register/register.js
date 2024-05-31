import React, { useState } from "react";
import "./style.css";
import { User } from "../../models/user";
import { registerUser } from "../../services/userService";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        address: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const registerHandler = (event) => {
        event.preventDefault();
        const id = new Date().toISOString();
        const createdDate = new Date();
        
        if (!formData.name || !formData.surname || !formData.address || !formData.password) {
            alert("All fields are required");
            return;
        }

        const newUser = new User(
            id,
            formData.name,
            formData.surname,
            formData.address,
            createdDate,
            formData.password
        );

        registerUser(newUser)
        .then((res) => {
            if (res) {
                sessionStorage.setItem("username", newUser.name);
            } else {
                alert("User doesn't exists");
            }
        })
        .catch((err) => {
            alert(err.data);
        });

        alert("Registration successful");
        window.location.replace(`/`);
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={registerHandler}>
                <h2>Register</h2>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="surname">Surname</label>
                <input
                    type="text"
                    id="surname"
                    placeholder="Enter surname"
                    value={formData.surname}
                    onChange={handleChange}
                />
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
