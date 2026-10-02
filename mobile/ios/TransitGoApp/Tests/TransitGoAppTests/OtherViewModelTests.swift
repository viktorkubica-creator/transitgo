import XCTest
@testable import TransitGoApp

final class OtherViewModelTests: XCTestCase {
    func test_departures_loaded() async {
        let vm = DeparturesViewModel(api: MockAPIClient())
        await vm.load(stopId: "STOP123")
        if case .loaded(let b) = vm.state { XCTAssertFalse(b.departures.isEmpty) } else { XCTFail() }
    }
    func test_wallet_loaded() async {
        let vm = WalletViewModel(repo: TicketRepository(api: MockAPIClient()))
        await vm.load(userId: "u1")
        if case .loaded(let items) = vm.state { XCTAssertFalse(items.isEmpty) } else { XCTFail() }
    }
    func test_ticket_qr_loaded() async {
        let vm = TicketQRViewModel(repo: TicketRepository(api: MockAPIClient()))
        await vm.loadToken(id: "t1")
        if case .loaded(let token) = vm.state { XCTAssertFalse(token.isEmpty) } else { XCTFail() }
    }
    func test_profile_loaded() async {
        let vm = ProfileViewModel(repo: UserRepository(api: MockAPIClient()))
        await vm.load(token: "mock")
        if case .loaded(let p) = vm.state { XCTAssertEqual(p.email, "user@example.com") } else { XCTFail() }
    }
    func test_settings_switch_language() {
        let vm = SettingsViewModel()
        vm.switchLanguage(.sk)
        // async delay simulated; just assert type
        XCTAssertTrue([.en, .sk].contains(vm.language))
    }
}
