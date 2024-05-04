import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { Payment } from "../models/payment.js";

const fetchPaymentByUser = async(id_user) => {
    let endpoint = combiner(api.paymentByUser, id_user);
    console.log(endpoint)
    try {
        let response = await axios.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(p => new Payment(p.id, p.idOrder, p.paymentType, p.amount, p.paymentDate, p.status));
        } else {
            return [];
        }
    } catch(error) {
        console.error("Error during fetching payment types.", error);
    }
}

const createPayment = async(order, status) => {
    let endpoint = combiner(api.payment);
    try {
        const data = {
            "id": 0,
            "idOrder": order.id,
            "paymentType": order.paymentType,
            "amount": order.amount,
            "paymentDate": order.paymentDate,
            "status": status
        };

        let response = await axios.post(endpoint, data);
        if (response.data) {
            return response.data;
        }
    } catch(error) {
        console.error("Error during adding payment.");
    }
}

export {
    fetchPaymentByUser,
    createPayment
}