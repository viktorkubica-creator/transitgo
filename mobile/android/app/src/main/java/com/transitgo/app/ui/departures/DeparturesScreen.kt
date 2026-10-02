package com.transitgo.app.ui.departures

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.transitgo.app.data.remote.MockApiService

@Composable
fun DeparturesScreen(vm: DeparturesViewModel = remember { DeparturesViewModel(MockApiService()) }) {
    var stop by remember { mutableStateOf("STOP123") }
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Departures")
        OutlinedTextField(value = stop, onValueChange = { stop = it }, label = { Text("Stop") })
        Button(onClick = { vm.load(stop) }) { Text("Load") }
        when (val s = vm.state.collectAsState().value) {
            is DeparturesState.Loaded -> Column { s.board.departures.forEach { Text("${it.line} → ${it.destination} · ${it.expectedInMinutes} min") } }
            DeparturesState.Loading -> Text("Loading…")
            DeparturesState.Empty -> Text("No results")
            is DeparturesState.Error -> Text("Error: ${s.message}")
            else -> {}
        }
    }
}
