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

    const registerHandler = (event) => {
        event.preventDefault();
        window.location.replace(`/register`);
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
                <div className="register-info">
                    <p>If you don't have an account, you can create one by clicking the button below:</p>
                    <button type="button" onClick={registerHandler} className="register-button">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;