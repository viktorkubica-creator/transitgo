package com.transitgo.app.data.repository

import com.transitgo.app.data.model.JourneyOption
import com.transitgo.app.data.model.Ticket
import com.transitgo.app.data.model.UserProfile
import com.transitgo.app.data.remote.ApiService

class JourneyRepository(private val api: ApiService) {
    private val saved = mutableListOf<JourneyOption>()
    suspend fun search(origin: String, destination: String): List<JourneyOption> = api.searchJourneys(origin, destination).options
    fun save(option: JourneyOption) { saved += option }
    fun savedJourneys(): List<JourneyOption> = saved.toList()
}

class TicketRepository(private val api: ApiService) {
    suspend fun list(userId: String): List<Ticket> = api.tickets(userId)
    suspend fun qr(id: String): String = api.ticketQR(id)
}

class UserRepository(private val api: ApiService) {
    suspend fun profile(token: String): UserProfile = api.profile(token)
}
