import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { colors, fontSizes, fonts } from '../../constants';
import { isValidEmail } from '../../utilities/validation';

function RegisterView1(props) {

  const validationOk = () => email.length > 0 && name.length > 0;
  const emailValidation = () => isValidEmail(email);
  const { setEmailCheck, email, setEmail, name, setName } = props;

  // states for validating
  const [errorEmail, setErrorEmail] = useState('');

  return (
    <View style={{ padding: 15 }}>
      <Text style={styles.welcomeText}>
        Cùng bắt đầu nào
      </Text>
      <View style={{ marginBottom: 10 }}>
        <View style={{ justifyContent: 'center' }}>
          <TextInput autoCapitalize='none'
            style={styles.inputBox}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholder={'Nhập địa chỉ Email'}
          />
        </View>
        {errorEmail != '' && <Text style={styles.errorText}>
          Hãy nhập địa chỉ Email hợp lệ
        </Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputBox}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
          placeholder="Nhập họ tên"
        />
      </View>
      <TouchableOpacity
        disabled={!validationOk()}
        onPress={() => {
          emailValidation()
            ? setEmailCheck(true)
            : setErrorEmail('Hãy nhập địa chỉ Email hợp lệ');
        }}
        style={[{
          backgroundColor: validationOk() ? colors.primary : colors.grey
        }, styles.primaryButton]}>
        <Text style={[{
          color: validationOk() ? 'white' : colors.greyText
        }, styles.primaryButtonText]}>
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h1 * 1.2,
    marginVertical: 10
  },
  inputContainer: {
    justifyContent: 'center',
    marginBottom: 20
  },
  inputBox: {
    fontFamily: fonts.OpenSansMedium,
    height: 50,
    borderColor: colors.black,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: fontSizes.h4,
    paddingHorizontal: 15
  },
  errorText: {
    color: 'red',
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h6,
    marginTop: 2,
    paddingHorizontal: 5
  },
  primaryButton: {
    borderRadius: 35,
    paddingVertical: 15
  },
  primaryButtonText: {
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansBold,
    textAlign: 'center'
  },
});
export default RegisterView1;
