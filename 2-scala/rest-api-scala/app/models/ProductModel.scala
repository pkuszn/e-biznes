package models

case class Product(id: Long, name: String, category: Int, price: Double, created_date: Datetime, available: Boolean)
