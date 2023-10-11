import React, { useState, useContext } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { colors, fontSizes, fonts } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import { AxiosContext } from '../context/AxiosContext';
import { Auth as AuthRepository } from '../repositories';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';

function Login(props) {
  // Auth Context
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  //states to store email/password
  const [email, setEmail] = useState('duclmse161422@fpt.edu.vn');
  const [password, setPassword] = useState('123456789');

  // states for validating
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const validationOk = () => email.length > 0 && password.length > 0;
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // login function
  async function login() {
    setIsLoginLoading(true);
    setErrorMessage('');
    await AuthRepository.login(axiosContext, { email: email, password: password })
      .then(response => {
        const { accessToken, refreshToken } = response;

        authContext.setAuthState({
          accessToken: accessToken,
          refreshToken: refreshToken,
          authenticated: true,
        });

        Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken,
            refreshToken,
          }),
        );

        Toast.show({
          type: 'success',
          text1: 'Đăng nhập thành công',
          position: 'bottom',
          autoHide: true,
          visibilityTime: 3000
        });

        goBack();
      })
      .catch(error => {
        setIsLoginLoading(false);
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
      {/* Fixed screen title: Login */}
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.iconButton}
          onPress={() => {
            goBack()
          }}>
          <IconFeather name='x' size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Đăng nhập</Text>
      </View>

      {/* Login form */}
      <View style={{
        paddingHorizontal: 15,
      }}>
        <Text style={styles.welcomeText}>
          Xin chào
        </Text>
        {errorMessage == '' ? null : (
          <View style={styles.errorContainer}>
            <Icon color='red' name="exclamation-circle" size={25} />
            <Text
              style={styles.errorMessage}>
              {errorMessage}
            </Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize='none'
            style={styles.inputBox}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholder="Nhập địa chỉ Email"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize='none'
            style={styles.inputBox}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={text => {
              setPassword(text);
            }}
            placeholder="Nhập mật khẩu"
          />
          {!showPassword ? (
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
        <TouchableOpacity
          disabled={!validationOk() && isLoginLoading}
          onPress={() => {
            login()
          }}
          style={[{
            backgroundColor: validationOk() ? colors.primary : colors.grey
          }, styles.loginButton]}>
          <Text style={[{
            color: validationOk() ? 'white' : colors.greyText
          }, styles.loginText]}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}
          onPress={() => navigate('Account')} >
          <Icon style={{
            position: 'absolute',
            left: 15,
            color: colors.google,
          }}
            size={30}
            name="google"
          />
          <Text style={styles.googleText}>
            Đăng nhập bằng Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.infoText, { marginVertical: 40, }]}>
            Lấy lại mật khẩu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigate('Register')
        }}>
          <Text style={styles.infoText}>
            Tạo tài khoản
          </Text>
        </TouchableOpacity>
      </View>
      {isLoginLoading && <View style={{
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
    backgroundColor: 'white'
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: colors.grey
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    alignItems: 'center',
    gap: 10
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center'
  },
  welcomeText: {
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h1 * 1.2,
    marginVertical: 10
  },
  errorContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  errorMessage: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
    marginLeft: 10
  },
  inputContainer: {
    justifyContent: 'center',
    marginBottom: 20
  },
  inputBox: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    height: 50,
    borderColor: colors.black,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: fontSizes.h4,
    paddingHorizontal: 15
  },
  loginButton: {
    borderRadius: 35,
    paddingVertical: 15
  },
  loginText: {
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansBold,
    textAlign: 'center'
  },
  googleButton: {
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 35,
    backgroundColor: 'white',
    paddingVertical: 15,
    justifyContent: 'center'
  },
  googleText: {
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansMedium,
    color: 'black',
    textAlign: 'center'
  },
  infoText: {
    alignSelf: 'center',
    fontFamily: fonts.OpenSansMedium,
    color: colors.primary,
    fontSize: fontSizes.h5,
  }
});

export default Login;
