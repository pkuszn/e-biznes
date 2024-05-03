import React from "react";
import Element from "./element";
import "./style.css";

const List = ({ products }) => {
    return (
        <div>
            <h1 className="product-header">Products</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <Element product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;