import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { colors, fontSizes, fonts } from '../constants';
import moment from 'moment';
import "moment/min/locales";

function TimeLeft(props) {
    const { closedTime, width = 150 } = props;
    moment.locale('vi');
    const [timeLeft, setTimeLeft] = useState(moment(closedTime).fromNow());
    const timeText = moment(closedTime).isBefore(moment()) ? 'Đã kết thúc' : 'Kết thúc trong';


    useEffect(() => {
        setInterval(() => {
            setTimeLeft(moment(closedTime).fromNow());
        }, 1000)
    }, []);

    return <Text numberOfLines={2}
        ellipsizeMode='tail'
        style={[styles.itemDateLeft, {
            width: width
        }]}>{timeText} {timeLeft}</Text>
}

const styles = StyleSheet.create({
    itemDateLeft: {
        color: colors.darkGreyText,
        fontFamily: fonts.OpenSansMedium,
        fontSize: fontSizes.h6
    }
})

export default TimeLeft