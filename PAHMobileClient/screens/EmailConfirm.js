import React, {useState, useContext} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {colors, fontSizes, fonts, images} from '../constants';
import {RegisterView2, RegisterView1} from '../components';
import IconFeather from 'react-native-vector-icons/Feather';
import {AxiosContext} from '../context/AxiosContext';
import {Auth as AuthRepository} from '../repositories';
import Toast from 'react-native-toast-message';

function EmailConfirm(props) {
    const{_email}=props.route.params;
  // Navigation
  const {navigation, route} = props;
  // Function of navigate to/back
  const {navigate, goBack} = navigation;

  return (
    <View style={styles.container}>
      {/* Fixed screen title: logo and cart and search icon */}
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            goBack();
          }}>
          <IconFeather name="chevron-left" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      {/* Image */}
      <Image
        source={images.checkMailImage}
        style={{
          resizeMode: 'contain',
          height: 200,
          width: 200,
          alignSelf: 'center',
          margin:15
        }}
      />
      {/* Content */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
        }}>
        <Text style={[styles.contentText,{fontFamily:fonts.MontserratBold,fontSize:fontSizes.h3}]}>Hãy xác nhận Email của bạn</Text>
        <Text style={styles.contentText}>Thư xác nhận đã được gửi đến:</Text>
        <Text style={[styles.contentText,{fontFamily:fonts.MontserratBold}]}>{_email}</Text>
        <Text style={styles.contentText}>
          Kiểm tra email của bạn và nhấn vào{'\n'}đường link xác nhận để tiếp
          tục
        </Text>
      </View>
      {/* footer */}
      <TouchableOpacity style={{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        marginBottom:20
        }}>
        <Text style={
            [styles.contentText,
            {color:colors.info,
            fontFamily:fonts.MontserratBold,
            fontSize:fontSizes.h4
            }]}>Gửi lại thư</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({                  
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
  iconButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.grey,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    alignItems: 'center',
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.MontserratBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
  contentText: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
    textAlign: 'center',
    marginBottom:5
  },
});
export default EmailConfirm;
