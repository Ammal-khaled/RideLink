import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'api.dart';
import 'account_security.dart';

const blue = Color(0xFF003366);
Map<String, dynamic> arabic = {};
String tr(BuildContext context, String value) =>
    Localizations.localeOf(context).languageCode == 'ar'
    ? (arabic[value] as String? ?? value)
    : value;
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  arabic = jsonDecode(await rootBundle.loadString('assets/ar.json'));
  runApp(const RideLinkApp());
}

class RideLinkApp extends StatefulWidget {
  const RideLinkApp({super.key});
  @override
  State<RideLinkApp> createState() => _RideLinkAppState();
}

class _RideLinkAppState extends State<RideLinkApp> {
  final api = RideApi();
  bool ready = false;
  bool ar = false;
  String? error;
  @override
  void initState() {
    super.initState();
    restore();
  }

  Future<void> restore() async {
    setState(() => error = null);
    try {
      await api.restore();
    } catch (e) {
      error = e.toString();
    }
    if (mounted) setState(() => ready = true);
  }

  @override
  Widget build(BuildContext context) => MaterialApp(
    debugShowCheckedModeBanner: false,
    title: 'RideLink',
    locale: Locale(ar ? 'ar' : 'en'),
    supportedLocales: const [Locale('en'), Locale('ar')],
    localizationsDelegates: GlobalMaterialLocalizations.delegates,
    theme: ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(seedColor: blue, primary: blue),
      scaffoldBackgroundColor: const Color(0xFFF6F8FB),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: blue,
        centerTitle: false,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFDDE5EE)),
        ),
        contentPadding: const EdgeInsets.all(16),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          minimumSize: const Size(double.infinity, 50),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: const BorderSide(color: Color(0xFFE2E9F0)),
        ),
      ),
    ),
    home: !ready
        ? const Scaffold(
            backgroundColor: blue,
            body: Center(
              child: Text(
                'RideLink.',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 38,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          )
        : error != null
        ? Scaffold(
            body: SafeArea(child: ErrorPanel(error!, onRetry: restore)),
          )
        : api.user == null
        ? AuthScreen(
            api: api,
            onSuccess: () => setState(() {}),
            onLanguage: () => setState(() => ar = !ar),
          )
        : HomeScreen(
            api: api,
            onLogout: () => setState(() {}),
            onLanguage: () => setState(() => ar = !ar),
          ),
  );
}

class AuthScreen extends StatefulWidget {
  final RideApi api;
  final VoidCallback onSuccess, onLanguage;
  const AuthScreen({
    super.key,
    required this.api,
    required this.onSuccess,
    required this.onLanguage,
  });
  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final form = GlobalKey<FormState>();
  final email = TextEditingController(),
      password = TextEditingController(),
      name = TextEditingController();
  bool register = false, busy = false, hide = true;
  String? error;
  @override
  void dispose() {
    email.dispose();
    password.dispose();
    name.dispose();
    super.dispose();
  }

