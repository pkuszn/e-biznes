INSERT INTO status (id, name)
VALUES 
    (1, 'Completed'),
    (2, 'Pending'),
    (3, 'Cancelled'),
    (4, 'Processing'),
    (5, 'Failed'),
    (6, 'Refunded'),
    (7, 'Verified'),
    (8, 'Awaiting Confirmation'),
    (9, 'Suspended');

INSERT INTO payment_method (id, name)
VALUES 
    (1, 'Credit Card'),
    (2, 'Bank Transfer'),
    (3, 'Blik'),
    (4, 'PayPal');