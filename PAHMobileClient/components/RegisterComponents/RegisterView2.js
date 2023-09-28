import React, { useState, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fontSizes } from '../../constants';
import { UIHeader, LoginView, RegisterView } from '.';
import { isValidPassword } from '../../utilities/Validation';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function RegisterView2(props) {
  //states to store password
  const [password, setPassword] = useState('Lm100102@');
  //states for validating
  const [showPassword, setShowPassword] = useState(false);
  const passwordValidation = () => isValidPassword(password);
  return (
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
          marginTop: 10,
          marginBottom: 30,
        }}>
        Tạo mật khẩu
      </Text>
      <View
        style={{
          marginBottom: 10,
        }}>
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
        <View>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'OpenSans-Medium',
              fontSize: fontSizes.h4,
              fontWeight: 'bold',
            }}>
            Ít nhất 8 ký tự, bao gồm ít nhất 1 chữ thường và 1 chữ in hoa, ít nhất 1 số
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
          }}>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'OpenSans-Medium',
              fontSize: fontSizes.h4,
              fontWeight: 'bold',
            }}>
            Khi tạo tài khoản, bạn đồng ý với các Điều Khoản Người Dùng và đã
            đọc rõ Quyền Riêng Tư của chúng tôi
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          alignSelf: 'center',
          borderRadius: 20,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Medium',
            padding: 10,
            fontSize: fontSizes.h3,
            fontWeight: 'bold',
            color: 'blue',
          }}>
          Điều khoản người dùng
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          alignSelf: 'center',
          borderRadius: 20,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Medium',
            padding: 10,
            fontSize: fontSizes.h3,
            fontWeight: 'bold',
            color: 'blue',
          }}>
          Quyền riêng tư người dùng
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!passwordValidation() == true}
        onPress={() => {
          alert('Account created')
        }}
        style={{
          backgroundColor:
            passwordValidation() == true ? colors.secondary : colors.inactive,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          alignSelf: 'center',
          borderRadius: 20,
          marginTop: 20,
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Medium',
            padding: 10,
            fontSize: fontSizes.h3,
            color: 'white',
          }}>
          Tạo tài khoản
        </Text>
      </TouchableOpacity>
    </View>
  );
}