  Future<void> submit() async {
    if (!form.currentState!.validate()) return;
    setState(() {
      busy = true;
      error = null;
    });
    try {
      await widget.api.signIn(
        email.text.trim(),
        password.text,
        name: register ? name.text.trim() : null,
      );
      if (mounted) widget.onSuccess();
    } catch (e) {
      if (mounted) setState(() => error = e.toString());
    } finally {
      if (mounted) setState(() => busy = false);
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Brand(),
      actions: [
        IconButton(
          onPressed: widget.onLanguage,
          icon: const Icon(Icons.language),
          tooltip: 'English / العربية',
        ),
      ],
    ),
    body: SafeArea(
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 500),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(26),
            child: Form(
              key: form,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 35),
                  const Icon(
                    Icons.directions_car_rounded,
                    size: 62,
                    color: blue,
                  ),
                  const SizedBox(height: 20),
                  Text(
                    tr(
                      context,
                      register ? 'Create your account' : 'Welcome to RideLink',
                    ),
                    style: const TextStyle(
                      fontSize: 29,
                      fontWeight: FontWeight.bold,
                      color: blue,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    tr(context, 'Your journey. Your way.'),
                    style: const TextStyle(color: Colors.blueGrey),
                  ),
                  const SizedBox(height: 32),
                  if (register) ...[
                    TextFormField(
                      controller: name,
                      autofillHints: const [AutofillHints.name],
                      decoration: InputDecoration(
                        labelText: tr(context, 'Full name'),
                      ),
                      validator: (s) => s == null || s.trim().isEmpty
                          ? tr(context, 'Required')
                          : null,
                    ),
                    const SizedBox(height: 16),
                  ],
                  TextFormField(
                    controller: email,
                    keyboardType: TextInputType.emailAddress,
                    autofillHints: const [AutofillHints.email],
                    decoration: InputDecoration(
                      labelText: tr(context, 'Email'),
                    ),
                    validator: (s) =>
                        s == null ||
                            !RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
                                .hasMatch(s.trim())
                        ? tr(context, 'Enter a valid email')
                        : null,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: password,
                    obscureText: hide,
                    autofillHints: register
                        ? const [AutofillHints.newPassword]
                        : const [AutofillHints.password],
                    decoration: InputDecoration(
                      labelText: tr(context, 'Password'),
                      helperText: register
                          ? tr(context, 'At least 12 characters')
                          : null,
                      suffixIcon: IconButton(
                        icon: Icon(
                          hide ? Icons.visibility_off : Icons.visibility,
                        ),
                        onPressed: () => setState(() => hide = !hide),
                      ),
                    ),
                    validator: (s) =>
                        s == null || s.length < (register ? 12 : 1)
                        ? tr(context, 'Enter a valid password')
                        : null,
                  ),
                  if (error != null) ErrorPanel(error!),
                  const SizedBox(height: 24),
                  FilledButton(
                    onPressed: busy ? null : submit,
                    child: Text(
                      tr(
                        context,
                        busy
                            ? 'Please wait…'
                            : register
                            ? 'Create account'
                            : 'Sign in',
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextButton(
                    onPressed: busy
                        ? null
                        : () => setState(() {
                            register = !register;
                            error = null;
                          }),
                    child: Text(
                      tr(
                        context,
                        register
                            ? 'Already have an account? Sign in'
                            : 'New here? Create an account',
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

class HomeScreen extends StatefulWidget {
  final RideApi api;
  final VoidCallback onLogout, onLanguage;
  const HomeScreen({
    super.key,
    required this.api,
    required this.onLogout,
    required this.onLanguage,
  });
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int tab = 0;
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Brand(),
      actions: [
        IconButton(
          onPressed: widget.onLanguage,
          icon: const Icon(Icons.language),
          tooltip: 'English / العربية',
        ),
      ],
    ),
    body: SafeArea(
      child: tab == 0
          ? CatalogScreen(api: widget.api)
          : tab == 1
          ? BookingsScreen(api: widget.api)
          : AccountScreen(api: widget.api, onLogout: widget.onLogout),
    ),
    bottomNavigationBar: NavigationBar(
      selectedIndex: tab,
      onDestinationSelected: (i) => setState(() => tab = i),
      destinations: [
        NavigationDestination(
          icon: const Icon(Icons.directions_car_outlined),
          selectedIcon: const Icon(Icons.directions_car),
          label: tr(context, 'Explore cars'),
        ),
        NavigationDestination(
          icon: const Icon(Icons.calendar_month_outlined),
          label: tr(context, 'My requests'),
        ),
        NavigationDestination(
          icon: const Icon(Icons.person_outline),
          label: tr(context, 'Account'),
        ),
      ],
    ),
  );
}

class CatalogScreen extends StatefulWidget {
  final RideApi api;
  const CatalogScreen({super.key, required this.api});
  @override
  State<CatalogScreen> createState() => _CatalogScreenState();
}

class _CatalogScreenState extends State<CatalogScreen> {
  Map<String, dynamic>? catalog;
  String? error;
  String query = '', city = 'All Cities', category = 'All cars';
  @override
  void initState() {
    super.initState();
    load();
  }

  Future<void> load() async {
    try {
      final c = await widget.api.call('/catalog');
      if (mounted) {
        setState(() {
          catalog = Map<String, dynamic>.from(c);
          error = null;
        });
      }
    } catch (e) {
      if (mounted) setState(() => error = e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    if (error != null) return ErrorPanel(error!, onRetry: load);
    if (catalog == null) {
      return const Center(child: CircularProgressIndicator());
    }
    final all = (catalog!['cars'] as List).cast<Map<String, dynamic>>();
    final cities = [
      'All Cities',
      ...all.map((c) => c['city'] as String).toSet(),
    ];
    if (!cities.contains(city)) city = 'All Cities';
    final cars = all
        .where(
          (c) =>
              (c['name'] as String).toLowerCase().contains(
                query.toLowerCase(),
              ) &&
              (city == 'All Cities' || c['city'] == city) &&
              (category == 'All cars' || c['category'] == category),
        )
        .toList();
    return RefreshIndicator(
      onRefresh: load,
      child: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            tr(context, 'Find your next ride'),
            style: const TextStyle(
              fontSize: 27,
              fontWeight: FontWeight.bold,
              color: blue,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            tr(context, 'Daily rates in UAE dirhams'),
            style: const TextStyle(color: Colors.blueGrey),
          ),
          const SizedBox(height: 22),
          TextField(
            decoration: InputDecoration(
              hintText: tr(context, 'Search cars'),
              prefixIcon: const Icon(Icons.search),
            ),
            onChanged: (s) => setState(() => query = s),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: city,
            decoration: InputDecoration(
              labelText: tr(context, 'City'),
              prefixIcon: const Icon(Icons.location_on_outlined),
            ),
            items: cities
                .map(
                  (c) =>
                      DropdownMenuItem(value: c, child: Text(tr(context, c))),
                )
                .toList(),
            onChanged: (c) => setState(() => city = c!),
          ),
          const SizedBox(height: 14),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: ['All cars', 'Economy', 'Comfort', 'SUV', 'Premium']
                  .map(
                    (c) => Padding(
                      padding: const EdgeInsetsDirectional.only(end: 8),
                      child: ChoiceChip(
                        label: Text(tr(context, c)),
                        selected: category == c,
                        onSelected: (_) => setState(() => category = c),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
          if ((catalog!['settings']['promotion'] as String).isNotEmpty)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 15),
              child: Text(catalog!['settings']['promotion']),
            ),
          const SizedBox(height: 15),
          if (cars.isEmpty) EmptyPanel(tr(context, 'No cars available yet.')),
          ...cars.map(
            (car) => Card(
              margin: const EdgeInsets.only(bottom: 18),
              clipBehavior: Clip.antiAlias,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CarPhoto(api: widget.api, car: car, height: 210),
                  Padding(
                    padding: const EdgeInsets.all(18),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${tr(context, car['city'])} · ${tr(context, car['category'])}',
                          style: const TextStyle(
                            color: Colors.blueGrey,
                            fontSize: 13,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          car['name'],
                          style: const TextStyle(
                            fontSize: 21,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          '${car['seats']} ${tr(context, 'seats')} · ${tr(context, 'Automatic')}',
                        ),
                        const SizedBox(height: 18),
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                '${car['price']} AED / ${tr(context, 'day')}',
                                style: const TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: blue,
                                ),
                              ),
                            ),
                            FilledButton(
                              style: FilledButton.styleFrom(
                                minimumSize: const Size(100, 44),
                              ),
                              onPressed: () async {
                                await Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) => CarDetails(
                                      api: widget.api,
                                      car: car,
                                      catalog: catalog!,
                                    ),
                                  ),
                                );
                                await load();
                              },
                              child: Text(tr(context, 'View details')),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          car['deposit'] == 0
                              ? tr(context, 'No deposit required')
                              : '${tr(context, 'Deposit')}: ${car['deposit']} AED · ${tr(context, 'at pickup')}',
                          style: const TextStyle(
                            color: Colors.blueGrey,
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class CarDetails extends StatelessWidget {
  final RideApi api;
  final Map<String, dynamic> car, catalog;
  const CarDetails({
    super.key,
    required this.api,
    required this.car,
    required this.catalog,
  });
  @override
  Widget build(BuildContext context) {
    final reviews = (catalog['reviews'] as List)
        .where((r) => r['storeId'] == car['storeId'])
        .toList();
    return Scaffold(
      appBar: AppBar(title: Text(tr(context, 'Car details'))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(16),
            child: CarPhoto(api: api, car: car, height: 250),
          ),
          const SizedBox(height: 24),
          Text(
            car['name'],
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: blue,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '${tr(context, car['city'])} · ${car['price']} AED / ${tr(context, 'day')}',
          ),
          const SizedBox(height: 20),
          InfoPanel(
            icon: Icons.shield_outlined,
            text: car['deposit'] == 0
                ? tr(context, 'No deposit required')
                : '${tr(context, 'Deposit')}: ${car['deposit']} AED (${tr(context, 'paid at pickup')})',
          ),
          InfoPanel(
            icon: Icons.local_shipping_outlined,
            text:
                '${tr(context, 'Delivery ETA')}: ${car['eta']} ${tr(context, 'minutes')} · +${catalog['settings']['deliveryFee']} AED',
          ),
          Text(
            tr(
              context,
              'Delivery time is an estimate after the shop confirms dispatch.',
            ),
            style: const TextStyle(color: Colors.blueGrey, fontSize: 13),
          ),
          const SizedBox(height: 20),
          Text(
            tr(context, 'About this car'),
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 10),
          Text(car['description'], style: const TextStyle(height: 1.6)),
          const SizedBox(height: 24),
          Text(
            tr(context, 'Store reviews'),
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          if (reviews.isEmpty)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 16),
              child: Text(tr(context, 'No published reviews yet.')),
            ),
          ...reviews.map(
            (r) => Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${r['name']} · ${'★' * (r['rating'] as int)}',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Text(r['text']),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),
          FilledButton(
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => BookingScreen(
                  api: api,
                  car: car,
                  fee: (catalog['settings']['deliveryFee'] as num).toDouble(),
                ),
              ),
            ),
            child: Text(tr(context, 'Book this car')),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}

class BookingScreen extends StatefulWidget {
  final RideApi api;
  final Map<String, dynamic> car;
  final double fee;
  const BookingScreen({
    super.key,
    required this.api,
    required this.car,
    required this.fee,
  });
  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final form = GlobalKey<FormState>();
  final phone = TextEditingController(), address = TextEditingController();
  DateTimeRange? dates;
  bool delivery = false, busy = false;
  String? error;
  @override
  void dispose() {
    phone.dispose();
    address.dispose();
    super.dispose();
  }

  int get days => dates == null
      ? 0
      : DateTime.utc(dates!.end.year, dates!.end.month, dates!.end.day)
            .difference(
              DateTime.utc(
                dates!.start.year,
                dates!.start.month,
                dates!.start.day,
              ),
            )
            .inDays;
  String fmt(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
  Future<void> submit() async {
    if (!form.currentState!.validate()) return;
    if (days < 1) {
      setState(
        () =>
            error = tr(context, 'Choose a return date after your pickup date.'),
      );
      return;
    }
    setState(() {
      busy = true;
      error = null;
    });
    try {
      final b = await widget.api.call(
        '/bookings',
        method: 'POST',
        data: {
          'carId': widget.car['id'],
          'phone': phone.text.trim(),
          'start': fmt(dates!.start),
          'end': fmt(dates!.end),
          'delivery': delivery,
          'address': address.text.trim(),
          'payment': 'Cash',
        },
      );
      if (!mounted) return;
      await Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) =>
              ConfirmationScreen(booking: Map<String, dynamic>.from(b)),
        ),
      );
    } catch (e) {
      if (mounted) setState(() => error = e.toString());
    } finally {
      if (mounted) setState(() => busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final total =
        days * (widget.car['price'] as num) + (delivery ? widget.fee : 0);
    return Scaffold(
      appBar: AppBar(title: Text(tr(context, 'Booking request'))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(22),
        child: Form(
          key: form,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.car['name'],
                style: const TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.bold,
                  color: blue,
                ),
              ),
              const SizedBox(height: 8),
              Text(widget.api.user!['name']),
              const SizedBox(height: 24),
              TextFormField(
                controller: phone,
                keyboardType: TextInputType.phone,
                autofillHints: const [AutofillHints.telephoneNumber],
                decoration: InputDecoration(
                  labelText: tr(context, 'Phone number'),
                ),
                validator: (s) =>
                    s == null || !RegExp(r'^\+?[\d\s()-]{8,25}$').hasMatch(s)
                    ? tr(context, 'Enter a valid phone number')
                    : null,
              ),
              const SizedBox(height: 18),
              OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 55),
                ),
                onPressed: busy
                    ? null
                    : () async {
                        final now = DateTime.now();
                        final chosen = await showDateRangePicker(
                          context: context,
                          firstDate: DateTime(now.year, now.month, now.day),
                          lastDate: DateTime(now.year + 1, now.month, now.day),
                          initialDateRange: dates,
                        );
                        if (chosen != null) setState(() => dates = chosen);
                      },
                icon: const Icon(Icons.calendar_month),
                label: Text(
                  dates == null
                      ? tr(context, 'Select rental dates')
                      : '${fmt(dates!.start)} → ${fmt(dates!.end)}',
                ),
              ),
              const SizedBox(height: 18),
              SwitchListTile.adaptive(
                contentPadding: EdgeInsets.zero,
                title: Text(tr(context, 'Deliver the car to me')),
                subtitle: Text('+${widget.fee} AED'),
                value: delivery,
                onChanged: busy ? null : (v) => setState(() => delivery = v),
              ),
              if (delivery) ...[
                InfoPanel(
                  icon: Icons.schedule,
                  text:
                      '${tr(context, 'Delivery ETA')}: ${widget.car['eta']} ${tr(context, 'minutes')}',
                ),
                TextFormField(
                  controller: address,
                  decoration: InputDecoration(
                    labelText: tr(context, 'Delivery address'),
                  ),
                  validator: (s) => delivery && (s == null || s.trim().isEmpty)
                      ? tr(context, 'Required')
                      : null,
                ),
                const SizedBox(height: 18),
              ],
              InfoPanel(
                icon: Icons.payments_outlined,
                text: tr(
                  context,
                  'Cash at pickup. Online payments are not available yet.',
                ),
              ),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      SummaryRow(tr(context, 'Days'), '$days'),
                      SummaryRow(
                        tr(context, 'Daily rental'),
                        '${widget.car['price']} AED',
                      ),
                      SummaryRow(
                        tr(context, 'Delivery'),
                        '${delivery ? widget.fee : 0} AED',
                      ),
                      const Divider(),
                      SummaryRow(
                        tr(context, 'Rental total'),
                        '${total.toStringAsFixed(2)} AED',
                        bold: true,
                      ),
                      SummaryRow(
                        tr(context, 'Separate deposit at pickup'),
                        '${widget.car['deposit']} AED',
                      ),
                    ],
                  ),
                ),
              ),
              if (error != null) ErrorPanel(error!),
              const SizedBox(height: 20),
              FilledButton(
                onPressed: busy ? null : submit,
                child: Text(
                  tr(
                    context,
                    busy ? 'Please wait…' : 'Confirm booking request',
                  ),
                ),
              ),
              const SizedBox(height: 14),
              Text(
                tr(
                  context,
                  'The rental shop will review your request. Your car is reserved only after approval.',
                ),
                style: const TextStyle(color: Colors.blueGrey, fontSize: 13),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}

class ConfirmationScreen extends StatelessWidget {
  final Map<String, dynamic> booking;
  const ConfirmationScreen({super.key, required this.booking});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: Text(tr(context, 'Booking submitted'))),
    body: ListView(
      padding: const EdgeInsets.all(26),
      children: [
        const SizedBox(height: 30),
        const Icon(
          Icons.check_circle_outline,
          size: 85,
          color: Color(0xFF32836C),
        ),
        const SizedBox(height: 22),
        Text(
          tr(context, 'Booking request submitted'),
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 27,
            fontWeight: FontWeight.bold,
            color: blue,
          ),
        ),
        const SizedBox(height: 16),
        Text(
          tr(
            context,
            'The rental shop will review your request. Your car is reserved only after approval.',
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 25),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                Text(
                  booking['carName'],
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
                const SizedBox(height: 15),
                SummaryRow(
                  tr(context, 'Dates'),
                  '${booking['start']} → ${booking['end']}',
                ),
                SummaryRow(
                  tr(context, 'Rental total'),
                  '${booking['total']} AED',
                ),
                SummaryRow(
                  tr(context, 'Deposit at pickup'),
                  '${booking['deposit']} AED',
                ),
                if (booking['delivery'] == true)
                  SummaryRow(
                    tr(context, 'Delivery ETA'),
                    '${booking['eta']} ${tr(context, 'minutes')}',
                  ),
                const SizedBox(height: 12),
                SelectableText(
                  booking['id'],
                  style: const TextStyle(fontSize: 12, color: Colors.blueGrey),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),
        FilledButton(
          onPressed: () => Navigator.popUntil(context, (r) => r.isFirst),
          child: Text(tr(context, 'Back to home')),
        ),
      ],
    ),
  );
}

class BookingsScreen extends StatefulWidget {
  final RideApi api;
  const BookingsScreen({super.key, required this.api});
  @override
  State<BookingsScreen> createState() => _BookingsScreenState();
}

class _BookingsScreenState extends State<BookingsScreen> {
  List? bookings;
  String? error;
  bool busy = false;
  @override
  void initState() {
    super.initState();
    load();
  }

  Future<void> load() async {
    try {
      final b = await widget.api.call('/bookings');
      if (mounted) {
        setState(() {
          bookings = b;
          error = null;
        });
      }
    } catch (e) {
      if (mounted) setState(() => error = e.toString());
    }
  }

  Future<void> cancel(Map<String, dynamic> b) async {
    final yes = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(tr(ctx, 'Cancel request?')),
        content: Text(b['carName']),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: Text(tr(ctx, 'Keep booking')),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: Text(tr(ctx, 'Cancel request')),
          ),
        ],
      ),
    );
    if (yes != true) return;
    setState(() => busy = true);
    try {
      await widget.api.call(
        '/bookings/${b['id']}',
        method: 'PATCH',
        data: {'status': 'cancelled'},
      );
      await load();
    } catch (e) {
      if (mounted) setState(() => error = e.toString());
    } finally {
      if (mounted) setState(() => busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (bookings == null && error == null) {
      return const Center(child: CircularProgressIndicator());
    }
    return RefreshIndicator(
      onRefresh: load,
      child: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            tr(context, 'My booking requests'),
            style: const TextStyle(
              fontSize: 25,
              fontWeight: FontWeight.bold,
              color: blue,
            ),
          ),
          if (error != null) ErrorPanel(error!, onRetry: load),
          if (bookings?.isEmpty ?? false)
            EmptyPanel(tr(context, 'No booking requests yet.')),
          ...(bookings ?? []).map(
            (b) => Card(
              margin: const EdgeInsets.symmetric(vertical: 10),
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Chip(label: Text(tr(context, b['status']))),
                    Text(
                      b['carName'],
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text('${b['start']} → ${b['end']}'),
                    const SizedBox(height: 8),
                    Text('${b['total']} AED · ${tr(context, b['payment'])}'),
                    const SizedBox(height: 8),
                    Text(
                      '${tr(context, 'Deposit at pickup')}: ${b['deposit']} AED',
                      style: const TextStyle(color: Colors.blueGrey),
                    ),
                    if (['pending', 'approved'].contains(b['status']))
                      TextButton(
                        onPressed: busy
                            ? null
                            : () => cancel(Map<String, dynamic>.from(b)),
                        child: Text(tr(context, 'Cancel request')),
                      ),
                    if (b['status'] == 'completed')
                      TextButton(
                        onPressed: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => ReviewScreen(
                              api: widget.api,
                              bookingId: b['id'],
                            ),
                          ),
                        ),
                        child: Text(tr(context, 'Write a review')),
                      ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class ReviewScreen extends StatefulWidget {
  final RideApi api;
  final String bookingId;
  const ReviewScreen({super.key, required this.api, required this.bookingId});
  @override
  State<ReviewScreen> createState() => _ReviewScreenState();
}

class _ReviewScreenState extends State<ReviewScreen> {
  int rating = 5;
  final text = TextEditingController();
  bool busy = false;
  String? error;
  @override
  void dispose() {
    text.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: Text(tr(context, 'Write a review'))),
    body: ListView(
      padding: const EdgeInsets.all(24),
      children: [
        Wrap(
          children: List.generate(
            5,
            (i) => IconButton(
              tooltip: '${i + 1}',
              icon: Icon(
                i < rating ? Icons.star : Icons.star_border,
                color: Colors.amber,
                size: 34,
              ),
              onPressed: () => setState(() => rating = i + 1),
            ),
          ),
        ),
        const SizedBox(height: 20),
        TextField(
          controller: text,
          maxLines: 5,
          maxLength: 2000,
          decoration: InputDecoration(labelText: tr(context, 'Your review')),
        ),
        if (error != null) ErrorPanel(error!),
        const SizedBox(height: 20),
        FilledButton(
          onPressed: busy
              ? null
              : () async {
                  if (text.text.trim().isEmpty) return;
                  setState(() => busy = true);
                  try {
                    await widget.api.call(
                      '/reviews',
                      method: 'POST',
                      data: {
                        'bookingId': widget.bookingId,
                        'rating': rating,
                        'text': text.text.trim(),
                      },
                    );
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            tr(context, 'Review sent for moderation'),
                          ),
                        ),
                      );
                      Navigator.pop(context);
                    }
                  } catch (e) {
                    if (mounted) setState(() => error = e.toString());
                  } finally {
                    if (mounted) setState(() => busy = false);
                  }
                },
          child: Text(tr(context, 'Submit review')),
        ),
      ],
    ),
  );
}

class AccountScreen extends StatefulWidget {
  final RideApi api;
  final VoidCallback onLogout;
  const AccountScreen({super.key, required this.api, required this.onLogout});
  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  bool busy = false;
  String? error;
  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.all(24),
    children: [
      const Icon(Icons.account_circle_outlined, size: 75, color: blue),
      const SizedBox(height: 20),
      Text(
        widget.api.user?['name'] ?? '',
        textAlign: TextAlign.center,
        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
      ),
      const SizedBox(height: 8),
      Text(widget.api.user?['email'] ?? '', textAlign: TextAlign.center),
      const SizedBox(height: 35),
      ListTile(
        leading: const Icon(Icons.lock_outline),
        title: Text(tr(context, 'Change password')),
        onTap: () => Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => AccountSecurity(
              api: widget.api,
              deleteAccount: false,
              onDeleted: widget.onLogout,
            ),
          ),
        ),
      ),
      ListTile(
        leading: const Icon(Icons.delete_outline),
        title: Text(tr(context, 'Delete account')),
        onTap: () => Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => AccountSecurity(
              api: widget.api,
              deleteAccount: true,
              onDeleted: widget.onLogout,
            ),
          ),
        ),
      ),
      InfoPanel(
        icon: Icons.security,
        text: tr(context, 'Your session is stored securely on this device.'),
      ),
      if (error != null) ErrorPanel(error!),
      FilledButton(
        onPressed: busy
            ? null
            : () async {
                setState(() => busy = true);
                try {
                  await widget.api.signOut();
                  if (mounted) widget.onLogout();
                } catch (e) {
                  if (mounted) setState(() => error = e.toString());
                } finally {
                  if (mounted) setState(() => busy = false);
                }
              },
        child: Text(tr(context, 'Log out')),
      ),
    ],
  );
}

class Brand extends StatelessWidget {
  const Brand({super.key});
  @override
  Widget build(BuildContext context) => const Text(
    'RideLink.',
    style: TextStyle(fontSize: 25, fontWeight: FontWeight.w800, color: blue),
  );
}

class CarPhoto extends StatelessWidget {
  final RideApi api;
  final Map<String, dynamic> car;
  final double height;
  const CarPhoto({
    super.key,
    required this.api,
    required this.car,
    required this.height,
  });
  @override
  Widget build(BuildContext context) {
    final value = car['image'] as String;
    Widget fallback(BuildContext c, Object o, StackTrace? s) => SizedBox(
      height: height,
      child: const Center(
        child: Icon(Icons.directions_car, size: 70, color: Colors.blueGrey),
      ),
    );
    if (value.startsWith('data:image/')) {
      try {
        return Image.memory(
          base64Decode(value.split(',').last),
          height: height,
          width: double.infinity,
          fit: BoxFit.cover,
          errorBuilder: fallback,
        );
      } catch (e) {
        return fallback(context, e, null);
      }
    }
    return Image.network(
      api.imageUrl(value),
      height: height,
      width: double.infinity,
      fit: BoxFit.cover,
      errorBuilder: fallback,
    );
  }
}

class InfoPanel extends StatelessWidget {
  final IconData icon;
  final String text;
  const InfoPanel({super.key, required this.icon, required this.text});
  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.symmetric(vertical: 8),
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: const Color(0xFFEDF3FA),
      borderRadius: BorderRadius.circular(12),
    ),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: blue, size: 21),
        const SizedBox(width: 12),
        Expanded(
          child: Text(text, style: const TextStyle(color: blue, height: 1.5)),
        ),
      ],
    ),
  );
}

