import React, {useState, useContext, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {colors, fontSizes, fonts, images} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import {isValidPassword} from '../utilities/Validation';
import {AxiosContext} from '../context/AxiosContext';
import {Auth as AuthRepository} from '../repositories';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';

function ForgetPassword(props) {
  // Axios context
  const axiosContext = useContext(AxiosContext);

  // Navigation
  const {navigation, route} = props;

  // Function of navigate to/back
  const {navigate, goBack} = navigation;

  //enable button check
  const [enableSend, setEnableSend] = useState(true);

  //input data
  const [email, setEmail] = useState('');
  const [tokenCode, setTokenCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //validation
  const validationOk = () =>
    email.length > 0 &&
    tokenCode.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    passwordValidation() &&
    passwordConfirmValidation();
  const passwordValidation = () => isValidPassword(password);
  const passwordConfirmValidation = () => password === confirmPassword;
  const [showPasswordConfirmValidation, setShowPasswordConfirmValidation] =
    useState(false);

    // Loading states
  const [isResetLoading, setIsResetLoading] = useState(false);

  ////FUNCTION

  //Forget password request
  async function forgetPassword() {
    setErrorMessage('');
    setEnableSend(false);
    await AuthRepository.forgetPassword(axiosContext, {email: email})
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Mã lấy lại mật khẩu đã được gửi tới email của bạn',
          position: 'bottom',
          autoHide: true,
          visibilityTime: 2000,
        });
      })
      .catch(error => {
        setErrorMessage(error.response.data.message);
      });
  }

  async function resetPassword() {
    setErrorMessage('');
    setIsResetLoading(true)
    await AuthRepository.resetPassword(axiosContext, {
      password: password,
      confirmPassword: confirmPassword,
      email: email,
      token: tokenCode,
    })
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Mật khẩu đã được đổi',
          position: 'bottom',
          autoHide: true,
          visibilityTime: 2000,
        });
        navigate('Login')
      })
      .catch(error => {
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Fixed screen title: logo and cart and search icon */}
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            goBack();
          }}>
          <IconFeather name="chevron-left" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      {/* Content */}
      <ScrollView style={{padding: 15}}>
        <Image
          source={images.resetPasswordImage}
          style={{
            resizeMode: 'contain',
            height: 100,
            width: 100,
            alignSelf: 'center',
            margin: 10,
          }}
        />
        <Text style={styles.titleText}>Lấy lại mật khẩu</Text>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.inputBox}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholder="Nhập Email"
          />
          <TouchableOpacity
            disabled={!enableSend}
            onPress={forgetPassword}
            style={{
              position: 'absolute',
              right: 10,
              backgroundColor:
                enableSend == true ? colors.info : colors.inactive,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
              flexDirection: 'row',
            }}>
            <Text
              style={[
                styles.contentText,
                {marginRight: enableSend == true ? 0 : 5},
              ]}>
              Gửi mã
            </Text>
            {!enableSend && (
              <CountdownCircleTimer
                isPlaying
                duration={10}
                colors={['#0000FF', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[10, 5, 2, 0]}
                size={22}
                strokeWidth={2}
                onComplete={() => {
                  setEnableSend(true);
                }}>
                {({remainingTime}) => (
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: fonts.MontserratRegular,
                      fontSize: fontSizes.h6,
                    }}>
                    {remainingTime}
                  </Text>
                )}
              </CountdownCircleTimer>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            value={tokenCode}
            onChangeText={text => {
              setTokenCode(text);
            }}
            placeholder="Nhập mã"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.inputBox}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={text => {
              setPassword(text);
            }}
            placeholder="Nhập mật khẩu mới"
          />
          {showPassword ? (
            <Icon
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              style={{
                position: 'absolute',
                right: 10,
              }}
              name="eye"
              size={20}
            />
          ) : (
            <Icon
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              style={{
                position: 'absolute',
                right: 10,
              }}
              name="eye-slash"
              size={20}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.inputBox}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setShowPasswordConfirmValidation(true);
            }}
            placeholder="Xác nhận mật khẩu mới"
          />
          {showConfirmPassword ? (
            <Icon
              onPress={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
              style={{
                position: 'absolute',
                right: 10,
              }}
              name="eye"
              size={20}
            />
          ) : (
            <Icon
              onPress={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
              style={{
                position: 'absolute',
                right: 10,
              }}
              name="eye-slash"
              size={20}
            />
          )}
          {!passwordConfirmValidation() && showPasswordConfirmValidation && (
            <Text style={styles.errorConfirmText}>
              Mật khẩu nhập lại không trùng khớp
            </Text>
          )}
        </View>
        <TouchableOpacity
          disabled={!validationOk()}
          onPress={resetPassword}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: validationOk() ? colors.primary : colors.inactive,
            marginHorizontal: 20,
            marginTop: 40,
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={styles.confirmText}>Xác nhận</Text>
        </TouchableOpacity>
      </ScrollView>
      {isResetLoading && <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.inactive
      }}>
        <ActivityIndicator size='large' />
      </View>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
  iconButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.grey,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    alignItems: 'center',
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.MontserratBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
    margin: 20,
  },
  contentText: {
    color: 'white',
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
    textAlign: 'center',
  },
  confirmText: {
    color: 'white',
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h3,
    textAlign: 'center',
  },
  errorConfirmText: {
    color: 'red',
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h6,
    paddingHorizontal: 5
  },
  inputContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputBox: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    height: 50,
    borderColor: colors.black,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: fontSizes.h4,
    paddingHorizontal: 15,
  },
});
export default ForgetPassword;
