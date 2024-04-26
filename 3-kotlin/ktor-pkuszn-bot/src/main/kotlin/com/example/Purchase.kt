package com.example

import kotlinx.serialization.Serializable

@Serializable
public data class Purchase(val id: Int, val idProduct: Int, val idUser: Int, val price: Float, val quantity: Int, val purchaseDate: String, val deliveryType: Int, val paymentType: Int) {
    fun toDiscordMessage(): String {
        return """
             Purchase ID: $id
             Product ID: $idProduct
             User ID: $idUser
             Price: $price
             Quantity: $quantity
             Purchase Date: $purchaseDate
             Delivery Type: $deliveryType
             Payment Type: $paymentType
             """.trimIndent()
    }
}