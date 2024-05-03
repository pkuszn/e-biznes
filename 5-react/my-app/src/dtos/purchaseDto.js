export class PurchaseDto {
    id;
    name;
    category;
    price;
    quantity;

    constructor(id, name, category, price, quantity) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }
}