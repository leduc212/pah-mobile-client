import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, fontSizes, images } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

function ListingDescription(props) {
  // Get product_id from routes
  const { product_id } = props.route.params;

  // Auth Context
  const authContext = useContext(AuthContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  return <View style={styles.container}>
    {/* Fixed screen title: Cart */}
    <View style={styles.titleContainer}>
      <TouchableOpacity style={styles.iconButton}
        onPress={() => {
          goBack()
        }}>
        <IconFeather name='arrow-left' size={30} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.titleText}>Thông tin thêm</Text>
    </View>

    {/* Description */}
    <ScrollView style={{
      paddingHorizontal: 15
    }}>
      <Text style={{
        color: 'black',
        fontFamily: 'OpenSans-Medium',
        fontSize: fontSizes.h3,
        alignSelf: 'center'
      }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris rhoncus aenean vel elit scelerisque mauris. Ut consequat semper viverra nam libero justo laoreet sit amet. Hendrerit dolor magna eget est lorem ipsum dolor sit. Tempus iaculis urna id volutpat lacus laoreet.
        {"\n"}{"\n"}Lacus vestibulum sed arcu non odio euismod lacinia at. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Ultricies mi quis hendrerit dolor magna eget. Elit ullamcorper dignissim cras tincidunt lobortis. Semper quis lectus nulla at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id.
        {"\n"}{"\n"}Vitae nunc sed velit dignissim sodales ut eu sem. Massa enim nec dui nunc mattis enim ut tellus. Massa id neque aliquam vestibulum morbi blandit. Lacus suspendisse faucibus interdum posuere lorem. Semper viverra nam libero justo laoreet sit amet cursus sit. Nulla facilisi morbi tempus iaculis urna. Quis vel eros donec ac odio tempor orci dapibus ultrices.
        {"\n"}{"\n"}Et leo duis ut diam quam nulla porttitor massa. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Quisque egestas diam in arcu cursus euismod quis viverra. Vitae turpis massa sed elementum tempus egestas sed sed. Eget mi proin sed libero enim sed faucibus turpis in. Condimentum id venenatis a condimentum vitae sapien pellentesque. Ac feugiat sed lectus vestibulum mattis ullamcorper velit.</Text>
    </ScrollView>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  iconButton: {
    padding: 12,
    borderRadius: 50
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
    alignItems: 'center'
  },
  titleText: {
    color: 'black',
    fontFamily: 'OpenSans-Bold',
    fontSize: fontSizes.h1,
    alignSelf: 'center'
  },
  titleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  separator: {
    height: 1.5,
    backgroundColor: colors.darkGreyText,
    marginRight: 10
  }
});

export default ListingDescription;