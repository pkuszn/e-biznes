import React, { useEffect, useState } from "react";
import "./style.css";
import { fetchUserInfo, checkUser } from "../../services/userService";
import { generateRandomState } from "../../utility/utils"

export const Form = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const userHandler = (event) => {
        event.preventDefault();
        let user = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (!user) {
            alert("Missing username");
            return;
        }

        if (!password) {
            alert("Missing password");
            return;
        }

        checkUser(user, password)
            .then((res) => {
                if (res) {
                    sessionStorage.setItem("username", user);
                    window.location.replace(`/products`);
                } else {
                    alert("User doesn't exist");
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

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        if (token) {
            fetchUserInfo(token)
                .then((res) => {
                    if (res) {
                        sessionStorage.setItem("username", res.name);
                    } else {
                        alert("User doesn't exist");
                    }
                })
                .catch((err) => {
                    alert(err.data);
                });
            window.location.replace(`/products`);

        } else if (code) {
            setLoading(true);
            const state = generateRandomState();
            fetch(`http://localhost:1323/auth/github/callback?code=${code}&state=${state}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.token) {
                        localStorage.setItem("token", `${data.tokenType} ${data.token}`);
                        setData(data.userData);
                        sessionStorage.setItem("username", data.userData.name);
                    } else {
                        alert("Failed to obtain token");
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    alert(err.message);
                    setLoading(false);
                });
        }
    }, [code]);

    const currentUrl = window.location.href;

    function redirectToGitHub() {
        localStorage.setItem("redirectUrl", currentUrl);
        window.location.href = "http://localhost:1323/auth/github";
    }


    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" />
                <button type="submit" onClick={userHandler}>
                    Login
                </button>
                <button className="github-button" type="button" onClick={redirectToGitHub} style={{ marginTop: "5px" }}>
                    Login with GitHub
                </button>

                <div className="register-info">
                    <p>If you don't have an account, you can create one by clicking the button below:</p>
                    <button type="button" onClick={registerHandler} className="register-button">
                        Register
                    </button>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {data && <p>Welcome, {data.name}!</p>}
        </div>
    );
};

export default Form;
