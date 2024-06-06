import { api } from "../utility/const.js";
import { combiner } from "../utility/utils.js";
import axios from "axios";
import { User } from "../models/user.js";
import { UserInfo } from "../models/userInfo.js";

const checkUser = async (name, password) => {
    let endpoint = combiner(api.checkUser);
    try {
        const data = {
            "name": name,
            "password": password
        }

        const response = await axios.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Error during fetching user.", error);
        alert(error)
    }
}

const fetchUser = async (name) => {
    // if (name === undefined) {
    //     console.log(`name is empty`);
    //     return;
    // }
    // if (name === null) {
    //     console.log(`name is null`);
    //     return;
    // }

    if (name === "") {
        console.log(`name is undefined`);
        return;
    }

    let endpoint = combiner(api.getUserByName);
    try {
        const data = {
            "name": name
        }
        let response = await axios.post(endpoint, data);
        console.log(response);
        if (response.data) {
            let u = response.data;
            return new User(u.id, u.name, u.surname, u.address, u.createdDate, u.password);
        } else {
            return {};
        }

    } catch (error) {
        console.error("Error during fetching user.", error);
    }
}

const registerUser = async (user) => {
    if (user == null || user == undefined) {
        console.log(`user is empty or null`);
        return;
    }

    let endpoint = combiner(api.user);
    try {
        const data = {
            "name": user.name,
            "surname": user.surname,
            "password": user.password,
            "address": user.address,
            "createdDate": user.createdDate
        }
        let response = await axios.post(endpoint, data);
        console.log(response);
        if (response.data) {
            let u = response.data;
            return new User(u.id, u.name, u.surname, u.address, u.createdDate, u.password);
        } else {
            return {};
        }
    } catch (error) {
        console.error("Error during creating user.", error);
    }
}

const fetchUserInfo = async (token) => {
    let endpoint = combiner(api.fetchUserInfo);
    try {
        const data = {
            "token": token
        }
        let response = await axios.post(endpoint, data);
        console.log(response);
        if (response.data) {
            let u = response.data;
            return new UserInfo(u.githubId, u.name, u.token);
        } else {
            return {};
        }

    } catch (error) {
        console.error("Error during fetching user.", error);
    }
}

export {
    checkUser,
    fetchUser,
    registerUser,
    fetchUserInfo
}