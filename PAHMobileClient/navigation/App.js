import React, { useContext, useCallback, useEffect } from 'react';
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
    CheckoutCart,
    CheckoutComplete,
    EditAccount,
    Address,
    AddAddress,
    Wallet,
    PaymentResult,
    EditAddress
    ProductListing
} from '../screens';
import { uuidv4 } from '../utilities/UUIDGenerate';
import { AuthContext } from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import Toast, { BaseToast } from 'react-native-toast-message';
import { fonts, fontSizes } from '../constants';

const Stack = createNativeStackNavigator();

const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: fontSizes.h4,
                fontFamily: fonts.OpenSansMedium
            }}
        />
    ),
};

function App(props) {
    const authContext = useContext(AuthContext);

    const loadJWT = useCallback(async () => {
        try {
            const value = await Keychain.getGenericPassword();
            const jwt = JSON.parse(value.password);

            authContext.setAuthState({
                accessToken: jwt.accessToken || null,
                refreshToken: jwt.refreshToken || null,
                authenticated: jwt.accessToken !== null,
            });

            console.log(jwt);
        } catch (error) {
            console.log(`Keychain Error: ${error.message}`);
            authContext.setAuthState({
                accessToken: null,
                refreshToken: null,
                authenticated: false,
            });
        }
    }, []);

    useEffect(() => {
        loadJWT();
    }, [loadJWT]);

    return <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name={"UITabs"} component={UITabs} />
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
            {authContext?.authState?.authenticated ? (
                <>
                    <Stack.Screen name={"Address"} component={Address} />
                    <Stack.Screen name={"AddAddress"} component={AddAddress} />
                    <Stack.Screen name={"EditAddress"} component={EditAddress} />
                    <Stack.Screen name={"CheckoutNow"} component={CheckoutNow} />
                    <Stack.Screen name={"CheckoutCart"} component={CheckoutCart} />
                    <Stack.Screen name={"CheckoutComplete"} component={CheckoutComplete} />
                    <Stack.Screen name={"EditAccount"} component={EditAccount} />
                    <Stack.Screen name={"Wallet"} component={Wallet} />
                    <Stack.Screen name={"PaymentResult"} component={PaymentResult} />
                </>
            ) : (
                <>
                    <Stack.Screen name={"Login"} component={Login} />
                    <Stack.Screen name={"Register"} component={Register} />
                </>
            )}
            <Stack.Screen name={"CheckoutNow"} component={CheckoutNow} />
            <Stack.Screen name={"CheckoutCart"} component={CheckoutCart} />
            <Stack.Screen name={"CheckoutComplete"} component={CheckoutComplete} />
            <Stack.Screen name={"Address"} component={Address} />
            <Stack.Screen name={"AddAddress"} component={AddAddress} />
            <Stack.Screen name={"EditAccount"} component={EditAccount} />
            <Stack.Screen name={"Wallet"} component={Wallet} />
            <Stack.Screen name={"PaymentResult"} component={PaymentResult} />
            <Stack.Screen name={"ProductListing"} component={ProductListing} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default App;
