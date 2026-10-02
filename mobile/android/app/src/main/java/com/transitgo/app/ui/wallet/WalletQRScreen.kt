package com.transitgo.app.ui.wallet

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.transitgo.app.data.repository.TicketRepository
import com.transitgo.app.data.remote.MockApiService
import com.transitgo.app.ui.ticketqr.TicketQRState
import com.transitgo.app.ui.ticketqr.TicketQRViewModel

@Composable
fun WalletScreen(vm: WalletViewModel = remember { WalletViewModel(TicketRepository(MockApiService())) }) {
    var user by remember { mutableStateOf("u1") }
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Wallet")
        OutlinedTextField(value = user, onValueChange = { user = it }, label = { Text("User") })
        Button(onClick = { vm.load(user) }) { Text("Load") }
        when (val s = vm.state.collectAsState().value) {
            is WalletState.Loaded -> Column { s.items.forEach { Text("${it.productId} – ${it.id}") } }
            WalletState.Loading -> Text("Loading…")
            WalletState.Empty -> Text("No results")
            is WalletState.Error -> Text("Error: ${s.message}")
            else -> {}
        }
    }
}

@Composable
fun TicketQRScreen(vm: TicketQRViewModel = remember { TicketQRViewModel(TicketRepository(MockApiService())) }) {
    var ticketId by remember { mutableStateOf("t1") }
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Ticket QR")
        OutlinedTextField(value = ticketId, onValueChange = { ticketId = it }, label = { Text("Ticket ID") })
        Button(onClick = { vm.load(ticketId) }) { Text("Generate QR") }
        when (val s = vm.state.collectAsState().value) {
            is TicketQRState.Loaded -> Text(s.token)
            TicketQRState.Loading -> Text("Loading…")
            is TicketQRState.Error -> Text("Error: ${s.message}")
            else -> {}
        }
    }
}
