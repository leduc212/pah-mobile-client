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
  KeyboardAvoidingView,
} from 'react-native';
import {colors, fontSizes, fonts, roles} from '../constants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function ProductListing(props) {
  //Photos
  const [Photo, setPhoto] = useState(null);

  let options = {
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
  // Navigation
  const {navigation, route} = props;
  // Function of navigate to/back
  const {navigate, goBack} = navigation;
  //Data
  const [title, setTitle] =useState(null)
  return (
    <View style={styles.container}>
      {/* Fixed screen title*/}
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            goBack();
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
        <Text style={styles.titleText}>Tạo sản phẩm</Text>
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
      {/* listing information */}
      <KeyboardAvoidingView
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}>
        <ScrollView>
          {/* Photos */}
          <View style={styles.sectionStyle}>
            <Text style={styles.titleSection}>Hình ảnh</Text>
            {Photo != null ? (
              <View>
                <Image style={styles.imageStyle} source={{uri: Photo}} />
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
              <View>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: colors.darkGrey,
                    padding: 15,
                    borderRadius: 5,
                  }}>
                  <Text style={styles.detailTextSection}>
                    Cung cấp hình ảnh cho sản phẩm của bạn
                  </Text>
                </View>
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
                      Chụp hình sản phẩm
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
                      Lấy từ thư viện
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {/* Title */}
          <View style={styles.sectionStyle}>
            <Text style={styles.titleSection}>Tựa đề</Text>
            <TextInput
              style={{
                marginTop: 10,
              }}
            />
            <TouchableOpacity
              style={{
                marginLeft: 'auto',
              }}>
              <IconAntDesign name="edit" size={20} color={colors.black} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    borderBottomWidth: 1,
    borderColor: colors.darkGrey,
    paddingBottom: 15,
  },
  titleSection: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h3,
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
    borderRadius: 20,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  imageZone: {
    marginTop: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 'auto',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default ProductListing;
