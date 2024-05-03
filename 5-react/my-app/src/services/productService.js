import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { Product } from "../models/product.js";

const fetchProducts = async () => {
    let endpoint = combiner(api.product);
    try {
        let response = await axios.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(p => new Product(p.id, p.name, p.category, p.price, p.created_date, p.description, p.available));
        } else {
            return [];
        }
    } catch(error) {
        console.error("Error during fetching products.", error);
    }
}

const fetchProduct = async(id) => {
    let endpoint = combiner(api.product, id);
    try {
        let response = await axios.get(endpoint);
        if (response.data) {
            let p = response.data;
            return new Response(p.id, p.name, p.category, p.price, p.created_date, p.description, p.available);
        } else {
            return {};
        }
    } catch(error) {
        console.error("Error during fetching product.", error);
    }
}

const fetchProductByCategory = async(idCategory) => {
    let endpoint = combiner(api.productsByCategory, idCategory);
    try {
        let response = await axios.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(p => new Product(p.id, p.name, p.category, p.price, p.created_date, p.description, p.available));
        } else {
            return [];
        }
    } catch(error) {
        console.error("Error during fetching product.", error);
    }
}

export {
    fetchProduct,
    fetchProducts,
    fetchProductByCategory
}