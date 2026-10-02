package com.transitgo.app.data.remote

import com.transitgo.app.data.model.*

interface ApiService {
    suspend fun searchJourneys(origin: String, destination: String): JourneyResponse
    suspend fun departures(stopId: String): DepartureBoard
    suspend fun profile(token: String): UserProfile
    suspend fun tickets(userId: String): List<Ticket>
    suspend fun ticketQR(id: String): String
}

class MockApiService : ApiService {
    override suspend fun searchJourneys(origin: String, destination: String): JourneyResponse {
        return JourneyResponse(listOf(JourneyOption("$origin → $destination", 15, emptyList(), true)))
    }
    override suspend fun departures(stopId: String): DepartureBoard {
        return DepartureBoard(stopId, listOf(Departure("4", "City", "2026-01-01T12:00:00Z", 5)))
    }
    override suspend fun profile(token: String): UserProfile {
        return UserProfile("user@example.com", "user@example.com", emptyList())
    }
    override suspend fun tickets(userId: String): List<Ticket> {
        return listOf(Ticket("t1", "prod_single", userId, false, "2026-01-01T12:00:00Z"))
    }
    override suspend fun ticketQR(id: String): String {
        return "mock.$id.token"
    }
}
