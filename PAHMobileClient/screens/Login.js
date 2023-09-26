import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {UIHeader, LoginView, RegisterView} from '../components';

function Login(props) {
  const [isSelected, setIsSelected] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: '#f2f2f0',
      }}>
      <UIHeader leftIconName={'arrow-left'} title={'PAH'} />
      {isSelected===0? <RegisterView
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />:<LoginView
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        keepSignedIn={keepSignedIn}
        setKeepSignedIn={setKeepSignedIn}
      />}
    </KeyboardAvoidingView>
  );
}

export default Login;
