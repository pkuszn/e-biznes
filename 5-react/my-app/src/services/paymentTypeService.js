import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { PaymentType } from "../models/paymentType.js";

const fetchPaymentType = async() => {
    let endpoint = combiner(api.paymentType);
    try {
        let response = await axios.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(p => new PaymentType(p.id, p.name));
        } else {
            return [];
        }
    } catch(error) {
        console.error("Error during fetching payment types.", error);
    }
}

export {
    fetchPaymentType
}