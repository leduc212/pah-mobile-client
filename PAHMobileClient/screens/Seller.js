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
import { colors, fontSizes, fonts, roles } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    UnauthorizedAccountScreen
} from '../components';

function Seller(props) {
    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    return <View style={styles.container}>
        {/* Fixed screen title: logo and cart and search icon */}
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Bán hàng</Text>
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
                {authContext?.authState?.role != roles.seller ? <Text>
                    Dang ky lam Seller
                </Text> : <Text>Da la seller: Seller page</Text>}
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

export default Seller;