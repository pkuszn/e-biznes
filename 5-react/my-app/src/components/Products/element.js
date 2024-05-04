import React, {useState} from "react";
import { categoryEnum } from "../../utility/utils";
import { PurchaseDto } from "../../dtos/purchaseDto.js";

const Element = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const addToBasketHandler = (product) => {
        let purchaseDto = new PurchaseDto(
            product.id,
            product.name,
            product.category,
            product.price,
            quantity
        );
        updateLocalStorage(purchaseDto);
        window.location.reload();
    };

    const updateLocalStorage = (item) => {
        const basket = JSON.parse(localStorage.getItem("cart")) || [];
        basket.push(item);
        localStorage.setItem("cart", JSON.stringify(basket));
    };

    const quantityHandler = (value) => {
        setQuantity(value);
    }

    return (
        <div className="product-card">
            <div className="product-details">
                <h2>{product.name}</h2>
                <p>
                    <b>ID:</b> {product.id}
                </p>
                <p>
                    <b>Category:</b> {categoryEnum(product.category)}
                </p>
                <p>
                    <b>Price:</b> ${product.price.toFixed(2)}
                </p>
                <p>
                    <b>Created Date:</b> {product.created_date}
                </p>
                <p className="description">
                    <b>Description:</b> {product.description}
                </p>
            </div>
            <div className="product-card-footer">
                <p>
                    <b>Available:</b> {product.available ? "Yes" : "No"}
                </p>
                {product.available ? (
                    <div className="product-card-add">
                        <div className="product-card-add-quantity">
                            <p className="product-quantity-text">Quantity</p>
                            <input
                                type="text"
                                defaultValue="1"
                                id="product-quantity"
                                placeholder="Quantity"
                                onChange={(e) => quantityHandler(e.target.value)}
                            ></input>
                        </div>
                        <button
                            className="product-button"
                            onClick={() => addToBasketHandler(product)}
                        >
                            Add to basket
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Element;