package com.transitgo.app.api

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

data class JourneyOption(val summary: String, val durationMinutes: Int)
data class Departure(val line: String, val destination: String, val expectedInMinutes: Int)

class ApiClient {
    private val baseJourney = "http://10.0.2.2:3001/v1" // Android emulator to localhost
    private val baseRealtime = "http://10.0.2.2:3002/v1"

    suspend fun searchJourneys(origin: String, destination: String): List<JourneyOption> = withContext(Dispatchers.IO) {
        val url = URL("$baseJourney/journeys?origin=${origin}&destination=${destination}")
        val conn = (url.openConnection() as HttpURLConnection).apply { requestMethod = "GET" }
        conn.inputStream.use { stream ->
            val text = stream.bufferedReader().readText()
            val root = JSONObject(text)
            val arr = root.getJSONArray("options")
            (0 until arr.length()).map {
                val o = arr.getJSONObject(it)
                JourneyOption(o.getString("summary"), o.getInt("durationMinutes"))
            }
        }
    }

    suspend fun departures(stopId: String): List<Departure> = withContext(Dispatchers.IO) {
        val url = URL("$baseRealtime/departures/$stopId")
        val conn = (url.openConnection() as HttpURLConnection).apply { requestMethod = "GET" }
        conn.inputStream.use { stream ->
            val text = stream.bufferedReader().readText()
            val root = JSONObject(text)
            val arr = root.getJSONArray("departures")
            (0 until arr.length()).map {
                val o = arr.getJSONObject(it)
                Departure(o.getString("line"), o.getString("destination"), o.getInt("expectedInMinutes"))
            }
        }
    }
}
