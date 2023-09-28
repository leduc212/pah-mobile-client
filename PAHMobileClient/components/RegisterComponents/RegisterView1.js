import React, {useState, useEffect} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fontSizes} from '../../constants';
import {isValidEmail} from '../../utilities/Validation';
import Icon from 'react-native-vector-icons/FontAwesome5';

function RegisterView1(props) {
  ///states to store email/name
  const [email, setEmail] = useState('kingericvt96@gmail.com');
  const [name, setName] = useState('Nguyen Huynh Tuan');
  //states for validating
  const [errorEmail, setErrorEmail] = useState('');
  const validationOk = () => email.length > 0 && name.length > 0;
  const emailValidation=()=>isValidEmail(email);
  const {setEmailCheck} = props;
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
            marginVertical: 10,
          }}>
          Bắt đầu !
        </Text>
        <View
          style={{
            marginBottom: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <TextInput
              style={{
                fontFamily: 'OpenSans-Medium',
                height: 45,
                borderColor: errorEmail != '' ? 'red': colors.black ,
                borderRadius: 10,
                borderWidth: 1,
              }}
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              placeholder={'Nhập địa chỉ Email'}
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
          {errorEmail != '' ? (
            <View>
              <Text
                style={{
                  color: 'red',
                }}>
                Hãy nhập địa chỉ Email hợp lệ
              </Text>
            </View>
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
            value={name}
            onChangeText={text => {
              setName(text);
            }}
            placeholder="Nhập họ tên"
          />
          {name != '' ? (
            <Icon
              onPress={() => {
                setName('');
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
        <TouchableOpacity
          disabled={!validationOk() == true}
          onPress={() => {
            emailValidation() == true
              ? setEmailCheck(true)
              : setErrorEmail('Hãy nhập địa chỉ Email hợp lệ');
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
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
  );
}
export default RegisterView1;
