CREATE TABLE IF NOT EXISTS payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    payment_type TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATETIME NOT NULL,
    status INT NOT NULL
);

CREATE TABLE IF NOT EXISTS status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_method (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    category INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_date DATETIME NOT NULL,
    description TEXT NULL,
    available INT NOT NULL
);

CREATE TABLE IF NOT EXISTS purchase (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_order BIGINT NOT NULL,
    id_product BIGINT NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    password TEXT NOT NULL,
    address TEXT NOT NULL,
    created_date DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS delivery_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_user BIGINT NOT NULL,
    amount FLOAT NOT NULL,
    purchase_date DATETIME NOT NULL,
    delivery_type INT NOT NULL,
    payment_type INT NOT NULL
);
