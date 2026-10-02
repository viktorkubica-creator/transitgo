import Foundation
import SwiftUI

@MainActor
public final class ProfileViewModel: ObservableObject {
    public enum State: Equatable {
        case idle
        case loading
        case loaded(UserProfile)
        case error(String)
    }
    @Published public private(set) var state: State = .idle
    private let repo: UserRepositoryProtocol
    public init(repo: UserRepositoryProtocol) { self.repo = repo }
    public func load(token: String) async {
        state = .loading
        do {
            let p = try await repo.profile(token: token)
            state = .loaded(p)
        } catch {
            state = .error(error.localizedDescription)
        }
    }
}

@MainActor
public final class SettingsViewModel: ObservableObject {
    public enum Language: String, CaseIterable, Identifiable {
        case en, sk
        public var id: String { rawValue }
    }
    @Published public var language: Language = .en
    @Published public var isLoading: Bool = false
    @Published public var error: String?
    
    public func switchLanguage(_ lang: Language) {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            self.language = lang
            self.isLoading = false
        }
    }
}
