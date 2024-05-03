import {api, category, deliveryTypes, paymentTypes} from './const.js'

const combiner = (endpoint, args) => {
    let address = api.address;
    if (args === undefined || args === "") {
        return [address, endpoint].join('/');
    }
    return [address, endpoint, args].join('/');
}

const categoryMapper = (idCategory) => {
    switch (idCategory) {
        case 1: {
            return category.blackTeas;
        }
        case 2: {
            return category.greenTeas;
        }
        case 3: {
            return category.whiteTeas;
        }
        case 4: {
            return category.oolongTeas;
        }
        case 5: {
            return category.fruitTeas;
        }
        case 6: {
            return category.teaAccessories;
        }
        default: {
            return category.blackTeas;
        }
    }
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

export {
    categoryMapper,
    combiner,
    deliveryTypeMapper,
    paymentTypeMapper
}