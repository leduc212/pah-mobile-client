import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {  fontSizes, fonts, images } from '../../constants';
import TimeLeft from '../TimeLeft';
import { numberWithCommas } from '../../utilities/PriceFormat';

function HomeAuctionCard(props) {
    const { item, onPress } = props;
    const { title, endedAt, currentPrice, imageUrl = images.defaultAvatar } = item;

    return <TouchableOpacity
        onPress={onPress}
        style={{
            alignItems: 'center'
        }}>
        <Image source={{ uri: imageUrl }}
            style={styles.itemImage} />
        <Text numberOfLines={2}
            ellipsizeMode='tail'
            style={styles.itemTitle}>{title}</Text>
        <Text numberOfLines={2}
            ellipsizeMode='tail'
            style={styles.itemPrice}>{numberWithCommas(currentPrice)} VND</Text>
        {endedAt != undefined && <TimeLeft width={150} closedTime={endedAt} />}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    itemImage: {
        width: 150,
        height: 150,
        margin: 5,
        resizeMode: 'cover',
        borderRadius: 20
    },
    itemTitle: {
        width: 150,
        height: 45,
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h4
    },
    itemPrice: {
        width: 150,
        color: 'black',
        fontFamily: fonts.OpenSansBold,
        fontSize: fontSizes.h2
    }
})

export default HomeAuctionCard;