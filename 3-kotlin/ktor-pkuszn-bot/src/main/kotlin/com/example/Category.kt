package com.example

import kotlinx.serialization.Serializable

@Serializable
public data class Category(val id: Int, val name: String) {
    fun toDiscordMessage(): String {
        return "Category ID: $id\nCategory Name: $name"
    }
}
