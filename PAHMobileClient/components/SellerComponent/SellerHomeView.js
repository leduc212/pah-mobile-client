import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, fontSizes, fonts, roles} from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFoundation from 'react-native-vector-icons/Foundation';

function SellerHomeView(props) {
 // Navigation
 const {navigation, route} = props;

 // Function of navigate to/back
 const {navigate, goBack} = navigation;
  return (
    <View>
      {/* list item button */}
      <TouchableOpacity
        onPress={() => {
          navigate('ProductListing');
        }}
        style={styles.listItemButtonStyle}>
        <Text
          style={{
            fontSize: fontSizes.h4,
            color: 'white',
            fontFamily: fonts.OpenSansBold,
          }}>
          Đăng bán sản phẩm
        </Text>
      </TouchableOpacity>
      {/* total money */}
      <View style={styles.totalMoneyStyle}>
        <Text style={styles.totalTextStyle}>12.000.000 VNĐ</Text>
        <Text style={styles.subtotalTextStyle}>Tổng 90 ngày</Text>
      </View>
      {/* selling status */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            flex: 1
          }}>
          <Text style={styles.statStyle}>801</Text>
          <Text style={styles.statTitleStyle}>Sản phẩm đang bán</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1
          }}>
          <Text style={styles.statStyle}>251</Text>
          <Text style={styles.statTitleStyle}>Đơn đang xử lý</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1
          }}>
          <Text style={styles.statStyle}>250</Text>
          <Text style={styles.statTitleStyle}>Đơn đã bán</Text>
        </View>
      </View>
      {/* summary section */}
      <TouchableOpacity
        style={{
          backgroundColor: colors.darkGrey,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          gap: 15,
          marginTop: 20,
          marginHorizontal: 10,
        }}>
        <IconFoundation name="info" size={30} color={colors.primary} />
        <View>
          <Text
            style={{
              fontSize: fontSizes.h5,
              color: colors.black,
              fontFamily: fonts.OpenSansBold,
            }}>
            Ví PAH
          </Text>
          <Text
            style={{
              fontSize: fontSizes.h5,
              color: colors.black,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Số dư khả dụng: 11.000.000 VNĐ
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          gap: 15,
          marginTop: 5,
        }}>
        <View>
          <Text
            style={{
              fontSize: fontSizes.h3,
              color: colors.black,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Hồ sơ người bán
          </Text>
        </View>
        <IconFeather
          position="absolute"
          right={5}
          name="chevron-right"
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          gap: 15,
          marginTop: 5,
        }}>
        <View>
          <Text
            style={{
              fontSize: fontSizes.h3,
              color: colors.black,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Sản phẩm đang bán
          </Text>
        </View>
        <IconFeather
          position="absolute"
          right={5}
          name="chevron-right"
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          gap: 15,
          marginTop: 5,
        }}>
        <View>
          <Text
            style={{
              fontSize: fontSizes.h3,
              color: colors.black,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Các cuộc đấu giá
          </Text>
        </View>
        <IconFeather
          position="absolute"
          right={5}
          name="chevron-right"
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{
        navigate('SellerOrderList')
      }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          gap: 15,
          marginTop: 5,
        }}>
        <View>
          <Text
            style={{
              fontSize: fontSizes.h3,
              color: colors.black,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Đơn hàng
          </Text>
        </View>
        <IconFeather
          position="absolute"
          right={5}
          name="chevron-right"
          size={40}
        />
      </TouchableOpacity>
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
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
  titleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  separator: {
    height: 1.5,
    backgroundColor: colors.darkGreyText,
    marginRight: 10,
  },
  listItemButtonStyle: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 15,
    marginHorizontal:15
  },
  totalMoneyStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  totalTextStyle: {
    fontSize: fontSizes.h1 * 1.5,
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
  },
  subtotalTextStyle: {
    fontSize: fontSizes.h6,
    color: colors.darkGreyText,
    fontFamily: fonts.OpenSansMedium,
  },
  statStyle: {
    fontSize: fontSizes.h1 * 1.5,
    color: colors.primary,
    fontFamily: fonts.OpenSansMedium,
  },
  statTitleStyle: {
    fontSize: fontSizes.h6,
    color: colors.darkGreyText,
    fontFamily: fonts.OpenSansMedium,
  },
});
export default SellerHomeView;
