export class Purchase {
    id_product;
    id_user;
    price;
    quantity;
    purchase_date;
    delivery_type;
    payment_type;

    constructor(
        id_product,
        id_user,
        price,
        quantity,
        purchase_date,
        delivery_type,
        payment_type
    ) {
        this.id_product = id_product;
        this.id_user = id_user;
        this.price = price;
        this.quantity = quantity;
        this.purchase_date = purchase_date;
        this.delivery_type = delivery_type;
        this.payment_type = payment_type;
    }
}