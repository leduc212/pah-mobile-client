import * as React from 'react';
import { Home, Account, Listing, Cart } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fontSizes, colors } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.black,
    tabBarActiveBackgroundColor: colors.grey,
    tabBarInactiveBackgroundColor: colors.grey,
    tabBarStyle: {height: 60},
    tabBarLabelStyle: {
        fontSize: fontSizes.h6,
        marginBottom: 8,
        fontFamily: 'OpenSans-Medium',
    },
    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name;
        let iconName = 'home';
        if (screenName == 'Account') {
            iconName = 'user';
        }
        else if (screenName == 'Listing') {
            iconName = 'align-justify';
        }
        else if (screenName == 'Cart') {
            iconName = 'shopping-cart';
        }
        return <IconFeather
            style={{ paddingTop: 5 }}
            name={iconName}
            size={22}
            color={focused ? colors.primary : colors.black} />
    }
})

function UITabs(props) {
    return <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name={'Home'} component={Home}
            options={{
                tabBarLabel: 'Trang chủ'
                
            }} />
        <Tab.Screen name={'Account'} component={Account}
            options={{
                tabBarLabel: 'Tài khoản'
            }} />
        <Tab.Screen name={'Listing'} component={Listing}
            options={{
                tabBarLabel: 'Sản phẩm'
            }} />
        <Tab.Screen name={'Cart'} component={Cart}
            options={{
                tabBarLabel: 'Giỏ hàng'
            }} />
    </Tab.Navigator>
}

export default UITabs;