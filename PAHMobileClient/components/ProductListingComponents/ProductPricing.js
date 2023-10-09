import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Image,
  TextInput,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, fontSizes, fonts, roles} from '../../constants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';

function ProductPricing(props) {
  const {product, setProduct, setPricingMode} = props;
  const [enableAuction, setEnableAuction] = useState(false);
  const [enableBuy, setEnableBuy] = useState(true);
  return (
    <KeyboardAvoidingView style={styles.container}>
      {/*Fixed screen title */}
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            setPricingMode(false);
          }}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: fonts.OpenSansMedium,
              fontSize: fontSizes.h3,
              alignSelf: 'center',
            }}>
            Hủy
          </Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>Định giá</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            alert('faq');
          }}>
          <IconAntDesign
            name="questioncircleo"
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      {/* Pricing options */}
      <ScrollView>
        {/* Auction */}
        <View style={styles.sectionStyle}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.titleSection}>Đấu giá</Text>
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}>
              <Switch
                disabled={enableAuction == true}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  enableAuction ? colors.primary : colors.darkGreyText
                }
                onValueChange={() => {
                  setEnableAuction(true);
                  setEnableBuy(false);
                }}
                value={enableAuction}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: colors.darkGreyText,
              fontSize: fontSizes.h5,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Hãy đặt giá thầu và để người mua cạnh tranh cho sản phẩm của bạn
          </Text>
          <View style={{flexDirection: 'row', gap: 100}}>
            <Text
              style={{
                color: colors.darkGreyText,
                fontSize: fontSizes.h5,
                fontFamily: fonts.OpenSansMedium,
              }}>
              Giá
            </Text>
          </View>
        </View>
        {/* Buy */}
        <View style={styles.sectionStyle}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.titleSection}>Mua ngay</Text>
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}>
              <Switch
                disabled={enableBuy == true}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={enableBuy ? colors.primary : colors.darkGreyText}
                onValueChange={() => {
                  setEnableAuction(false);
                  setEnableBuy(true);
                }}
                value={enableBuy}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: colors.darkGreyText,
              fontSize: fontSizes.h5,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Người mua có thể mua ngay với giá này
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                marginTop: 20,
                color: colors.darkGreyText,
                fontSize: fontSizes.h5,
                fontFamily: fonts.OpenSansMedium,
              }}>
              Giá
            </Text>
            <View
              style={{
                marginEnd: 20,
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                VND
              </Text>
              <TextInput
                value={product.price}
                onChangeText={text => {
                  setProduct(item => {
                    return {
                      ...item,
                      price: text,
                    };
                  });
                }}
                keyboardType="numeric"
                placeholder="Nhập giá tiền"
                style={{
                  height: 40,
                  borderWidth: 1,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setPricingMode(false);
            }}
            style={{
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 15,
              padding: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: fonts.OpenSansMedium,
                fontSize: fontSizes.h3,
              }}>
              Chấp nhận
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  iconButton: {
    padding: 12,
    borderRadius: 50,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  sectionStyle: {
    borderBottomWidth: 5,
    borderColor: colors.darkGrey,
    paddingBottom: 15,
  },
  titleSection: {
    marginTop: 10,
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h3,
  },
  detailTextSection: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  dropdown: {
    height: 50,
    borderColor: colors.black,
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    color: colors.darkGreyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  selectedTextStyle: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  inputSearchStyle: {
    color: colors.darkGreyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  itemTextStyle: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },

});
export default ProductPricing;
