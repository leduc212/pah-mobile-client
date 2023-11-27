/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './navigation/App';
import { name as appName } from './app.json';
import { AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';
import { SignalRProvider } from './context/SignalRContext';
import { PushNotificationProvider } from './context/PushNotificationContext';
const Root = () => {
  return (
    <PushNotificationProvider>
      <AuthProvider>
        <SignalRProvider>
          <AxiosProvider>
            <App />
          </AxiosProvider>
        </SignalRProvider>
      </AuthProvider>
    </PushNotificationProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
