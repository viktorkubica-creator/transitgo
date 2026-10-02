import XCTest
@testable import TransitGoApp

final class PlannerViewModelTests: XCTestCase {
    func test_search_success_loaded() async {
        let repo = JourneyRepository(api: MockAPIClient())
        let vm = PlannerViewModel(repo: repo)
        await vm.search(origin: "A", destination: "B")
        if case .loaded(let items) = vm.state {
            XCTAssertFalse(items.isEmpty)
        } else {
            XCTFail("Expected loaded")
        }
    }
    func test_search_empty() async {
        struct EmptyAPI: APIClientProtocol {
            func searchJourneys(origin: String, destination: String) async throws -> JourneyResponse { .init(options: []) }
            func departures(stopId: String) async throws -> DepartureBoard { fatalError() }
            func profile(token: String) async throws -> UserProfile { fatalError() }
            func tickets(userId: String) async throws -> [Ticket] { fatalError() }
            func ticketQR(id: String) async throws -> String { fatalError() }
        }
        let vm = PlannerViewModel(repo: JourneyRepository(api: EmptyAPI()))
        await vm.search(origin: "A", destination: "B")
        if case .empty = vm.state {} else { XCTFail("Expected empty") }
    }
}
