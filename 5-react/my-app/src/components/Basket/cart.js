import React, { useEffect, useState } from "react";
import "./style.css";
import CartItem from "./cartItem.js";
import { fetchUser } from "../../services/userService.js";
import { fetchDeliveryType } from "../../services/deliveryTypeService.js";
import { fetchPaymentType } from "../../services/paymentTypeService.js";
import Details from "./details.js";
import { PurchaseDto } from "../../dtos/purchaseDto.js";
import { Purchase } from "../../models/purchase.js";
import { fetchPaymentMethods } from "../../services/paymentMethodService.js";
import { createPayment } from "../../services/paymentService.js";
import { makeOrder } from "../../services/orderService.js";
import { Order } from "../../models/order.js"

const Cart = () => {
    const [user, setUser] = useState({});
    const [deliveryTypes, setDeliveryTypes] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedPaymentType, selectPaymentType] = useState(1);
    const [selectedDeliveryType, selectDeliveryType] = useState(1);
    const [selectedPaymentMethod, selectPaymentMethod] = useState(null);
    const [selectedPayNow, selectPayNow] = useState(0);

    const getTotalPrice = () => {
        return products.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const purchaseHandler = () => {
        const storedDataString = localStorage.getItem("cart");
        const storedData = storedDataString ? JSON.parse(storedDataString) : [];
        let products = storedData.map(
            (p) =>
                new PurchaseDto(p.id, p.name, p.category, p.price, p.quantity)
        );
        setProducts(products);
    };

    const handleBuy = () => {
        let purchases = Object.entries(products).map(([productId, product]) => {
            return new Purchase(
                product.id,
                user.id,
                product.price,
                product.quantity,
                new Date().toISOString(),
                selectedDeliveryType,
                selectedPaymentType
            );
        });
        
        if (purchases.length === 0) {
            return;
        }

        makeOrder(purchases)
            .then((res) => {
                console.log(res);
                let order = new Order(res.id, res.idUser, res.amount, res.purchaseDate, res.deliveryType, res.paymentType)
                if (order == undefined || order == null) {
                    alert("An error occured");
                } else {
                    let status = selectedPayNow;
                    createPayment(order, status)
                        .then((res) => {
                            console.log(res);
                            alert('Products have been purchased.')
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    handleCleanBasket();    
                }
            })
            .catch((err) => {
                alert(err);
            })
    };

    const handleCleanBasket = () => {
        localStorage.clear();
        window.location.reload();
    }

    const getUserName = () => {
        return sessionStorage.getItem("username");
    };

    useEffect(() => {
        fetchUser(getUserName())
            .then((res) => {
                setUser(res);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        fetchDeliveryType()
            .then((res) => {
                setDeliveryTypes(res);
            })
            .catch((err) => {
                console.log(err);
            });
        fetchPaymentType()
            .then((res) => {
                setPaymentTypes(res);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        fetchPaymentMethods()
            .then((res) => {
                setPaymentMethods(res);
            })
            .catch((err) => {
                console.log(err);
            })
        purchaseHandler();
    }, []);

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <div className="cart-table-container">
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <CartItem product={item} />
                        ))}
                    </tbody>
                </table>
            </div>

            {products.length === 0 && <p>Your cart is empty.</p>}
            <hr></hr>
            <Details
                user={user}
                deliveryTypes={deliveryTypes}
                paymentTypes={paymentTypes}
                paymentMethods={paymentMethods}
                totalPrice={getTotalPrice()}
                selectDeliveryType={selectDeliveryType}
                selectPaymentType={selectPaymentType}
                selectedPaymentMethod={selectPaymentMethod}
                selectedPayNow={selectPayNow}
            ></Details>
            <div className="cart-submit">
                <button className="clear-cart-button submit-buttons" onClick={handleCleanBasket}>
                    Clear Cart
                </button>
                <button className="submit-buttons" onClick={handleBuy}>
                    Buy
                </button>
            </div>
        </div>
    );
};

export default Cart;