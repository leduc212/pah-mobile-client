import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { colors, fontSizes, images } from '../constants';

function ProductListingCard(props) {
    const { product, onPress } = props;
    const { name, url, price } = product;

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
            <Image source={{ uri: url }}
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
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h5,
                        height: 60
                    }}>{name}</Text>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={{
                        color: 'black',
                        fontFamily: 'OpenSans-Bold',
                        fontSize: fontSizes.h2
                    }}>{price} VNĐ</Text>
                <Text
                    style={{
                        color: colors.darkGreyText,
                        fontFamily: 'OpenSans-Medium',
                        fontSize: fontSizes.h6
                    }}>Thành phố Hồ Chí Minh</Text>
            </View>
        </TouchableOpacity>
    </View>
}

export default ProductListingCard;