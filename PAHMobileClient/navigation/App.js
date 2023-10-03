import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UITabs from './UITabs';
import {
    Cart,
    ListingDetail,
    Login,
    Register,
    Search,
    ListingDescription,
    ListingFeedback,
    Profile,
    AuctionDetail,
    AuctionDescription,
    AuctionBidding,
    BiddingHistory,
    CheckoutNow,
    CheckoutCart
    EditAccount,
    Address,
    AddAddress
    CheckoutComplete
} from '../screens';
import { AuthProvider } from '../context/AuthContext';
import { uuidv4 } from '../utilities/UUIDGenerate';

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
                <Stack.Screen name={"ListingDetail"} component={ListingDetail}
                    getId={() => uuidv4()} />
                <Stack.Screen name={"Cart"} component={Cart} />
                <Stack.Screen name={"ListingDescription"} component={ListingDescription} />
                <Stack.Screen name={"ListingFeedback"} component={ListingFeedback} />
                <Stack.Screen name={"Profile"} component={Profile} />
                <Stack.Screen name={"AuctionDetail"} component={AuctionDetail} />
                <Stack.Screen name={"AuctionDescription"} component={AuctionDescription} />
                <Stack.Screen name={"AuctionBidding"} component={AuctionBidding} />
                <Stack.Screen name={"BiddingHistory"} component={BiddingHistory} />
                <Stack.Screen name={"CheckoutNow"} component={CheckoutNow} />
                <Stack.Screen name={"CheckoutCart"} component={CheckoutCart} />
                <Stack.Screen name={"Address"} component={Address} />
                <Stack.Screen name={"AddAddress"} component={AddAddress} />
                <Stack.Screen name={"EditAccount"} component={EditAccount} />
                <Stack.Screen name={"CheckoutComplete"} component={CheckoutComplete} />
            </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
}

export default App;
