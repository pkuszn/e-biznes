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

const createPayment = async(order, status, paymentMethod) => {
    let endpoint = combiner(api.payment);
    try {
        const data = {
            "id": 0,
            "idOrder": order.id,
            "paymentType": paymentMethod,
            "amount": order.amount,
            "paymentDate": order.purchaseDate,
            "status": status === true ? 1 : 2
        };

        let response = await axios.post(endpoint, data);
        if (response.data) {
            return response.data;
        }
    } catch(error) {
        console.error("Error during adding payment.");
    }
}

const updatePayment = async(payment) => {
    let endpoint = combiner(api.payment, payment.id);
    try {
        const data = {
            "id": payment.id,
            "idOrder": payment.idOrder,
            "paymentType": payment.paymentType,
            "amount": payment.amount,
            "paymentDate": payment.paymentDate,
            "status": 1
        };
        let response = await axios.put(endpoint, data);
        if (response.data) {
            return response.data;
        }
    } catch(error) {
        console.error("Error during updating payment");
    }
}

export {
    fetchPaymentByUser,
    createPayment,
    updatePayment
}