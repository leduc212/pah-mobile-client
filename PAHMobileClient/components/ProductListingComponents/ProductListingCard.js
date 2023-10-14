import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { colors, fontSizes, fonts, images } from '../../constants';
import { numberWithCommas } from '../../utilities/PriceFormat';

function ProductListingCard(props) {
    const { product, onPress } = props;
    const { name, imageUrl = images.defaultAvatar, price } = product;

    return <View style={{
        paddingHorizontal: 15
    }}>
        <View style={{
            height: 1.2,
            backgroundColor: colors.darkGrey,
            marginTop: 10,
            marginBottom: 15
        }}></View>
        <TouchableOpacity style={{
            flexDirection: 'row'
        }}
            onPress={onPress}
        >
            <Image source={{ uri: imageUrl }}
                style={{
                    resizeMode: 'cover',
                    width: 150,
                    height: 150,
                    borderRadius: 25
                }} />
            <View style={{
                flex: 1,
                marginLeft: 15
            }}>
                <Text
                    numberOfLines={3}
                    ellipsizeMode='tail'
                    style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h3,
                        marginBottom: 5
                    }}>{name}</Text>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansBold,
                        fontSize: fontSizes.h2
                    }}>{numberWithCommas(price)} VNĐ</Text>
                <Text
                    style={{
                        color: colors.darkGreyText,
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h5
                    }}>Thành phố Hồ Chí Minh</Text>
            </View>
        </TouchableOpacity>
    </View>
}

export default ProductListingCard;