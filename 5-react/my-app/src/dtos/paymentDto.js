export class PaymentDto {
    id;
    idOrder;
    paymentType;
    amount;
    paymentDate;
    status;

    constructor(id, idOrder, paymentType, amount, paymentDate, status) {
        this.id = id;
        this.idOrder = idOrder;
        this.paymentType = paymentType;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.status = status;
    }
}