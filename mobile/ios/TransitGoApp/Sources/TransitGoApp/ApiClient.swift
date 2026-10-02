import Foundation

struct JourneyOption: Decodable {
    let summary: String
    let durationMinutes: Int
}

struct Departure: Decodable {
    let line: String
    let destination: String
    let expectedInMinutes: Int
}

class ApiClient {
    // Update ports to match local dev services
    private let baseJourney = URL(string: "http://localhost:3001/v1")!
    private let baseRealtime = URL(string: "http://localhost:3002/v1")!
    private let baseIdentity = URL(string: "http://localhost:3003/v1")!

    func searchJourneys(origin: String, destination: String) async throws -> [JourneyOption] {
        var comps = URLComponents(url: baseJourney.appendingPathComponent("journeys"), resolvingAgainstBaseURL: false)!
        comps.queryItems = [
            URLQueryItem(name: "origin", value: origin),
            URLQueryItem(name: "destination", value: destination)
        ]
        let (data, _) = try await URLSession.shared.data(from: comps.url!)
        let res = try JSONDecoder().decode(JourneySearchResponse.self, from: data)
        return res.options
    }

    func departures(stopId: String) async throws -> [Departure] {
        let url = baseRealtime.appendingPathComponent("departures/\(stopId)")
        let (data, _) = try await URLSession.shared.data(from: url)
        let res = try JSONDecoder().decode(DepartureBoard.self, from: data)
        return res.departures
    }
}

struct JourneySearchResponse: Decodable {
    let options: [JourneyOption]
}

struct DepartureBoard: Decodable {
    let stopId: String
    let departures: [Departure]
}
