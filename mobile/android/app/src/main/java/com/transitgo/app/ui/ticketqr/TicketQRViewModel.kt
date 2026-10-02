package com.transitgo.app.ui.ticketqr

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.transitgo.app.data.repository.TicketRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class TicketQRState {
    object Idle : TicketQRState()
    object Loading : TicketQRState()
    data class Loaded(val token: String) : TicketQRState()
    data class Error(val message: String) : TicketQRState()
}

class TicketQRViewModel(private val repo: TicketRepository) : ViewModel() {
    private val _state = MutableStateFlow<TicketQRState>(TicketQRState.Idle)
    val state: StateFlow<TicketQRState> = _state
    fun load(id: String) {
        _state.value = TicketQRState.Loading
        viewModelScope.launch {
            runCatching { repo.qr(id) }
                .onSuccess { token -> _state.value = TicketQRState.Loaded(token) }
                .onFailure { _state.value = TicketQRState.Error(it.message ?: "error") }
        }
    }
}
