import SwiftUI

public struct ProfileViewScreen: View {
    @StateObject var vm: ProfileViewModel
    @State private var token: String = "mock"
    public init(vm: ProfileViewModel) { _vm = StateObject(wrappedValue: vm) }
    public var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(NSLocalizedString("profile_title", comment: "")).font(.title)
            HStack {
                SecureField("Token", text: $token)
                Button("Load") { Task { await vm.load(token: token) } }
            }
            switch vm.state {
            case .idle: Text("")
            case .loading: ProgressView()
            case .error(let m): Text(m).foregroundColor(.red)
            case .loaded(let p):
                Text(p.email)
            }
        }.padding()
    }
}

public struct SettingsViewScreen: View {
    @StateObject var vm: SettingsViewModel
    public init(vm: SettingsViewModel) { _vm = StateObject(wrappedValue: vm) }
    public var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(NSLocalizedString("settings_title", comment: "")).font(.title)
            Picker("Language", selection: $vm.language) {
                ForEach(SettingsViewModel.Language.allCases) { l in
                    Text(l.rawValue.uppercased()).tag(l)
                }
            }.pickerStyle(.segmented)
            Button(NSLocalizedString("apply_language", comment: "")) {
                vm.switchLanguage(vm.language)
            }
            if vm.isLoading { ProgressView() }
        }.padding()
    }
}
