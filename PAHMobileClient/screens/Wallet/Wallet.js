import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

function Wallet(props) {
    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Data
    const [userProfile, setUserProfile] = useState({
        name: 'avd seller',
        address: 'Thành phố Hồ Chí Minh',
        avatar: 'https://i.pinimg.com/1200x/3e/51/b7/3e51b7003375fb7e9e9c233a7f52c79e.jpg'
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        id: '',
        text: ''
    });
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 'ZALOPAY',
            text: 'ZaloPay'
        }
    ]);
    const [topupAmount, setTopupAmount] = useState('20000');
    // validating
    const validationTopupAmount = () => parseInt(topupAmount) >= 20000;
    const validationAll = () => (validationTopupAmount() && selectedPaymentMethod.id !== '');

    // modal data
    const [topupModal, setTopupModal] = useState(false);

    return <View style={styles.container}>
        {/* Fixed screen title: Checkout */}
        <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.iconButton}
                onPress={() => {
                    goBack()
                }}>
                <IconFeather name='x' size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Ví PAH</Text>
        </View>

        {/* User profile */}
        <View style={{
            flexDirection: 'row',
            gap: 15,
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: colors.grey
        }}>
            <Image source={{ uri: userProfile.avatar }}
                style={{
                    resizeMode: 'cover',
                    width: 100,
                    height: 100,
                    borderRadius: 50
                }} />
            <View style={{ gap: 2 }}>
                <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansBold,
                    fontSize: fontSizes.h3
                }}>{userProfile.name}</Text>
                <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h5
                }}>{userProfile.address}</Text>
                <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h5
                }}>Đánh giá: 5</Text>
            </View>
        </View>

        {/* Wallet information complete */}
        <View style={{
            marginHorizontal: 15,
            marginTop: 15
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10
            }}>
                <Text style={{
                    color: colors.darkGreyText,
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h3,
                }}>Số dư khả dụng</Text>
                <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h3,
                }}>2,000,000 VNĐ</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    color: colors.darkGreyText,
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h3,
                }}>Số dư đang bị khóa</Text>
                <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h3,
                }}>3,000,000 VNĐ</Text>
            </View>
        </View>

        <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 15
        }}>
            <TouchableOpacity style={styles.primaryButton}
                onPress={() => setTopupModal(!topupModal)}>
                <Text style={styles.primaryButtonText}>Nạp tiền vào ví</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}
                onPress={() => { }}>
                <Text style={styles.secondaryButtonText}>Rút tiền khỏi ví</Text>
            </TouchableOpacity>
        </View>

        {/* Top up modal */}
        <Modal
            animationIn="slideInRight"
            animationOut="slideOutRight"
            isVisible={topupModal}
            onRequestClose={() => {
                setTopupModal(!topupModal);
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
                            setTopupModal(!topupModal)
                        }}>
                        <IconFeather name='x' size={30} color={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Nạp tiền vào ví</Text>
                </View>

                {/* Payment methods information */}
                <View style={{
                    gap: 10,
                    marginHorizontal: 20,
                    marginBottom: 30,
                    flex: 1
                }}>
                    {/* Amount of money to topup */}
                    <View style={{
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        marginTop: 70,
                        gap: 5
                    }}>
                        <Text style={{
                            fontFamily: fonts.OpenSansBold,
                            fontSize: fontSizes.h2,
                            color: 'black'
                        }}>Số tiền bạn muốn nạp</Text>
                        <View style={{
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center'
                        }}>
                            <TextInput
                                value={topupAmount}
                                keyboardType='number-pad'
                                onChangeText={(text) => setTopupAmount(text)}
                                autoFocus={true}
                                style={{
                                    fontFamily: fonts.OpenSansMedium,
                                    fontSize: fontSizes.h1 * 2,
                                    color: 'black'
                                }} />
                            <Text style={{
                                fontFamily: fonts.OpenSansMedium,
                                fontSize: fontSizes.h1,
                                color: 'black'
                            }}>VNĐ</Text>
                        </View>
                        {!validationTopupAmount() && <Text style={{
                            fontFamily: fonts.OpenSansMedium,
                            fontSize: fontSizes.h4,
                            color: 'red'
                        }}>Số tiền nạp tối thiểu là 20,000 VNĐ</Text>}
                    </View>

                    {/* Payment options */}
                    <View>
                        {paymentMethods.map(item =>
                            <View key={item.id}>
                                <TouchableOpacity style={styles.sortModalOptionContainer}
                                    onPress={() => {
                                        setSelectedPaymentMethod(item);
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

                    {/* Confirm buttons */}
                    <View style={{
                        paddingHorizontal: 20,
                        gap: 10,
                        marginBottom: 20,
                        flex: 1,
                        justifyContent: 'flex-end'
                    }}>
                        <Text style={{
                            fontSize: fontSizes.h5,
                            fontFamily: fonts.OpenSansMedium,
                            color: 'black',
                        }}>Khi bạn xác nhận nạp tiền vào ví PAH, điều đó có nghĩa là bạn đã đọc và đồng ý với Điều khoản của PAH.</Text>
                        <TouchableOpacity
                            disabled={!validationAll()}
                            style={{
                                borderRadius: 35,
                                backgroundColor: validationAll() ? colors.primary : colors.grey,
                                paddingVertical: 10
                            }}
                            onPress={() => {
                                alert('Nap tien thanh cong');
                                setTopupModal(!topupModal);
                            }}>
                            <Text style={{
                                fontSize: fontSizes.h3,
                                fontFamily: fonts.OpenSansBold,
                                color: validationAll() ? 'white' : colors.greyText,
                                textAlign: 'center'
                            }}>Xác nhận nạp tiền</Text>
                        </TouchableOpacity>
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
    primaryButton: {
        borderWidth: 1.2,
        borderColor: colors.primary,
        borderRadius: 35,
        backgroundColor: colors.primary,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginTop: 20
    },
    primaryButtonText: {
        fontSize: fontSizes.h3,
        fontFamily: fonts.OpenSansBold,
        color: 'white',
        textAlign: 'center'
    },
    secondaryButton: {
        borderWidth: 1.2,
        borderColor: colors.primary,
        borderRadius: 35,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginTop: 20
    },
    secondaryButtonText: {
        fontSize: fontSizes.h3,
        fontFamily: fonts.OpenSansMedium,
        color: colors.primary,
        textAlign: 'center'
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
});

export default Wallet;