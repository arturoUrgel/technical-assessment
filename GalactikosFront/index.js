/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Button, StatusBar} from 'react-native';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import App from './src/App';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/events/toastConfig';

const MainApp = () => (
  <GestureHandlerRootView style={{flex: 1, zIndex: 1}}>
    <App />
    <Toast config={toastConfig} />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => MainApp);
