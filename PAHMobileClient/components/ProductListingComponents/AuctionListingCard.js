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
    const { auction, onPress } = props;
    const { title, imageUrl = 'https://media.loveitopcdn.com/25808/thumb/img09357-copy.jpg', currentPrice, endedAt } = auction;

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
                    }}>{title}</Text>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={{
                        color: 'black',
                        fontFamily: fonts.OpenSansBold,
                        fontSize: fontSizes.h2
                    }}>{numberWithCommas(currentPrice)} VNĐ</Text>
                <Text
                    style={{
                        color: colors.darkGreyText,
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h5
                    }}>Thành phố Hồ Chí Minh</Text>
                {endedAt != undefined && <TimeLeft width={200} closedTime={endedAt} />}
            </View>
        </TouchableOpacity>
    </View>
}

export default AuctionListingCard;