import Foundation
import SwiftUI

@MainActor
public final class PlannerViewModel: ObservableObject {
    public enum State: Equatable {
        case idle
        case loading
        case loaded([JourneyOption])
        case empty
        case error(String)
    }
    @Published public private(set) var state: State = .idle
    private let repo: JourneyRepositoryProtocol
    public init(repo: JourneyRepositoryProtocol) { self.repo = repo }
    
    public func search(origin: String, destination: String) async {
        state = .loading
        do {
            let results = try await repo.search(origin: origin, destination: destination)
            if results.isEmpty {
                state = .empty
            } else {
                state = .loaded(results)
            }
        } catch {
            state = .error(error.localizedDescription)
        }
    }
    
    public func save(option: JourneyOption) {
        repo.save(option)
    }
}
