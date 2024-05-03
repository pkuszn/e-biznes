import React from "react";
import "./style.css";
import { checkUser } from "../../services/userService";

export const Form = () => {
    const userHandler = () => {
        let user = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        checkUser(user, password)
            .then((res) => {
                if (res) {
                    sessionStorage.setItem("username", user);
                } else {
                    alert("User doesn't exists");
                }
            })
            .catch((err) => {
                alert(err.data);
            });
    };

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="Enter username" />
                <label for="password">Password</label>
                <input type="text" id="password" placeholder="Enter password" />
                <button type="submit" onClick={userHandler}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Form;