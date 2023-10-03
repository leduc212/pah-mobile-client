import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import { colors, fontSizes, fonts } from '../../constants';
import TimeLeft from '../TimeLeft';

function BidHistoryItem(props) {
    const { bid } = props;

    return <View key={bid.id}>
        <View style={{
            flexDirection: 'row',
            marginVertical: 5
        }}>
            <View style={{ flex: 5 }}>
                <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h4
                }}>{bid.bid_amount} VNĐ</Text>
                <Text style={{
                    color: colors.darkGreyText,
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h4
                }}>{bid.user.name}</Text>
            </View>
            <View style={{ flex: 4, flexDirection: 'row' }}>
                <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h4
                }}>Đặt</Text>
                <TimeLeft showText={false} closedTime={bid.bid_date}
                    textStyle={{
                        color: 'black',
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h4
                    }} />
            </View>
        </View>
        <View style={styles.separator}></View>
    </View>
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: colors.darkGrey,
        marginRight: 10
    },
    feedbackLabel: {
        color: colors.darkGreyText,
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h5
    },
    feedbackContent: {
        color: 'black',
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h4,
        marginVertical: 15,
    }
})

export default BidHistoryItem