import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import { colors, fontSizes, fonts } from '../../constants';

function ListingDetailFeedback(props) {
    const { feedback, index, length } = props;

    return <View key={feedback.id} style={{
        marginBottom: 15
    }}>
        <View style={{
            flexDirection: 'row'
        }}>
            <Text style={styles.feedbackLabel}>{feedback.user_name}</Text>
            <Text style={styles.feedbackLabel}> - 1 tháng trước</Text>
        </View>
        <Text style={styles.feedbackLabel}>Đánh giá: {feedback.star} sao</Text>
        <Text style={styles.feedbackContent}>{feedback.content}</Text>
        {index != length && <View style={styles.separator}></View>}
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

export default ListingDetailFeedback