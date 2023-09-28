import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, fontSizes, images } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import { SliderBox } from "react-native-image-slider-box";
import Modal from 'react-native-modal';

function ListingDetail(props) {
    // Get product_id from routes
    const { product_id } = props.route.params;

    const [product, setProduct] = useState({
        name: 'New Basic Stussy Mens Black/White L/S Tee T Shirt Size Medium',
        price: '553,658',
        package_content: '1 bát 2 đũa',
        package_method: 'Hộp sản phẩm',
        condition: 'Tốt',
        category: 'Bát đũa',
        material: 'Đồ gốm',
        origin: 'Bát Tràng',
        dimension: '20x30 cm',
        weight: '0,8',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        images: [
            'https://i.ebayimg.com/images/g/SqQAAOSw9w9jYyqQ/s-l1600.jpg',
            'https://i.ebayimg.com/images/g/r-YAAOSwe4Vk63Ai/s-l1600.jpg',
            'https://i.ebayimg.com/images/g/PeoAAOSwiFFesyqM/s-l1600.jpg',
            'https://i.ebayimg.com/images/g/fIUAAOSwmnFk2PPY/s-l1600.jpg'
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
            <Text style={{
                color: 'black',
                fontFamily: 'OpenSans-Bold',
                fontSize: fontSizes.h2,
                marginHorizontal: 15,
                marginVertical: 10
            }}>{product.name}</Text>

            {/* Top Seller section */}
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                gap: 15,
                marginVertical: 10
            }}
                onPress={() => setSellerModalVisible(!sellerModalVisible)}>
                <Image source={{ uri: product.seller.seller_avatar }}
                    style={{
                        resizeMode: 'cover',
                        width: 50,
                        height: 50,
                        borderRadius: 50
                    }} />
                <View style={{ flex: 1 }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h5
                    }}>{product.seller.seller_name}</Text>
                    <Text style={{
                        color: colors.darkGreyText,
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h5
                    }}>{product.seller.seller_address}</Text>
                </View>
                <IconFeather name='chevron-right' size={30} color='black' />
            </TouchableOpacity>

            {/* Pricing section */}
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                gap: 5,
                marginVertical: 10,
                alignItems: 'baseline'
            }}>
                <Text style={{
                    color: 'black',
                    fontFamily: 'OpenSans-Bold',
                    fontSize: fontSizes.h1
                }}>{product.price} VNĐ</Text>
                <Text style={{
                    color: colors.darkGreyText,
                    fontFamily: 'OpenSans-Medium',
                    fontSize: fontSizes.h4
                }}>+ {shippingPrice} VNĐ vận chuyển</Text>
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
                <Text style={{
                    color: 'black',
                    fontFamily: 'OpenSans-Bold',
                    fontSize: fontSizes.h2
                }}>Thông tin sản phẩm</Text>
                <View style={{ gap: 10, marginTop: 5 }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.productInformationLabel}>Bao gồm</Text>
                        <Text style={styles.productInformationText}
                        >{product.package_content}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.productInformationLabel}>Tình trạng</Text>
                        <Text style={styles.productInformationText}
                        >{product.condition}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.productInformationLabel}>Danh mục</Text>
                        <Text style={styles.productInformationText}
                        >{product.category}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.productInformationLabel}>Chất liệu</Text>
                        <Text style={styles.productInformationText}
                        >{product.material}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.productInformationLabel}>Xuất xứ</Text>
                        <Text style={styles.productInformationText}
                        >{product.origin}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.productInformationLabel}>Kích thước</Text>
                        <Text style={styles.productInformationText}
                        >{product.dimension}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.productInformationLabel}>Khối lượng</Text>
                        <Text style={styles.productInformationText}
                        >{product.weight} kg</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.productInformationLabel}>Đóng gói</Text>
                        <Text style={styles.productInformationText}
                        >{product.package_method}</Text>
                    </View>
                </View>
            </View>

            {/* Item description section */}
            <View style={{
                paddingHorizontal: 15,
                gap: 10,
                marginVertical: 10
            }}>
                <Text style={{
                    color: 'black',
                    fontFamily: 'OpenSans-Bold',
                    fontSize: fontSizes.h2
                }}>Thông tin thêm từ người bán</Text>
                <TouchableOpacity style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                    onPress={() => navigate('ListingDescription', { product_id: product.name })}>
                    <View style={{
                        flex: 1,
                        gap: 10
                    }}>
                        <Text
                            numberOfLines={3}
                            ellipsizeMode='tail'
                            style={{
                                color: 'black',
                                fontFamily: 'OpenSans-Medium',
                                fontSize: fontSizes.h4
                            }}
                        >{product.description}</Text>
                        <Text style={{
                            color: 'black',
                            fontFamily: 'OpenSans-Medium',
                            fontSize: fontSizes.h4,
                            textDecorationLine: 'underline'
                        }}
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
                <Text style={{
                    color: 'black',
                    fontFamily: 'OpenSans-Bold',
                    fontSize: fontSizes.h2
                }}>Vận chuyển, đổi trả và thanh toán</Text>
                <TouchableOpacity style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                    onPress={() => setShippingModalVisible(!shippingModalVisible)}>
                    <View style={{ gap: 10, flex: 1 }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.productInformationLabel}>Giao dự kiến</Text>
                            <View style={{ flex: 3, gap: 5 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Thứ 2, 2 tháng 10 2023</Text>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Từ {product.seller.seller_address}</Text>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Thông qua Giao hàng nhanh</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.productInformationLabel}>Đổi trả</Text>
                            <View style={{ flex: 3, gap: 5 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Trong vòng 30 ngày</Text>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Người mua trả phí vận chuyển</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.productInformationLabel}>Thanh toán</Text>
                            <View style={{ flex: 3, gap: 5 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Ví PAH, Zalopay, COD</Text>
                            </View>
                        </View>
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
                <Text style={{
                    color: 'black',
                    fontFamily: 'OpenSans-Bold',
                    fontSize: fontSizes.h2
                }}>Về người bán</Text>
                <View style={{ gap: 10, marginTop: 5 }}>
                    <TouchableOpacity onPress={() => navigate('Profile', { user_id: product.seller.seller_name })}>
                        <View style={{
                            flexDirection: 'row',
                            gap: 15
                        }}>
                            <Image source={{ uri: product.seller.seller_avatar }}
                                style={{
                                    resizeMode: 'cover',
                                    width: 80,
                                    height: 80,
                                    borderRadius: 50
                                }} />
                            <View style={{ gap: 2 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5
                                }}>{product.seller.seller_name}</Text>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5
                                }}>{product.seller.seller_address}</Text>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5
                                }}>Đánh giá: 5</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 15,
                            gap: 10
                        }}>
                            <IconFeather name='calendar' size={20} color='black' />
                            <Text style={{
                                color: 'black',
                                fontFamily: 'OpenSans-Medium',
                                fontSize: fontSizes.h4
                            }}>Tham gia ngày 12/8/2023</Text>
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
                <Text style={{
                    color: 'black',
                    fontFamily: 'OpenSans-Bold',
                    fontSize: fontSizes.h2
                }}>Phản hồi về sản phẩm</Text>
                <View style={{ marginTop: 5 }}>
                    {(Array.isArray(product.feedbacks) && product.feedbacks.length) ? <View>
                        {product.feedbacks.map((feedback, index) =>
                            <View key={feedback.id} style={{
                                marginBottom: 15
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        color: colors.darkGreyText,
                                        fontFamily: 'OpenSans-Medium',
                                        fontSize: fontSizes.h5
                                    }}>{feedback.user_name}</Text>
                                    <Text style={{
                                        color: colors.darkGreyText,
                                        fontFamily: 'OpenSans-Medium',
                                        fontSize: fontSizes.h5
                                    }}> - 1 tháng trước</Text>
                                </View>
                                <Text style={{
                                    color: colors.greyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5
                                }}>Đánh giá: {feedback.star} sao</Text>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                    marginVertical: 15,
                                }}>{feedback.content}</Text>
                                {index != (product.feedbacks.length - 1) && <View style={styles.separator}></View>}
                            </View>)}
                        <TouchableOpacity style={styles.secondaryButton}
                            onPress={() => navigate('ListingFeedback', { product_id: product.name })}>
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
                <View style={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25
                }}>
                    {/* Seller modal title */}
                    <Text style={{
                        color: 'black',
                        fontSize: fontSizes.h3,
                        fontFamily: 'OpenSans-Bold',
                        marginLeft: 20,
                        marginVertical: 20
                    }}>Thông tin người bán</Text>

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
                                    style={{
                                        resizeMode: 'cover',
                                        width: 80,
                                        height: 80,
                                        borderRadius: 50
                                    }} />
                                <View style={{ gap: 2 }}>
                                    <Text style={{
                                        color: 'black',
                                        fontFamily: 'OpenSans-Medium',
                                        fontSize: fontSizes.h5
                                    }}>{product.seller.seller_name}</Text>
                                    <Text style={{
                                        color: colors.darkGreyText,
                                        fontFamily: 'OpenSans-Medium',
                                        fontSize: fontSizes.h5
                                    }}>{product.seller.seller_address}</Text>
                                    <Text style={{
                                        color: colors.darkGreyText,
                                        fontFamily: 'OpenSans-Medium',
                                        fontSize: fontSizes.h5
                                    }}>Đánh giá: 5</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 15,
                                gap: 10
                            }}>
                                <IconFeather name='calendar' size={20} color='black' />
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4
                                }}>Tham gia ngày 12/8/2023</Text>
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
                <View style={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25
                }}>
                    {/* Shipping modal title */}
                    <Text style={{
                        color: 'black',
                        fontSize: fontSizes.h3,
                        fontFamily: 'OpenSans-Bold',
                        marginLeft: 20,
                        marginVertical: 20
                    }}>Giao hàng, đổi trả và thanh toán</Text>

                    {/* Shipping information */}
                    <View style={{
                        gap: 10,
                        marginHorizontal: 20,
                        marginBottom: 30
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.productInformationLabel}>Giao dự kiến</Text>
                            <View style={{ flex: 3, gap: 5 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Thứ 2, 2 tháng 10 2023</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.productInformationLabel}>Giao từ</Text>
                            <View style={{ flex: 3, gap: 5 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >{product.seller.seller_address}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.productInformationLabel}>Giao đến</Text>
                            <View style={{ flex: 3, gap: 5 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Địa chỉ mặc định hoặc không có</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.productInformationLabel}>Đổi trả</Text>
                            <View style={{ flex: 3, gap: 5 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Trong vòng 30 ngày</Text>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Người mua trả phí vận chuyển</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.productInformationLabel}>Thanh toán</Text>
                            <View style={{ flex: 3, gap: 5 }}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h4,
                                }}
                                >Ví PAH, Zalopay, COD</Text>
                            </View>
                        </View>
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
        fontFamily: 'OpenSans-Bold',
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
        fontFamily: 'OpenSans-Bold',
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
        fontFamily: 'OpenSans-Medium',
        color: colors.primary,
        textAlign: 'center'
    },
    productInformationLabel: {
        color: colors.darkGreyText,
        fontFamily: 'OpenSans-Medium',
        fontSize: fontSizes.h4,
        flex: 2
    },
    productInformationText: {
        color: 'black',
        fontFamily: 'OpenSans-Medium',
        fontSize: fontSizes.h4,
        flex: 3
    },
    emptyText: {
        color: colors.greyText,
        fontSize: fontSizes.h4,
        textAlign: 'center',
        fontFamily: 'OpenSans-Medium',
        marginVertical: 30
    }
});

export default ListingDetail;