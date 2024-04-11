package models

case class Purchase(id: Long, idProduct: Long, idUser: Int, price: Double, quantity: Int, purchase_date: Datetime, delivery_type: Int, payment_type: Int)