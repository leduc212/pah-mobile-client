import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, fontSizes, fonts } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    UnauthorizedAccountScreen,
    AccountMenuItem
} from '../components';

function Account(props) {
    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // User data
    const [user, setUser] = useState({
        name: 'Le Minh Duc',
        avatar_url: 'https://i.pinimg.com/1200x/3e/51/b7/3e51b7003375fb7e9e9c233a7f52c79e.jpg'
    });

    // Test logout function
    function logout() {
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false,
        });
      }
    return <View style={styles.container}>
        {/* Fixed screen title: logo and cart and search icon */}
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Tài khoản</Text>
            <View style={styles.titleButtonContainer}>
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => {
                        navigate('Search')
                    }}>
                    <IconFeather name='search' size={18} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => {
                        navigate('Cart')
                    }}>
                    <IconFeather name='shopping-cart' size={18} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>

        {/* Check if logined? If guest, show login/register navigation page. If logined, show account page  */}
        {!authContext?.authState?.authenticated ? <UnauthorizedAccountScreen
            navigation={navigation} route={route} /> : <ScrollView style={{
                flex: 1,
                paddingLeft: 15,
                paddingRight: 10
            }}>
            <TouchableOpacity>
                <Image source={{ uri: user.avatar_url }}
                    style={{
                        resizeMode: 'cover',
                        width: 80,
                        height: 80,
                        borderRadius: 50
                    }} />
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansBold,
                        fontSize: fontSizes.h3
                    }}>{user.name}</Text>
                    <View style={{ flex: 1 }}></View>
                    <IconFeather name='chevron-right'
                        size={20} color={'black'} />
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                paddingLeft: 10,
                marginTop: 20,
                gap: 15,
                marginBottom: 15
            }}>
                {/* Home page navigation */}
                <AccountMenuItem iconName='home' text='Trang chủ'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* Notification navigation */}
                <AccountMenuItem iconName='bell' text='Thông báo'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* Separator line */}
                <View style={styles.separator}></View>
                {/* User's profile navigation */}
                <AccountMenuItem iconName='user' text='Thông tin cá nhân'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* User's address navigation */}
                <AccountMenuItem iconName='map-pin' text='Địa chỉ'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* User's orders navigation */}
                <AccountMenuItem iconName='box' text='Đơn hàng'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* User's waller information */}
                <AccountMenuItem iconName='credit-card' text='Ví PAH'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* Bids and offers history */}
                <AccountMenuItem iconName='book-open' text='Lịch sử đấu giá'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* Seller's page */}
                <AccountMenuItem iconName='tag' text='Trang người bán'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* Transaction history */}
                <AccountMenuItem iconName='file-text' text='Lịch sử giao dịch'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* Logout button */}
                <AccountMenuItem iconName='log-out' text='Đăng xuất'
                    onPress={() => {
                        logout()
                    }} />
                {/* Separator line */}
                <View style={styles.separator}></View>
                {/* All categories navigation */}
                <AccountMenuItem iconName='grid' text='Danh mục'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* Settings navigation */}
                <AccountMenuItem iconName='settings' text='Cài đặt'
                    onPress={() => {
                        navigate('Home')
                    }} />
                {/* Help navigation */}
                <AccountMenuItem iconName='help-circle' text='Trợ giúp'
                    onPress={() => {
                        navigate('Home')
                    }} />
            </View>
        </ScrollView>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    iconButton: {
        backgroundColor: colors.grey,
        padding: 12,
        borderRadius: 50
    },
    titleContainer: {
        height: 70,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 10,
        justifyContent: 'space-between'
    },
    titleText: {
        color: 'black',
        fontFamily: fonts.OpenSansBold,
        fontSize: fontSizes.h1,
        alignSelf: 'center'
    },
    titleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    separator: {
        height: 1.5,
        backgroundColor: colors.darkGreyText,
        marginRight: 10
    }
});

export default Account;