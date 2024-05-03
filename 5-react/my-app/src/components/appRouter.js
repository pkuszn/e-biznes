import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Basket from "../pages/basket";
import Login from "../pages/login";
import Products from "../pages/products";

const AppRouter = () => {
    return (
        <div className="home">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products/" element={<Products />} />
                    <Route path="/products/:idCategory" element={<Products />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;