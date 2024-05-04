import {api, category, deliveryTypes, statuses, paymentMethods, paymentTypes} from './const.js'

const combiner = (endpoint, args) => {
    let address = api.address;
    if (args === undefined || args === "") {
        return [address, endpoint].join('/');
    }
    return [address, endpoint, args].join('/');
}

const deliveryTypeMapper = (name) => {
    switch (name) {
        case deliveryTypes.courier: {
            return 1;
        }
        case deliveryTypes.post: {
            return 2;
        }
        default: {
            return 1;
        }
    }   
}

const paymentTypeMapper = (name) => {
    switch(name) {
        case paymentTypes.cashOnDelivery: {
            return 1;
        }
        case paymentTypes.payInAdvance: {
            return 2;
        }
        default: {
            return 1;
        }
    }
}

const paymentMethodMapper = (name) => {
    switch(name) {
        case paymentMethods.creditCard: {
            return 1;
        }
        case paymentMethods.bankTransfer: {
            return 2;
        }
        case paymentMethods.blik: {
            return 3;
        }
        case paymentMethods.payPal: {
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