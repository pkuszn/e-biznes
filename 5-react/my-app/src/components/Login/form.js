import React from "react";
import "./style.css";
import { checkUser } from "../../services/userService";

export const Form = () => {
    const userHandler = () => {
        let user = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (user == null || user == undefined || user == "") {
            alert("Missing username")
            return;
        }

        if (password == null || password == undefined || password == "") {
            alert("Missing password")
            return;
        }

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

        // const query = new URLSearchParams(window.location.search);
        // const token = query.get('token');
        // const queryName = query.get('user');
        // if (token) {
        //     sessionStorage.setItem('token', token);
        //     sessionStorage.setItem('username', queryName);
        //     fetchUser(token);
        // }
    };

    const registerHandler = (event) => {
        event.preventDefault();
        window.location.replace(`/register`);
    };

    // //TODO
    // const fetchUser = async (token) => {
    //     try {
    //       const response = await axios.get('http://localhost:1323/api/userinfo', {
    //         headers: {
    //           'Authorization': `Bearer ${token}`
    //         }
    //       });
    //       setUser(response.data);
    //     } catch (error) {
    //       console.error('Error fetching user', error);
    //     }
    //   };

    const login = () => {
        window.location.href = "http://localhost:1323/auth/github";
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
                <button id="login" style={{marginTop:5}} onClick={login}>Login with GitHub</button>
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