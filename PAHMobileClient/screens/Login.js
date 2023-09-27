import React, { useState, useContext } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fontSizes } from '../constants';
import { UIHeader } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../context/AuthContext';

function Login(props) {
  // Auth Context
  const authContext = useContext(AuthContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  //states to store email/password
  const [email, setEmail] = useState('kingericvt96@gmail.com');
  const [password, setPassword] = useState('Lm123456');
  
  //states for validating
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const validationOk = () => email.length > 0 && password.length > 0;
  const authenticationOk = () => email === 'kingericvt96@gmail.com' && password === 'Lm123456';

  // Test login function
  function login() {
    authContext.setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: true,
    });
    navigate('Account');
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <UIHeader
        onPressLeftIcon={() => {
          goBack();
        }}
        leftIconName={'arrow-left'}
        title={'Đăng nhập'}
      />

      <View
        style={{
          padding: 15,
        }}>
        <Text
          style={{
            color: colors.black,
            fontFamily: 'OpenSans-Medium',
            fontSize: fontSizes.h1,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Xin chào
        </Text>
        {errorMessage == '' ? null : (
          <View
            style={{
              height: 50,
              borderRadius: 10,
              borderWidth: 5,
              borderColor: 'red',
              marginVertical: 20,
              justifyContent: 'center',
            }}>
            <Icon
              style={{
                position: 'absolute',
                paddingStart: 10,
                color: 'red',
              }}
              name="exclamation-circle"
              size={20}
            />
            <Text
              style={{
                color: colors.black,
                fontWeight: 'bold',
                fontFamily: 'OpenSans-Medium',
                fontSize: fontSizes.h3,
                paddingStart: 40,
              }}>
              {errorMessage}
            </Text>
          </View>
        )}
        <View
          style={{
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <TextInput
            style={{
              fontFamily: 'OpenSans-Medium',
              height: 45,
              borderColor: colors.black,
              borderRadius: 10,
              borderWidth: 1,
            }}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholder="Nhập địa chỉ Email"
          />
          {email != '' ? (
            <Icon
              onPress={() => {
                setEmail('');
              }}
              style={{
                position: 'absolute',
                right: 10,
              }}
              name="times"
              size={20}
            />
          ) : null}
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <TextInput
            style={{
              fontFamily: 'OpenSans-Medium',
              height: 45,
              borderColor: colors.black,
              borderRadius: 10,
              borderWidth: 1,
            }}
            value={password}
            secureTextEntry={showPassword}
            onChangeText={text => {
              setPassword(text);
            }}
            placeholder="Nhập mật khẩu"
          />
          {password != '' ? (
            <Icon
              onPress={() => {
                setPassword('');
              }}
              style={{
                position: 'absolute',
                right: 40,
              }}
              name="times"
              size={20}
            />
          ) : null}
          {showPassword == false ? (
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
          disabled={!validationOk() == true}
          onPress={() => {
            authenticationOk() == true
              ? login()
              : setErrorMessage('Kiểm tra lại Email và mật khẩu!');
          }}
          style={{
            backgroundColor:
              validationOk() == true ? colors.secondary : colors.inactive,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Medium',
              padding: 10,
              fontSize: fontSizes.h3,
              color: 'white',
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => login()}
          style={{
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 20,
          }}>
          <Icon
            style={{
              position: 'absolute',
              left: 10,
              color: 'blue',
            }}
            size={30}
            name="google"
          />
          <Text
            style={{
              fontFamily: 'OpenSans-Medium',
              padding: 10,
              fontSize: fontSizes.h3,
              color: colors.black,
            }}>
            Đăng nhập bằng Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              marginVertical: 20,
              alignSelf: 'center',
              fontFamily: 'OpenSans-Medium',
              color: 'blue',
              fontSize: fontSizes.h4,
            }}>
            Lấy lại mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity onPress={() => {
          navigate('Register')
        }}>
          <Text
            style={{
              marginBottom: 10,
              alignSelf: 'center',
              fontFamily: 'OpenSans-Medium',
              color: 'blue',
              fontSize: fontSizes.h4,
            }}>
            Tạo tài khoản
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
