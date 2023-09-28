import React, {useState, useEffect} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fontSizes} from '../constants';
import {UIHeader, RegisterView2, RegisterView1} from '../components';
import {isValidPassword} from '../utilities/Validation';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Register(props) {
   // Navigation
   const { navigation, route } = props;
   // Function of navigate to/back
   const { navigate, goBack } = navigation;
  const [emailCheck, setEmailCheck] = useState('false');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <UIHeader
        onPressLeftIcon={() => {
          emailCheck ==true ? setEmailCheck(false) : goBack();
        }}
        leftIconName={'arrow-left'}
        title={'Tạo tài khoản'}
      />
      {emailCheck == true ? (
        <RegisterView2 />
      ) : (
        <RegisterView1 setEmailCheck={setEmailCheck} />
      )}
    </KeyboardAvoidingView>
  );
}

export default Register;
