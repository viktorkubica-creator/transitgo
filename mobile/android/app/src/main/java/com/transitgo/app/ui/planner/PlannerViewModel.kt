package com.transitgo.app.ui.planner

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.transitgo.app.data.model.JourneyOption
import com.transitgo.app.data.repository.JourneyRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class PlannerState {
    object Idle : PlannerState()
    object Loading : PlannerState()
    data class Loaded(val items: List<JourneyOption>) : PlannerState()
    object Empty : PlannerState()
    data class Error(val message: String) : PlannerState()
}

class PlannerViewModel(private val repo: JourneyRepository) : ViewModel() {
    private val _state = MutableStateFlow<PlannerState>(PlannerState.Idle)
    val state: StateFlow<PlannerState> = _state
    fun search(origin: String, destination: String) {
        _state.value = PlannerState.Loading
        viewModelScope.launch {
            runCatching { repo.search(origin, destination) }
                .onSuccess { items -> _state.value = if (items.isEmpty()) PlannerState.Empty else PlannerState.Loaded(items) }
                .onFailure { _state.value = PlannerState.Error(it.message ?: "error") }
        }
    }
}
