package models

import java.time.LocalDate

case class Product(id: Long, name: String, category: Int, price: Double, created_date: LocalDate, available: Boolean)
