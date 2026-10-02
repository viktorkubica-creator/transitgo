package com.transitgo.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.icons.Icons
import androidx.compose.material3.icons.filled.DirectionsTransit
import androidx.compose.material3.icons.filled.QrCode
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import com.transitgo.app.api.ApiClient
import com.transitgo.app.api.JourneyOption
import com.transitgo.app.api.Departure
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

// Implements FR-034 (TRGO-12): bilingual UI skeleton with tab navigation
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { App() }
    }
}

@Composable
fun App() {
    val (selected, setSelected) = remember { mutableStateOf(0) }
    var journeys by remember { mutableStateOf(listOf<JourneyOption>()) }
    var departures by remember { mutableStateOf(listOf<Departure>()) }
    val api = remember { ApiClient() }
    Scaffold(
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = selected == 0,
                    onClick = { setSelected(0) },
                    icon = { Icon(Icons.Filled.DirectionsTransit, contentDescription = null) },
                    label = { Text(stringResource(id = R.string.planner_tab)) }
                )
                NavigationBarItem(
                    selected = selected == 1,
                    onClick = { setSelected(1) },
                    icon = { Icon(Icons.Filled.QrCode, contentDescription = null) },
                    label = { Text(stringResource(id = R.string.tickets_tab)) }
                )
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            if (selected == 0) {
                Text(text = stringResource(id = R.string.planner_title))
                Text(text = stringResource(id = R.string.planner_subtitle), modifier = Modifier.clickable {
                    CoroutineScope(Dispatchers.IO).launch {
                        val res = api.searchJourneys("Main Station", "Tech District")
                        journeys = res
                    }
                })
                for (j in journeys) {
                    Text(text = j.summary)
                }
            } else {
                if (selected == 1) {
                    Text(text = stringResource(id = R.string.tickets_title))
                    Text(text = stringResource(id = R.string.tickets_subtitle))
                } else if (selected == 2) {
                    Text(text = stringResource(id = R.string.departures_title), modifier = Modifier.clickable {
                        CoroutineScope(Dispatchers.IO).launch {
                            val res = api.departures("STOP123")
                            departures = res
                        }
                    })
                    for (d in departures) {
                        Text(text = "${d.line} → ${d.destination} · ${d.expectedInMinutes} min")
                    }
                } else {
                    Text(text = stringResource(id = R.string.profile_title))
                    Text(text = stringResource(id = R.string.profile_subtitle))
                }
            }
        }
    }
}

@Preview
@Composable
fun PreviewApp() {
    App()
}
