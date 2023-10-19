import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';
import { colors, fontSizes, fonts } from '../../constants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

function ProductPricing(props) {
  const { price, setPrice, type, setType, setPricingMode, startedAt, setStartedAt, endedAt, setEndedAt } = props;
  const [enableAuction, setEnableAuction] = useState(false);
  const [enableBuy, setEnableBuy] = useState(true);

  // Datepicker
  const [openDatePickerStartedAt, setOpenDatePickerStartedAt] = useState(false);
  const [openDatePickerEndedAt, setOpenDatePickerEndedAt] = useState(false);

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
              fontFamily: fonts.MontserratMedium,
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
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={
                  enableAuction ? colors.primary : colors.darkGreyText
                }
                onValueChange={() => {
                  setEnableAuction(true);
                  setEnableBuy(false);
                  setType(2);
                }}
                value={enableAuction}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: colors.darkGreyText,
              fontSize: fontSizes.h5,
              fontFamily: fonts.MontserratMedium,
            }}>
            Hãy đặt giá thầu và để người mua cạnh tranh cho sản phẩm của bạn
          </Text>
        </View>
        {/* Buy now */}
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
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={enableBuy ? colors.primary : colors.darkGreyText}
                onValueChange={() => {
                  setEnableAuction(false);
                  setEnableBuy(true);
                  setType(1);
                }}
                value={enableBuy}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: colors.darkGreyText,
              fontSize: fontSizes.h5,
              fontFamily: fonts.MontserratMedium,
            }}>
            Người mua có thể mua ngay với giá này
          </Text>
        </View>

        {/* Section */}
        <View>
          <Text style={styles.titleSection}>Thông tin thêm</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: 150,
                color: colors.black,
                fontSize: fontSizes.h4,
                fontFamily: fonts.MontserratMedium,
              }}>
              {type == 1 ? 'Giá' : 'Giá khởi điểm'}
            </Text>
            <TextInput
              value={price}
              onChangeText={text => {
                setPrice(text);
              }}
              keyboardType="numeric"
              placeholder="Nhập tại đây"
              style={{
                width: 130,
                borderColor: colors.black,
                marginStart: 20,
                color: colors.black,
                fontSize: fontSizes.h4,
                fontFamily: fonts.MontserratMedium,
                paddingStart: 0
              }}
            />
            <Text
              style={{
                color: colors.black,
                fontSize: fontSizes.h4,
                fontFamily: fonts.MontserratMedium,
              }}>
              VNĐ
            </Text>
          </View>

          {type == 2 &&
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: 150,
                    color: colors.black,
                    fontSize: fontSizes.h4,
                    fontFamily: fonts.MontserratMedium,
                  }}>
                  Ngày bắt đầu
                </Text>
                <TouchableOpacity onPress={() => {
                  setOpenDatePickerStartedAt(true);
                }}>
                  <Text style={{
                    borderColor: colors.black,
                    color: colors.black,
                    marginStart: 20,
                    fontSize: fontSizes.h4,
                    fontFamily: fonts.MontserratMedium,
                  }}>{startedAt == 0 ? 'Chọn ngày bắt đầu' : moment(startedAt).format('DD/MM/YYYY, HH:mm')}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode={'datetime'}
                  open={openDatePickerStartedAt}
                  date={new Date(startedAt)}
                  minimumDate={new Date()}
                  onConfirm={newDate => {
                    setStartedAt(newDate);
                    setOpenDatePickerStartedAt(false);
                  }}
                  onCancel={() => {
                    setOpenDatePickerStartedAt(false);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: 150,
                    color: colors.black,
                    fontSize: fontSizes.h4,
                    fontFamily: fonts.MontserratMedium,
                  }}>
                  Ngày kết thúc
                </Text>
                <TouchableOpacity onPress={() => {
                  setOpenDatePickerEndedAt(true);
                }}>
                  <Text style={{
                    borderColor: colors.black,
                    color: colors.black,
                    marginStart: 20,
                    fontSize: fontSizes.h4,
                    fontFamily: fonts.MontserratMedium,
                  }}>{endedAt == 0 ? 'Chọn ngày kết thúc' : moment(endedAt).format('DD/MM/YYYY, HH:mm')}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode={'datetime'}
                  open={openDatePickerEndedAt}
                  date={new Date(endedAt)}
                  minimumDate={new Date(startedAt)}
                  onConfirm={newDate => {
                    setEndedAt(newDate);
                    setOpenDatePickerEndedAt(false);
                  }}
                  onCancel={() => {
                    setOpenDatePickerEndedAt(false);
                  }}
                />
              </View>
            </View>
          }
        </View>

        {/* Accept button */}
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
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: fonts.MontserratMedium,
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
    borderRadius: 5,
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
    fontFamily: fonts.MontserratBold,
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
    paddingBottom: 15,
  },
  titleSection: {
    marginTop: 10,
    color: colors.black,
    fontFamily: fonts.MontserratBold,
    fontSize: fontSizes.h3,
  },
  detailTextSection: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  dropdown: {
    height: 50,
    borderColor: colors.black,
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    color: colors.darkGreyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  selectedTextStyle: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  inputSearchStyle: {
    color: colors.darkGreyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  itemTextStyle: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },

});
export default ProductPricing;
