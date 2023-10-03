import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {colors, fonts, fontSizes} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import IconFeather from 'react-native-vector-icons/Feather';

function AddAddress(props) {
  //Input state
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [street, setStreet] = useState(null);
  //Dropdown input state
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [isProvinceFocus, setProvinceFocus] = useState(false);
  const [isDistrictFocus, setDistrictFocus] = useState(false);
  const [isWardFocus, setWardFocus] = useState(false);
  //Default address validate
  const [isDefault, setDefault] = useState(false);
  // Navigation
  const {navigation, route} = props;
  // Function of navigate to/back
  const {navigate, goBack} = navigation;
  //Province data
  const provinceData = [
    {label: 'Thành phố Hồ Chí Minh', value: '1'},
    {label: 'Thành phố Vũng Tàu', value: '2'},
    {label: 'Thành phố Hà Nội', value: '3'},
  ];
  //District data
  const districtData = [
    {label: 'Quận 9', value: '1'},
    {label: 'Quận 2', value: '2'},
    {label: 'Quận 1', value: '3'},
  ];
  //Ward data
  const wardData = [
    {label: 'Phường Phú Hữu', value: '1'},
    {label: 'Phường Hiệp Phú', value: '2'},
    {label: 'Phường Long Phước', value: '3'},
  ];
  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            goBack();
          }}>
          <IconFeather name="chevron-left" size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Thêm Địa chỉ</Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            alert(`${name},${phone},${street},${province},${district},${ward},${isDefault}`)
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: fontSizes.h4,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          onChangeText={text => {
            setName(text);
          }}
          style={styles.inputBox}
          placeholder="Tên người nhận"
          placeholderTextColor={colors.darkGreyText}
        />
        <TextInput
          value={phone}
          onChangeText={text => {
            setPhone(text);
          }}
          style={styles.inputBox}
          placeholder="Số điện thoại"
          placeholderTextColor={colors.darkGreyText}
        />
        <TextInput
          value={street}
          onChangeText={text => {
            setStreet(text);
          }}
          style={styles.inputBox}
          placeholder="Địa chỉ"
          placeholderTextColor={colors.darkGreyText}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          searchPlaceholder="Search..."
          placeholder={!isProvinceFocus ? 'Chọn thành phố' : '...'}
          search
          data={provinceData}
          labelField="label"
          valueField="value"
          onFocus={() => setProvinceFocus(true)}
          onBlur={() => setProvinceFocus(false)}
          value={province}
          onChange={item => {
            setProvince(item.value);
            setProvinceFocus(false);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          searchPlaceholder="Search..."
          placeholder={!isDistrictFocus ? 'Chọn quận/huyện' : '...'}
          search
          data={districtData}
          labelField="label"
          valueField="value"
          onFocus={() => setDistrictFocus(true)}
          onBlur={() => setDistrictFocus(false)}
          value={district}
          onChange={item => {
            setDistrict(item.value);
            setDistrictFocus(false);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          searchPlaceholder="Search..."
          placeholder={!isWardFocus ? 'Chọn phường/xã' : '...'}
          search
          data={wardData}
          labelField="label"
          valueField="value"
          onFocus={() => setWardFocus(true)}
          onBlur={() => setWardFocus(false)}
          value={ward}
          onChange={item => {
            setWard(item.value);
            setWardFocus(false);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setDefault(!isDefault);
          }}
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          {isDefault === true ? (
            <IconFeather name="check-square" size={20} color={colors.black} />
          ) : (
            <IconFeather name="square" size={20} color={colors.black} />
          )}
          <Text
            style={{
              color: colors.black,
              fontSize: fontSizes.h4,
              fontFamily: fonts.OpenSansMedium,
            }}>
            Đặt làm địa chỉ giao hàng mặc định
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: colors.grey,
  },
  doneButton: {
    marginLeft: 'auto',
    padding: 8,
    borderRadius: 50,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 20,
  },
  titleText: {
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: colors.grey,
    gap: 40,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputBox: {
    fontSize: fontSizes.h3,
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    height: 50,
    borderColor: colors.black,
    borderRadius: 8,
    borderBottomWidth: 1,
    fontSize: fontSizes.h4,
    paddingHorizontal: 15,
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
    fontSize: fontSizes.h3,
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
export default AddAddress;
