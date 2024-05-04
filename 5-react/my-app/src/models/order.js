export class Order {
    id;
    idUser;
    amount;
    purchaseDate;
    deliveryType;
    paymentType;

    constructor(id, idUser, amount, purchaseDate, deliveryType, paymentType) {
        this.id = id;
        this.idUser = idUser;
        this.amount = amount;
        this.purchaseDate = purchaseDate;
        this.deliveryType = deliveryType;
        this.paymentType = paymentType;
    }
}