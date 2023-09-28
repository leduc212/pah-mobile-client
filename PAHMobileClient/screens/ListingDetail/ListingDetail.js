import React, { useContext, useState } from 'react';
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

function ListingDetail(props) {
    // Get product_id from routes
    const { product_id } = props.route.params;

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
        },
        feedbacks: [
            {
                id: 12,
                star: 4,
                user_name: 'Lê Đức Hiền',
                content: 'Sản phẩm tốt, đẹp'
            },
            {
                id: 15,
                star: 3,
                user_name: 'Trần Ngọc Châu',
                content: 'Nhìn có vẻ tạm'
            },
            {
                id: 26,
                star: 5,
                user_name: 'Nguyễn Huỳnh Tuấn',
                content: 'Sản phẩm rất tuyệt vời Sản phẩm rất tuyệt vời Sản phẩm rất tuyệt vời Sản phẩm rất tuyệt vời'
            }
        ]
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
                <Text style={styles.titleText}>Sản phẩm</Text>
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
            </View>

            {/* Buy and add to cart buttons */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10,
            }}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Mua ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Thêm vào giỏ hàng</Text>
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
                    onPress={() => navigate('ListingDescription', { product_id: product.id })}>
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
                        <ListingDetailInfoText label='Thanh toán' text='Ví PAH, Zalopay, COD' />
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

            {/* Product feedback section */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginTop: 10,
                marginBottom: 20
            }}>
                <Text style={styles.sectionTitle}>Phản hồi về sản phẩm</Text>
                <View style={{ marginTop: 5 }}>
                    {(Array.isArray(product.feedbacks) && product.feedbacks.length) ? <View>
                        {product.feedbacks.map((feedback, index) =>
                            <ListingDetailFeedback feedback={feedback}
                                key={feedback.id}
                                index={index}
                                length={product.feedbacks.length - 1} />)}
                        <TouchableOpacity style={styles.secondaryButton}
                            onPress={() => navigate('ListingFeedback', { product_id: product.id })}>
                            <Text style={styles.secondaryButtonText}>Xem tất cả phản hồi</Text>
                        </TouchableOpacity>
                    </View> : <View>
                        <Text style={styles.emptyText}>Không có phản hồi về sản phẩm này</Text>
                    </View>}
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
                        <ListingDetailInfoText label='Thanh toán' text='Ví PAH, Zalopay, COD' />
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
        paddingVertical: 15
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
        flexDirection: 'row',
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

export default ListingDetail;