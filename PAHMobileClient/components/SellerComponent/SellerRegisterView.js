import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import { colors, fontSizes, fonts, roles } from '../../constants';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';

function SellerRegisterView(props) {
  //Photos
  let options = {
    cameraType: 'front',
    saveToPhotos: true,
    mediaType: 'photo',
    quality: 1,
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setPhoto(result.assets[0].uri);
  };
  //Seller data
  const [name, setName] = useState(null);
  const [Photo, setPhoto] = useState(null);
  const [pickupAddress, setPickupAddress] = useState({
    province: null,
    district: null,
    ward: null,
    street: null
  });
  //Dropdown input state
  const [isProvinceFocus, setProvinceFocus] = useState(false);
  const [isDistrictFocus, setDistrictFocus] = useState(false);
  const [isWardFocus, setWardFocus] = useState(false);
  //Province data
  const provinceData = [
    { label: 'Thành phố Hồ Chí Minh', value: '1' },
    { label: 'Thành phố Vũng Tàu', value: '2' },
    { label: 'Thành phố Hà Nội', value: '3' },
  ];
  //District data
  const districtData = [
    { label: 'Quận 9', value: '1' },
    { label: 'Quận 2', value: '2' },
    { label: 'Quận 1', value: '3' },
  ];
  //Ward data
  const wardData = [
    { label: 'Phường Phú Hữu', value: '1' },
    { label: 'Phường Hiệp Phú', value: '2' },
    { label: 'Phường Long Phước', value: '3' },
  ];
  //Ready to register
  const [ready, setReady] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Text style={{
          fontSize: fontSizes.h3,
          color: colors.primary,
          fontFamily: fonts.OpenSansBold,
          marginHorizontal: 10
        }}>Đăng ký bán hàng ngay hôm nay!</Text>
      </View>
      <View>
        {/* Avatar */}
        <View style={styles.sectionStyle}>
          <Text style={styles.titleSection}>Hình đại diện</Text>
          {Photo != null ? (
            <View style={{marginHorizontal: 15, marginVertical: 10}}>
              <Image style={styles.imageStyle} source={{ uri: Photo }} />
              <TouchableOpacity
                onPress={() => {
                  setPhoto(null);
                }}
                style={{
                  marginLeft: 'auto',
                }}>
                <IconAntDesign name="delete" size={20} color={'red'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{marginHorizontal: 15, marginVertical:10 }}>
              <View style={styles.imageZone}>
                <TouchableOpacity
                  style={styles.imageZoneButton}
                  onPress={openCamera}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: fonts.OpenSansMedium,
                      fontSize: fontSizes.h5,
                    }}>
                    Chụp ảnh
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.imageZoneButton}
                  onPress={openGallery}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: fonts.OpenSansMedium,
                      fontSize: fontSizes.h5,
                    }}>
                    Chọn ảnh từ thư viện
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {/* Name */}
        <View style={styles.sectionStyle}>
          <Text style={styles.titleSection}>Tên người bán</Text>
          <TextInput
            placeholder="Nhập tên"
            value={name}
            onChangeText={text => {
              setName(text);
            }}
            style={{
              color: colors.black,
              fontSize: fontSizes.h4,
              fontFamily: fonts.OpenSansMedium,
              marginTop: 10,
              borderBottomWidth: 1,
              borderColor: colors.darkGreyText,
              marginHorizontal: 15,
              paddingHorizontal: 0
            }}
          />
        </View>
        {/* Address */}
        <View style={styles.sectionStyle}>
          <Text style={styles.titleSection}>Địa chỉ lấy hàng</Text>
          <TextInput
            value={pickupAddress.street}
            onChangeText={text => {
              setPickupAddress(a => {
                return {
                  ...a,
                  street: text
                }
              })
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
            value={pickupAddress.province}
            onChange={item => {
              setPickupAddress(a => {
                return {
                  ...a,
                  province: item
                }
              })
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
            value={pickupAddress.district}
            onChange={item => {
              setPickupAddress(a => {
                return {
                  ...a,
                  district: item
                }
              })
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
            value={pickupAddress.ward}
            onChange={item => {
              setPickupAddress(a => {
                return {
                  ...a,
                  ward: item
                }
              })
              setWardFocus(false);
            }}
          />
        </View>
      </View>
      {/* Register button */}
      <TouchableOpacity
        onPress={() => {
          alert('Register')
        }}
        style={[styles.registerButtonStyle, { backgroundColor: ready == true ? colors.primary : colors.darkGreyText }]}>
        <Text
          style={{
            fontSize: fontSizes.h4,
            color: 'white',
            fontFamily: fonts.OpenSansMedium
          }}>
          Đăng ký
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setReady(!ready);
        }}
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          gap: 10,
          marginHorizontal: 10,
          marginBottom: 15
        }}>
        {ready == true ? <IconFeather name="check-square" size={20} /> : <IconFeather name="square" size={20} />}
        <Text style={{
          color: colors.darkGreyText,
          fontFamily: fonts.OpenSansMedium,
          fontSize: fontSizes.h5,
        }}>Tôi đồng ý với các điều khoản</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  iconButton: {
    backgroundColor: colors.grey,
    padding: 12,
    borderRadius: 50,
  },
  sectionStyle: {
    borderBottomWidth: 2,
    borderColor: colors.darkGrey,
    paddingVertical: 20,
  },
  titleSection: {
    marginTop: 10,
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h3,
    marginHorizontal: 10
  },
  detailTextSection: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  imageStyle: {
    flex: 1,
    backgroundColor: colors.darkGrey,
    marginTop: 10,
    resizeMode: 'cover',
    borderRadius: 100,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  imageZone: {
    marginTop: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  imageZoneButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: 170,
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  registerButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 20
  },
  dropdown: {
    height: 50,
    borderColor: colors.darkGreyText,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10
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
  inputBox: {
    fontSize: fontSizes.h3,
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    height: 50,
    borderColor: colors.darkGreyText,
    borderRadius: 8,
    borderBottomWidth: 1,
    fontSize: fontSizes.h4,
    marginTop: 10,
    marginHorizontal: 10
  },
});
export default SellerRegisterView;
