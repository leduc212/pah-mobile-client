import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';

function CheckoutCart(props) {
    // Get product_id from routes
    const { product_id } = props.route.params;

    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Data
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

    return <View style={styles.container}>
        {/* Fixed screen title: Cart */}
        <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.iconButton}
                onPress={() => {
                    goBack()
                }}>
                <IconFeather name='x' size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Thanh toán</Text>
        </View>

        {/* Description */}
        <ScrollView style={{
            paddingHorizontal: 15
        }}>
            <Text style={styles.descriptionText}>{description}</Text>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    iconButton: {
        padding: 12,
        borderRadius: 50
    },
    titleContainer: {
        height: 70,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 10,
        alignItems: 'center'
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
        height: 1.5,
        backgroundColor: colors.darkGreyText,
        marginRight: 10
    },
    descriptionText: {
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h3,
        alignSelf: 'center'
    }
});

export default CheckoutCart;