import SwiftUI

public struct PlannerView: View {
    @StateObject var vm: PlannerViewModel
    @State private var origin: String = NSLocalizedString("planner_origin_default", comment: "")
    @State private var destination: String = NSLocalizedString("planner_destination_default", comment: "")
    
    public init(vm: PlannerViewModel) { _vm = StateObject(wrappedValue: vm) }
    
    public var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(NSLocalizedString("planner_title", comment: "")).font(.title)
            HStack {
                TextField(NSLocalizedString("origin", comment: ""), text: $origin)
                TextField(NSLocalizedString("destination", comment: ""), text: $destination)
                Button(NSLocalizedString("search", comment: "")) {
                    Task { await vm.search(origin: origin, destination: destination) }
                }
            }
            content
        }.padding()
    }
    
    @ViewBuilder var content: some View {
        switch vm.state {
        case .idle: Text(NSLocalizedString("enter_search", comment: ""))
        case .loading: ProgressView()
        case .empty: Text(NSLocalizedString("no_results", comment: ""))
        case .error(let msg): Text(msg).foregroundColor(.red)
        case .loaded(let items):
            List(items, id: \.id) { j in
                VStack(alignment: .leading) {
                    Text(j.summary).bold()
                    Text("\(j.durationMinutes) min").foregroundColor(.secondary)
                }
            }
        }
    }
}
