import {api, category, statuses, paymentMethods} from './const.js'

const combiner = (endpoint, args) => {
    let address = api.address;
    if (args === undefined || args === "") {
        return [address, endpoint].join('/');
    }
    return [address, endpoint, args].join('/');
}

const deliveryTypeMapper = (name) => {
    switch (name) {
        case "Courier": {
            return 1;
        }
        case "Post": {
            return 2;
        }
        default: {
            return 1;
        }
    }   
}

const paymentTypeMapper = (name) => {
    switch(name) {
        case "Cash on delivery": {
            return 1;
        }
        case "Pay in advance": {
            return 2;
        }
        default: {
            return 1;
        }
    }
}

const paymentMethodMapper = (name) => {
    switch(name) {
        case "Credit Card": {
            return 1;
        }
        case "Bank Transfer": {
            return 2;
        }
        case "Blik": {
            return 3;
        }
        case "PayPal": {
            return 4;
        }
        default: {
            return 1;
        }
    }
}

const statusEnum = (id) => statuses[id] || "Unknown";
const paymentMethodEnum = (id) => paymentMethods[id] || "Unknown";
const categoryEnum = (id) => category[id] || "Unknown";

export {
    categoryEnum,
    combiner,
    deliveryTypeMapper,
    paymentTypeMapper,
    paymentMethodMapper,
    statusEnum,
    paymentMethodEnum,
}