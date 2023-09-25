import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import { colors, fontSizes } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

function Home(props) {
    const popularProducts = [
        {
            name: 'The intresting queston is: how do you compute the number of lines? Because I guess nobody ever knows it in advance (since it has no reason to be static)',
            price: '12.200.000',
            url: 'https://cdn.tgdd.vn/2021/03/CookProductThumb/Bbq-la-gi-nguon-goc-va-cac-cach-tu-lam-bbq-tai-nha-vo-cung-don-gian-0b-620x620.jpg'
        },
        {
            name: 'The intesting queson is: how do you compute the number of lines? Because I guess nobody ever knows it in advance (since it has no reason to be',
            price: '600.000',
            url: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2021-09-breakfast-grits%2FNew%20Finals%2F2021-10-12_ATK8035'
        },
        {
            name: 'Beverages',
            price: '600.000',
            url: 'https://f.hubspotusercontent00.net/hubfs/4662006/Beverage_compounds_drinks.jpg'
        },
        {
            name: 'Coffee',
            price: '600.000',
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG'
        },
        {
            name: 'Salad',
            price: '600.000',
            url: 'https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg'
        },
        {
            name: 'Fast food',
            price: '600.000',
            url: 'https://www.eatthis.com/wp-content/uploads/sites/4/2022/06/fast-food-assortment-soda.jpg?quality=82&strip=1'
        },
        {
            name: 'Dessert',
            price: '600.000',
            url: 'https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipemediafiles/recipes/retail/x17/17244-caramel-topped-ice-cream-dessert-600x600.jpg?ext=.jpg'
        },
        {
            name: 'Noodles',
            price: '600.000',
            url: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/veg-noodles-vegetable-noodles-recipe.jpg'
        }
    ]

    const categories = [
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
    ]

    return <View style={styles.container}>
        {/* Fixed homepage section: logo and cart and search icon */}
        <View style={{
            height: 70,
            flexDirection: 'row',
            paddingLeft: 15,
            paddingRight: 10,
            justifyContent: 'space-between'
        }}>
            <Image source={require('../assets/logo/pah-logo.png')}
                style={{
                    resizeMode: 'cover',
                    height: 35,
                    width: 70,
                    alignSelf: 'center'
                }} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8
            }}>
                <TouchableOpacity style={styles.iconButton}>
                    <IconFeather name='search' size={18} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
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
                    <TouchableOpacity>
                        <IconSLI name='microphone'
                            size={20} color={'black'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/*  Optional section: sign in or register */}
            <View style={{
                height: 150,
                paddingTop: 10,
                paddingHorizontal: 25
            }}>
                <Text style={{
                    color: colors.greyText,
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
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginText}>Đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/*  Popular products section */}
            <View style={{
                height: 350
            }}>
                <View style={{
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: fontSizes.h2,
                        fontFamily: 'OpenSans-Bold'
                    }}>Sản phẩm bán chạy</Text>
                    <TouchableOpacity>
                        <Text style={{
                            color: colors.greyText,
                            fontSize: fontSizes.h5,
                            fontFamily: 'OpenSans-Medium',
                            textDecorationLine: 'underline'
                        }}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal={true}
                    data={popularProducts}
                    renderItem={({ item }) => {
                        return <TouchableOpacity
                            onPress={() => alert(`Press item name ${item.name}`)}
                            style={{
                                alignItems: 'center'
                            }}>
                            <Image source={{ uri: item.url }}
                                style={{
                                    width: 150,
                                    height: 150,
                                    margin: 5,
                                    resizeMode: 'cover',
                                    borderRadius: 20
                                }} />
                            <Text numberOfLines={3}
                                ellipsizeMode='tail'
                                style={{
                                    width: 150,
                                    height: 60,
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5
                                }}>{item.name}</Text>
                            <Text numberOfLines={3}
                                ellipsizeMode='tail'
                                style={{
                                    width: 150,
                                    height: 60,
                                    color: 'black',
                                    fontFamily: 'OpenSans-Bold',
                                    fontSize: fontSizes.h2
                                }}>{item.price} VND</Text>
                        </TouchableOpacity>
                    }}
                    keyExtractor={eachProduct => eachProduct.name}
                />
            </View>

            {/*  Ongoing auctions section */}
            <View style={{
                height: 350
            }}>
                <View style={{
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: fontSizes.h2,
                        fontFamily: 'OpenSans-Bold'
                    }}>Cuộc đấu giá đang diễn ra</Text>
                    <TouchableOpacity>
                        <Text style={{
                            color: colors.greyText,
                            fontSize: fontSizes.h5,
                            fontFamily: 'OpenSans-Medium',
                            textDecorationLine: 'underline'
                        }}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal={true}
                    data={popularProducts}
                    renderItem={({ item }) => {
                        return <TouchableOpacity
                            onPress={() => alert(`Press item name ${item.name}`)}
                            style={{
                                alignItems: 'center'
                            }}>
                            <Image source={{ uri: item.url }}
                                style={{
                                    width: 150,
                                    height: 150,
                                    margin: 5,
                                    resizeMode: 'cover',
                                    borderRadius: 20
                                }} />
                            <Text numberOfLines={3}
                                ellipsizeMode='tail'
                                style={{
                                    width: 150,
                                    height: 60,
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5
                                }}>{item.name}</Text>
                            <Text numberOfLines={3}
                                ellipsizeMode='tail'
                                style={{
                                    width: 150,
                                    height: 60,
                                    color: 'black',
                                    fontFamily: 'OpenSans-Bold',
                                    fontSize: fontSizes.h2
                                }}>{item.price} VND</Text>
                        </TouchableOpacity>
                    }}
                    keyExtractor={eachProduct => eachProduct.name}
                />
            </View>

            {/*  Categories section */}
            <View style={{
                flex: 1,
                marginBottom: 20
            }}>
                <View style={{
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: fontSizes.h2,
                        fontFamily: 'OpenSans-Bold'
                    }}>Khám phá các danh mục</Text>
                </View>
                <FlatList
                    horizontal={true}
                    data={categories}
                    renderItem={({ item }) => {
                        return <TouchableOpacity
                            onPress={() => alert(`Press item name ${item.name}`)}
                            style={{
                                alignItems: 'center'
                            }}>
                            <Image source={{ uri: item.url }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    margin: 10,
                                    resizeMode: 'cover',
                                    borderRadius: 50
                                }} />
                            <Text numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{
                                    width: 100,
                                    height: 20,
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5,
                                    textAlign: 'center'
                                }}>{item.name}</Text>
                        </TouchableOpacity>
                    }}
                    keyExtractor={eachProduct => eachProduct.name}
                />
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
    }
});

export default Home;