import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiException implements Exception {
  final String message;
  final int status;
  ApiException(this.message, [this.status = 0]);
  @override
  String toString() => message;
}

class RideApi {
  static const configuredUrl = String.fromEnvironment('API_URL');
  final String baseUrl;
  final FlutterSecureStorage storage;
  String? token;
  Map<String, dynamic>? user;
  RideApi({String? url, FlutterSecureStorage? secureStorage})
    : baseUrl =
          url ??
          (configuredUrl.isNotEmpty
              ? configuredUrl
              : kReleaseMode
              ? ''
              : Platform.isAndroid
              ? 'http://10.0.2.2:3001'
              : 'http://127.0.0.1:3001'),
      storage = secureStorage ?? const FlutterSecureStorage();
  Future<dynamic> call(
    String path, {
    String method = 'GET',
    Map<String, dynamic>? data,
  }) async {
    if (baseUrl.isEmpty) {
      throw ApiException('The service address has not been configured.');
    }
    if (kReleaseMode && !baseUrl.startsWith('https://')) {
      throw ApiException('A secure HTTPS service address is required.');
    }
    final client = HttpClient()
      ..connectionTimeout = const Duration(seconds: 15);
    try {
      final request = await client
          .openUrl(method, Uri.parse('$baseUrl/api$path'))
          .timeout(const Duration(seconds: 15));
      request.headers.contentType = ContentType.json;
      if (token != null) request.headers.set('Authorization', 'Bearer $token');
      if (data != null) request.write(jsonEncode(data));
      final response = await request.close().timeout(
        const Duration(seconds: 20),
      );
      final raw = await utf8.decoder
          .bind(response)
          .join()
          .timeout(const Duration(seconds: 20));
      final decoded = jsonDecode(raw);
      if (response.statusCode >= 400) {
        throw ApiException(
          decoded['error'] ?? 'Request failed',
          response.statusCode,
        );
      }
      return decoded;
    } on SocketException {
      throw ApiException(
        'Unable to reach RideLink. Check your connection and try again.',
      );
    } on TimeoutException {
      throw ApiException('The request timed out. Please try again.');
    } on FormatException {
      throw ApiException('The server returned an unexpected response.');
    } finally {
      client.close(force: true);
    }
  }

  Future<void> restore() async {
    token = await storage.read(key: 'session');
    if (token == null) return;
    try {
      user = Map<String, dynamic>.from((await call('/auth/me'))['user']);
    } on ApiException catch (e) {
      if (e.status == 401) {
        await clear();
      } else {
        rethrow;
      }
    }
  }

  Future<void> signIn(String email, String password, {String? name}) async {
    final result = await call(
      name == null ? '/auth/login' : '/auth/register',
      method: 'POST',
      data: {'email': email, 'password': password, 'name': ?name},
    );
    token = result['token'];
    if (result['user']['role'] != 'customer') {
      await call('/auth/logout', method: 'POST', data: {});
      token = null;
      throw ApiException('Please use the admin website for this account.');
    }
    user = Map<String, dynamic>.from(result['user']);
    await storage.write(key: 'session', value: token);
  }

  Future<void> signOut() async {
    await call('/auth/logout', method: 'POST', data: {});
    await clear();
  }

  Future<void> clear() async {
    token = null;
    user = null;
    await storage.delete(key: 'session');
  }

  String imageUrl(String value) =>
      value.startsWith('/') ? '$baseUrl$value' : value;
}
