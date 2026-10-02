package com.transitgo.app.data.model

data class Stop(val id: String, val name: String, val lat: Double, val lon: Double, val accessible: Boolean? = null)

enum class Mode { WALK, BUS, TRAM, TROLLEYBUS }

data class Leg(
    val mode: Mode,
    val from: String,
    val to: String,
    val startTime: String,
    val endTime: String,
    val lineId: String? = null,
    val distanceMeters: Int? = null
)

data class JourneyOption(val summary: String, val durationMinutes: Int, val legs: List<Leg>, val accessible: Boolean? = null)
data class JourneyResponse(val options: List<JourneyOption>)

data class Departure(val line: String, val destination: String, val plannedTime: String, val expectedInMinutes: Int)
data class DepartureBoard(val stopId: String, val departures: List<Departure>)

data class Ticket(val id: String, val productId: String, val userId: String, val active: Boolean, val createdAt: String)
data class Consent(val id: String, val granted: Boolean, val timestamp: String)
data class UserProfile(val sub: String, val email: String, val consents: List<Consent>)
