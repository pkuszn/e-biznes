import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { Purchase } from "../models/purchase.js";

const fetchPurchasesByName = async() => {
    let endpoint = combiner(api.getPurchasesByName);
    try {
        let response = await axios.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(p => new Purchase(p.id, p.id_product, p.id_user, p.price, p.quatity, p.purchase_date, p.delivery_type));
        } else {
            return [];
        }
    } catch(error) {
        console.error("Error during fetching purchases of user.", error);
    }
}

const makeOrder = async(purchases) => {
    let endpoint = combiner(api.makeOrder);
    try {
        let response = await axios.post(endpoint, purchases);
        if (response.data) {
            return response.data
        } else {
            return false;
        }
    } catch(error) {
        console.error("Error during making order.", error.message);
    }
}

export {
    fetchPurchasesByName,
    makeOrder
}