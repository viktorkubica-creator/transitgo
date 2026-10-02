package com.transitgo.app

import com.transitgo.app.data.remote.MockApiService
import com.transitgo.app.data.repository.TicketRepository
import com.transitgo.app.ui.departures.DeparturesState
import com.transitgo.app.ui.departures.DeparturesViewModel
import com.transitgo.app.ui.ticketqr.TicketQRState
import com.transitgo.app.ui.ticketqr.TicketQRViewModel
import com.transitgo.app.ui.wallet.WalletState
import com.transitgo.app.ui.wallet.WalletViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertTrue
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class OtherViewModelTests {
    @Test
    fun `departures loads`() = runTest {
        val vm = DeparturesViewModel(MockApiService())
        vm.load("STOP123")
        assertTrue(vm.state.value is DeparturesState.Loaded || vm.state.value is DeparturesState.Empty)
    }
    @Test
    fun `wallet loads`() = runTest {
        val vm = WalletViewModel(TicketRepository(MockApiService()))
        vm.load("u1")
        assertTrue(vm.state.value is WalletState.Loaded || vm.state.value is WalletState.Empty)
    }
    @Test
    fun `ticket qr loads`() = runTest {
        val vm = TicketQRViewModel(TicketRepository(MockApiService()))
        vm.load("t1")
        assertTrue(vm.state.value is TicketQRState.Loaded)
    }
}
