import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { PaymentMethod } from '../models/paymentMethod'

const fetchPaymentMethods = async() => {
    let endpoint = combiner(api.paymentMethod);
    try {
        let response = await axios.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(p => new PaymentMethod(p.id, p.name));
        } else {
            return [];
        }
    } catch(error) {
        console.error("Error during fetching payment methods.", error);
    }
}

export {
    fetchPaymentMethods
}