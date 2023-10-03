import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fontSizes, fonts } from '../../constants';
import { isValidPassword } from '../../utilities/validation';
import Icon from 'react-native-vector-icons/FontAwesome5';

function RegisterView2(props) {
  //states for validating
  const [showPassword, setShowPassword] = useState(false);
  const passwordValidation = () => isValidPassword(password);

  const { password, setPassword, onAccountCreate } = props;

  return (
    <View style={{ padding: 15 }}>
      <Text style={styles.welcomeText}>
        Tạo mật khẩu
      </Text>
      <View style={{ marginBottom: 10 }}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputBox}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={text => {
              setPassword(text);
            }}
            placeholder="Nhập mật khẩu"
          />
          {!showPassword ? <Icon
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            style={{
              position: 'absolute',
              right: 10,
            }}
            name="eye"
            size={20}
          /> : <Icon
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            style={{
              position: 'absolute',
              right: 10,
            }}
            name="eye-slash"
            size={20}
          />}
        </View>
        <Text
          style={styles.errorText}>
          Ít nhất 8 ký tự, bao gồm ít nhất 1 chữ thường và 1 chữ in hoa, ít nhất 1 số
        </Text>
        <View style={{ marginVertical: 20, }}>
          <Text style={styles.termText}>
            Khi tạo tài khoản, bạn đồng ý với các Điều Khoản Người Dùng và đã
            đọc rõ Quyền Riêng Tư của chúng tôi
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>
          Điều khoản người dùng
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>
          Quyền riêng tư người dùng
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!passwordValidation()}
        onPress={onAccountCreate}
        style={[{
          backgroundColor: passwordValidation() ? colors.primary : colors.grey
        }, styles.primaryButton]}>
        <Text style={[{
          color: passwordValidation() ? 'white' : colors.greyText
        }, styles.primaryButtonText]}>
          Tạo tài khoản
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
    color: colors.darkGreyText,
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
  termText: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  secondaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  secondaryText: {
    fontFamily: fonts.OpenSansMedium,
    padding: 10,
    fontSize: fontSizes.h4,
    color: colors.primary,
  }
});

export default RegisterView2;
