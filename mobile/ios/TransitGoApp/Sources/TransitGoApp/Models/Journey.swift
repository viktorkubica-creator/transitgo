import Foundation

public struct Stop: Codable, Hashable {
    public let id: String
    public let name: String
    public let lat: Double
    public let lon: Double
    public let accessible: Bool?
}

public struct Leg: Codable, Hashable {
    public enum Mode: String, Codable {
        case walk = "WALK"
        case bus = "BUS"
        case tram = "TRAM"
        case trolley = "TROLLEYBUS"
    }
    public let mode: Mode
    public let from: String
    public let to: String
    public let startTime: Date
    public let endTime: Date
    public let lineId: String?
    public let distanceMeters: Int?
}

public struct JourneyOption: Codable, Hashable, Identifiable {
    public var id: String { summary + String(durationMinutes) }
    public let summary: String
    public let durationMinutes: Int
    public let legs: [Leg]
    public let accessible: Bool?
}

public struct JourneyResponse: Codable {
    public let options: [JourneyOption]
}

public struct Departure: Codable, Hashable, Identifiable {
    public var id: String { line + destination + plannedTime }
    public let line: String
    public let destination: String
    public let plannedTime: String
    public let expectedInMinutes: Int
}

public struct DepartureBoard: Codable {
    public let stopId: String
    public let departures: [Departure]
}

public struct Ticket: Codable, Hashable, Identifiable {
    public let id: String
    public let productId: String
    public let userId: String
    public let active: Bool
    public let createdAt: String
}

public struct UserProfile: Codable, Hashable {
    public let sub: String
    public let email: String
    public let consents: [Consent]
}

public struct Consent: Codable, Hashable {
    public let id: String
    public let granted: Bool
    public let timestamp: String
}
