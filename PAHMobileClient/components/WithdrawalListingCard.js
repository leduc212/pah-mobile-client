import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, enumConstants, fontSizes, fonts, images} from '../constants';
import {numberWithCommas} from '../utilities/PriceFormat';
import IconFeather from 'react-native-vector-icons/Feather';
import { withdrawalStatusText } from '../utilities/WithdrawalStatus';
import moment from 'moment';

function WithdrawalListingCard(props) {
  const {withdrawal, onPress, index} = props;
  const {amount, bank, status} = withdrawal;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: index % 2 ? colors.darkGrey : null,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
      }}
      onPress={onPress}>
      <Image
        source={
          type == 1
            ? images.pendingImage
            : type == 2
            ? images.doneImage
            : type == 3
            ? images.rejectImage
            : null
        }
        style={{
          resizeMode: 'contain',
          height: 50,
          flex: 15,
          marginEnd: 15,
        }}
      />
      <View
        style={{
          flex: 85,
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: colors.black,
            fontFamily: fonts.MontserratMedium,
            fontSize: fontSizes.h4,
            marginBottom: 5,
          }}>
          {withdrawalStatusText(status)}
        </Text>
        <Text
          style={{
            color: colors.greyText,
            fontFamily: fonts.MontserratMedium,
            fontSize: fontSizes.h6,
            marginBottom: 5,
          }}>
          {bank}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: colors.greyText,
              fontFamily: fonts.MontserratMedium,
              fontSize: fontSizes.h6,
              marginBottom: 5,
            }}>
            Số tiền giao dịch:
          </Text>
          <Text
            style={{
              color: colors.greyText,
              fontFamily: fonts.MontserratMedium,
              fontSize: fontSizes.h6,
              marginBottom: 5,
              alignContent:'center'
            }}>
            {type == 1 || type == 4 ? (
              <IconFeather name="plus" size={10} />
            ) : (
              <IconFeather name="minus" size={10} />
            )}
            <Text>{numberWithCommas(amount)} ₫</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default WithdrawalListingCard;
