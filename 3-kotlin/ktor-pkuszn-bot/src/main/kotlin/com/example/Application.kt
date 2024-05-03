package com.example

import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.FileInputStream
import java.util.*

val categories = arrayListOf(
    Category(1, "Black teas"),
    Category(2, "Green teas"),
    Category(3, "White teas"),
    Category(4, "Oolong teas"),
    Category(5, "Fruit teas"),
    Category(6, "Tea accessories")
)

val productList = listOf(
    Product(1, "Earl Grey", 1, 5.99f, createDate(2023, 1, 1).toString(), true),
    Product(2, "Jasmine Green Tea", 2, 7.99f, createDate(2023, 1, 2).toString(), true),
    Product(3, "Silver Needle", 3, 9.99f, createDate(2023, 1, 3).toString(), true),
    Product(4, "Tie Guan Yin", 4, 12.99f, createDate(2023, 1, 4).toString(), true),
    Product(5, "Berry Bliss", 5, 6.99f, createDate(2023, 1, 5).toString(), true),
    Product(6, "Tea Infuser", 6, 4.99f, createDate(2023, 1, 6).toString(), true),
    Product(7, "Chamomile Dream", 1, 8.99f, createDate(2023, 1, 7).toString(), true),
    Product(8, "Dragonwell Green", 2, 10.99f, createDate(2023, 1, 8).toString(), true),
    Product(9, "Golden Monkey", 3, 11.99f, createDate(2023, 1, 9).toString(), true),
    Product(10, "Milk Oolong", 4, 14.99f, createDate(2023, 1, 10).toString(), true),
)

enum class Categories(val id: Int, val displayName: String) {
    BLACK_TEAS(1, "black teas"),
    GREEN_TEAS(2, "green teas"),
    WHITE_TEAS(3, "white teas"),
    OOLONG_TEAS(4, "oolong teas"),
    FRUIT_TEAS(5, "fruit teas"),
    TEA_ACCESSORIES(6, "tea accessories");

    companion object {
        private val nameToIdMap = values().associateBy { it.displayName.lowercase(Locale.getDefault()) }
        fun getIdByDisplayName(displayName: String): Int? {
            return nameToIdMap[displayName.lowercase(Locale.getDefault())]?.id
        }
    }
}

suspend fun main() {
    val props = Properties()
    val configName = "src/main/config.properties"
    val tokenName = "botToken"
    withContext(Dispatchers.IO) {
        FileInputStream(configName).use {
            props.load(it)
        }
    }

    val token = props.getProperty(tokenName)
    val kord = Kord(token)

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on
        when (message.content) {
            "!ping" -> message.channel.createMessage("pong!")

            "!categories" -> {
                message.channel.createMessage(categoriesToDiscordMessage(categories))
            }

            else -> {
                if (message.content.startsWith("!category")) {
                    val categoryName = message.content.substringAfter(":").trim().lowercase(Locale.getDefault())
                    val matchingCategory = Categories.getIdByDisplayName((categoryName))
                    if (matchingCategory != null) {
                        val products = getProductsByCategoryId(matchingCategory, productList)
                        message.channel.createMessage(productsToDiscordMessage(products))
                    } else {
                        message.channel.createMessage("Category not found.")
                    }
                }
            }
        }
    }

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}

fun createDate(year: Int, month: Int, day: Int): Date {
    val calendar = Calendar.getInstance()
    calendar.set(year, month - 1, day)
    return calendar.time
}

fun getProductsByCategoryId(categoryId: Int, productList: List<Product>): List<Product> {
    return productList.filter { it.category == categoryId }
}

fun categoriesToDiscordMessage(categories: List<Category>): String {
    val messageBuilder = StringBuilder()
    for (category in categories) {
        messageBuilder.append(category.toDiscordMessage()).append("\n\n")
    }
    return messageBuilder.toString()
}

fun productsToDiscordMessage(products: List<Product>): String {
    val messageBuilder = java.lang.StringBuilder()
    for (product in products) {
        messageBuilder.append(product.toDiscordMessage()).append("\n\n")
    }
    return messageBuilder.toString()
}