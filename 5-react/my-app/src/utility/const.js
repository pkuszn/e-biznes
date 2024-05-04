const api = {
    category: "category",
    product: "product",
    purchase: "purchase",
    deliveryType: "delivery-type",
    paymentType: "payment-type",
    user: "user",
    productsByCategory: "product/category",
    checkUser: "user/check",
    getUserByName: "user/name",
    getPurchasesByName: "purchase/user",
    makeOrder: "order/make",
    payment: "payment",
    status: "status",
    paymentMethod: "payment-method",
    paymentByUser: 'payment/user',
    address: "http://localhost:1323/api",
}

const paymentTypes = {
    cashOnDelivery: "Cash on delivery",
    payInAdvance: "Pay in advance"
}

const deliveryTypes = {
    courier: "Courier",
    post: "Post"
}

const category = {
    1: "Black teas",
    2: "Green teas",
    3: "White teas",
    4: "Oolong teas",
    5: "Fruit teas",
    6: "Tea accessories"
};

const statuses = {
    1: "Completed",
    2: "Pending",
    3: "Cancelled",
    4: "Processing",
    5: "Failed",
    6: "Refunded",
    7: "Verified",
    8: "Awaiting Confirmation",
    9: "Suspended"
};

const paymentMethods = {
    1: "Credit Card",
    2: "Bank Transfer",
    3: "Blik",
    4: "PayPal"
};

export {
    api, 
    category,
    paymentTypes,
    deliveryTypes,
    statuses,
    paymentMethods
}