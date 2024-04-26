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
        if (message.content != "!ping") return@on
        message.channel.createMessage("pong!")
    }

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}