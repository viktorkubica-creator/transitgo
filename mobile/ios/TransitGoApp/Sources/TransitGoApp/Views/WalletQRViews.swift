import SwiftUI

public struct WalletViewScreen: View {
    @StateObject var vm: WalletViewModel
    @State private var userId: String = "u1"
    public init(vm: WalletViewModel) { _vm = StateObject(wrappedValue: vm) }
    public var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(NSLocalizedString("tickets_title", comment: "")).font(.title)
            HStack {
                TextField("User", text: $userId)
                Button(NSLocalizedString("load_tickets", comment: "")) {
                    Task { await vm.load(userId: userId) }
                }
            }
            switch vm.state {
            case .idle: Text("")
            case .loading: ProgressView()
            case .empty: Text(NSLocalizedString("no_results", comment: ""))
            case .error(let m): Text(m).foregroundColor(.red)
            case .loaded(let items):
                List(items, id: \.id) { t in
                    Text("\(t.productId) – \(t.id)")
                }
            }
        }.padding()
    }
}

public struct TicketQRViewScreen: View {
    @StateObject var vm: TicketQRViewModel
    @State private var ticketId: String = "t1"
    public init(vm: TicketQRViewModel) { _vm = StateObject(wrappedValue: vm) }
    public var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Ticket QR").font(.title)
            HStack {
                TextField("Ticket ID", text: $ticketId)
                Button("Generate QR") {
                    Task { await vm.loadToken(id: ticketId) }
                }
            }
            switch vm.state {
            case .idle: Text("")
            case .loading: ProgressView()
            case .error(let m): Text(m).foregroundColor(.red)
            case .loaded(let token):
                Text(token).font(.footnote).accessibilityLabel("QR token")
                    .padding().border(.gray)
            }
        }.padding()
    }
}
