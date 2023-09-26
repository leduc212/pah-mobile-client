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
import {colors, fontSizes} from '../constants';
import {UIRadioButton, UICheckButton} from '../components';
import UIHeader from '../components/UIHeader';

function RegisterView(props) {
    const{
        isSelected,
        setIsSelected,
        showPassword,
        setShowPassword,
      } = props;
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flex: 10,
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: fontSizes.h2,
              marginStart: 15,
            }}>
            Chào mừng
          </Text>
        </View>
        <View
          style={{
            flex: 50,
            justifyContent:'space-between',
            paddingHorizontal: 15,
          }}>
          <View
      style={{
        backgroundColor: 'white',
        borderColor: '#DCDCDC',
        borderRadius: 7,
        borderWidth: 1,
      }}>
      <View>
        <UIRadioButton
          onPress={() => {
            setIsSelected(0);
          }}
          title={'Tạo tài khoản.'}
          subtitle={'Lần đầu truy cập ?'}
          isSelected={isSelected === 0}
        />
      </View>
      <View
        style={{
          marginHorizontal: 15,
        }}>
        <Text
          style={{
            color: colors.black,
            fontSize: fontSizes.h4,
            fontWeight: 'bold',
            paddingBottom: 10,
          }}>
          Họ Tên
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: colors.black,
            borderWidth: 1,
          }}
          placeholder="Enter Your Name"
        />
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 15,
        }}>
        <Text
          style={{
            color: colors.black,
            fontSize: fontSizes.h4,
            fontWeight: 'bold',
            paddingBottom: 10,
          }}>
          Email
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: colors.black,
            borderWidth: 1,
          }}
          placeholder="Enter Your Email Address"
        />
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginBottom: 15,
        }}>
        <Text
          style={{
            color: colors.black,
            fontSize: fontSizes.h4,
            fontWeight: 'bold',
            paddingBottom: 10,
          }}>
          Password
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: colors.black,
            borderWidth: 1,
          }}
          secureTextEntry={true}
          placeholder="Enter Your Password!"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 10,
          marginHorizontal: 15,
        }}>
        <UICheckButton
          onPress={() => {
            setShowPassword(!showPassword);
          }}
          title={'Show password'}
          isSelected={showPassword}
        />
      </View>
      <View
        style={{
          marginHorizontal: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            alert('đăng nhập');
          }}
          style={{
            backgroundColor: colors.secondary,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            alignSelf: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              padding: 10,
              fontSize: fontSizes.h5,
              color: 'white',
            }}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            marginHorizontal: 15,
            marginVertical: 20,
            fontSize: fontSizes.h5 * 0.9,
            color: 'black',
          }}>
          By continuing, you agree to Amazon's Conditions of Use
        </Text>
      </View>
      <View>
        <UIRadioButton
          onPress={() => {
            setIsSelected(1);
          }}
          title={'Đăng nhập.'}
          subtitle={'Đã có tài khoản?'}
          isSelected={isSelected === 1}
        />
      </View>
    </View>
          <View style={{
            borderWidth:1,
            height:1,
            width:"50%",
            alignSelf:'center'
          }}/>
        </View>
        <View
          style={{
            flex: 40,
            justifyContent:'flex-end',
            alignItems: 'center'
          }}>
            <Text >1996-2023, Amazon.com</Text>
          </View>
      </ScrollView>
  );
}
export default RegisterView