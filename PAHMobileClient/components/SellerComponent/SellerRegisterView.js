import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import { colors, fontSizes, fonts } from '../../constants';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import storage from '@react-native-firebase/storage';
import { AxiosContext } from '../../context/AxiosContext';
import { Address as AddressRepository } from '../../repositories';

function SellerRegisterView(props) {
  //// AXIOS CONTEXT
  const axiosContext = useContext(AxiosContext);

  //// RN Image Picker handling
  //Photos
  let options = {
    cameraType: 'front',
    saveToPhotos: true,
    mediaType: 'photo',
    quality: 1,
  };

  // Get image from camera
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await launchCamera(options);
        setPhoto(result.assets[0].uri);
      } catch (error) {

      }
    }
  };

  // Get image from gallery
  const openGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      setPhoto(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  //// DATA
  // Seller data
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg');

  // Address
  // Dropdown input state
  const [street, setStreet] = useState('');
  const [province, setProvince] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [district, setDistrict] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [ward, setWard] = useState(null);
  const [wardCode, setWardCode] = useState(null);

  //Dropdown input state
  const [isProvinceFocus, setProvinceFocus] = useState(false);
  const [isDistrictFocus, setDistrictFocus] = useState(false);
  const [isWardFocus, setWardFocus] = useState(false);

  // Province data
  const [provinceList, setProvinceList] = useState([]);
  // District data
  const [districtList, setDistrictList] = useState([]);
  // Ward data
  const [wardList, setWardList] = useState([]);

  //Ready to register
  const [ready, setReady] = useState(false);
  const [editable, setEditable] = useState(true);

  // Data for loading and refreshing
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  // Validating
  const validate = () => name.length > 0 && phone.length > 0 && street.length > 0
    && province != null && provinceId != null && district != null && districtId != null
    && ward != null && wardCode != null && ready && photo != null && photoUrl != '';

  //// FUNCTION
  // Get Province list
  function getProvinceList() {
    AddressRepository.getProvinceList()
      .then(response => {
        setProvinceList(response);
      })
      .catch(error => { })
  }

  // Get District list by province id
  function getDistrictList(provinceId) {
    AddressRepository.getDistrictListByProvinceId(provinceId)
      .then(response => {
        setDistrictList(response);
      })
      .catch(error => { })
  }

  // Get ward list by district id
  function getWardList(districtId) {
    AddressRepository.getWardListByDistrictId(districtId)
      .then(response => {
        setWardList(response);
      })
      .catch(error => { })
  }

  // Upload image
  const uploadImage = async () => {
    if (photo == null) {
      console.log('No photo to upload');
      return;
    }

    const filename = new Date().getTime() + '_' + photo.substring(photo.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? photo.replace('file://', '') : photo;
    const imageRef = storage().ref(`sellerProfilePicture/${filename}`);
    await imageRef
      .putFile(uploadUri, { contentType: 'image/jpg' })
      .catch((error) => { console.log(error) });

    const url = await imageRef.getDownloadURL().catch((error) => { console.log(error) });
    setPhotoUrl(url);
    console.log(url);
    return url;
  };

  // On init screen, get province list
  useEffect(() => {
    getProvinceList();
  }, [])

  // Create seller profile
  const registerSeller = async () => {
    setIsLoadingCreate(true)
    const url = await uploadImage();
    const user = {
      name: name,
      phone: phone,
      url: url,
      street: street,
      province: province,
      provinceId: provinceId,
      district: district,
      districtId: districtId,
      ward: ward,
      wardCode: wardCode
    };

    setTimeout(() => {
      setIsLoadingCreate(false);
      setEditable(false);
      alert(`name : ${user.name}, phone: ${user.phone}, url: ${user.url}, street: ${user.street},
      province: ${user.province}, provinceId: ${user.provinceId}, district: ${user.district},
      districtId: ${user.districtId}, ward: ${user.ward}, wardCode: ${user.wardCode}`);
    }, 2000)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{
          fontSize: fontSizes.h3,
          color: colors.primary,
          fontFamily: fonts.OpenSansBold,
          marginHorizontal: 10
        }}>{editable ? 'Đăng ký bán hàng ngay hôm nay!' : 'Hồ sơ của bạn đang được duyệt!'}</Text>
      </View>
      <View>
        {/* Avatar */}
        <View style={styles.sectionStyle}>
          <Text style={styles.titleSection}>Hình đại diện</Text>
          {photo != null ? (
            <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
              <Image style={styles.imageStyle} source={{ uri: photo }} />
              {editable && <TouchableOpacity
                onPress={() => {
                  setPhoto(null);
                }}
                style={{
                  marginLeft: 'auto',
                }}>
                <IconAntDesign name="delete" size={20} color={'red'} />
              </TouchableOpacity>}
            </View>
          ) : (
            <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
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
                    Chụp ảnh đại diện
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
          <Text style={styles.titleSection}>Thông tin cơ bản</Text>
          <TextInput
            disable={!editable}
            placeholder="Nhập tên cửa hàng"
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
          <TextInput
            disable={!editable}
            placeholder="Nhập số điện thoại liên lạc"
            keyboardType='phone-pad'
            value={phone}
            onChangeText={text => {
              setPhone(text);
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
            disable={!editable}
            value={street}
            onChangeText={text => {
              setStreet(text);
            }}
            style={styles.inputBox}
            placeholder="Số nhà, tên đường"
            placeholderTextColor={colors.darkGreyText}
          />
          <Dropdown
            disable={provinceList.length == 0 || !editable}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            searchPlaceholder="Tìm thành phố..."
            placeholder={!isProvinceFocus ? 'Chọn thành phố' : '...'}
            search
            data={provinceList}
            labelField="provinceName"
            valueField="provinceId"
            dropdownPosition='top'
            onFocus={() => setProvinceFocus(true)}
            onBlur={() => setProvinceFocus(false)}
            onChange={item => {
              setProvince(item.provinceName);
              setProvinceId(item.provinceId);
              setDistrictList([]);
              setDistrict(null);
              setDistrictId(null);

              setWardList([]);
              setWard(null);
              setWardCode(null);

              getDistrictList(item.provinceId);
              setProvinceFocus(false);
            }}
          />
          <Dropdown
            disable={districtList.length == 0 || !editable}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            searchPlaceholder="Tìm quận, huyện..."
            placeholder={!isDistrictFocus ? 'Chọn quận/huyện' : '...'}
            search
            data={districtList}
            labelField="districtName"
            valueField="districtId"
            onFocus={() => setDistrictFocus(true)}
            onBlur={() => setDistrictFocus(false)}
            dropdownPosition='top'
            onChange={item => {
              setDistrict(item.districtName);
              setDistrictId(item.districtId);

              setWardList([]);
              setWard(null);
              setWardCode(null);

              getWardList(item.districtId);

              setDistrictFocus(false);
            }}
          />
          <Dropdown
            disable={wardList.length == 0 || !editable}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            searchPlaceholder="Tìm phường, xã"
            placeholder={!isWardFocus ? 'Chọn phường/xã' : '...'}
            search
            data={wardList}
            labelField="wardName"
            valueField="wardCode"
            dropdownPosition='top'
            onFocus={() => setWardFocus(true)}
            onBlur={() => setWardFocus(false)}
            onChange={item => {
              setWard(item.wardName);
              setWardCode(item.wardCode);
              setWardFocus(false);
            }}
          />
        </View>
      </View>
      {/* Register button */}
      {editable && <View>
        <TouchableOpacity
          disabled={!validate()}
          onPress={() => {
            registerSeller();
          }}
          style={[styles.registerButtonStyle, { backgroundColor: validate() ? colors.primary : colors.darkGreyText }]}>
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
          {ready ? <IconFeather name="check-square" size={20} /> : <IconFeather name="square" size={20} />}
          <Text style={{
            color: colors.darkGreyText,
            fontFamily: fonts.OpenSansMedium,
            fontSize: fontSizes.h5,
          }}>Tôi đồng ý với các điều khoản</Text>
        </TouchableOpacity>
      </View>}
      {isLoadingCreate && <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.inactive
      }}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>}
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
