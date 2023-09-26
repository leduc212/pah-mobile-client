import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { colors, fontSizes } from '../constants';
import TimeLeft from './TimeLeft';

function HomeItemCard(props) {
    const { item, onPress } = props;
    const { name, url, price, closedTime } = item;

    return <TouchableOpacity
        onPress={onPress}
        style={{
            alignItems: 'center'
        }}>
        <Image source={{ uri: url }}
            style={styles.itemImage} />
        <Text numberOfLines={3}
            ellipsizeMode='tail'
            style={styles.itemTitle}>{name}</Text>
        <Text numberOfLines={2}
            ellipsizeMode='tail'
            style={styles.itemPrice}>{price} VND</Text>
        {closedTime != undefined && <TimeLeft closedTime={closedTime}/>}
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
        height: 60,
        color: 'black',
        fontFamily: 'OpenSans-Medium',
        fontSize: fontSizes.h5
    },
    itemPrice: {
        width: 150,
        color: 'black',
        fontFamily: 'OpenSans-Bold',
        fontSize: fontSizes.h2
    }
})

export default HomeItemCard;