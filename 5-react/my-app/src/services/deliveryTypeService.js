import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { DeliveryType } from "../models/deliveryType.js";

const fetchDeliveryType = async() => {
    let endpoint = combiner(api.deliveryType);
    try {
        let response = await axios.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(p => new DeliveryType(p.id, p.name));
        } else {
            return [];
        }
    } catch(error) {
        console.error("Error during fetching delivery types.", error);
    }
}

export {
    fetchDeliveryType
}