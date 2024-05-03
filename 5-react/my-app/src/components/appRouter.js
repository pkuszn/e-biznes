import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Basket from "../pages/basket";
import Login from "../pages/login";
import Products from "../pages/products";
import Payment from "../pages/payment"
import PaymentForm from "../components/Payment/paymentForm"

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
                    <Route path="/payments" element={<Payment />} />
                    <Route path="/payment-form" element={<PaymentForm />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;