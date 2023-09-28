import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fontSizes, fonts } from '../constants';
import { RegisterView2, RegisterView1 } from '../components';
import IconFeather from 'react-native-vector-icons/Feather';

function Register(props) {
  // Navigation
  const { navigation, route } = props;
  // Function of navigate to/back
  const { navigate, goBack } = navigation;
  const [emailCheck, setEmailCheck] = useState(false);

  // Data
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

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
        <Text style={styles.titleText}>Tạo tài khoản</Text>
      </View>

      {emailCheck ? <RegisterView2 password={password} setPassword={setPassword}
        onAccountCreate={() =>
          alert(`email: ${email}, name: ${name}, password: ${password}`)}
      />
        : <RegisterView1 setEmailCheck={setEmailCheck}
          email={email} setEmail={setEmail}
          name={name} setName={setName}
        />}
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
  }
});

export default Register;
