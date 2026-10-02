import Foundation
import SwiftUI

@MainActor
public final class DeparturesViewModel: ObservableObject {
    public enum State: Equatable {
        case idle
        case loading
        case loaded(DepartureBoard)
        case empty
        case error(String)
    }
    @Published public private(set) var state: State = .idle
    private let api: APIClientProtocol
    public init(api: APIClientProtocol) { self.api = api }
    
    public func load(stopId: String) async {
        state = .loading
        do {
            let board = try await api.departures(stopId: stopId)
            state = board.departures.isEmpty ? .empty : .loaded(board)
        } catch {
            state = .error(error.localizedDescription)
        }
    }
}
