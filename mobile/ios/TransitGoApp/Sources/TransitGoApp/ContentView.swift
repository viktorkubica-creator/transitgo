import SwiftUI

// Implements FR-034 (TRGO-11): bilingual UI with basic tab navigation
struct ContentView: View {
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            VStack {
                Image(systemName: "tram.fill")
                    .font(.system(size: 48))
                    .padding(.bottom, 8)
                Text(NSLocalizedString("planner_title", comment: ""))
                    .font(.title)
                Text(NSLocalizedString("planner_subtitle", comment: ""))
            }
            .tabItem {
                Label(NSLocalizedString("planner_tab", comment: ""), systemImage: "tram.fill")
            }
            .tag(0)

            VStack {
                Image(systemName: "qrcode")
                    .font(.system(size: 48))
                    .padding(.bottom, 8)
                Text(NSLocalizedString("tickets_title", comment: ""))
                    .font(.title)
                Text(NSLocalizedString("tickets_subtitle", comment: ""))
            }
            .tabItem {
                Label(NSLocalizedString("tickets_tab", comment: ""), systemImage: "qrcode")
            }
            .tag(1)
        }
    }
}

#Preview {
    ContentView()
}
