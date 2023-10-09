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
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';

function ProductPricing(props) {
  const {
    product,
    setProduct,
    setPricingMode,
    duration,
    setDuration,
    entryFee,
    setEntryFee,
    step,
    setStep,
    startDate,
    setStartDate,
  } = props;
  const [isDurationFocus, setDurationFocus] = useState(false);
  //Duration
  const durationData = [
    {label: '1', value: 1},
    {label: '3', value: 3},
    {label: '5', value: 5},
    {label: '7', value: 7},
    {label: '10', value: 10},
  ];
  //Date picker
  const [openDatePicker, setOpenDatePicker] = useState(false);
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
                disabled={product.type == 2}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={product.type == 2 ? colors.primary : colors.darkGreyText}
                onValueChange={() => {
                  setProduct(item=>{
                    return{
                      ...item,
                      type:2
                    }
                  })
                }}
                value={product.type==2}
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
          <View
            style={[
              styles.auctionSectionsStyle,
              {backgroundColor: colors.darkGrey, borderRadius: 5},
            ]}>
            <Text
              style={{
                color: colors.black,
                fontSize: fontSizes.h5,
                fontFamily: fonts.OpenSansMedium,
              }}>
              Giá khởi điểm
            </Text>
            <View
              style={{
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
                placeholder="5000000"
                style={{
                  height: 40,
                  borderWidth: 1,
                }}
              />
            </View>
          </View>
          <View style={styles.auctionSectionsStyle}>
            <Text
              style={{
                color: colors.black,
                fontSize: fontSizes.h5,
                fontFamily: fonts.OpenSansMedium,
              }}>
              Phí tham gia
            </Text>
            <View
              style={{
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
                value={entryFee}
                onChangeText={text => {
                  setEntryFee(text);
                }}
                keyboardType="numeric"
                placeholder="100000"
                style={{
                  height: 40,
                  borderWidth: 1,
                }}
              />
            </View>
          </View>
          <View style={styles.auctionSectionsStyle}>
            <Text
              style={{
                color: colors.black,
                fontSize: fontSizes.h5,
                fontFamily: fonts.OpenSansMedium,
              }}>
              Bước giá
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <TextInput
                value={step}
                onChangeText={text => {
                  setStep(text);
                }}
                keyboardType="numeric"
                placeholder="5"
                style={{
                  height: 40,
                  borderWidth: 1,
                }}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                % giá thầu trước
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: colors.black,
                fontSize: fontSizes.h5,
                fontFamily: fonts.OpenSansMedium,
              }}>
              Thời gian đấu giá
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              placeholder={!isDurationFocus ? 'ngày' : '...'}
              data={durationData}
              labelField="label"
              valueField="value"
              onFocus={() => setDurationFocus(true)}
              onBlur={() => setDurationFocus(false)}
              value={duration}
              onChange={item => {
                setDuration(item.value);
                setDurationFocus(false);
              }}
            />
            <Text
              style={{
                color: colors.black,
                fontSize: fontSizes.h5,
                fontFamily: fonts.OpenSansMedium,
              }}>
              Ngày
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                Thời điểm bắt đầu
              </Text>
              <TouchableOpacity 
              onPress={()=>{
                setOpenDatePicker(true);
              }}
              style={{marginLeft: 'auto'}}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: fontSizes.h5,
                    fontFamily: fonts.OpenSansMedium,
                  }}>
                  Sửa
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{
              marginTop:10,
              justifyContent:'center',
              alignItems: 'center',
              borderWidth:1}}>
              <Text style={{
                  color: colors.black,
                  fontSize: fontSizes.h3,
                  fontFamily: fonts.OpenSansBold,
                }}>{startDate.toLocaleString()}</Text>
            </View>
            <DatePicker
              modal
              mode={'datetime'}
              open={openDatePicker}
              date={startDate}
              onConfirm={newDate => {
                setStartDate(newDate);
                setOpenDatePicker(false);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />
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
                disabled={product.type == 1}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={product.type == 1 ? colors.primary : colors.darkGreyText}
                onValueChange={() => {
                  setProduct(item=>{
                    return{
                      ...item,
                      type:1
                    }
                  })
                }}
                value={product.type==1}
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
              paddingTop: 15,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: colors.darkGreyText,
                fontSize: fontSizes.h5,
                fontFamily: fonts.OpenSansMedium,
              }}>
              Giá bán
            </Text>
            <View
              style={{
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
    marginLeft: 'auto',
    marginRight: 5,
    width: 70,
    height: 20,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
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
  auctionSectionsStyle: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default ProductPricing;
