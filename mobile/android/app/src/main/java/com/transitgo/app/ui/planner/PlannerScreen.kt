package com.transitgo.app.ui.planner

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.transitgo.app.data.repository.JourneyRepository
import com.transitgo.app.data.remote.MockApiService

@Composable
fun PlannerScreen(vm: PlannerViewModel = remember { PlannerViewModel(JourneyRepository(MockApiService())) }) {
    var origin by remember { mutableStateOf("Main Station") }
    var destination by remember { mutableStateOf("Tech District") }
    Column(modifier = Modifier.padding(16.dp)) {
        Text(text = "Journey Planner")
        Row {
            androidx.compose.material3.OutlinedTextField(value = origin, onValueChange = { origin = it }, label = { Text("Origin") })
            Spacer(modifier = Modifier.width(8.dp))
            androidx.compose.material3.OutlinedTextField(value = destination, onValueChange = { destination = it }, label = { Text("Destination") })
            Spacer(modifier = Modifier.width(8.dp))
            Button(onClick = { vm.search(origin, destination) }) { Text("Search") }
        }
        when (val s = vm.state.collectAsState().value) {
            is PlannerState.Loaded -> {
                Column { s.items.forEach { Text("${it.summary} — ${it.durationMinutes} min") } }
            }
            PlannerState.Loading -> Text("Loading…")
            PlannerState.Empty -> Text("No results")
            is PlannerState.Error -> Text("Error: ${s.message}")
            else -> {}
        }
    }
}
