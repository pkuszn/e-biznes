SET IDENTITY_INSERT delivery_type ON;
INSERT INTO delivery_type (id, name) VALUES
    (1, 'Courier'),
    (2, 'Post');
SET IDENTITY_INSERT delivery_type OFF;

SET IDENTITY_INSERT payment_type ON;
INSERT INTO payment_type (id, name) VALUES
    (1, 'Cash on delivery'),
    (2, 'Pay in advance');
SET IDENTITY_INSERT payment_type OFF;

SET IDENTITY_INSERT category ON;
INSERT INTO category (id, name) VALUES
    (1, 'Black teas'),
    (2, 'Green teas'),
    (3, 'White teas'),
    (4, 'Oolong teas'),
    (5, 'Fruit teas'),
    (6, 'Tea accessories');
SET IDENTITY_INSERT category OFF;

SET IDENTITY_INSERT [user] ON;
INSERT INTO [user] (id, name, surname, password, address, created_date) VALUES
    (1, 'root', 'root', 'root', 'Zabrze', '2023-12-22 20:44:42');
SET IDENTITY_INSERT [user] OFF;

SET IDENTITY_INSERT product ON;
INSERT INTO product (id, name, category, price, created_date, description, available) VALUES
  (1, 'Earl Grey', 1, 5.99, '2023-01-01', 'A classic black tea with bergamot flavor', 1),
  (2, 'Jasmine Green Tea', 2, 7.99, '2023-01-02', 'Green tea scented with jasmine flowers', 1),
  (3, 'Silver Needle', 3, 9.99, '2023-01-03', 'A delicate white tea with silver buds', 1),
  (4, 'Tie Guan Yin', 4, 12.99, '2023-01-04', 'An oolong tea with floral and fruity notes', 1),
  (5, 'Berry Bliss', 5, 6.99, '2023-01-05', 'Fruit tea blend with berries', 1),
  (6, 'Tea Infuser', 6, 4.99, '2023-01-06', 'Stainless steel tea infuser for loose leaf tea', 1),
  (7, 'Chamomile Dream', 1, 8.99, '2023-01-07', 'Calming chamomile tea for a peaceful sleep', 1),
  (8, 'Dragonwell Green', 2, 10.99, '2023-01-08', 'High-quality green tea from West Lake, China', 1),
  (9, 'Golden Monkey', 3, 11.99, '2023-01-09', 'A bold and malty black tea with golden tips', 1),
  (10, 'Milk Oolong', 4, 14.99, '2023-01-10', 'Creamy oolong tea with a hint of sweetness', 1),
  (11, 'Citrus Burst', 5, 7.99, '2023-01-11', 'Citrus-infused tea blend for a refreshing taste', 1),
  (12, 'Glass Teapot', 6, 19.99, '2023-01-12', 'Borosilicate glass teapot with infuser', 1),
  (13, 'Peppermint Twist', 1, 6.99, '2023-01-13', 'Peppermint herbal tea with a twist of spearmint', 1),
  (14, 'White Peony', 2, 9.99, '2023-01-14', 'White tea with a mild and sweet flavor profile', 1),
  (15, 'Milky Oolong', 3, 13.99, '2023-01-15', 'Oolong tea with a creamy and rich taste', 1),
  (16, 'Blueberry Bliss', 4, 8.99, '2023-01-16', 'Blueberry-infused black tea for a fruity delight', 1),
  (17, 'Genmaicha', 5, 7.99, '2023-01-17', 'Japanese green tea with roasted brown rice', 1),
  (18, 'Cast Iron Teapot', 6, 29.99, '2023-01-18', 'Traditional cast iron teapot for a timeless experience', 1),
  (19, 'Hibiscus Delight', 1, 5.99, '2023-01-19', 'Hibiscus herbal tea with a burst of floral notes', 1),
  (20, 'Pu-erh Tuo Cha', 2, 16.99, '2023-01-20', 'Fermented Pu-erh tea in convenient tuo cha form', 1),
  (21, 'Lemon Ginger Zest', 1, 7.99, '2023-01-21', 'Herbal tea with a refreshing blend of lemon and ginger', 1),
  (22, 'High Mountain Oolong', 4, 18.99, '2023-01-22', 'Oolong tea grown in high mountain regions with a unique flavor profile', 1),
  (23, 'Mango Tango', 5, 8.99, '2023-01-23', 'Fruit tea with the tropical goodness of mango', 1),
  (24, 'Yerba Mate', 3, 10.99, '2023-01-24', 'South American tea known for its energizing properties', 1),
  (25, 'Golden Spiral Jasmine', 2, 14.99, '2023-01-25', 'Jasmine-infused green tea with golden spiral-shaped leaves', 1),
  (26, 'Chocolate Mint Rooibos', 1, 9.99, '2023-01-26', 'Rooibos tea with the delightful combination of chocolate and mint', 1),
  (27, 'Taiwanese Ruby Red', 4, 22.99, '2023-01-27', 'Ruby Red tea from Taiwan with a bold and robust flavor', 1),
  (28, 'Pomegranate Paradise', 5, 7.99, '2023-01-28', 'Fruit tea blend featuring the sweet taste of pomegranate', 1),
  (29, 'Darjeeling First Flush', 3, 15.99, '2023-01-29', 'First flush Darjeeling black tea known for its floral notes', 1),
  (30, 'Caramel Dream', 4, 11.99, '2023-01-30', 'Oolong tea with the rich and sweet taste of caramel', 1);
SET IDENTITY_INSERT product OFF;

SET IDENTITY_INSERT status ON;
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
SET IDENTITY_INSERT status OFF;

SET IDENTITY_INSERT payment_method ON;
INSERT INTO payment_method (id, name)
VALUES 
    (1, 'Credit Card'),
    (2, 'Bank Transfer'),
    (3, 'Blik'),
    (4, 'PayPal');
SET IDENTITY_INSERT payment_method OFF;
