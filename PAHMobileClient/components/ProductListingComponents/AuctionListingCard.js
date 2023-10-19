import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { colors, fontSizes, fonts } from '../../constants';
import TimeLeft from '../TimeLeft';
import { numberWithCommas } from '../../utilities/PriceFormat';
function AuctionListingCard(props) {
    const { auction, onPress, index } = props;
    const { title, imageUrl = 'https://media.loveitopcdn.com/25808/thumb/img09357-copy.jpg', startingPrice, registrationEnd } = auction;

    return <View style={{
        paddingHorizontal: 15
    }}>
        {index != 0 && <View style={{
            height: 1.2,
            backgroundColor: colors.darkGrey,
            marginTop: 10,
            marginBottom: 15
        }}></View>}
        <TouchableOpacity style={{
            flexDirection: 'row'
        }}
            onPress={onPress}
        >
            <Image source={{ uri: imageUrl }}
                style={{
                    resizeMode: 'cover',
                    width: 140,
                    height: 140,
                    borderRadius: 5
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
                        fontFamily: fonts.MontserratMedium,
                        fontSize: fontSizes.h4,
                        marginBottom: 5
                    }}>{title}</Text>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={{
                        color: colors.primary,
                        fontFamily: fonts.MontserratMedium,
                        fontSize: fontSizes.h3,
                        marginBottom: 5
                    }}>₫{numberWithCommas(startingPrice)}</Text>
                {registrationEnd != undefined && <TimeLeft prefixText={'Đóng đăng ký trong'} width={200} closedTime={registrationEnd} />}
            </View>
        </TouchableOpacity>
    </View>
}

export default AuctionListingCard;