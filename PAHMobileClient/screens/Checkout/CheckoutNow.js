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

function CheckoutNow(props) {
    // Get product_id from routes
    const { product_id } = props.route.params;

    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Data
    const [product, setProduct] = useState({
        name: 'Đá thạch anh hồng phong thuỷ',
        price: '1,220,000',
        package_content: 'Đá cảnh + đế gỗ + túi giấy sang trọng + dầu dưỡng đá + giấy kiểm định chất lượng đá',
        package_method: 'Hộp kèm đế',
        condition: 'Tốt',
        category: 'Đá Phong Thủy',
        material: 'Đá quý',
        origin: 'Việt Nam',
        dimension: '14.8x12x6.3 cm',
        weight: '1,5',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        images: [
            'https://media.loveitopcdn.com/25808/thumb/da-canh-thach-anh-hong-m277415-3.jpg',
            'https://media.loveitopcdn.com/25808/thumb/da-canh-fluorite-xanh-m282420.jpg',
            'https://media.loveitopcdn.com/25808/thumb/da-canh-thach-anh-trang-m150083-1.jpg',
            'https://media.loveitopcdn.com/25808/thumb/tru-da-fluorite-xanh-m0752059-3.jpg'
        ],
        seller: {
            seller_name: 'avd seller',
            seller_address: 'Thành phố Hồ Chí Minh',
            seller_avatar: 'https://i.pinimg.com/1200x/3e/51/b7/3e51b7003375fb7e9e9c233a7f52c79e.jpg'
        }
    });

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
        },
        {
            id: 'COD',
            text: 'Thanh toán COD'
        },
    ]);
    const [paymentModal, setPaymentModal] = useState(false);
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
            <View style={{
                paddingHorizontal: 15,
                marginBottom: 15
            }}>
                <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansBold,
                    fontSize: fontSizes.h4,
                    marginVertical: 15
                }}>Người bán: Trần Ngọc Châu</Text>
                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <Image source={{ uri: product.images.at(0) }}
                        style={{
                            resizeMode: 'cover',
                            width: 100,
                            height: 100,
                            borderRadius: 15
                        }} />
                    <View style={{
                        flex: 1,
                        gap: 10
                    }}>
                        <Text style={{
                            color: 'black',
                            fontFamily: fonts.OpenSansMedium,
                            fontSize: fontSizes.h2
                        }}>{product.name}</Text>
                        <Text style={{
                            color: 'black',
                            fontFamily: fonts.OpenSansBold,
                            fontSize: fontSizes.h2
                        }}>{product.price} VNĐ</Text>
                        <Text style={{
                            color: colors.darkGreyText,
                            fontFamily: fonts.OpenSansMedium,
                            fontSize: fontSizes.h4
                        }}>Số lượng: 1</Text>

                        <View>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}>Vận chuyển</Text>
                            <Text style={{
                                color: colors.darkGreyText,
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h5
                            }}>Giao dự kiến: 6/10 - 8/10</Text>
                            <Text style={{
                                color: colors.darkGreyText,
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h5
                            }}>Thông qua Giao hàng nhanh</Text>
                            <Text style={{
                                color: colors.darkGreyText,
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4,
                                marginTop: 5
                            }}>80,000 VNĐ</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.separator}></View>

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
                    onPress={() => { }}>
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
                            >Lê Minh Đức</Text>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >2, đường D4, khu phố 6, phường Phước Long B, thành phố Thủ Đức, thành phố Hồ Chí Minh</Text>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >0931856541</Text>
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
                    }}>Sản phẩm (1)</Text>
                    <Text style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h4
                    }}>{product.price} VNĐ</Text>
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
                    }}>80,000 VNĐ</Text>
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
                    }}>1,300,000 VNĐ</Text>
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
        disabled={!validationPaymentMethod()}>
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
                    <Text style={styles.titleText}>Phương thức thanh toán</Text>
                </View>

                {/* All address information */}
                <View style={{
                    gap: 10,
                    marginHorizontal: 20,
                    marginBottom: 30
                }}>
                    
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
    }
});

export default CheckoutNow;