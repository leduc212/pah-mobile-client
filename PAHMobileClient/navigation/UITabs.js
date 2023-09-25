import * as React from 'react';
import { Home, Account, Listing, Cart } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fontSizes, colors } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.black,
    tabBarActiveBackgroundColor: colors.grey,
    tabBarInactiveBackgroundColor: colors.grey,
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
        return <Icon
            style={{ paddingTop: 10 }}
            name={iconName}
            size={23}
            color={focused ? colors.primary : colors.black} />
    }
})

function UITabs(props) {
    return <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name={'Home'} component={Home}
            options={{
                tabBarLabel: 'Trang chủ',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h5
                }
            }} />
        <Tab.Screen name={'Account'} component={Account}
            options={{
                tabBarLabel: 'Tài khoản',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h5
                }
            }} />
        <Tab.Screen name={'Listing'} component={Listing}
            options={{
                tabBarLabel: 'Sản phẩm',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h5
                }
            }} />
        <Tab.Screen name={'Cart'} component={Cart}
            options={{
                tabBarLabel: 'Giỏ hàng',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h5
                }
            }} />
    </Tab.Navigator>
}

export default UITabs;