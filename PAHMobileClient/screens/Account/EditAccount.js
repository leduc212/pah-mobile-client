import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {colors, fonts, fontSizes} from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DatePicker from 'react-native-date-picker';

function EditAccount(props) {
  //Date picker
  const [openDatePicker, setOpenDatePicker] = useState(false);
  //Enable save
  const [isEnabledSave, setEnabledSave] = useState(false);
  // Navigation
  const {navigation, route} = props;
  // Function of navigate to/back
  const {navigate, goBack} = navigation;
  // User data
  const [user, setUser] = useState({
    email: 'kingericvt96@gmail.com',
    phone: '0966948473',
    name: 'Nguyễn Huỳnh Tuấn',
    gender: 0,
    dob: new Date('2002-1-10'),
    avatar_url:
      'https://i.pinimg.com/1200x/3e/51/b7/3e51b7003375fb7e9e9c233a7f52c79e.jpg',
  });
  //Description
  const [description, setDescription] = useState('');
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
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
                width: 80,
                height: 80,
                borderRadius: 50,
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
                size={15}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          {/* Username section */}
          <View style={styles.usernameSectionStyle}>
            <Text
              style={{
                color: colors.black,
                fontFamily: fonts.OpenSansBold,
                fontSize: fontSizes.h5,
              }}>
              {user.email}
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: fonts.OpenSansMedium,
                fontSize: fontSizes.h6,
                flexShrink: 1,
              }}>
              Hãy chỉnh sửa lại thông tin của bạn để đảm bảo cho vấn đề bảo mật
            </Text>
          </View>
        </View>
        {/* Info title*/}
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
              Thông tin cá nhân
            </Text>
          </View>
        </View>
        {/* Info detail */}

        <ScrollView
          style={{
            paddingHorizontal: 15,
          }}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Tên</Text>
            <TextInput
              value={user.name}
              style={styles.inputBox}
              placeholder="Nhập tên của bạn"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Điện thoại</Text>
            <TextInput
              value={user.phone}
              style={styles.inputBox}
              placeholder="Nhập số điện thoại"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Ngày sinh</Text>
            <TouchableOpacity
              onPress={() => {
                setOpenDatePicker(true);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.labelDateStyle}>Ngày</Text>
                <Text style={styles.dateStyle}>{user.dob.getDate()}</Text>
                <Text style={styles.labelDateStyle}>Tháng</Text>
                <Text style={styles.dateStyle}>{user.dob.getMonth() + 1}</Text>
                <Text style={styles.labelDateStyle}>Năm</Text>
                <Text style={styles.dateStyle}>{user.dob.getFullYear()}</Text>
              </View>
            </TouchableOpacity>
            <DatePicker
              modal
              mode={'date'}
              open={openDatePicker}
              date={user.dob}
              maximumDate={new Date()}
              onConfirm={newDate => {
                setUser(user => {
                  return {
                    ...user,
                    dob: newDate,
                  };
                });
                setEnabledSave(true);
                setOpenDatePicker(false);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Giới tính</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                disabled={user.gender == 0}
                onPress={() => {
                  setUser(user => {
                    return {
                      ...user,
                      gender: 0,
                    };
                  });
                  setEnabledSave(true);
                }}
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Text style={styles.labelGendersStyle}>Nam</Text>
                {user.gender == 0 ? (
                  <Icon name="circle-dot" size={30} color={colors.black} />
                ) : (
                  <Icon name="circle" size={30} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                disabled={user.gender == 1}
                onPress={() => {
                  setUser(user => {
                    return {
                      ...user,
                      gender: 1,
                    };
                  });
                  setEnabledSave(true);
                }}
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Text style={styles.labelGendersStyle}>Nữ</Text>
                {user.gender == 1 ? (
                  <Icon name="circle-dot" size={30} color={colors.black} />
                ) : (
                  <Icon name="circle" size={30} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            disabled={!isEnabledSave}
            onPress={() => {
              setEnabledSave(false);
            }}
            style={[
              styles.saveButton,
              {
                backgroundColor:
                  isEnabledSave == true ? colors.primary : colors.darkGreyText,
              },
            ]}>
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
            onPress={() => {
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
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoContainer: {
    marginHorizontal: 'auto',
    backgroundColor: colors.grey,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  usernameSectionStyle: {
    width: 0,
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingStart: 5,
  },
  penIconButton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    height: 20,
    width: 20,
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
    marginTop: 10,
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
    borderColor: colors.black,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: fontSizes.h4,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  inputTitle: {
    fontSize: fontSizes.h3,
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
  },
  dateStyle: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: fontSizes.h4,
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
  },
  labelDateStyle: {
    fontSize: fontSizes.h4,
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  labelGendersStyle: {
    fontSize: fontSizes.h3,
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
  },
});
export default EditAccount;
