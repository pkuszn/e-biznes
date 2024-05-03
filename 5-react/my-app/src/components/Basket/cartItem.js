import React from "react";
import "./style.css";
import { MdDeleteForever } from "react-icons/md";
import { categoryMapper } from "../../utility/utils";

const CartItem = ({ product }) => {
    const removeFromBasketHandler = () => {
        const basket = JSON.parse(localStorage.getItem("cart")) || [];

        const index = basket.findIndex((p) => p.id === product.id);

        if (index !== -1) {
            basket.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(basket));
        }
        window.location.reload();
    };

    return (
        <tr className="cart-item">
            <td>{product.name}</td>
            <td>{categoryMapper(product.category)}</td>
            <td>{product.price}$</td>
            <td>{product.quantity}</td>
            <td>                
                <MdDeleteForever size="30" className="cart-item-delete" onClick={removeFromBasketHandler}>Remove</MdDeleteForever>
            </td>
        </tr>
    );
};

export default CartItem;