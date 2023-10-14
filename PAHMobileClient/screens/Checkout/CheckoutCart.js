import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

function CheckoutCart(props) {
    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Data
    // Cart data
    const [cart, setCart] = useState([
        {
            user_id: 12,
            seller_name: 'avd seller',
            seller_address: '2 Đ. Hải Triều, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
            shipping_cost: '120,000',
            cart_items: [
                {
                    id: 1,
                    name: 'Đá thạch anh hồng phong thuỷ',
                    price: '1,220,000',
                    url: 'https://media.loveitopcdn.com/25808/thumb/da-canh-thach-anh-hong-m277415-3.jpg',
                    quantity: 1
                },
                {
                    id: 2,
                    name: 'Đá thạch anh xanh phong thuỷ',
                    price: '6,430,000',
                    url: 'https://media.loveitopcdn.com/25808/thumb/da-canh-fluorite-xanh-m282420.jpg',
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
                    id: 5,
                    name: 'Đá thạch anh vàng phong thuỷ',
                    price: '4,632,000',
                    url: 'https://media.loveitopcdn.com/25808/thumb/img01082-copy.jpg',
                    quantity: 1
                }
            ]
        }
    ]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        id: '',
        text: ''
    });
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 'PAH_WALLET',
            text: 'Số dư ví PAH'
        },
        {
            id: 'ZALOPAY',
            text: 'ZaloPay'
        }
    ]);
    const [paymentModal, setPaymentModal] = useState(false);
    const [shippingAddress, setShippingAddress] = useState([
        {
            id: 1,
            name: 'Lê Minh Đức',
            phone: '0931856541',
            address: '2, đường D4, khu phố 6, phường Phước Long B, thành phố Thủ Đức, thành phố Hồ Chí Minh'
        },
        {
            id: 2,
            name: 'Lê Đức Hiền',
            phone: '0918031377',
            address: '16 đường D3, kdc Kiến Á, phường Phước Long B, thành phố Thủ Đức, thành phố Hồ Chí Minh'
        },
    ]);
    const [currentShippingAddress, setCurrentShippingAddress] = useState(shippingAddress.at(0));
    const [addressModal, setAddressModal] = useState(false);
    // validating
    const validationPaymentMethod = () => selectedPaymentMethod.id !== '';

    return <View style={styles.container}>
        {/* Fixed screen title: Checkout */}
        <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.iconButton}
                onPress={() => {
                    goBack()
                }}>
                <IconFeather name='x' size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Thanh toán</Text>
        </View>

        <ScrollView>
            {/* Product basic info section */}
            <View>
                {cart.map((seller) =>
                    <View key={seller.user_id}>
                        <View style={{
                            paddingHorizontal: 15,
                            marginBottom: 10
                        }}>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansBold,
                                fontSize: fontSizes.h4,
                                marginVertical: 15
                            }}>Người bán: {seller.seller_name}</Text>
                            {seller.cart_items.map((item) =>
                                <View key={item.id} style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    marginBottom: 10
                                }}>
                                    <Image source={{ uri: item.url }}
                                        style={{
                                            resizeMode: 'cover',
                                            width: 100,
                                            height: 100,
                                            borderRadius: 15
                                        }} />
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode='tail'
                                            style={{
                                                color: 'black',
                                                fontFamily: fonts.OpenSansMedium,
                                                fontSize: fontSizes.h3
                                            }}>{item.name}</Text>
                                        <Text style={{
                                            color: 'black',
                                            fontFamily: fonts.OpenSansBold,
                                            fontSize: fontSizes.h2
                                        }}>{item.price} VNĐ</Text>
                                        <Text style={{
                                            color: colors.darkGreyText,
                                            fontFamily: fonts.OpenSansMedium,
                                            fontSize: fontSizes.h4
                                        }}>Số lượng: {item.quantity}</Text>
                                    </View>
                                </View>
                            )}
                            <View style={{
                                marginTop: 10,
                                gap: 5
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: fonts.OpenSansBold,
                                    fontSize: fontSizes.h4
                                }}>Vận chuyển</Text>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: fonts.OpenSansMedium,
                                    fontSize: fontSizes.h4
                                }}>Giao dự kiến: 6/10 - 8/10</Text>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: fonts.OpenSansMedium,
                                    fontSize: fontSizes.h4
                                }}>Thông qua Giao hàng nhanh</Text>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: fonts.OpenSansMedium,
                                    fontSize: fontSizes.h4
                                }}>Phí vận chuyển: 80,000 VNĐ </Text>
                            </View>
                        </View>
                        <View style={styles.separator}></View>
                    </View>
                )}
            </View>

            {/* Shipping information section */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10
            }}>
                <Text style={styles.sectionTitle}>Vận chuyển tới</Text>
                <TouchableOpacity style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginEnd: 15
                }}
                    onPress={() => setAddressModal(!addressModal)}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontFamily: fonts.OpenSansBold,
                            fontSize: fontSizes.h4,
                            flex: 1
                        }}>Vận chuyển tới</Text>
                        <View style={{ flex: 2, gap: 5 }}>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >{currentShippingAddress.name}</Text>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >{currentShippingAddress.address}</Text>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >{currentShippingAddress.phone}</Text>
                        </View>
                    </View>
                    <IconFeather name='chevron-right' size={30} color='black' />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginEnd: 15
                }}
                    onPress={() => setPaymentModal(!paymentModal)}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontFamily: fonts.OpenSansBold,
                            fontSize: fontSizes.h4,
                            flex: 1
                        }}>Phương thức thanh toán</Text>
                        <View style={{ flex: 2, gap: 5 }}>
                            <Text style={{
                                color: selectedPaymentMethod.id === '' ? 'red' : 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >{selectedPaymentMethod.id === '' ? 'Xin hãy chọn phương thức thanh toán' : selectedPaymentMethod.text}</Text>
                        </View>
                    </View>
                    <IconFeather name='chevron-right' size={30} color='black' />
                </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>

            {/* Price section */}
            <View style={{
                paddingHorizontal: 15,
                marginVertical: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: colors.darkGreyText,
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h4
                    }}>Sản phẩm (4)</Text>
                    <Text style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h4
                    }}>18,712,000 VNĐ</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: colors.darkGreyText,
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h4
                    }}>Phí vận chuyển</Text>
                    <Text style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h4
                    }}>160,000 VNĐ</Text>
                </View>
                <View style={styles.separator}></View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansBold,
                        fontSize: fontSizes.h3
                    }}>Tổng giá thành</Text>
                    <Text style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansBold,
                        fontSize: fontSizes.h3
                    }}>18,872,000 VNĐ</Text>
                </View>
            </View>
            <Text style={{
                color: colors.darkGreyText,
                fontFamily: fonts.OpenSansMedium,
                fontSize: fontSizes.h5,
                marginVertical: 50,
                marginHorizontal: 15
            }}>
                Bằng cách xác nhận đơn đặt hàng của bạn, bạn đồng ý với các điều khoản và điều kiện Vận chuyển của PAH.
            </Text>
        </ScrollView>
        {/* Checkout button */}
        <TouchableOpacity style={{
            borderRadius: 35,
            backgroundColor: validationPaymentMethod() ? colors.primary : colors.grey,
            paddingVertical: 10,
            marginVertical: 5,
            marginHorizontal: 15
        }}
            disabled={!validationPaymentMethod()}
            onPress={() => {
                navigation.pop();
                navigate('CheckoutComplete');
            }}>
            <Text style={{
                fontSize: fontSizes.h3,
                fontFamily: fonts.OpenSansBold,
                color: validationPaymentMethod() ? 'white' : colors.greyText,
                textAlign: 'center'
            }}>Xác nhận thanh toán</Text>
        </TouchableOpacity>

        {/* Address modal */}
        <Modal
            animationIn="slideInRight"
            animationOut="slideOutRight"
            isVisible={addressModal}
            onRequestClose={() => {
                setAddressModal(!addressModal);
            }}
            style={{ margin: 0 }}>
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <TouchableOpacity style={styles.iconButton}
                        onPress={() => {
                            setAddressModal(!addressModal);
                        }}>
                        <IconFeather name='x' size={30} color={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Địa chỉ</Text>
                </View>

                {/* All address information */}
                <View style={{
                    gap: 10,
                    marginHorizontal: 20,
                    marginBottom: 30
                }}>
                    {/* Address options */}
                    <View>
                        {shippingAddress.map(item =>
                            <View key={item.id} style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity style={[styles.sortModalOptionContainer, { flex: 1 }]}
                                    onPress={() => {
                                        setCurrentShippingAddress(item);
                                        setAddressModal(!addressModal);
                                    }}>
                                    <View style={[{
                                        borderColor: item === currentShippingAddress ? colors.primary : 'black',
                                    }, styles.radioButtonOuter]}>
                                        <View style={[{
                                            backgroundColor: item === currentShippingAddress ? colors.primary : 'white',
                                        }, styles.radioButtonInner]}></View>
                                    </View>
                                    <View style={{ flexShrink: 1 }}>
                                        <Text style={styles.radioTextSecondary}>{item.name}</Text>
                                        <Text style={styles.radioTextSecondary}>{item.phone}</Text>
                                        <Text style={styles.radioTextSecondary}>{item.address}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <IconFeather name='more-vertical' size={25} color={'black'} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity>
                        <Text style={{
                            color: colors.primary,
                            fontSize: fontSizes.h4,
                            fontFamily: fonts.OpenSansMedium,
                            alignSelf: 'flex-end'
                        }}>Thêm địa chỉ mới</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        {/* Payment method modal */}
        <Modal
            animationIn="slideInRight"
            animationOut="slideOutRight"
            isVisible={paymentModal}
            onRequestClose={() => {
                setPaymentModal(!paymentModal);
            }}
            style={{ margin: 0 }}>
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <TouchableOpacity style={styles.iconButton}
                        onPress={() => {
                            setPaymentModal(!paymentModal)
                        }}>
                        <IconFeather name='x' size={30} color={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Phương thức thanh toán</Text>
                </View>

                {/* Payment methods information */}
                <View style={{
                    gap: 10,
                    marginHorizontal: 20,
                    marginBottom: 30
                }}>
                    {/* Payment options */}
                    <View>
                        {paymentMethods.map(item =>
                            <View key={item.id}>
                                <TouchableOpacity style={styles.sortModalOptionContainer}
                                    onPress={() => {
                                        setSelectedPaymentMethod(item);
                                        setPaymentModal(!paymentModal);
                                    }}>
                                    <View style={[{
                                        borderColor: item === selectedPaymentMethod ? colors.primary : 'black',
                                    }, styles.radioButtonOuter]}>
                                        <View style={[{
                                            backgroundColor: item === selectedPaymentMethod ? colors.primary : 'white',
                                        }, styles.radioButtonInner]}></View>
                                    </View>
                                    <Text style={styles.radioText}>{item.text}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
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
        height: 1.2,
        backgroundColor: colors.darkGrey,
        marginVertical: 10
    },
    descriptionText: {
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h3,
        alignSelf: 'center'
    },
    sectionTitle: {
        color: 'black',
        fontFamily: fonts.OpenSansBold,
        fontSize: fontSizes.h2
    },
    sortModalOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginVertical: 20,
        paddingHorizontal: 10
    },
    radioButtonOuter: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 30
    },
    radioText: {
        color: 'black',
        fontSize: fontSizes.h3,
        fontFamily: fonts.OpenSansMedium
    },
    radioTextSecondary: {
        color: colors.darkGreyText,
        fontSize: fontSizes.h4,
        fontFamily: fonts.OpenSansMedium
    }
});

export default CheckoutCart;