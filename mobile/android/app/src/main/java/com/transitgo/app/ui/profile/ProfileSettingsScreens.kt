package com.transitgo.app.ui.profile

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
fun ProfileScreen(vm: ProfileViewModel = remember { ProfileViewModel(MockApiService()) }) {
    var token by remember { mutableStateOf("mock") }
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Profile")
        OutlinedTextField(value = token, onValueChange = { token = it }, label = { Text("Token") })
        Button(onClick = { vm.load(token) }) { Text("Load") }
        when (val s = vm.state.collectAsState().value) {
            is ProfileState.Loaded -> Text(s.profile.email)
            ProfileState.Loading -> Text("Loading…")
            is ProfileState.Error -> Text("Error: ${s.message}")
            else -> {}
        }
    }
}

@Composable
fun SettingsScreen(vm: SettingsViewModel = remember { SettingsViewModel() }) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Settings")
        Text("Language: ${vm.language.collectAsState().value}")
        Button(onClick = { vm.switchLanguage(if (vm.language.value == Language.EN) Language.SK else Language.EN) }) {
            Text("Switch")
        }
        if (vm.loading.collectAsState().value) Text("Loading…")
    }
}
