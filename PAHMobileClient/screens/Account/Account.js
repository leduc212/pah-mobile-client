import React, { useContext, useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    UnauthorizedAccountScreen,
    AccountMenuItem
} from '../../components';
import { Account as AccountRepository } from '../../repositories';

function Account(props) {
    //// AUTH AND NAVIGATION
    const authContext = useContext(AuthContext);
    const axiosContext = useContext(AxiosContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    //// DATA
    // User data
    const [user, setUser] = useState({});

    // Data for loading and refreshing
    const [isLoading, setIsLoading] = useState(true);


    //// FUNCTION
    // Test logout function
    function logout() {
        authContext.logout();
    }

    // Function for getting currentuser info
    function getCurrentUserInfo() {
        AccountRepository.getInfoCurrentUser(axiosContext)
            .then(response => {
                setUser(response);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        // If user is logined
        if (authContext?.authState?.authenticated) {
            setIsLoading(true);
            getCurrentUserInfo();
        }
    }, [])

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
            navigation={navigation} route={route} /> :
            <View style={{ flex: 1 }}>
                {isLoading ? <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View> : <ScrollView style={{
                    flex: 1,
                    paddingLeft: 15,
                    paddingRight: 10
                }}>
                    <TouchableOpacity
                        onPress={() => navigate('Profile', { user_id: 1 })}>
                        <Image source={{ uri: user.profilePicture }}
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
                                navigate('EditAccount')
                            }} />
                        {/* User's address navigation */}
                        <AccountMenuItem iconName='map-pin' text='Địa chỉ'
                            onPress={() => {
                                navigate('Address')
                            }} />
                        {/* User's orders navigation */}
                        <AccountMenuItem iconName='box' text='Đơn hàng'
                            onPress={() => {
                                navigate('Home')
                            }} />
                        {/* User's wallet information */}
                        <AccountMenuItem iconName='credit-card' text='Ví PAH'
                            onPress={() => {
                                navigate('Wallet')
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
            </View>}
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