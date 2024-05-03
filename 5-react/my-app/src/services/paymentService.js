import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { Payment } from "../models/payment.js";

const fetchPayments = async() => {
    let endpoint = combiner(api.payment);
    try {
        let response = await axios.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(p => new Payment(p.id, p.name));
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