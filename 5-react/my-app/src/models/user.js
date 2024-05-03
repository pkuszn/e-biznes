export class User {
    id;
    name;
    surname;
    password;
    address;
    created_date;

    constructor(id, name, surname, address, created_date, password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.created_date = created_date;
        this.password = password;
    }
}