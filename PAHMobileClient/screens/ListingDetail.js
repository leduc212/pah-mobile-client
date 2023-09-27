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

function ListingDetail(props) {
    // Get product_id from routes
    const { product_id } = props.route.params;

    const [product, setProduct] = useState({
        name: 'New Basic Stussy Mens Black/White L/S Tee T Shirt Size Medium',
        price: '553,658',
        images: [
            'https://i.ebayimg.com/images/g/SqQAAOSw9w9jYyqQ/s-l1600.jpg',
            'https://i.ebayimg.com/images/g/r-YAAOSwe4Vk63Ai/s-l1600.jpg',
            'https://i.ebayimg.com/images/g/PeoAAOSwiFFesyqM/s-l1600.jpg',
            'https://i.ebayimg.com/images/g/fIUAAOSwmnFk2PPY/s-l1600.jpg'
        ],
        seller: {
            seller_name: 'avd seller',
            seller_address: 'Thành phố Hồ Chí Minh'
        }
    });

    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

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
            <SliderBox images={product.images}
                sliderBoxHeight={480}
                dotColor={colors.primary}
                inactiveDotColor='#90A4AE'/>
        </ScrollView>
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
        height: 1.5,
        backgroundColor: colors.darkGreyText,
        marginRight: 10
    },
    iconButton: {
        backgroundColor: colors.grey,
        padding: 12,
        borderRadius: 50
    },
});

export default ListingDetail;