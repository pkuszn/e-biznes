export class Purchase {
    idProduct;
    idUser;
    price;
    quantity;
    purchaseDate;
    deliveryType;
    paymentType;

    constructor(
        idProduct,
        idUser,
        price,
        quantity,
        purchaseDate,
        deliveryType,
        paymentType
    ) {
        this.idProduct = idProduct;
        this.idUser = idUser;
        this.price = price;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
        this.deliveryType = deliveryType;
        this.paymentType = paymentType;
    }
}