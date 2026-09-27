import 'package:flutter/material.dart';

import 'api.dart';
import 'main.dart' show tr, ErrorPanel;

class AccountSecurity extends StatefulWidget {
  final RideApi api;
  final bool deleteAccount;
  final VoidCallback onDeleted;
  const AccountSecurity({
    super.key,
    required this.api,
    required this.deleteAccount,
    required this.onDeleted,
  });
  @override
  State<AccountSecurity> createState() => _AccountSecurityState();
}

class _AccountSecurityState extends State<AccountSecurity> {
  final form = GlobalKey<FormState>();
  final current = TextEditingController(), next = TextEditingController();
  bool busy = false;
  String? error;
  @override
  void dispose() {
    current.dispose();
    next.dispose();
    super.dispose();
  }

  Future<void> submit() async {
    if (!form.currentState!.validate()) return;
    if (widget.deleteAccount) {
      final confirmed = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(tr(ctx, 'Delete account?')),
          content: Text(
            tr(
              ctx,
              'Your account and reviews will be removed. Rental records will be anonymized.',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: Text(tr(ctx, 'Cancel')),
            ),
            TextButton(
              onPressed: () => Navigator.pop(ctx, true),
              child: Text(tr(ctx, 'Delete account')),
            ),
          ],
        ),
      );
      if (confirmed != true) return;
    }
    if (!mounted) return;
    setState(() {
      busy = true;
      error = null;
    });
    try {
      if (widget.deleteAccount) {
        await widget.api.call(
          '/auth/account',
          method: 'DELETE',
          data: {'password': current.text},
        );
        await widget.api.clear();
        if (!mounted) return;
        Navigator.pop(context);
        widget.onDeleted();
      } else {
        final result = await widget.api.call(
          '/auth/password',
          method: 'PUT',
          data: {'currentPassword': current.text, 'newPassword': next.text},
        );
        widget.api.token = result['token'];
        await widget.api.storage.write(key: 'session', value: widget.api.token);
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(tr(context, 'Password changed'))),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) setState(() => error = e.toString());
    } finally {
      if (mounted) setState(() => busy = false);
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: Text(
        tr(
          context,
          widget.deleteAccount ? 'Delete account' : 'Change password',
        ),
      ),
    ),
    body: SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Form(
        key: form,
        child: Column(
          children: [
            TextFormField(
              controller: current,
              obscureText: true,
              decoration: InputDecoration(
                labelText: tr(context, 'Current password'),
              ),
              validator: (s) =>
                  s == null || s.isEmpty ? tr(context, 'Required') : null,
            ),
            const SizedBox(height: 20),
            if (!widget.deleteAccount)
              TextFormField(
                controller: next,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: tr(context, 'New password'),
                  helperText: tr(context, 'At least 12 characters'),
                ),
                validator: (s) => s == null || s.length < 12
                    ? tr(context, 'Enter a valid password')
                    : null,
              ),
            if (error != null) ErrorPanel(error!),
            const SizedBox(height: 25),
            FilledButton(
              onPressed: busy ? null : submit,
              child: Text(
                tr(
                  context,
                  widget.deleteAccount ? 'Delete account' : 'Change password',
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
