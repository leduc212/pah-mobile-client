import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {colors, fonts, fontSizes} from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome6';

function EditAccount(props) {
  //Enable save
  const[isEnabledSave,setEnabledSave]=useState(false)
  // Navigation
  const {navigation, route} = props;
  // Function of navigate to/back
  const {navigate, goBack} = navigation;
  // User data
  const [user, setUser] = useState({
    name: 'huynhtuanvt',
    avatar_url:
      'https://i.pinimg.com/1200x/3e/51/b7/3e51b7003375fb7e9e9c233a7f52c79e.jpg',
  });
  //Description
  const [description, setDescription] = useState('');
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Fixed screen title: Edit account */}
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            goBack();
          }}>
          <IconFeather name="chevron-left" size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Chỉnh sửa tài khoản</Text>
      </View>
      {/* Avatar and username container */}
      <View style={styles.infoContainer}>
        {/* Avavatar section */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: user.avatar_url}}
            style={{
              resizeMode: 'cover',
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            style={styles.penIconButton}
            onPress={() => {
              alert('edit avatar');
            }}>
            <Icon
              style={{
                alignSelf: 'center',
              }}
              name="pen"
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        {/* Username section */}
        <View
          style={{
            justifyContent: 'center',
            marginStart: 10,
          }}>
          <Text
            style={{
              color: colors.black,
              fontFamily: fonts.OpenSansBold,
              fontSize: fontSizes.h3,
            }}>
            {user.name}
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: fonts.OpenSansMedium,
              fontSize: fontSizes.h5,
            }}>
            To change your username, visit
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: 'blue',
                marginTop: 10,
                textDecorationLine: 'underline',
              }}>
              Account Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Description */}
      <View
        style={{
          paddingHorizontal: 15,
        }}>
        <View>
          <Text
            style={{
              color: colors.black,
              fontFamily: fonts.OpenSansBold,
              fontSize: fontSizes.h3,
              paddingVertical: 15,
            }}>
            Mô tả về bạn
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: fonts.OpenSansMedium,
              fontSize: fontSizes.h6,
              paddingBottom: 15,
            }}>
            Dùng khoảng trống dưới đây để chia sẻ cho mọi người trên nền tảng về
            bản thân bạn và đam mê của bạn. Cho mọi người thêm lý do để theo dõi
            bạn!
          </Text>
        </View>
        <TextInput
          value={description}
          onChangeText={text => {
            setDescription(text);
            setEnabledSave(true)
          }}
          multiline={true}
          maxLength={500}
          style={{
            color: colors.black,
            borderColor: colors.darkGrey,
            borderWidth: 1,
            borderRadius: 10,
            height: 100,
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity 
        disabled={!isEnabledSave}
        onPress={()=>{
          setEnabledSave(false)
        }}
        style={[styles.saveButton,{backgroundColor: isEnabledSave==true ? colors.primary : colors.darkGreyText,}]}>
          <Text
            style={[
              {
                color: colors.greyText,
              },
              styles.saveText,
            ]}>
            Lưu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>{
          goBack();
        }}
        style={styles.cancelButton}>
          <Text
            style={[
              {
                color: colors.greyText,
              },
              styles.cancelText,
            ]}>
            Hủy
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoContainer: {
    backgroundColor: colors.grey,
    flexDirection: 'row',
    paddingStart: 15,
  },
  penIconButton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    height: 30,
    width: 30,
    right: 5,
    top: 5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: colors.grey,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 20,
    padding: 10,
  },
  saveText: {
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansMedium,
    color: 'white',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
  cancelText: {
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansMedium,
    color: 'blue',
    textAlign: 'center',
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    alignItems: 'center',
    gap: 20,
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputBox: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    height: 50,
    borderColor: colors.black,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: fontSizes.h4,
    paddingHorizontal: 15,
  },
});
export default EditAccount;
