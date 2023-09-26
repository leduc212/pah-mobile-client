import React, {Component} from 'react'
import {
    TouchableOpacity, 
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {colors, fontSizes} from '../constants'

function UICheckButton(props) {
    const {onPress, title, isSelected,flex} = props
    return <TouchableOpacity
        onPress={onPress}
        style={{
            flex:flex,
            flexDirection:"row",
            borderColor: 'white',
            borderWidth: 1,
            height: 30,
            borderRadius: 5,
            //justifyContent: 'center',
            alignItems: 'center',
        }}>
        {isSelected == false && <Icon
            size={20}
            name={"square"} style={{
                color: 'black',
                position:'relative',
                //left: 5,
            }} />}
            {isSelected == true && <Icon
            size={20}
            name={"check-square"} style={{
                color: 'black',
                position: 'relative',
            }} />}
        <Text style={{
            color: colors.black,
            fontSize:fontSizes.h4,
            marginLeft:10
        }}>{title}</Text>
    </TouchableOpacity>
}
export default UICheckButton