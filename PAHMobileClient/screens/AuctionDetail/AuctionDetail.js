import React, { useContext, useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import { SliderBox } from "react-native-image-slider-box";
import Modal from 'react-native-modal';
import {
    ListingDetailInfoText,
    ListingDetailFeedback
} from '../../components';
import { useIsFocused } from "@react-navigation/native";

function AuctionDetail(props) {
    // Get auction_id from routes
    const { auction_id } = props.route.params;

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

    const [shippingPrice, setShippingPrice] = useState('120,000');

    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Modal const
    const [sellerModalVisible, setSellerModalVisible] = useState(false);
    const [shippingModalVisible, setShippingModalVisible] = useState(false);

    // onMOunt
    // const isFocused = useIsFocused();
    // const [uuid, setUuid] = useState('');
    // useEffect(() => {
    //     setUuid(uuidv4);
    // }, [isFocused])

    return <View style={styles.container}>
        {/* Fixed screen title: Product detail */}
        <View style={styles.titleContainer}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => {
                        goBack()
                    }}>
                    <IconFeather name='arrow-left' size={30} color={'black'} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Đấu giá</Text>
            </View>
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
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => {
                        // Handling more
                    }}>
                    <IconFeather name='more-vertical' size={18} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView>
            {/* Images slider */}
            <SliderBox images={product.images}
                sliderBoxHeight={480}
                dotColor={colors.primary}
                inactiveDotColor='#90A4AE' />

            {/* Product name */}
            <Text style={styles.productName}>{product.name}</Text>

            {/* Top Seller section */}
            <TouchableOpacity style={styles.topSellerContainer}
                onPress={() => setSellerModalVisible(!sellerModalVisible)}>
                <Image source={{ uri: product.seller.seller_avatar }}
                    style={styles.topSellerImage} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.topSellerName}>{product.seller.seller_name}</Text>
                    <Text style={styles.topSellerInformation}>{product.seller.seller_address}</Text>
                </View>
                <IconFeather name='chevron-right' size={30} color='black' />
            </TouchableOpacity>

            {/* Pricing section */}
            <View style={styles.priceContainer}>
                <Text style={styles.pricePrimary}>{product.price} VNĐ</Text>
                <Text style={styles.priceSecondary}>+ {shippingPrice} VNĐ vận chuyển</Text>
                <Text style={{
                    fontFamily: fonts.OpenSansMedium,
                    color: 'black',
                    fontSize: fontSizes.h3,
                    marginTop: 5
                }}>Còn 2 ngày 13 giờ</Text>
            </View>

            {/* Buy and add to cart buttons */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10,
            }}>
                <TouchableOpacity style={styles.primaryButton}
                    onPress={() => navigate('AuctionBidding', { auction_id: product.id })}>
                    <Text style={styles.primaryButtonText}>Đặt giá</Text>
                </TouchableOpacity>
            </View>

            {/* Item information section */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10
            }}>
                <Text style={styles.sectionTitle}>Thông tin sản phẩm</Text>
                <View style={{ gap: 10, marginTop: 5 }}>
                    <ListingDetailInfoText label='Bao gồm' text={product.package_content} />
                    <ListingDetailInfoText label='Tình trạng' text={product.condition} />
                    <ListingDetailInfoText label='Danh mục' text={product.category} />
                    <ListingDetailInfoText label='Chất liệu' text={product.material} />
                    <ListingDetailInfoText label='Xuất xứ' text={product.origin} />
                    <ListingDetailInfoText label='Kích thước' text={product.dimension} />
                    <ListingDetailInfoText label='Khối lượng' text={product.weight + ' kg'} />
                    <ListingDetailInfoText label='Đóng gói' text={product.package_method} />
                </View>
            </View>

            {/* Item description section */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10
            }}>
                <Text style={styles.sectionTitle}>Thông tin thêm từ người bán</Text>
                <TouchableOpacity style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                    onPress={() => navigate('AuctionDescription', { auction_id: product.id })}>
                    <View style={{
                        flex: 1,
                        gap: 10
                    }}>
                        <Text
                            numberOfLines={3}
                            ellipsizeMode='tail'
                            style={styles.descriptionText}
                        >{product.description}</Text>
                        <Text style={styles.descriptionLink}
                        >Xem đầy đủ thông tin thêm</Text>
                    </View>
                    <IconFeather name='chevron-right' size={30} color='black' />
                </TouchableOpacity>
            </View>

            {/* Bidding section */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10
            }}>
                <Text style={styles.sectionTitle}>Thông tin đấu giá</Text>
                <TouchableOpacity style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                    onPress={() => navigate('BiddingHistory', { auction_id: product.id })}>
                    <View style={{ gap: 10, flex: 1 }}>
                        <ListingDetailInfoText label='Thời gian còn lại' text='2 ngày 13 giờ'
                            secondText='Chủ nhật, 8 tháng 10 2023, 09:56 PM' />
                        <ListingDetailInfoText label='Số lần đặt' text='3' />
                        <ListingDetailInfoText label='Người tham gia' text='2' />
                    </View>
                    <IconFeather name='chevron-right' size={30} color='black' />
                </TouchableOpacity>
            </View>

            {/* Shipping information section */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10
            }}>
                <Text style={styles.sectionTitle}>Vận chuyển, đổi trả và thanh toán</Text>
                <TouchableOpacity style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                    onPress={() => setShippingModalVisible(!shippingModalVisible)}>
                    <View style={{ gap: 10, flex: 1 }}>
                        <ListingDetailInfoText label='Giao dự kiến' text='Thứ 2, 2 tháng 10 2023'
                            secondText={'Từ ' + product.seller.seller_address}
                            thirdText='Thông qua Giao hàng nhanh' />
                        <ListingDetailInfoText label='Đổi trả' text='Trong vòng 30 ngày'
                            secondText='Người mua trả phí vận chuyển' />
                        <ListingDetailInfoText label='Thanh toán' text='Ví PAH'
                            secondText='Người đặt giá cần có đủ số dư khả dụng trong ví PAH trước khi tham gia đấu giá' />
                    </View>
                    <IconFeather name='chevron-right' size={30} color='black' />
                </TouchableOpacity>
            </View>

            {/* Bottom seller section */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10
            }}>
                <Text style={styles.sectionTitle}>Về người bán</Text>
                <View style={{ gap: 10, marginTop: 5 }}>
                    <TouchableOpacity onPress={() => navigate('Profile', { user_id: product.seller.seller_name })}>
                        <View style={{
                            flexDirection: 'row',
                            gap: 15
                        }}>
                            <Image source={{ uri: product.seller.seller_avatar }}
                                style={styles.bottomSellerImage} />
                            <View style={{ gap: 2 }}>
                                <Text style={styles.bottomSellerPrimary}>{product.seller.seller_name}</Text>
                                <Text style={styles.bottomSellerSecondary}>{product.seller.seller_address}</Text>
                                <Text style={styles.bottomSellerSecondary}>Đánh giá: 5</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 15,
                            gap: 10
                        }}>
                            <IconFeather name='calendar' size={20} color='black' />
                            <Text style={styles.descriptionText}>Tham gia ngày 12/8/2023</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

        {/* Seller modal */}
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={sellerModalVisible}
            onRequestClose={() => {
                setSellerModalVisible(!sellerModalVisible);
            }}
            style={{ margin: 0 }}>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => {
                        setSellerModalVisible(!sellerModalVisible);
                    }}></TouchableOpacity>
                <View style={styles.modalContainer}>
                    {/* Seller modal title */}
                    <Text style={styles.modalTitle}>Thông tin người bán</Text>

                    {/* Seller information */}
                    <View style={{
                        gap: 10,
                        marginTop: 5,
                        marginHorizontal: 20,
                        marginBottom: 20
                    }}>
                        <TouchableOpacity onPress={() => {
                            setSellerModalVisible(!sellerModalVisible);
                            navigate('Profile', { user_id: product.seller.seller_name })
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 15
                            }}>
                                <Image source={{ uri: product.seller.seller_avatar }}
                                    style={styles.bottomSellerImage} />
                                <View style={{ gap: 2 }}>
                                    <Text style={styles.bottomSellerPrimary}>{product.seller.seller_name}</Text>
                                    <Text style={styles.bottomSellerSecondary}>{product.seller.seller_address}</Text>
                                    <Text style={styles.bottomSellerSecondary}>Đánh giá: 5</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 15,
                                gap: 10
                            }}>
                                <IconFeather name='calendar' size={20} color='black' />
                                <Text style={styles.descriptionText}>Tham gia ngày 12/8/2023</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        {/* Shipping modal */}
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={shippingModalVisible}
            onRequestClose={() => {
                setShippingModalVisible(!shippingModalVisible);
            }}
            style={{ margin: 0 }}>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => {
                        setShippingModalVisible(!shippingModalVisible);
                    }}></TouchableOpacity>
                <View style={styles.modalContainer}>
                    {/* Shipping modal title */}
                    <Text style={styles.modalTitle}>Giao hàng, đổi trả và thanh toán</Text>

                    {/* Shipping information */}
                    <View style={{
                        gap: 10,
                        marginHorizontal: 20,
                        marginBottom: 30
                    }}>
                        <ListingDetailInfoText label='Giao dự kiến' text='Thứ 2, 2 tháng 10 2023' />
                        <ListingDetailInfoText label='Giao từ' text={product.seller.seller_address} />
                        <ListingDetailInfoText label='Giao đến' text='Địa chỉ mặc định hoặc không có' />
                        <ListingDetailInfoText label='Đổi trả' text='Trong vòng 30 ngày'
                            secondText='Người mua trả phí vận chuyển' />
                        <ListingDetailInfoText label='Thanh toán' text='Ví PAH'
                            secondText='Người đặt giá cần có đủ số dư khả dụng trong ví PAH trước khi tham gia đấu giá' />
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
    backButton: {
        padding: 12,
        borderRadius: 50
    },
    titleContainer: {
        height: 70,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 10,
        alignItems: 'center',
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
        height: 1,
        backgroundColor: colors.darkGrey,
        marginRight: 10
    },
    iconButton: {
        backgroundColor: colors.grey,
        padding: 12,
        borderRadius: 50
    },
    primaryButton: {
        borderWidth: 1.2,
        borderColor: colors.primary,
        borderRadius: 35,
        backgroundColor: colors.primary,
        paddingVertical: 10
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
        paddingVertical: 15,
    },
    secondaryButtonText: {
        fontSize: fontSizes.h3,
        fontFamily: fonts.OpenSansMedium,
        color: colors.primary,
        textAlign: 'center'
    },
    emptyText: {
        color: colors.greyText,
        fontSize: fontSizes.h4,
        textAlign: 'center',
        fontFamily: fonts.OpenSansMedium,
        marginVertical: 30
    },
    productName: {
        color: 'black',
        fontFamily: fonts.OpenSansBold,
        fontSize: fontSizes.h2,
        marginHorizontal: 15,
        marginVertical: 10
    },
    topSellerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        gap: 15,
        marginVertical: 10
    },
    topSellerImage: {
        resizeMode: 'cover',
        width: 50,
        height: 50,
        borderRadius: 50
    },
    topSellerName: {
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h5
    },
    topSellerInformation: {
        color: colors.darkGreyText,
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h5
    },
    priceContainer: {
        paddingHorizontal: 15,
        gap: 5,
        marginVertical: 10,
        alignItems: 'baseline'
    },
    pricePrimary: {
        color: 'black',
        fontFamily: fonts.OpenSansBold,
        fontSize: fontSizes.h1
    },
    priceSecondary: {
        color: colors.darkGreyText,
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h4
    },
    sectionTitle: {
        color: 'black',
        fontFamily: fonts.OpenSansBold,
        fontSize: fontSizes.h2
    },
    descriptionText: {
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h4
    },
    descriptionLink: {
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h4,
        textDecorationLine: 'underline'
    },
    bottomSellerImage: {
        resizeMode: 'cover',
        width: 80,
        height: 80,
        borderRadius: 50
    },
    bottomSellerPrimary: {
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h5
    },
    bottomSellerSecondary: {
        color: colors.darkGreyText,
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h5
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    modalTitle: {
        color: 'black',
        fontSize: fontSizes.h3,
        fontFamily: fonts.OpenSansBold,
        marginLeft: 20,
        marginVertical: 20
    }
});

export default AuctionDetail;