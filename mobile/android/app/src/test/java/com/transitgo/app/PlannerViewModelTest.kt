package com.transitgo.app

import com.transitgo.app.data.remote.MockApiService
import com.transitgo.app.data.repository.JourneyRepository
import com.transitgo.app.ui.planner.PlannerState
import com.transitgo.app.ui.planner.PlannerViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertTrue
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class PlannerViewModelTest {
    @Test
    fun `search loads results`() = runTest {
        val vm = PlannerViewModel(JourneyRepository(MockApiService()))
        vm.search("A", "B")
        assertTrue(vm.state.value is PlannerState.Loaded || vm.state.value is PlannerState.Empty)
    }
}
