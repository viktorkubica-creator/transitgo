import 'package:flutter/material.dart';

// FR-012: Push notification when my bus is delayed (legacy reference)
// TODO: make it fast; TBD: what latency is acceptable?
// FIXME: Standard security
void main() {
  runApp(const TransitGoApp());
}

class TransitGoApp extends StatelessWidget {
  const TransitGoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TransitGo (Legacy)',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const LegacyHomePage(),
    );
  }
}

class LegacyHomePage extends StatelessWidget {
  const LegacyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('TransitGo Legacy – Flutter')),
      body: const Center(
        child: Text('Legacy Flutter scaffold (2025)'),
      ),
    );
  }
}
