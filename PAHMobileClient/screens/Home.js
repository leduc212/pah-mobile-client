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
import { colors, fontSizes, images, fonts } from '../constants';
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
            id: 1,
            name: 'Đá thạch anh hồng phong thuỷ',
            price: '1,220,000',
            url: 'https://media.loveitopcdn.com/25808/thumb/da-canh-thach-anh-hong-m277415-3.jpg'
        },
        {
            id: 2,
            name: 'Đá thạch anh xanh phong thuỷ',
            price: '6,430,000',
            url: 'https://media.loveitopcdn.com/25808/thumb/da-canh-fluorite-xanh-m282420.jpg'
        },
        {
            id: 3,
            name: 'Đá thạch anh trắng phong thuỷ',
            price: '1,960,000',
            url: 'https://media.loveitopcdn.com/25808/thumb/da-canh-thach-anh-trang-m150083-1.jpg'
        },
        {
            id: 4,
            name: 'Đá fluorite xanh phong thuỷ',
            price: '1,216,000',
            url: 'https://media.loveitopcdn.com/25808/thumb/tru-da-fluorite-xanh-m0752059-3.jpg'
        },
        {
            id: 5,
            name: 'Đá thạch anh vàng phong thuỷ',
            price: '4,632,000',
            url: 'https://media.loveitopcdn.com/25808/thumb/img01082-copy.jpg'
        },
        {
            id: 6,
            name: 'Đe đồng của thợ bạc mini',
            price: '1,550,000',
            url: 'https://cloud.muaban.net/images/2022/07/06/047/aa389f6f32ab4738bfd68313b5c52c42.jpg'
        }
    ]);

    const [ongoingAuctions, setOngoingAuctions] = useState([
        {
            id: 11,
            name: 'Vòng đá mắt hổ xanh phong thuỷ',
            price: '8,550,000',
            url: 'https://media.loveitopcdn.com/25808/thumb/img09357-copy.jpg',
            closedTime: '2023-09-30'
        },
        {
            id: 12,
            name: 'Dây chuyền nanh heo rừng bằng đồng',
            price: '20,000,000',
            url: 'https://cloud.muaban.net/images/2023/06/22/334/50c23df095054b36a8c6cd4176c79f00.jpg',
            closedTime: '2023-09-30'
        },
        {
            id: 13,
            name: 'Bàn ủi con gà bằng đồng',
            price: '9,000,000',
            url: 'https://cloud.muaban.net/images/thumb-detail/2022/05/11/497/375f25ac384c4de6805b153996d77d2d.jpg',
            closedTime: '2023-10-02'
        },
        {
            id: 14,
            name: 'Thỏi bạc quý',
            price: '25,000,000',
            url: 'https://cloud.muaban.net/images/2023/07/29/586/1f7e228a67674cdf9e3a2d07632475fe.jpg',
            closedTime: '2023-10-04'
        }
    ]);

    const [categories, setCategories] = useState([
        {
            name: 'Đá phong thuỷ',
            url: 'https://media.loveitopcdn.com/26429/800k-2.jpg'
        },
        {
            name: 'Trang sức cổ',
            url: 'https://vanchuyenhangquangchau.vn/file/tuvan/1634630797-trang-suc-co-trang-trung-quoc.jpg'
        },
        {
            name: 'Nội thất cổ',
            url: 'https://antiquesworld.co.uk/wp-content/uploads/2021/04/antique-furniture.jpg'
        },
        {
            name: 'Trang sức phong thuỷ',
            url: 'https://vcdn-giadinh.vnecdn.net/2020/05/01/5d0c91a77fcc7-NQVT0745-V-ng-Ta-5030-3611-1588267934.jpg'
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
                            fontFamily: fonts.OpenSansMedium,
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
                    fontFamily: fonts.OpenSansMedium
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
                    <TouchableOpacity onPress={()=>navigate('Listing')}>
                        <Text style={styles.headerSubText}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                {(Array.isArray(popularProducts) && popularProducts.length) ? <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularProducts}
                    renderItem={({ item }) => {
                        return <HomeItemCard item={item}
                            onPress={() => navigate('ListingDetail', {product_id: item.id})} />
                    }}
                    keyExtractor={eachProduct => eachProduct.id}
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
                    <TouchableOpacity onPress={()=>navigate('AuctionListing')}>
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
                    <Text style={styles.emptyText}>Không có cuộc đấu giá để hiển thị</Text>
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
                    keyExtractor={eachCategory => eachCategory.name}
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
        fontFamily: fonts.OpenSansMedium,
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
        fontFamily: fonts.OpenSansBold
    },
    headerSubText: {
        color: colors.greyText,
        fontSize: fontSizes.h5,
        fontFamily: fonts.OpenSansMedium,
        textDecorationLine: 'underline'
    },
    emptyText: {
        color: colors.greyText,
        fontSize: fontSizes.h4,
        textAlign: 'center',
        fontFamily: fonts.OpenSansMedium,
        marginVertical: 30
    }
});

export default Home;