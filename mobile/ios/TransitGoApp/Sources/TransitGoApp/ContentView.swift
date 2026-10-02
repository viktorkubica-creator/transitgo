import SwiftUI

// Implements FR-034 (TRGO-11): bilingual UI with basic tab navigation
struct ContentView: View {
    @State private var selectedTab = 0
    @State private var journeys: [JourneyOption] = []
    @State private var departuresList: [Departure] = []
    private let api = ApiClient()

    var body: some View {
        TabView(selection: $selectedTab) {
            VStack {
                Image(systemName: "tram.fill")
                    .font(.system(size: 48))
                    .padding(.bottom, 8)
                Text(NSLocalizedString("planner_title", comment: ""))
                    .font(.title)
                Button(NSLocalizedString("search_journey", comment: "")) {
                    Task {
                        if let res = try? await api.searchJourneys(origin: "Main Station", destination: "Tech District") {
                            journeys = res
                        }
                    }
                }
                List(journeys, id: \.summary) { j in
                    Text(j.summary)
                }
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

            VStack {
                Image(systemName: "clock.fill")
                    .font(.system(size: 48))
                    .padding(.bottom, 8)
                Text(NSLocalizedString("departures_title", comment: ""))
                    .font(.title)
                Button(NSLocalizedString("load_departures", comment: "")) {
                    Task {
                        if let res = try? await api.departures(stopId: "STOP123") {
                            departuresList = res
                        }
                    }
                }
                List(departuresList, id: \.destination) { d in
                    Text("\(d.line) → \(d.destination) · \(d.expectedInMinutes) min")
                }
            }
            .tabItem {
                Label(NSLocalizedString("departures_tab", comment: ""), systemImage: "clock.fill")
            }
            .tag(2)

            VStack {
                Image(systemName: "person.crop.circle")
                    .font(.system(size: 48))
                    .padding(.bottom, 8)
                Text(NSLocalizedString("profile_title", comment: ""))
                    .font(.title)
                Text(NSLocalizedString("profile_subtitle", comment: ""))
            }
            .tabItem {
                Label(NSLocalizedString("profile_tab", comment: ""), systemImage: "person.crop.circle")
            }
            .tag(3)
        }
    }
}

#Preview {
    ContentView()
}
