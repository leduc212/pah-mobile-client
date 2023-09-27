import React, {Component} from 'react';
import {Image, TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors, fontSizes, images} from '../constants';

function UIHeader(props) {
  const {
    title,
    leftIconName,
    rightIconName,
    onPressLeftIcon,
    onPressRightIcon,
  } = props;
  return (
    <View
      style={{
        backgroundColor: colors.darkGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {leftIconName != undefined ? (
        <Icon
          name={leftIconName}
          style={{paddingHorizontal: 15}}
          size={23}
          color={'black'}
          onPress={onPressLeftIcon}
        />
      ) : (
        <View style={{width: 50, height: 50}} />
      )}
      <Text
        style={{
          color: colors.black,
          fontFamily: 'OpenSans-Medium',
          fontWeight: 'bold',
          fontSize: fontSizes.h3,
        }}>
        {title}
      </Text>
      {rightIconName != undefined ? (
        <Icon
          name={rightIconName}
          style={{padding: 1}}
          size={18}
          color={'white'}
          onPress={onPressRightIcon}
        />
      ) : (
        <View style={{width: 50, height: 50}} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconButton: {
    backgroundColor: colors.grey,
    padding: 12,
    borderRadius: 50,
  },
  loginButton: {
    borderWidth: 1.2,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: fontSizes.h3,
    fontFamily: 'OpenSans-Medium',
    color: colors.primary,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  logoImage: {
    resizeMode: 'cover',
    height: 35,
    width: 70,
    alignSelf: 'center',
  },
  headerLayout: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: 'black',
    fontSize: fontSizes.h2,
    fontFamily: 'OpenSans-Bold',
  },
  headerSubText: {
    color: colors.greyText,
    fontSize: fontSizes.h5,
    fontFamily: 'OpenSans-Medium',
    textDecorationLine: 'underline',
  },
  emptyText: {
    color: colors.greyText,
    fontSize: fontSizes.h4,
    textAlign: 'center',
    fontFamily: 'OpenSans-Medium',
    marginVertical: 30,
  },
});
export default UIHeader;
