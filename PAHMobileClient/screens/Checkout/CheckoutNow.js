import React, { useContext, useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    NativeModules,
    NativeEventEmitter,
    RefreshControl
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {
    Product as ProductRepository,
    Address as AddressRepository,
    Shipping as ShippingRepository
} from '../../repositories';
import moment from 'moment';
import CryptoJS from 'crypto-js';

const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

function CheckoutNow(props) {
    //// AUTH AND NAVIGATION
    // Auth Context
    const authContext = useContext(AuthContext);
    const axiosContext = useContext(AxiosContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    //// Data
    // Get product_id from routes
    const { product_id } = props.route.params;

    // Data for product, payment methods and shipping address
    const [product, setProduct] = useState({
        seller: {},
        feedbacks: [],
        imageUrls: [],
        price: 0
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

    const [shippingAddress, setShippingAddress] = useState([]);
    const [currentShippingAddress, setCurrentShippingAddress] = useState({});

    // Calculate data for shipping price
    const [shippingPrice, setShippingPrice] = useState(0);
    const [shippingDate, setShippingDate] = useState(0);
    const totalPrice = () => product.price + shippingPrice;

    // Data modal
    const [addressModal, setAddressModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);

    // Data for loading and refreshing
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Validating
    const validation = () => selectedPaymentMethod.id !== '' && shippingAddress.length > 0;

    //// FUNCTION
    // Get product detail from current product id
    function getProductDetail() {
        setIsLoading(true);
        ProductRepository.getProductDetail(axiosContext, product_id)
            .then(responseProduct => {
                setProduct(responseProduct);

                AddressRepository.getAllAdrressCurrentUser(axiosContext)
                    .then(responseAddress => {
                        setShippingAddress(responseAddress);
                        if (responseAddress.length > 0) {
                            // Set default shipping address
                            const defaultAddress = responseAddress.filter(address => {
                                return address.isDefault;
                            }).at(0)
                            setCurrentShippingAddress(defaultAddress);
                            getShippingCost(defaultAddress, responseProduct);
                            getShippingDate(defaultAddress, responseProduct);
                        }
                        setIsLoading(false);
                    })
                    .catch(error => {
                        setIsLoading(false);
                    })
            })
            .catch(error => {
                setIsLoading(false);
            })


    }

    function getShippingCost(responseAddress, responseProduct) {
        ShippingRepository.calculateShippingCost({
            service_type_id: 2,
            from_district_id: responseProduct.seller.districtId,
            from_ward_code: responseProduct.seller.wardCode,
            to_district_id: responseAddress.districtId,
            to_ward_code: responseAddress.wardCode,
            weight: responseProduct.weight
        })
            .then(responseShip => {
                setShippingPrice(responseShip.total);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    function getShippingDate(responseAddress, responseProduct) {
        ShippingRepository.calculateShippingDate({
            service_id: 53320,
            from_district_id: responseProduct.seller.districtId,
            from_ward_code: responseProduct.seller.wardCode,
            to_district_id: responseAddress.districtId,
            to_ward_code: responseAddress.wardCode
        })
            .then(responseShip => {
                console.log(responseShip.leadtime)
                setShippingDate(responseShip.leadtime);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    useEffect(() => {
        getProductDetail();

        const subscription = payZaloBridgeEmitter.addListener(
            'EventPayZalo',
            (data) => {
                // 1: SUCCESS, -1: FAILED, 4: CANCELLED
                // If returncode = 1, create order with zalopay method
                navigation.pop();
                navigate('CheckoutComplete', { returnCode: data.returnCode });
            }
        );
    }, []);

    // Price format function
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Scroll view refresh
    const onRefresh = () => {
        setRefreshing(true);
        getProductDetail();
        setRefreshing(false);
    };

    // Zalopayment
    const [token, setToken] = useState('')
    const [returncode, setReturnCode] = React.useState('')


    function getCurrentDateYYMMDD() {
        const todayDate = new Date().toISOString().slice(2, 10);
        return todayDate.split('-').join('');
    }

    async function payOrder() {
        setIsLoadingPayment(true);
        let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime()

        let appid = 2553
        let amount = parseInt(totalPrice())
        let appuser = "ZaloPayDemo"
        let apptime = (new Date).getTime()
        let embeddata = "{}"
        let item = "[]"
        let description = `Thanh toán đơn hàng ${apptransid}`
        let hmacInput = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item
        let mac = CryptoJS.HmacSHA256(hmacInput, "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL")
        console.log('====================================');
        console.log("hmacInput: " + hmacInput);
        console.log("mac: " + mac)
        console.log('====================================');
        var order = {
            'app_id': appid,
            'app_user': appuser,
            'app_time': apptime,
            'amount': amount,
            'app_trans_id': apptransid,
            'embed_data': embeddata,
            'item': item,
            'description': description,
            'mac': mac
        }

        console.log(order)

        let formBody = []
        for (let i in order) {
            var encodedKey = encodeURIComponent(i);
            var encodedValue = encodeURIComponent(order[i]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        await fetch('https://sb-openapi.zalopay.vn/v2/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
            .then(response => response.json())
            .then(resJson => {
                setToken(resJson.zp_trans_token);
                setReturnCode(resJson.return_code);
                var payZP = NativeModules.PayZaloBridge;
                payZP.payOrder(resJson.zp_trans_token);
            })
            .catch((error) => {
                console.log("error ", error)
            });

        setIsLoadingPayment(false);
    }

    // Checkout function
    function checkout() {
        if (selectedPaymentMethod.id === 'ZALOPAY') {
            // If method == ZALOPAY, create order
            payOrder();
        } else {
            // If method == COD || PAH_WALLET, create order and send to server (handle insufficient pah wallet available credits)
            setIsLoadingPayment(true);
            navigation.pop();
            navigate('CheckoutComplete');
        }
    }

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

        {isLoading ? <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View> : <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
                }}>Người bán: {product.seller.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <Image source={{ uri: product.imageUrls.at(0) }}
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
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h3
                            }}>{product.name}</Text>
                        <Text style={{
                            color: 'black',
                            fontFamily: fonts.OpenSansBold,
                            fontSize: fontSizes.h2
                        }}>{numberWithCommas(product.price)} VNĐ</Text>
                        <Text style={{
                            color: colors.darkGreyText,
                            fontFamily: fonts.OpenSansMedium,
                            fontSize: fontSizes.h4
                        }}>Số lượng: 1</Text>
                    </View>
                </View>
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
                    }}>Thông qua Giao hàng nhanh</Text>
                    <View style={{ gap: 5 }}>
                        {shippingDate != 0 && <Text style={{
                            color: colors.darkGreyText,
                            fontFamily: fonts.OpenSansMedium,
                            fontSize: fontSizes.h4
                        }}>Giao dự kiến: {moment(shippingDate * 1000).format('dd, Do MMMM YYYY')}</Text>}
                        {shippingPrice != 0 && <Text style={{
                            color: 'black',
                            fontFamily: fonts.OpenSansMedium,
                            fontSize: fontSizes.h4
                        }}>Phí vận chuyển: {numberWithCommas(shippingPrice)} VNĐ </Text>}
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
                        {shippingAddress.length > 0 ? <View style={{ flex: 2, gap: 5 }}>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >{currentShippingAddress.recipientName}</Text>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >{`${currentShippingAddress.street}, ${currentShippingAddress.ward}, ${currentShippingAddress.district}, ${currentShippingAddress.province}`}</Text>
                            <Text style={{
                                color: 'black',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >{currentShippingAddress.recipientPhone}</Text>
                        </View> : <View style={{ flex: 2, gap: 5 }}>
                            <Text style={{
                                color: 'red',
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h4
                            }}
                            >Xin hãy thêm địa chỉ nhận hàng</Text>
                        </View>}
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
                    }}>{numberWithCommas(product.price)} VNĐ</Text>
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
                    }}>{numberWithCommas(shippingPrice)} VNĐ</Text>
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
                    }}>{numberWithCommas(totalPrice())} VNĐ</Text>
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
        </ScrollView>}


        {/* Checkout button */}
        <TouchableOpacity style={{
            borderRadius: 35,
            backgroundColor: validation() ? colors.primary : colors.grey,
            paddingVertical: 10,
            marginVertical: 5,
            marginHorizontal: 15
        }}
            disabled={!validation()}
            onPress={() => checkout()}>
            <Text style={{
                fontSize: fontSizes.h3,
                fontFamily: fonts.OpenSansBold,
                color: validation() ? 'white' : colors.greyText,
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
                                        getShippingCost(item, product);
                                        getShippingDate(item, product);
                                        setAddressModal(!addressModal);
                                    }}>
                                    <View style={[{
                                        borderColor: item.id === currentShippingAddress.id ? colors.primary : 'black',
                                    }, styles.radioButtonOuter]}>
                                        <View style={[{
                                            backgroundColor: item.id === currentShippingAddress.id ? colors.primary : 'white',
                                        }, styles.radioButtonInner]}></View>
                                    </View>
                                    <View style={{ flexShrink: 1 }}>
                                        <Text style={styles.radioTextSecondary}>{item.recipientName}</Text>
                                        <Text style={styles.radioTextSecondary}>{item.recipientPhone}</Text>
                                        <Text style={styles.radioTextSecondary}>{`${item.street}, ${item.ward}, ${item.district}, ${item.province}`}</Text>
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

        {/* Loading overlay for payment */}
        {isLoadingPayment && <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.inactive
        }}>
            <ActivityIndicator size='large' color={colors.primary} />
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

export default CheckoutNow;