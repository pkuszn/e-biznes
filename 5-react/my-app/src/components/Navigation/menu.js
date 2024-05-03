import React, { useEffect, useState } from "react";
import "./style.css";
import Dropdown from "./dropdown";

const Logo = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (username !== undefined || username !== "") {
            setUser(username);
        }
    }, []);

    const logoutHandler = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
    };

    const basketContentHandler = () => {
        const storedData = localStorage.getItem("cart") || [];
        if (storedData.length === 0) {
            return 0;
        }
        const data = JSON.parse(storedData);
        return data.length;
    };

    return (
        <div id="topbar">
            <h3>Tea shop</h3>
            <div id="navigation">
                <ul>
                    <li>
                        <Dropdown></Dropdown>
                    </li>
                    <li>
                        <a href="/products">Products</a>
                    </li>
                    <li>
                        <a href="/basket">Basket</a>
                    </li>
                    <li>
                        <a href='/payments'>Payments</a>
                    </li>
                    <li>
                        {user ? (
                            <p onClick={logoutHandler}>
                                <b>Log out</b>
                            </p>
                        ) : (
                            <a href="/login">Login</a>
                        )}
                    </li>
                    <li>
                        {user
                            ? "Basket content: " + basketContentHandler()
                            : ""}
                    </li>
                    <li>{user ? "Logged as: " + user : ""}</li>
                </ul>
            </div>
        </div>
    );
};

export default Logo;