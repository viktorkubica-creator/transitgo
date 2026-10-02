import Foundation

public protocol JourneyRepositoryProtocol {
    func search(origin: String, destination: String) async throws -> [JourneyOption]
    var saved: [JourneyOption] { get }
    func save(_ option: JourneyOption)
}

public final class JourneyRepository: JourneyRepositoryProtocol {
    private let api: APIClientProtocol
    public private(set) var saved: [JourneyOption] = []
    public init(api: APIClientProtocol) { self.api = api }
    public func search(origin: String, destination: String) async throws -> [JourneyOption] {
        try await api.searchJourneys(origin: origin, destination: destination).options
    }
    public func save(_ option: JourneyOption) { saved.append(option) }
}

public protocol TicketRepositoryProtocol {
    func list(userId: String) async throws -> [Ticket]
    func qrToken(id: String) async throws -> String
}

public final class TicketRepository: TicketRepositoryProtocol {
    private let api: APIClientProtocol
    public init(api: APIClientProtocol) { self.api = api }
    public func list(userId: String) async throws -> [Ticket] {
        try await api.tickets(userId: userId)
    }
    public func qrToken(id: String) async throws -> String {
        try await api.ticketQR(id: id)
    }
}

public protocol UserRepositoryProtocol {
    func profile(token: String) async throws -> UserProfile
}

public final class UserRepository: UserRepositoryProtocol {
    private let api: APIClientProtocol
    public init(api: APIClientProtocol) { self.api = api }
    public func profile(token: String) async throws -> UserProfile {
        try await api.profile(token: token)
    }
}
