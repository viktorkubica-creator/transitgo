package com.transitgo.app.ui.wallet

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.transitgo.app.data.model.Ticket
import com.transitgo.app.data.repository.TicketRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class WalletState {
    object Idle : WalletState()
    object Loading : WalletState()
    data class Loaded(val items: List<Ticket>) : WalletState()
    object Empty : WalletState()
    data class Error(val message: String) : WalletState()
}

class WalletViewModel(private val repo: TicketRepository) : ViewModel() {
    private val _state = MutableStateFlow<WalletState>(WalletState.Idle)
    val state: StateFlow<WalletState> = _state
    fun load(userId: String) {
        _state.value = WalletState.Loading
        viewModelScope.launch {
            runCatching { repo.list(userId) }
                .onSuccess { items -> _state.value = if (items.isEmpty()) WalletState.Empty else WalletState.Loaded(items) }
                .onFailure { _state.value = WalletState.Error(it.message ?: "error") }
        }
    }
}
