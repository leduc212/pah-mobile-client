import React, { useContext, useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
    RefreshControl,
    FlatList
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import { colors, fontSizes, images, fonts } from '../../constants';
import { auctionStatusText } from '../../utilities/AuctionStatus';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    ProductListingCard
} from '../../components';
import {
    Product as ProductRepository
} from '../../repositories';

function SellerProductListing(props) {
    const { seller_id } = props.route.params;
    //// AUTH AND NAVIGATION
    // Auth Context
    const authContext = useContext(AuthContext);
    const axiosContext = useContext(AxiosContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Loading and refreshing state
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Data for auctions and filters
    const [products, setProducts] = useState([]);

    //// FUNCTION AND USE EFFECT

    // Initialize data for categories, materials and auctions on screen start
    function getAllProduct() {
        setIsLoading(true);

        ProductRepository.getProductsBySeller(axiosContext, seller_id)
            .then(response => {
                setProducts(response);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getAllProduct();
    }, []);

    // Scroll view refresh
    const onRefresh = () => {
        setRefreshing(true);
        getAllProduct();
        setRefreshing(false);
    };

    return <View style={styles.container}>
        {/* Fixed screen title: logo and cart and search icon */}
        <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.iconButton}
                onPress={() => {
                    goBack();
                }}>
                <IconFeather name='chevron-left' size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}
                numberOfLines={1}
                ellipsizeMode='tail'
            >Sản phẩm của tôi</Text>
        </View>

        {/* Loading section */}
        {isLoading ? <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View> : <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            {(Array.isArray(products) && products.length) ? <View style={{ marginTop: 20 }}>
                <View style={{
                    flex: 1,
                    marginBottom: 15
                }}>
                    {products.map((product, index) =>
                        <ProductListingCard key={product.id} product={product}
                            index={index} onPress={() => {
                                navigate('ListingDetailSeller', { product_id: product.id })
                            }} />
                    )}
                </View>
            </View> : <View style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 150
            }}>
                <Image source={images.searchImage} style={{
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
                }}>Bạn chưa có sản phẩm nào</Text>
            </View>}
        </ScrollView>}

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    iconButton: {
        padding: 12,
        borderRadius: 5
    },
    titleContainer: {
        height: 70,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        color: 'black',
        fontFamily: fonts.MontserratBold,
        fontSize: fontSizes.h1,
        alignSelf: 'center',
        flex: 1,
        marginLeft: 5
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
    },
    filterTitle: {
        fontSize: fontSizes.h4,
        fontFamily: fonts.MontserratMedium,
        color: 'black',
        marginLeft: 15,
        marginBottom: 15
    },
    filterPillsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingLeft: 5
    },
    filterPill: {
        backgroundColor: colors.grey,
        paddingHorizontal: 15,
        height: 35,
        marginHorizontal: 4,
        marginBottom: 8,
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: 'center'
    },
    filterPillText: {
        fontSize: fontSizes.h5,
        color: 'black'
    },
    priceContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    priceInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: 120,
        paddingBottom: 0,
        fontSize: fontSizes.h4,
        fontFamily: fonts.MontserratMedium,
        color: 'black'
    },
    priceLabel: {
        fontSize: fontSizes.h6,
        fontFamily: fonts.MontserratMedium,
        color: 'black',
        marginTop: 5
    },
    primaryButton: {
        borderWidth: 1.2,
        borderColor: colors.primary,
        borderRadius: 5,
        backgroundColor: colors.primary,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 10
    },
    primaryButtonText: {
        fontSize: fontSizes.h4,
        fontFamily: fonts.MontserratBold,
        color: 'white',
        textAlign: 'center'
    },
    sortModal: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    sortModalTitle: {
        color: 'black',
        fontSize: fontSizes.h3,
        fontFamily: fonts.MontserratBold,
        marginLeft: 20,
        marginVertical: 20
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
        fontFamily: fonts.MontserratMedium
    },
    filterNumber: {
        position: 'absolute',
        top: 0,
        right: 1,
        borderRadius: 20,
        fontFamily: fonts.MontserratMedium,
        color: 'white',
        fontSize: fontSizes.h6 / 1.5,
        backgroundColor: 'red',
        paddingHorizontal: 3
    }
});


export default SellerProductListing;
