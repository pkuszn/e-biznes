export class UserDto {
    name;
    surname;
    address;
    password;

    constructor(name, surname, address, password) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.password = password;
    }
}