import Foundation
import SwiftUI

@MainActor
public final class WalletViewModel: ObservableObject {
    public enum State: Equatable {
        case idle
        case loading
        case loaded([Ticket])
        case empty
        case error(String)
    }
    @Published public private(set) var state: State = .idle
    private let repo: TicketRepositoryProtocol
    public init(repo: TicketRepositoryProtocol) { self.repo = repo }
    
    public func load(userId: String) async {
        state = .loading
        do {
            let items = try await repo.list(userId: userId)
            state = items.isEmpty ? .empty : .loaded(items)
        } catch {
            state = .error(error.localizedDescription)
        }
    }
}
