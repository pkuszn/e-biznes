import React, { useEffect, useState } from "react";
import List from "../components/Products/list";
import { useParams } from 'react-router-dom'
import {
    fetchProductByCategory,
    fetchProducts,
} from "../services/productService.js";


const Products = () => {
    const [products, setProducts] = useState([]);
    const {idCategory} = useParams();

    useEffect(() => {
        if (idCategory) {
            fetchProductByCategory(idCategory)
                .then((res) => {
                    setProducts(res);
                })
                .catch((err) => {
                    setProducts([]);
                });
        } else {
            fetchProducts()
                .then((res) => {
                    setProducts(res);
                })
                .catch((err) => {
                    setProducts([]);
                });
        }
    }, [idCategory]);

    return (
        <div>
            <List products={products}></List>
        </div>
    );
};

export default Products;