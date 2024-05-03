import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { User } from "../models/user.js";

const checkUser = async (name, password) => {
    let endpoint = combiner(api.checkUser);
    try {
        const data = {
            "name": name,
            "password": password
        }

        const response = await axios.get(endpoint, data);

        return response.data;
    } catch(error) {
        console.error("Error during fetching user.", error);
    }
}

const fetchUser = async(name) => {
    if (name === "") {
        console.log(`name is empty`);
        return;
    }
    let endpoint = combiner(api.getUserByName);
    try {
        let response = await axios.get(endpoint, {
            "name": name
        });
        if (response.data) {
            let u = response.data;
            return new User(u.id, u.name, u.surname, u.address, u.created_date, u.password);
        } else {
            return {};
        }

    } catch (error) {
        console.error("Error during fetching user.", error);
    }
}

export {
    checkUser,
    fetchUser
}