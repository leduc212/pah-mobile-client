import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { AuthContext } from '../context/AuthContext';
import { colors, fontSizes, images, fonts } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    ProductListingCard
} from '../components';

function AuctionListing(props) {
    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Data
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);

    // Data for products
    const [products, setProducts] = useState([
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

    const [sortOrders, setSortOrders] = useState([
        'Từ mới đến cũ',
        'Từ cũ đến mới',
        'Giá tăng dần',
        'Giá giảm dần'
    ]);

    const [currentSortOrder, setCurrentSortOrder] = useState('Từ mới đến cũ');

    const [categories, setCategories] = useState([
        'Tất cả',
        'Đá phong thuỷ',
        'Trang sức cổ',
        'Nội thất cổ',
        'Trang sức phong thuỷ',
        'Khác'
    ]);

    const [currentCategory, setCurrentCategory] = useState('Tất cả');

    const [materials, setMaterials] = useState([
        'Tất cả',
        'Đá quý',
        'Gỗ',
        'Bạc',
        'Thủy tinh',
        'Đồng',
        'Sắt',
        'Titan',
        'Vải',
        'Lụa',
        'Khác'
    ]);

    const [currentMaterial, setCurrentMaterial] = useState('Tất cả');

    return <View style={styles.container}>
        {/* Fixed screen title: logo and cart and search icon */}
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}
                numberOfLines={1}
                ellipsizeMode='tail'
            >Đấu giá</Text>
            <View style={styles.titleButtonContainer}>
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => {
                        navigate('Cart')
                    }}>
                    <IconFeather name='shopping-cart' size={18} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>

        {/* Filter section */}
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 15
        }}>
            <View style={{ flex: 1 }}></View>
            <View style={{
                flexDirection: 'row',
                gap: 15
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5
                }}
                    onPress={() => {
                        setSortModalVisible(!sortModalVisible)
                    }}>
                    <Text style={{
                        color: colors.primary,
                        fontFamily: fonts.OpenSansBold,
                        fontSize: fontSizes.h5,
                    }}>Sắp xếp</Text>
                    <IconFeather name='align-center' size={16} color={colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5
                }}
                    onPress={() => {
                        setFilterModalVisible(!filterModalVisible)
                    }}>
                    <Text style={{
                        color: colors.primary,
                        fontFamily: fonts.OpenSansBold,
                        fontSize: fontSizes.h5,
                    }}>Bộ lọc</Text>
                    <IconFeather name='filter' size={16} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView>
            {/* Title (type of list: for sale/auction) section */}
            {(Array.isArray(products) && products.length) ? <View>
                <View style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15
                }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansBold,
                        fontSize: fontSizes.h2
                    }}>Các cuộc đấu giá đang diễn ra</Text>
                </View>

                <View style={{
                    flex: 1,
                    marginBottom: 15
                }}>
                    {products.map((product) =>
                        <ProductListingCard key={product.id} product={product} onPress={()=>{
                            navigate('ListingDetail', {product_id: product.id})
                        }}/>
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
                    fontFamily: fonts.OpenSansMedium,
                    color: 'black',
                    textAlign: 'center',
                    marginHorizontal: 35,
                    marginTop: 10
                }}>Không thể tìm thấy sản phẩm nào. Bạn hãy thử tìm kiếm với từ khóa khác xem sao!</Text>
            </View>}
        </ScrollView>

        {/* Filter Modal */}
        <Modal
            animationIn="slideInRight"
            animationOut="slideOutRight"
            isVisible={filterModalVisible}
            onRequestClose={() => {
                setFilterModalVisible(!filterModalVisible);
            }}
            style={{ margin: 0 }}>
            <View style={{
                flex: 1,
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{
                    width: '20%'
                }}
                    onPress={() => {
                        setFilterModalVisible(!filterModalVisible);
                    }}></TouchableOpacity>
                <View style={{
                    backgroundColor: 'white',
                    flex: 1
                }}>
                    {/* Filter title */}
                    <View style={{
                        height: 70,
                        flexDirection: 'row',
                        paddingLeft: 15,
                        paddingRight: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            marginRight: 10,
                            borderRadius: 50
                        }}
                            onPress={() => {
                                setFilterModalVisible(!filterModalVisible);
                            }}>
                            <IconFeather name='x' size={25} color={'black'} />
                        </TouchableOpacity>
                        <Text style={{
                            color: 'black',
                            fontFamily: fonts.OpenSansBold,
                            fontSize: fontSizes.h1
                        }}
                        >Bộ lọc</Text>
                        <TouchableOpacity>
                            <Text style={{
                                color: colors.primary,
                                fontFamily: fonts.OpenSansBold,
                                fontSize: fontSizes.h4
                            }}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >Đặt lại</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Filter menu */}
                    <View style={styles.separator}></View>
                    <ScrollView>
                        <View style={{
                            paddingVertical: 15
                        }}>
                            <Text style={styles.filterTitle}>Sắp xếp</Text>
                            <View style={styles.filterPillsContainer}>
                                {sortOrders.map(item =>
                                    <TouchableOpacity
                                        key={item}
                                        style={[{
                                            borderColor: item == currentSortOrder ? 'black' : colors.darkGrey,
                                        }, styles.filterPill]}
                                        onPress={() => {
                                            setCurrentSortOrder(item);
                                        }}>
                                        <Text style={[{
                                            fontFamily: item == currentSortOrder ? fonts.OpenSansBold : fonts.OpenSansMedium,
                                        }, styles.filterPillText]}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={{
                            paddingVertical: 15
                        }}>
                            <Text style={styles.filterTitle}>Danh mục</Text>
                            <View style={styles.filterPillsContainer}>
                                {categories.map(item =>
                                    <TouchableOpacity
                                        key={item}
                                        style={[{
                                            borderColor: item == currentCategory ? 'black' : colors.darkGrey,
                                        }, styles.filterPill]}
                                        onPress={() => {
                                            setCurrentCategory(item);
                                        }}>
                                        <Text style={[{
                                            fontFamily: item == currentCategory ? fonts.OpenSansBold : fonts.OpenSansMedium
                                        }, styles.filterPillText]}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={{
                            paddingVertical: 15
                        }}>
                            <Text style={styles.filterTitle}>Chất liệu</Text>
                            <View style={styles.filterPillsContainer}>
                                {materials.map(item =>
                                    <TouchableOpacity
                                        key={item}
                                        style={[{
                                            borderColor: item == currentMaterial ? 'black' : colors.darkGrey
                                        }, styles.filterPill]}
                                        onPress={() => {
                                            setCurrentMaterial(item);
                                        }}>
                                        <Text style={[{
                                            fontFamily: item == currentMaterial ? fonts.OpenSansBold : fonts.OpenSansMedium
                                        }, styles.filterPillText]}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={{
                            paddingVertical: 15
                        }}>
                            <Text style={styles.filterTitle}>Giá thành</Text>
                            <View style={styles.priceContainer}>
                                <View>
                                    <TextInput style={styles.priceInput} />
                                    <Text style={styles.priceLabel}>Thấp nhất</Text>
                                </View>
                                <View style={{
                                    height: 1.2,
                                    width: 10,
                                    backgroundColor: 'black',
                                }}></View>
                                <View>
                                    <TextInput style={styles.priceInput} />
                                    <Text style={styles.priceLabel}>Cao nhất</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Show result button */}
                    <View style={styles.separator}></View>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Hiện kết quả</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        {/* Sort Modal */}
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={sortModalVisible}
            onRequestClose={() => {
                setSortModalVisible(!sortModalVisible);
            }}
            style={{ margin: 0 }}>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => {
                        setSortModalVisible(!sortModalVisible);
                    }}></TouchableOpacity>
                <View style={styles.sortModal}>
                    {/* Sort title */}
                    <Text style={styles.sortModalTitle}>Sắp xếp</Text>

                    {/* Sort options */}
                    <View>
                        {sortOrders.map(item =>
                            <View key={item} style={{
                                paddingHorizontal: 15
                            }}>
                                <TouchableOpacity style={styles.sortModalOptionContainer}
                                    onPress={() => {
                                        setCurrentSortOrder(item);
                                    }}>
                                    <View style={[{
                                        borderColor: item === currentSortOrder ? colors.primary : 'black',
                                    }, styles.radioButtonOuter]}>
                                        <View style={[{
                                            backgroundColor: item === currentSortOrder ? colors.primary : 'white',
                                        }, styles.radioButtonInner]}></View>
                                    </View>
                                    <Text style={styles.radioText}>{item}</Text>
                                </TouchableOpacity>
                                <View style={styles.separator}></View>
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
        backgroundColor: colors.grey,
        padding: 12,
        borderRadius: 50
    },
    titleContainer: {
        height: 70,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        color: 'black',
        fontFamily: fonts.OpenSansBold,
        fontSize: fontSizes.h1,
        alignSelf: 'center',
        flex: 1,
        marginRight: 10
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
        fontFamily: fonts.OpenSansMedium,
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
        fontFamily: fonts.OpenSansMedium,
        color: 'black'
    },
    priceLabel: {
        fontSize: fontSizes.h6,
        fontFamily: fonts.OpenSansMedium,
        color: 'black',
        marginTop: 5
    },
    primaryButton: {
        borderWidth: 1.2,
        borderColor: colors.primary,
        borderRadius: 35,
        backgroundColor: colors.primary,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 10
    },
    primaryButtonText: {
        fontSize: fontSizes.h4,
        fontFamily: fonts.OpenSansBold,
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
        fontFamily: fonts.OpenSansBold,
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
        fontFamily: fonts.OpenSansMedium
    }
});


export default AuctionListing;