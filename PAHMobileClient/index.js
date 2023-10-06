/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './navigation/App';
import {name as appName} from './app.json';
import { AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';

const Root = () => {
    return (
      <AuthProvider>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </AuthProvider>
    );
  };

AppRegistry.registerComponent(appName, () => Root);
