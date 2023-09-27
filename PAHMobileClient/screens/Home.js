import React, { useState, useContext } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import { colors, fontSizes, images } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { AuthContext } from '../context/AuthContext';
import {
    HomeItemCard,
    HomeCategoryCard
} from '../components';

function Home(props) {
    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Data for popular products, ongoing auction and categories
    const [popularProducts, setPopularProducts] = useState([
        {
            name: 'New Basic Stussy Mens Black/White L/S Tee T Shirt Size Medium',
            price: '553,658',
            url: 'https://i.ebayimg.com/images/g/SqQAAOSw9w9jYyqQ/s-l1600.jpg'
        },
        {
            name: 'Trump shirt Wanted for President rea Mugshot DJT Tee shirt Republican party tee',
            price: '426,097',
            url: 'https://i.ebayimg.com/images/g/r-YAAOSwe4Vk63Ai/s-l1600.jpg'
        },
        {
            name: 'adidas Originals Mens Street Grp Tea Graphic Shirt AZ1138 White XS-XL',
            price: '699,268',
            url: 'https://i.ebayimg.com/images/g/PeoAAOSwiFFesyqM/s-l1600.jpg'
        },
        {
            name: 'Supreme Scarface The World Is Yours T-Shirt Black XL 100% Authentic Tee',
            price: '4,756,097',
            url: 'https://i.ebayimg.com/images/g/fIUAAOSwmnFk2PPY/s-l1600.jpg'
        },
        {
            name: 'ZEGNA Micromodal Stretch Short Sleeve Under T-shirt (BLACK)',
            price: '1,944,530',
            url: 'https://i.ebayimg.com/images/g/dX0AAOSwzBxkYjsj/s-l1600.png'
        }
    ]);

    const [ongoingAuctions, setOngoingAuctions] = useState([
        {
            name: '6.3" Chinese Antique Porcelain Song dynasty ru kiln cyan glaze Five tube Vase',
            price: '4,633,902',
            url: 'https://i.ebayimg.com/images/g/dCMAAOSwRNBlEZ1h/s-l1600.jpg',
            closedTime: 1695699788000
        },
        {
            name: '7.4" China Ancient Bronze ware beast Food Vessel Wine Vessel Wineware Zun pot',
            price: '6,271,707',
            url: 'https://i.ebayimg.com/images/g/TAsAAOSwaHZkLiZG/s-l1600.jpg',
            closedTime: '2023-09-27'
        },
        {
            name: 'BIG FAMILLE ROSE CHINESE PORCELAIN HEXAGONAL QING ANTIQUES BRUSHPOT HAT STAND',
            price: '3,658,536',
            url: 'https://i.ebayimg.com/images/g/ljUAAOSwFQJk51-q/s-l1600.jpg',
            closedTime: '2023-09-28'
        },
        {
            name: 'antique chinese cloisonne incense burner',
            price: '11,207,317',
            url: 'https://i.ebayimg.com/images/g/0V4AAOSwY3pk7gm6/s-l1600.jpg',
            closedTime: '2023-09-27'
        }
    ]);

    const [categories, setCategories] = useState([
        {
            name: 'Beverages',
            url: 'https://f.hubspotusercontent00.net/hubfs/4662006/Beverage_compounds_drinks.jpg'
        },
        {
            name: 'Coffee',
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG'
        },
        {
            name: 'Salad',
            url: 'https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg'
        },
        {
            name: 'Fast food',
            url: 'https://www.eatthis.com/wp-content/uploads/sites/4/2022/06/fast-food-assortment-soda.jpg?quality=82&strip=1'
        },
        {
            name: 'Dessert',
            url: 'https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipemediafiles/recipes/retail/x17/17244-caramel-topped-ice-cream-dessert-600x600.jpg?ext=.jpg'
        },
        {
            name: 'Noodles',
            url: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/veg-noodles-vegetable-noodles-recipe.jpg'
        }
    ]);

    return <View style={styles.container}>
        {/* Fixed homepage title: logo and cart and search icon */}
        <View style={styles.titleContainer}>
            <Image source={images.logoImage}
                style={styles.logoImage} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8
            }}>
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
            </View>
        </View>

        {/* Scroll view */}
        <ScrollView>
            {/*  Search bar section */}
            <View style={{
                height: 70,
                paddingHorizontal: 15
            }}>
                <View style={{
                    height: 50,
                    backgroundColor: colors.grey,
                    borderRadius: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15
                }}>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1
                    }}
                        onPress={() => {
                            navigate('Search')
                        }}>
                        <IconFeather name='search'
                            size={20} color={'black'}
                        />
                        <Text style={{
                            fontFamily: 'OpenSans-Medium',
                            color: 'black',
                            marginLeft: 15
                        }}
                        >Tìm kiếm sản phẩm...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigate('Search')
                    }}>
                        <IconSLI name='microphone'
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/*  Optional section: sign in or register */}
            {!authContext?.authState?.authenticated ? <View style={{
                height: 150,
                paddingTop: 10,
                paddingHorizontal: 25
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h3,
                    textAlign: 'center',
                    fontFamily: 'OpenSans-Medium'
                }}>Hãy đăng nhập để trải nghiệm tối đa nền tảng của chúng tôi</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    gap: 10
                }}>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => {
                            navigate('Register')
                        }}>
                        <Text style={styles.loginText}>Đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => {
                            navigate('Login')
                        }}>
                        <Text style={styles.loginText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View> : <View></View>}

            {/*  Popular products section */}
            <View style={{
                marginBottom: 20
            }}>
                <View style={styles.headerLayout}>
                    <Text style={styles.headerText}>Sản phẩm bán chạy</Text>
                    <TouchableOpacity>
                        <Text style={styles.headerSubText}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                {(Array.isArray(popularProducts) && popularProducts.length) ? <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularProducts}
                    renderItem={({ item }) => {
                        return <HomeItemCard item={item}
                            onPress={() => alert(`Press item name ${item.name}`)} />
                    }}
                    keyExtractor={eachProduct => eachProduct.name}
                /> : <View>
                    <Text style={styles.emptyText}>Không có sản phẩm để hiển thị</Text>
                </View>}
            </View>

            {/*  Ongoing auctions section */}
            <View style={{
                marginBottom: 20
            }}>
                <View style={styles.headerLayout}>
                    <Text style={styles.headerText}>Cuộc đấu giá đang diễn ra</Text>
                    <TouchableOpacity>
                        <Text style={styles.headerSubText}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                {(Array.isArray(ongoingAuctions) && ongoingAuctions.length) ? <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={ongoingAuctions}
                    renderItem={({ item }) => {
                        return <HomeItemCard item={item}
                            onPress={() => alert(`Press item name ${item.name}`)} />
                    }}
                    keyExtractor={eachProduct => eachProduct.name}
                /> : <View>
                    <Text style={styles.emptyText}>Không có sản phẩm để hiển thị</Text>
                </View>}
            </View>

            {/*  Categories section */}
            <View style={{
                flex: 1,
                marginBottom: 20
            }}>
                <View style={styles.headerLayout}>
                    <Text style={styles.headerText}>Khám phá các danh mục</Text>
                </View>
                {(Array.isArray(categories) && categories.length) ? <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item }) => {
                        return <HomeCategoryCard item={item}
                            onPress={() => alert(`Press item name ${item.name}`)} />
                    }}
                    keyExtractor={eachProduct => eachProduct.name}
                /> : <View>
                    <Text style={styles.emptyText}>Không có danh mục để hiển thị</Text>
                </View>}
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
        backgroundColor: colors.grey,
        padding: 12,
        borderRadius: 50
    },
    loginButton: {
        borderWidth: 1.2,
        borderColor: colors.primary,
        borderRadius: 30,
        paddingVertical: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    loginText: {
        fontSize: fontSizes.h3,
        fontFamily: 'OpenSans-Medium',
        color: colors.primary
    },
    titleContainer: {
        height: 70,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 10,
        justifyContent: 'space-between'
    },
    logoImage: {
        resizeMode: 'cover',
        height: 35,
        width: 70,
        alignSelf: 'center'
    },
    headerLayout: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerText: {
        color: 'black',
        fontSize: fontSizes.h2,
        fontFamily: 'OpenSans-Bold'
    },
    headerSubText: {
        color: colors.greyText,
        fontSize: fontSizes.h5,
        fontFamily: 'OpenSans-Medium',
        textDecorationLine: 'underline'
    },
    emptyText: {
        color: colors.greyText,
        fontSize: fontSizes.h4,
        textAlign: 'center',
        fontFamily: 'OpenSans-Medium',
        marginVertical: 30
    }
});

export default Home;