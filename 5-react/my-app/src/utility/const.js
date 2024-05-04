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
    makeOrder: "purchase/order",
    payment: "payment",
    status: "status",
    paymentMethod: "payment-method",
    address: "http://localhost:1323/api",
}

const category = {
    blackTeas: "Black teas",
    greenTeas: "Green teas",
    whiteTeas: "White teas",
    oolongTeas: "Oolong teas",
    fruitTeas: "fruitTeas",
    teaAccessories: "Tea accessories"
};

const paymentTypes = {
    cashOnDelivery: "Cash on delivery",
    payInAdvance: "Pay in advance"
}

const deliveryTypes = {
    courier: "Courier",
    post: "Post"
}

const statuses = {
    completed: "Completed",
    pending: "Pending",
    cancelled: "Cancelled",
    processing: "Processing",
    failed: "Failed",
    refunded: "Refunded",
    verified: "Verified",
    awaitingConfirmation: "Awaiting Confirmation",
    suspended: "Suspended"
}

const paymentMethods = {
    creditCard: "Credit Card",
    bankTransfer: "Bank transfer",
    blik: "Blik",
    payPal: "Pay Pal"
}

export {
    api, 
    category,
    paymentTypes,
    deliveryTypes,
    statuses,
    paymentMethods
}