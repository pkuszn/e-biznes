CREATE TABLE `payment` (
    id INTEGER PRIMARY KEY,
    id_order INTEGER NOT NULL,
    payment_type TEXT NOT NULL,
    amount REAL NOT NULL,
    payment_date TEXT NOT NULL,
    status INTEGER NOT NULL
);

CREATE TABLE `status` (
    id INTEGER PRIMARY KEY,
    name INTEGER TEXT NOT NULL
)

CREATE TABLE `payment_method` (
    id INTEGER PRIMARY KEY,
    name INTEGER TEXT NOT NULL
)