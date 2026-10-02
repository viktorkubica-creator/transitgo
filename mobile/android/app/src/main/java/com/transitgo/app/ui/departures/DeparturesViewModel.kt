package com.transitgo.app.ui.departures

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.transitgo.app.data.model.DepartureBoard
import com.transitgo.app.data.remote.ApiService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class DeparturesState {
    object Idle : DeparturesState()
    object Loading : DeparturesState()
    data class Loaded(val board: DepartureBoard) : DeparturesState()
    object Empty : DeparturesState()
    data class Error(val message: String) : DeparturesState()
}

class DeparturesViewModel(private val api: ApiService) : ViewModel() {
    private val _state = MutableStateFlow<DeparturesState>(DeparturesState.Idle)
    val state: StateFlow<DeparturesState> = _state
    fun load(stopId: String) {
        _state.value = DeparturesState.Loading
        viewModelScope.launch {
            runCatching { api.departures(stopId) }
                .onSuccess { b -> _state.value = if (b.departures.isEmpty()) DeparturesState.Empty else DeparturesState.Loaded(b) }
                .onFailure { _state.value = DeparturesState.Error(it.message ?: "error") }
        }
    }
}
