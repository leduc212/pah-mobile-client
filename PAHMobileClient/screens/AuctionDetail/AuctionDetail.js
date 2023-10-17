import React, { useContext, useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import { colors, fontSizes, fonts, images } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import { SliderBox } from "react-native-image-slider-box";
import Modal from 'react-native-modal';
import {
    ListingDetailInfoText,
    TimeLeft
} from '../../components';
import {
    Auction as AuctionRepository,
    Shipping as ShippingRepository,
    Address as AddressRepository
} from '../../repositories';
import { conditionText } from '../../utilities/Condition';
import moment from 'moment';
import { numberWithCommas } from '../../utilities/PriceFormat';

function AuctionDetail(props) {
    //// AUTH AND NAVIGATION
    // Get auction_id from routes
    const { auction_id } = props.route.params;

    // Auth Context
    const authContext = useContext(AuthContext);
    const axiosContext = useContext(AxiosContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    //// DATA
    // Data for auction detail
    const [auction, setAuction] = useState({
        seller: {},
        imageUrls: [],
        product: {}
    });

    // Calculate data for shipping price
    const [userAddress, setUserAddress] = useState({});
    const [shippingPrice, setShippingPrice] = useState(0);

    // Modal data
    const [sellerModalVisible, setSellerModalVisible] = useState(false);
    const [shippingModalVisible, setShippingModalVisible] = useState(false);

    // Data for loading and refreshing
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    //// FUNCTION
    // Get auction detail from current auction id
    function getAutionDetail() {
        setIsLoading(true);
        
        // If authenticated, get default address and shipping price
        if (authContext?.authState?.authenticated) {
            AuctionRepository.getAuctionDetail(axiosContext, auction_id)
                .then(responseAuction => {
                    setAuction(responseAuction)

                    AddressRepository.getAdrressCurrentUser(axiosContext)
                        .then(responseAddress => {
                            setUserAddress(responseAddress);
                            // Shipping cost calculate
                            getShippingCost(responseAddress, responseAuction);
                        })
                        .catch(error => {
                            console.log(error);
                            setIsLoading(false);
                        });
                })
                .catch(error => {
                    setIsLoading(false);
                });
        } else {
            AuctionRepository.getAuctionDetail(axiosContext, auction_id)
                .then(response => {
                    setAuction(response)
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                });
        }
    }

    function getShippingCost(responseAddress, responseAuction) {
        ShippingRepository.calculateShippingCost({
            service_type_id: 2,
            from_district_id: auction.seller.districtId,
            from_ward_code: auction.seller.wardCode,
            to_district_id: responseAddress.districtId,
            to_ward_code: responseAddress.wardCode,
            weight: responseAuction.product.weight
        })
            .then(responseShip => {
                setShippingPrice(responseShip.total);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getAutionDetail();
    }, []);

    // Scroll view refresh
    const onRefresh = () => {
        setRefreshing(true);
        getAutionDetail();
        setRefreshing(false);
    };

    return <View style={styles.container}>
        {/* Fixed screen title: Auction detail */}
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

        {isLoading ? <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View> : <View>
            {auction.title ? <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {/* Images slider */}
                <SliderBox images={auction.imageUrls}
                    sliderBoxHeight={480}
                    dotColor={colors.primary}
                    inactiveDotColor='#90A4AE' />

                {/* Auction name */}
                <Text style={styles.productName}>{auction.title}</Text>

                {/* Pricing section */}
                <View style={styles.priceContainer}>
                    <Text style={styles.pricePrimary}>₫{numberWithCommas(auction.startingPrice)} giá khởi điểm</Text>
                    {!authContext?.authState?.authenticated ? <Text
                        style={styles.priceSecondary}
                    >Đăng nhập để xem cước phí vận chuyển</Text> : <View>
                        {shippingPrice != 0 && userAddress != '' ? <View>
                            <Text style={styles.priceSecondary}
                            >₫{numberWithCommas(shippingPrice)} cước vận chuyển</Text>
                        </View> : <Text style={styles.priceSecondary}
                        >Thêm địa chỉ mặc định để xem phí vận chuyển</Text>}
                    </View>}
                    <TimeLeft textStyle={{
                        fontFamily: fonts.MontserratMedium,
                        color: 'black',
                        fontSize: fontSizes.h3,
                        marginTop: 15
                    }} closedTime={auction.endedAt}
                        width={500} />
                </View>

                {/* Bid */}
                <View style={{
                    paddingHorizontal: 15,
                    gap: 10,
                    marginVertical: 10,
                }}>
                    <TouchableOpacity style={styles.primaryButton}
                        onPress={() => {
                            if (authContext?.authState?.authenticated) {
                                navigate('AuctionBidding', { auction_id: auction.id })
                            }
                            else {
                                navigate('Login')
                            }
                        }}>
                        <Text style={styles.primaryButtonText}>Tham gia đấu giá</Text>
                    </TouchableOpacity>
                </View>

                {/* Item information section */}
                <View style={{
                    paddingHorizontal: 15,
                    gap: 10,
                    marginVertical: 20
                }}>
                    <Text style={styles.sectionTitle}>Thông tin sản phẩm</Text>
                    <View style={{ gap: 10, marginTop: 5 }}>
                        <ListingDetailInfoText label='Bao gồm' text={auction.product.packageContent} />
                        <ListingDetailInfoText label='Tình trạng' text={conditionText(auction.product.condition)} />
                        <ListingDetailInfoText label='Danh mục' text={auction.product.categoryName} />
                        <ListingDetailInfoText label='Chất liệu' text={auction.product.materialName} />
                        <ListingDetailInfoText label='Xuất xứ' text={auction.product.origin} />
                        <ListingDetailInfoText label='Kích thước' text={auction.product.dimension + ' cm'} />
                        <ListingDetailInfoText label='Khối lượng' text={auction.product.weight + ' g'} />
                        <ListingDetailInfoText label='Đóng gói' text={auction.product.packageMethod} />
                    </View>
                </View>

                {/* Item description section */}
                <View style={{
                    paddingHorizontal: 15,
                    gap: 10,
                    marginVertical: 20
                }}>
                    <Text style={styles.sectionTitle}>Thông tin thêm từ người bán</Text>
                    <TouchableOpacity style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                        onPress={() => navigate('AuctionDescription', { description: auction.product.description })}>
                        <View style={{
                            flex: 1,
                            gap: 10
                        }}>
                            <Text
                                numberOfLines={3}
                                ellipsizeMode='tail'
                                style={styles.descriptionText}
                            >{auction.product.description}</Text>
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
                    marginVertical: 20
                }}>
                    <Text style={styles.sectionTitle}>Thông tin đấu giá</Text>
                    <TouchableOpacity style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                        onPress={() => navigate('BiddingHistory', { auction_id: auction.id })}>
                        <View style={{ gap: 10, flex: 1 }}>
                            <ListingDetailInfoText label='Thời gian còn lại' text={moment(auction.endedAt).fromNow()}
                                secondText={moment(auction.endedAt).format('dd, Do MMMM YYYY, h:mm A')} />
                            <ListingDetailInfoText label='Số lần đặt' text={auction.numberOfBids} />
                            <ListingDetailInfoText label='Người tham gia' text={auction.numberOfBidders} />
                        </View>
                        <IconFeather name='chevron-right' size={30} color='black' />
                    </TouchableOpacity>
                </View>

                {/* Shipping information section */}
                <View style={{
                    paddingHorizontal: 15,
                    gap: 10,
                    marginVertical: 20
                }}>
                    <Text style={styles.sectionTitle}>Vận chuyển, đổi trả và thanh toán</Text>
                    <TouchableOpacity style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                        onPress={() => setShippingModalVisible(!shippingModalVisible)}>
                        <View style={{ gap: 10, flex: 1 }}>
                            <ListingDetailInfoText label='Giao hàng'
                                text={'Từ ' + `${auction.seller.ward}, ${auction.seller.district}, ${auction.seller.province}`}
                                secondText='Thông qua Giao hàng nhanh' />
                            <ListingDetailInfoText label='Đổi trả' text='Trong vòng 30 ngày'
                                secondText='Người mua trả phí vận chuyển' />
                            <ListingDetailInfoText label='Thanh toán' text='Ví PAH'
                                secondText='Người tham gia cần có đủ số dư khả dụng trong ví PAH trước khi tham gia đấu giá' />
                        </View>
                        <IconFeather name='chevron-right' size={30} color='black' />
                    </TouchableOpacity>
                </View>

                {/* Bottom seller section */}
                <View style={{
                    paddingHorizontal: 15,
                    gap: 10,
                    marginTop: 20,
                    marginBottom: 100,
                }}>
                    <Text style={styles.sectionTitle}>Về người bán</Text>
                    <View style={{ gap: 10, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => navigate('Profile', { user_id: auction.seller.id })}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 15
                            }}>
                                <Image source={{ uri: auction.seller.profilePicture }}
                                    style={styles.bottomSellerImage} />
                                <View style={{ gap: 2 }}>
                                    <Text style={styles.bottomSellerPrimary}>{auction.seller.name}</Text>
                                    <Text style={styles.bottomSellerSecondary}>{auction.seller.province}</Text>
                                    <Text style={styles.bottomSellerSecondary}>Đánh giá: {auction.seller.ratings}</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 15,
                                gap: 10
                            }}>
                                <IconFeather name='calendar' size={20} color='black' />
                                <Text style={styles.descriptionText}>Tham gia ngày {moment(auction.seller.registeredAt).format('DD/MM/YYYY')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView> : <View style={{
                alignItems: 'center',
                paddingTop: 150
            }}>
                <Image source={images.warningImage} style={{
                    resizeMode: 'cover',
                    width: 140,
                    height: 140
                }} />
                <Text style={{
                    fontSize: fontSizes.h4,
                    fontFamily: fonts.MontserratMedium,
                    color: 'black',
                    textAlign: 'center',
                    marginHorizontal: 35,
                    marginTop: 10
                }}>Không thể tìm thấy thông tin sản phẩm này.</Text>
                <TouchableOpacity onPress={() => getAutionDetail()}>
                    <Text style={{
                        fontSize: fontSizes.h5,
                        fontFamily: fonts.MontserratMedium,
                        color: colors.primary,
                        textAlign: 'center',
                        marginHorizontal: 35,
                        marginTop: 20
                    }}>Tải lại</Text>
                </TouchableOpacity>
            </View>}
        </View>}

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
                        <ListingDetailInfoText label='Giao từ' text={`${auction.seller.ward}, ${auction.seller.district}, ${auction.seller.province}`} />
                        <ListingDetailInfoText label='Giao đến' text={userAddress.province ?
                            `${userAddress.ward}, ${userAddress.district}, ${userAddress.province}` :
                            'Cài đặt địa chỉ mặc định để thấy cước vận chuyển'} />
                        <ListingDetailInfoText label='Đổi trả' text='Trong vòng 30 ngày'
                            secondText='Người mua trả phí vận chuyển' />
                        <ListingDetailInfoText label='Thanh toán' text='Ví PAH'
                            secondText='Người tham gia cần có đủ số dư khả dụng trong ví PAH trước khi tham gia đấu giá' />
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
        borderRadius: 5
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
        fontFamily: fonts.MontserratBold,
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
        borderRadius: 5
    },
    primaryButton: {
        borderWidth: 1.2,
        borderColor: colors.primary,
        borderRadius: 5,
        backgroundColor: colors.primary,
        paddingVertical: 10
    },
    primaryButtonText: {
        fontSize: fontSizes.h3,
        fontFamily: fonts.MontserratBold,
        color: 'white',
        textAlign: 'center'
    },
    secondaryButton: {
        borderWidth: 1.2,
        borderColor: colors.primary,
        borderRadius: 5,
        paddingVertical: 15,
    },
    secondaryButtonText: {
        fontSize: fontSizes.h3,
        fontFamily: fonts.MontserratMedium,
        color: colors.primary,
        textAlign: 'center'
    },
    emptyText: {
        color: colors.greyText,
        fontSize: fontSizes.h4,
        textAlign: 'center',
        fontFamily: fonts.MontserratMedium,
        marginVertical: 30
    },
    productName: {
        color: 'black',
        fontFamily: fonts.MontserratBold,
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
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h5
    },
    topSellerInformation: {
        color: colors.darkGreyText,
        fontFamily: fonts.MontserratMedium,
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
        fontFamily: fonts.MontserratBold,
        fontSize: fontSizes.h1
    },
    priceSecondary: {
        color: colors.darkGreyText,
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h4
    },
    sectionTitle: {
        color: 'black',
        fontFamily: fonts.MontserratBold,
        fontSize: fontSizes.h2
    },
    descriptionText: {
        color: 'black',
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h4
    },
    descriptionLink: {
        color: 'black',
        fontFamily: fonts.MontserratMedium,
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
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h5
    },
    bottomSellerSecondary: {
        color: colors.darkGreyText,
        fontFamily: fonts.MontserratMedium,
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
        fontFamily: fonts.MontserratBold,
        marginLeft: 20,
        marginVertical: 20
    }
});

export default AuctionDetail;