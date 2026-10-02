import SwiftUI

public struct DeparturesView: View {
    @StateObject var vm: DeparturesViewModel
    public init(vm: DeparturesViewModel) { _vm = StateObject(wrappedValue: vm) }
    @State private var stopId: String = "STOP123"
    public var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(NSLocalizedString("departures_title", comment: "")).font(.title)
            HStack {
                TextField("STOP ID", text: $stopId)
                Button(NSLocalizedString("load_departures", comment: "")) {
                    Task { await vm.load(stopId: stopId) }
                }
            }
            content
        }.padding()
    }
    @ViewBuilder var content: some View {
        switch vm.state {
        case .idle: Text("")
        case .loading: ProgressView()
        case .empty: Text(NSLocalizedString("no_results", comment: ""))
        case .error(let m): Text(m).foregroundColor(.red)
        case .loaded(let b):
            List(b.departures, id: \.id) { d in
                Text("\(d.line) → \(d.destination) · \(d.expectedInMinutes) min")
                    .accessibilityLabel("\(d.line) to \(d.destination) in \(d.expectedInMinutes) minutes")
            }
        }
    }
}
