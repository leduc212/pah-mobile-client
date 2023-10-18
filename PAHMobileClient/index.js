/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './navigation/App';
import { name as appName } from './app.json';
import { AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';
import { SignalRProvider } from './context/SignalRContext';
const Root = () => {
  return (
    <AuthProvider>
      <SignalRProvider>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </SignalRProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
