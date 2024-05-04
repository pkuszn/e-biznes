import { Order } from "../models/order";
import { api } from "../utility/const";
import { combiner } from "../utility/utils";
import axios from "axios";

const makeOrder = async(purchases) => {
    let endpoint = combiner(api.makeOrder);
    try {
        console.log(purchases);
        let response = await axios.post(endpoint, purchases);
        if (response.data) {
            return new Order(response.data.id, response.data.idUser, response.data.amount, response.data.purchaseDate, response.data.deliveryType, response.data.paymentType);
        } else {
            return false;
        }
    } catch(error) {
        console.error("Error during making order.", error.message);
    }
}

export {
    makeOrder
}