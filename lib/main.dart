
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flipper_login/login.dart';

const String _themeModeKey = 'THEME_OPTION';

Future<ThemeMode> getThemeMode() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final int themeModeIndex = prefs.containsKey(_themeModeKey)
      ? prefs.getInt(_themeModeKey)
      : ThemeMode.system.index;
  return ThemeMode.values[themeModeIndex];
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final ThemeMode themeMode = await getThemeMode();

  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Login()
      // home: MyHomePage(title: 'Flutter Contacts'),
    );
  }
}