class SummaryRow extends StatelessWidget {
  final String title, value;
  final bool bold;
  const SummaryRow(this.title, this.value, {super.key, this.bold = false});
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 8),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Text(
            title,
            style: TextStyle(
              color: Colors.blueGrey,
              fontWeight: bold ? FontWeight.bold : null,
            ),
          ),
        ),
        const SizedBox(width: 15),
        Flexible(
          child: Text(
            value,
            textAlign: TextAlign.end,
            style: TextStyle(
              fontWeight: bold ? FontWeight.bold : FontWeight.w500,
              color: blue,
            ),
          ),
        ),
      ],
    ),
  );
}

class ErrorPanel extends StatelessWidget {
  final String message;
  final VoidCallback? onRetry;
  const ErrorPanel(this.message, {super.key, this.onRetry});
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.all(18),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(message, style: const TextStyle(color: Color(0xFFB23E36))),
        if (onRetry != null)
          TextButton(onPressed: onRetry, child: Text(tr(context, 'Try again'))),
      ],
    ),
  );
}

class EmptyPanel extends StatelessWidget {
  final String message;
  const EmptyPanel(this.message, {super.key});
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 60),
    child: Column(
      children: [
        const Icon(
          Icons.directions_car_outlined,
          size: 60,
          color: Colors.blueGrey,
        ),
        const SizedBox(height: 20),
        Text(
          message,
          textAlign: TextAlign.center,
          style: const TextStyle(color: Colors.blueGrey, fontSize: 17),
        ),
      ],
    ),
  );
}
