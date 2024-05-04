export class Product {
    id;
    name;
    category;
    price;
    createdDate;
    description;
    available;

    constructor(
        id,
        name,
        category,
        price,
        created_date,
        createdDate,
        available
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.createdDate = created_date;
        this.description = createdDate;
        this.available = available;
    }
}