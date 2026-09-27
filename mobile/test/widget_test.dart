import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ridelink/main.dart';
import 'package:ridelink/api.dart';

void main() {
  testWidgets('customer login validates input before sending credentials', (
    tester,
  ) async {
    await tester.pumpWidget(
      MaterialApp(
        localizationsDelegates: GlobalMaterialLocalizations.delegates,
        supportedLocales: const [Locale('en')],
        home: AuthScreen(
          api: RideApi(url: 'http://127.0.0.1:1'),
          onSuccess: () {},
          onLanguage: () {},
        ),
      ),
    );
    await tester.ensureVisible(find.widgetWithText(FilledButton, 'Sign in'));
    await tester.tap(find.widgetWithText(FilledButton, 'Sign in'));
    await tester.pump();
    expect(find.text('Enter a valid email'), findsOneWidget);
    expect(find.text('Enter a valid password'), findsOneWidget);
  });
  testWidgets('confirmation separates refundable deposit from rental total', (
    tester,
  ) async {
    await tester.pumpWidget(
      MaterialApp(
        home: ConfirmationScreen(
          booking: {
            'id': 'RL-test',
            'carName': 'Toyota',
            'start': '2027-01-10',
            'end': '2027-01-12',
            'total': 95,
            'deposit': 50,
            'delivery': true,
            'eta': '30–45',
          },
        ),
      ),
    );
    expect(find.text('95 AED'), findsOneWidget);
    expect(find.text('50 AED'), findsOneWidget);
    expect(find.text('Booking request submitted'), findsOneWidget);
  });
}
