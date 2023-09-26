import * as React from 'react';
import { Home, Account, Listing, Seller, Login } from '../screens';
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
        else if (screenName == 'Seller') {
            iconName = 'tag';
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
            <Tab.Screen name={'Login'} component={Login}
            options={{
                tabBarLabel: 'Đăng nhập',
                tabBarLabelStyle: {
                    fontSize: fontSizes.h5
                }
            }} />
        <Tab.Screen name={'Account'} component={Account}
            options={{
                tabBarLabel: 'Tài khoản'
            }} />
        <Tab.Screen name={'Listing'} component={Listing}
            options={{
                tabBarLabel: 'Sản phẩm'
            }} />
        <Tab.Screen name={'Seller'} component={Seller}
            options={{
                tabBarLabel: 'Bán hàng'
            }} />
    </Tab.Navigator>
}

export default UITabs;