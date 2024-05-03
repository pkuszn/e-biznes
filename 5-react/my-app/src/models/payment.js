export class Payment {
    id;
    id_order;
    payment_type;
    amount;
    payment_date;
    status;

    constructor(id, id_order, payment_type, amount, payment_date, status) {
        this.id = id;
        this.id_order = id_order;
        this.payment_type = payment_type;
        this.amount = amount;
        this.payment_date = payment_date;
        this.status = status;
    }
}