import Foundation

// Implements FR-001..FR-003 (TRGO-20), FR-007/009 (TRGO-18), FR-020 (TRGO-14), FR-022..024 (TRGO-16)
public protocol APIClientProtocol {
    func searchJourneys(origin: String, destination: String) async throws -> JourneyResponse
    func departures(stopId: String) async throws -> DepartureBoard
    func profile(token: String) async throws -> UserProfile
    func tickets(userId: String) async throws -> [Ticket]
    func ticketQR(id: String) async throws -> String
}

public final class APIClient2: APIClientProtocol {
    private let session: URLSession
    private let baseJourney = URL(string: "http://localhost:3001/v1")!
    private let baseRealtime = URL(string: "http://localhost:3002/v1")!
    private let baseIdentity = URL(string: "http://localhost:3003/v1")!
    private let baseTicketing = URL(string: "http://localhost:3005/v1")!
    
    public init(session: URLSession = .shared) {
        self.session = session
    }
    
    public func searchJourneys(origin: String, destination: String) async throws -> JourneyResponse {
        var comps = URLComponents(url: baseJourney.appendingPathComponent("journeys"), resolvingAgainstBaseURL: false)!
        comps.queryItems = [
            URLQueryItem(name: "origin", value: origin),
            URLQueryItem(name: "destination", value: destination)
        ]
        let (data, _) = try await session.data(from: comps.url!)
        return try JSONDecoder.iso().decode(JourneyResponse.self, from: data)
    }
    
    public func departures(stopId: String) async throws -> DepartureBoard {
        let url = baseRealtime.appendingPathComponent("departures/\(stopId)")
        let (data, _) = try await session.data(from: url)
        return try JSONDecoder.iso().decode(DepartureBoard.self, from: data)
    }
    
    public func profile(token: String) async throws -> UserProfile {
        var req = URLRequest(url: baseIdentity.appendingPathComponent("identity/profile"))
        req.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        let (data, _) = try await session.data(for: req)
        return try JSONDecoder().decode(UserProfile.self, from: data)
    }
    
    public func tickets(userId: String) async throws -> [Ticket] {
        var comps = URLComponents(url: baseTicketing.appendingPathComponent("tickets"), resolvingAgainstBaseURL: false)!
        comps.queryItems = [URLQueryItem(name: "userId", value: userId)]
        let (data, _) = try await session.data(from: comps.url!)
        let res = try JSONDecoder().decode([String: [Ticket]].self, from: data)
        return res["items"] ?? []
    }
    
    public func ticketQR(id: String) async throws -> String {
        let url = baseTicketing.appendingPathComponent("tickets/\(id)/qr")
        let (data, _) = try await session.data(from: url)
        let res = try JSONDecoder().decode([String: String].self, from: data)
        return res["token"] ?? ""
    }
}

public final class MockAPIClient: APIClientProtocol {
    public init() {}
    public func searchJourneys(origin: String, destination: String) async throws -> JourneyResponse {
        let option = JourneyOption(summary: "\(origin) → \(destination)", durationMinutes: 15, legs: [], accessible: true)
        return JourneyResponse(options: [option])
    }
    public func departures(stopId: String) async throws -> DepartureBoard {
        let dep = Departure(line: "4", destination: "City", plannedTime: ISO8601DateFormatter().string(from: Date()), expectedInMinutes: 5)
        return DepartureBoard(stopId: stopId, departures: [dep])
    }
    public func profile(token: String) async throws -> UserProfile {
        return UserProfile(sub: "user@example.com", email: "user@example.com", consents: [])
    }
    public func tickets(userId: String) async throws -> [Ticket] {
        return [Ticket(id: "t1", productId: "prod_single", userId: userId, active: false, createdAt: ISO8601DateFormatter().string(from: Date()))]
    }
    public func ticketQR(id: String) async throws -> String {
        return "mock.\(id).token"
    }
}

extension JSONDecoder {
    static func iso() -> JSONDecoder {
        let d = JSONDecoder()
        d.dateDecodingStrategy = .iso8601
        return d
    }
}
