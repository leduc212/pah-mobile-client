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
import { colors, fontSizes } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';

function Cart(props) {
    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Cart data
    const [cart, setCart] = useState([
        {
            seller_name: 'avd seller',
            seller_address: 'some random address',
            shipping_cost: '120,000',
            cart_items: [
                {
                    name: 'New Basic Stussy Mens Black/White L/S Tee T Shirt Size Medium',
                    price: '553,658',
                    url: 'https://i.ebayimg.com/images/g/SqQAAOSw9w9jYyqQ/s-l1600.jpg'
                },
                {
                    name: 'Trump shirt Wanted for President rea Mugshot DJT Tee shirt Republican party tee',
                    price: '426,097',
                    url: 'https://i.ebayimg.com/images/g/r-YAAOSwe4Vk63Ai/s-l1600.jpg'
                }
            ]
        },
        {
            seller_name: 'mckavlin',
            seller_address: 'some random address 2',
            shipping_cost: '90,000',
            cart_items: [
                {
                    name: 'Supreme Scarface The World Is Yours T-Shirt Black XL 100% Authentic Tee',
                    price: '4,756,097',
                    url: 'https://i.ebayimg.com/images/g/fIUAAOSwmnFk2PPY/s-l1600.jpg'
                }
            ]
        }
    ]);

    return <View style={styles.container}>
        {/* Fixed screen title: Cart */}
        <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.iconButton}
                onPress={() => {
                    goBack()
                }}>
                <IconFeather name='arrow-left' size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Giỏ hàng</Text>
        </View>

        {/* Cart View */}
        <ScrollView style={{
            flex: 1,
        }}>
            {/* Optional: if cart contain items from different seller information */}
            <View style={{
                backgroundColor: colors.info,
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 15,
                gap: 15
            }}>
                <IconFeather name='info' size={25} color={'white'} />
                <Text style={{
                    color: 'white',
                    fontFamily: 'OpenSans-Medium',
                    fontSize: fontSizes.h5,
                    flex: 1
                }}>Giỏ hàng của bạn chứa các sản phẩm từ hai hoặc nhiều người bán khác nhau. Do đó, các đơn hàng của bạn sẽ được tách ra theo người bán sau khi thanh toán giỏ hàng.</Text>
            </View>

            {/* Cart title view */}
            <View style={{
                paddingVertical: 15
            }}>
                <Text style={{
                    color: 'black',
                    fontFamily: 'OpenSans-Bold',
                    fontSize: fontSizes.h3,
                    marginLeft: 15,
                    marginBottom: 10
                }}>Giỏ hàng của bạn (2)</Text>
                <View style={{
                    height: 1,
                    backgroundColor: colors.darkGreyText
                }}></View>
            </View>

            {/* Cart list: items by seller */}
            <View style={{
                height:1000,
                backgroundColor:'purple'
            }}>

            </View>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    iconButton: {
        padding: 12,
        borderRadius: 50
    },
    titleContainer: {
        height: 70,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 10,
        alignItems: 'center'
    },
    titleText: {
        color: 'black',
        fontFamily: 'OpenSans-Bold',
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

export default Cart;