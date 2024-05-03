import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { Category } from "../models/category.js";

const fetchCategories = async () => {
    let endpoint = combiner(api.category);
    try {
        const response = await axios.get(endpoint); 
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(c => new Category(c.id, c.name));
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error during fetching categories.", error);
    }
};

const fetchCategory = async (id) => {
    let endpoint = combiner(api.category, id);
    try {
        const response = await axios.get(endpoint);
        if (response.data) {
            return new Category(response.data.id, response.data.name);
        } else { 
            return {};
        }
    } catch (error) {
        console.error("Error during fetching category.", error);
    }
};

export {
    fetchCategories, 
    fetchCategory
}