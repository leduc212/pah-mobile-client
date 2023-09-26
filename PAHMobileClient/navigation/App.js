import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UITabs from './UITabs';
import {ListingDetail, Login, Register, Search} from '../screens';

const Stack = createNativeStackNavigator();

function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'UITabs'} component={UITabs} />
        <Stack.Screen name={'ListingDetail'} component={ListingDetail} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Register'} component={Register} />
        <Stack.Screen name={'Search'} component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
