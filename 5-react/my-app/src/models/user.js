export class User {
    id;
    name;
    surname;
    password;
    address;
    createdDate;

    constructor(id, name, surname, address, createdDate, password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.createdDate = createdDate;
        this.password = password;
    }
}