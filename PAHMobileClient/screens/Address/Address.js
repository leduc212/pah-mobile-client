import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {colors, fonts, fontSizes} from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {EditAddress} from '../../components';

function Address(props) {
  //Edit mode
  const [isEditMode, setEditMode] = useState(false);
  const [isEditAddress,setEditAddress]=useState(null);
  // Navigation
  const {navigation, route} = props;
  // Function of navigate to/back
  const {navigate, goBack} = navigation;
  //Address
  const [addresses, setAddresses] = useState([
    {
      name: 'Nguyễn Huỳnh Tuấn',
      phone: '0966948473',
      province: 'Thành Phố Hồ Chí Minh',
      district: 'Quận 9',
      ward: 'phường Phú Hữu',
      street: 'Safira Khang Điền, Võ Chí Công',
      isDefault: true,
    },
    {
      name: 'Trần Ngọc Châu',
      phone: '0966938273',
      province: 'Thành Phố Vũng Tàu',
      district: 'Quận 2',
      ward: 'phường Phú Hữu',
      street: '2,D4',
      isDefault: false,
    },
  ]);
  return (
    <View style={styles.container}>
      {isEditMode == true ? (
        <EditAddress isEditAddress={isEditAddress} setEditAddress={setEditAddress} setEditMode={setEditMode} />
      ) : (
        <View>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                goBack();
              }}>
              <IconFeather name="chevron-left" size={25} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Địa chỉ</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                navigate('AddAddress');
              }}>
              <IconFeather name="plus" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{
              paddingHorizontal: 15,
            }}>
            {addresses.map(address => (
              <TouchableOpacity
                onPress={() => {
                  setEditMode(true);
                  setEditAddress(address);
                }}
                key={address.street}
                style={{
                  justifyContent: 'center',
                  borderColor: colors.darkGrey,
                  borderBottomWidth: 1,
                }}>
                {address.isDefault == true ? (
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fonts.OpenSansBold,
                      fontSize: fontSizes.h5,
                      borderWidth: 1,
                      paddingStart: 10,
                    }}>
                    Địa chỉ giao hàng mặc định
                  </Text>
                ) : null}
                <Text
                  style={{
                    color: colors.black,
                  }}>
                  {address.name}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                  }}>
                  {address.street} {address.ward} {address.district}{' '}
                  {address.province}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                  }}>
                  {address.phone}
                </Text>
                <IconFeather
                  position="absolute"
                  right={0}
                  name="chevron-right"
                  size={25}
                  color={'black'}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: colors.grey,
  },
  addButton: {
    marginLeft: 'auto',
    padding: 8,
    borderRadius: 50,
    backgroundColor: colors.grey,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 20,
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
});
export default Address;
