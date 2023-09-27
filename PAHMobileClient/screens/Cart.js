import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, fontSizes, images } from '../constants';
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
            user_id: 12,
            seller_name: 'avd seller',
            seller_address: '2 Đ. Hải Triều, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
            shipping_cost: '120,000',
            cart_items: [
                {
                    name: 'New Basic Stussy Mens Black/White L/S Tee T Shirt Size Medium',
                    price: '553,658',
                    url: 'https://i.ebayimg.com/images/g/SqQAAOSw9w9jYyqQ/s-l1600.jpg',
                    quantity: 1
                },
                {
                    name: 'Trump shirt Wanted for President rea Mugshot DJT Tee shirt Republican party tee',
                    price: '426,097',
                    url: 'https://i.ebayimg.com/images/g/r-YAAOSwe4Vk63Ai/s-l1600.jpg',
                    quantity: 2
                }
            ]
        },
        {
            user_id: 13,
            seller_name: 'mckavlin',
            seller_address: '720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Thành phố Hồ Chí Minh',
            shipping_cost: '90,000',
            cart_items: [
                {
                    name: 'Supreme Scarface The World Is Yours T-Shirt Black XL 100% Authentic Tee',
                    price: '4,756,097',
                    url: 'https://i.ebayimg.com/images/g/fIUAAOSwmnFk2PPY/s-l1600.jpg',
                    quantity: 1
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
        {(Array.isArray(cart) && cart.length) ? <ScrollView style={{
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
                }}>Giỏ hàng của bạn (4)</Text>
                <View style={{
                    height: 1,
                    backgroundColor: colors.darkGreyText
                }}></View>
            </View>

            {/* Cart list: items by seller */}

            {cart.map((seller) =>
                <View key={seller.user_id} style={{ marginBottom: 10 }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans-Bold',
                        fontSize: fontSizes.h3,
                        marginHorizontal: 15
                    }}>Người bán {seller.seller_name}</Text>
                    <Text style={{
                        color: colors.darkGreyText,
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h5,
                        marginHorizontal: 15,
                        marginTop: 5
                    }}>{seller.seller_address}</Text>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h4,
                        marginHorizontal: 15,
                        marginTop: 5,
                        marginBottom: 10
                    }}>{seller.shipping_cost} VND phí giao hàng (thông qua GHN)</Text>
                    {seller.cart_items.map((cart_item) =>
                        <View key={cart_item.name}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}>
                                <Image source={{ uri: cart_item.url }}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        margin: 5,
                                        resizeMode: 'cover',
                                        borderRadius: 20
                                    }} />
                                <View style={{
                                    flex: 1
                                }}>
                                    <Text
                                        numberOfLines={3}
                                        ellipsizeMode='tail'
                                        style={{
                                            color: 'black',
                                            fontFamily: 'OpenSans-Medium',
                                            fontSize: fontSizes.h4,
                                            marginHorizontal: 5
                                        }}>{cart_item.name}</Text>
                                    <Text
                                        numberOfLines={3}
                                        ellipsizeMode='tail'
                                        style={{
                                            color: 'black',
                                            fontFamily: 'OpenSans-Bold',
                                            fontSize: fontSizes.h3,
                                            marginHorizontal: 5
                                        }}>{cart_item.price} VND</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginTop: 5,
                                marginBottom: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4
                                }}>Số lượng: {cart_item.quantity}</Text>
                                <TouchableOpacity>
                                    <Text style={{
                                        color: colors.primary,
                                        fontFamily: 'OpenSans-Medium',
                                        fontSize: fontSizes.h4
                                    }}>Xóa khỏi giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                height: 1,
                                backgroundColor: colors.darkGrey
                            }}></View>
                        </View>
                    )}
                </View>
            )}

            {/* Pricing */}
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginTop: 5,
                    marginBottom: 15
                }}>
                    <Text style={{
                        color: colors.darkGreyText,
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h4
                    }}>Sản phẩm (4)</Text>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h4
                    }}>2,568,700 VND</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginBottom: 15
                }}>
                    <Text style={{
                        color: colors.darkGreyText,
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h4
                    }}>Phí giao hàng</Text>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h4
                    }}>108,700 VND</Text>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: colors.darkGrey
                }}></View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginTop: 15
                }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h4
                    }}>Tổng</Text>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans-Bold',
                        fontSize: fontSizes.h4
                    }}>2,677,400 VND</Text>
                </View>
            </View>

            {/* Checkout button */}
            <TouchableOpacity style={{
                borderWidth: 1.2,
                borderColor: colors.primary,
                borderRadius: 35,
                backgroundColor: colors.primary,
                paddingVertical: 15,
                margin: 20
            }}>
                <Text style={{
                    fontSize: fontSizes.h3,
                    fontFamily: 'OpenSans-Bold',
                    color: 'white',
                    textAlign: 'center'
                }}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
        </ScrollView> : <View style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 150
        }}>
            <Image source={images.cartImage} style ={{
                resizeMode: 'cover',
                width: 140,
                height: 140
            }} />
            <Text style={{
                fontSize: fontSizes.h4,
                fontFamily: 'OpenSans-Medium',
                color: 'black',
                textAlign: 'center',
                marginHorizontal: 35,
                marginTop: 10
            }}>Giỏ hàng của bạn hiện đang trống. Hãy lướt một vài sản phẩm trên PAH nào!</Text>
            </View>}
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