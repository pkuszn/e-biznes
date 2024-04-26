package com.example

import kotlinx.serialization.Serializable

@Serializable
public data class Product(val id: Int, val name: String, val category: Int, val price: Float, val createdDate: String, val available: Boolean) {
    fun toDiscordMessage(): String {
        return "Product ID: $id\nName: $name\nCategory: $category\nPrice: $price\nCreated Date: $createdDate\nAvailable: $available"
    }
}
