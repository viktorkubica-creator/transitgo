import Foundation
import SwiftUI

@MainActor
public final class TicketQRViewModel: ObservableObject {
    public enum State: Equatable {
        case idle
        case loading
        case loaded(String) // token
        case error(String)
    }
    @Published public private(set) var state: State = .idle
    private let repo: TicketRepositoryProtocol
    public init(repo: TicketRepositoryProtocol) { self.repo = repo }
    
    public func loadToken(id: String) async {
        state = .loading
        do {
            let token = try await repo.qrToken(id: id)
            state = .loaded(token)
        } catch {
            state = .error(error.localizedDescription)
        }
    }
}
