import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { colors, fontSizes, fonts } from '../../constants';

function HomeCategoryCard(props) {
    const { item, onPress } = props;
    const { name, imageUrl } = item;

    return <TouchableOpacity
        onPress={onPress}
        style={{
            alignItems: 'center'
        }}>
        <Image source={{ uri: imageUrl }}
            style={styles.itemImage} />
        <Text numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.itemTitle}>{name}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    itemImage: {
        width: 100,
        height: 100,
        margin: 10,
        resizeMode: 'cover',
        borderRadius: 50
    },
    itemTitle: {
        width: 100,
        height: 20,
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h5,
        textAlign: 'center'
    }
})

export default HomeCategoryCard;