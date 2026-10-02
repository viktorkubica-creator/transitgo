package com.transitgo.app.ui

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.transitgo.app.ui.departures.DeparturesScreen
import com.transitgo.app.ui.planner.PlannerScreen
import com.transitgo.app.ui.profile.ProfileScreen
import com.transitgo.app.ui.profile.SettingsScreen
import com.transitgo.app.ui.wallet.TicketQRScreen
import com.transitgo.app.ui.wallet.WalletScreen

@Composable
fun AppNavHost(navController: NavHostController, start: String = "planner") {
    NavHost(navController = navController, startDestination = start) {
        composable("planner") { PlannerScreen() }
        composable("departures") { DeparturesScreen() }
        composable("wallet") { WalletScreen() }
        composable("ticketqr") { TicketQRScreen() }
        composable("profile") { ProfileScreen() }
        composable("settings") { SettingsScreen() }
    }
}
