import React, {Component} from 'react'
import {
    TouchableOpacity, 
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {colors,fontSizes} from '../constants'

function UIRadioButton(props) {
    const {onPress,subtitle, title, isSelected,flex} = props
    return <TouchableOpacity
        onPress={onPress}
        style={{
            flex:flex,
            flexDirection:"row",
            borderColor: 'white',
            borderWidth: 1,
            height: 30,

            paddingHorizontal:10,
            marginBottom:2,
            //justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isSelected == true ? null: "#DDDDDD"
        }}>
        {isSelected == false && <Icon
            size={20}
            name={"circle"} style={{
                color: 'black',
                position: 'relative',
                
            }} />}
            {isSelected == true && <Icon
            size={20}
            name={"dot-circle"} style={{
                color: 'black',
                position: 'relative',
            }} />}
        <Text style={{
            color: colors.black,
            fontWeight:'bold',
            fontSize:fontSizes.h3,
            marginStart:10,
        }}>{title}</Text>
        <Text style={{
            color: colors.black,
            fontSize:fontSizes.h4,
            marginStart:5,
        }}>{subtitle}</Text>
    </TouchableOpacity>
}
export default UIRadioButton