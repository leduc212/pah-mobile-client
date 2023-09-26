import React, {Component} from 'react'
import {
    TouchableOpacity, 
    Text,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {colors, fontSizes} from '../constants'

function UIHeader(props) {
    const {
        title, 
        leftIconName,
        rightIconName,
        onPressLeftIcon,
        onPressRightIcon
    } = props
    return <View style={{
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        {leftIconName != undefined ? <Icon            
            name={leftIconName}
            style={{ paddingHorizontal: 15 }}
            size={23} color={'white'}
            onPress={onPressLeftIcon}
        /> : <View style={{width: 50, height: 50 }}/>}
        <Text style={{
            fontSize: fontSizes.h3,
            alignSelf:'center',
            color: 'white'
        }}>{title}</Text>
        {rightIconName != undefined ? <Icon            
            name={rightIconName}
            style={{ padding: 1 }}
            size={18} color={'white'}
            onPress={onPressRightIcon}
        /> : <View style={{width: 50, height: 50, }}/>}        
    </View>
}
export default UIHeader