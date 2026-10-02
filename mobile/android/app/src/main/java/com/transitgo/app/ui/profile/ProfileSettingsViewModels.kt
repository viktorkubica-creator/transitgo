package com.transitgo.app.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.transitgo.app.data.model.UserProfile
import com.transitgo.app.data.remote.ApiService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class ProfileState {
    object Idle : ProfileState()
    object Loading : ProfileState()
    data class Loaded(val profile: UserProfile) : ProfileState()
    data class Error(val message: String) : ProfileState()
}

class ProfileViewModel(private val api: ApiService) : ViewModel() {
    private val _state = MutableStateFlow<ProfileState>(ProfileState.Idle)
    val state: StateFlow<ProfileState> = _state
    fun load(token: String) {
        _state.value = ProfileState.Loading
        viewModelScope.launch {
            runCatching { api.profile(token) }
                .onSuccess { p -> _state.value = ProfileState.Loaded(p) }
                .onFailure { _state.value = ProfileState.Error(it.message ?: "error") }
        }
    }
}

enum class Language { EN, SK }

class SettingsViewModel : ViewModel() {
    private val _language = MutableStateFlow(Language.EN)
    val language: StateFlow<Language> = _language
    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading
    fun switchLanguage(lang: Language) {
        _loading.value = true
        _language.value = lang
        _loading.value = false
    }
}
