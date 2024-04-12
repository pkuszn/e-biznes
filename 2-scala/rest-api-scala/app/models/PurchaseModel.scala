package models

import java.time.LocalDate

case class Purchase(id: Long, idProduct: Long, idUser: Int, price: Double, quantity: Int, purchase_date: LocalDate, delivery_type: Int, payment_type: Int)