import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, enumConstants, fontSizes, fonts, images} from '../../constants';
import {numberWithCommas} from '../../utilities/PriceFormat';
import {transactionTypeText} from '../../utilities/TransactionType';

function TransactionListingCard(props) {
  const {transaction, onPress, index} = props;
  const {description, amount, date, type} = transaction;
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: index % 2 ? colors.darkGrey : null,
          paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: 'row',
        }}
        onPress={onPress}>
        <Image
          source={
            type == 1
              ? images.depositImage
              : type == 2
              ? images.withdrawImage
              : type == 3
              ? images.paymentImage
              : images.refundImage
          }
          style={{
            resizeMode: 'cover',
            width: 50,
            height: 50,
            borderRadius: 5,
          }}
        />
        <View>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{
              color: colors.black,
              fontFamily: fonts.MontserratMedium,
              fontSize: fontSizes.h4,
              marginBottom: 5,
            }}>
            {description}
          </Text>
          <Text
            style={{
              color: colors.greyText,
              fontFamily: fonts.MontserratMedium,
              fontSize: fontSizes.h6,
              marginBottom: 5,
            }}>
            {date}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: colors.greyText,
                fontFamily: fonts.MontserratMedium,
                fontSize: fontSizes.h6,
                marginBottom: 5,
              }}>
              Số dư ví:100.000 ₫
            </Text>
            <Text
              style={{
                color: colors.greyText,
                fontFamily: fonts.MontserratMedium,
                fontSize: fontSizes.h6,
                marginBottom: 5,
              }}>
              {numberWithCommas(amount)} ₫
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default TransactionListingCard;
