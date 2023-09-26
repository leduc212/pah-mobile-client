import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UITabs from './UITabs';
import {
    Cart,
    ListingDetail,
    Login,
    Register,
    Search
} from '../screens';
import { AuthProvider } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function App(props) {
    return <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name={"UITabs"} component={UITabs} />
                <Stack.Screen name={"Login"} component={Login} />
                <Stack.Screen name={"Register"} component={Register} />
                <Stack.Screen name={"Search"} component={Search} />
                <Stack.Screen name={"ListingDetail"} component={ListingDetail} />
                <Stack.Screen name={"Cart"} component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
}

export default App;