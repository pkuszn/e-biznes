export class Product {
    id;
    name;
    category;
    price;
    created_date;
    description;
    available;

    constructor(
        id,
        name,
        category,
        price,
        created_date,
        description,
        available
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.created_date = created_date;
        this.description = description;
        this.available = available;
    }
}