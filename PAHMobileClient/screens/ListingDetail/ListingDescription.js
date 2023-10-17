import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';

function ListingDescription(props) {
  //// AUTH AND NAVIGATION
  // Auth Context
  const authContext = useContext(AuthContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  // Get description from routes
  const { description } = props.route.params;

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
      <Text style={styles.descriptionText}>{description}</Text>
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
    fontFamily: fonts.MontserratBold,
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
  },
  descriptionText: {
    color: 'black',
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h3
  }
});

export default ListingDescription;