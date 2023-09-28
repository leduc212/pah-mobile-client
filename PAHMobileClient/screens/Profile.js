import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, fontSizes, images } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import { ProductListingCard } from '../components';

function Profile(props) {
  // Get user_id from routes
  const { user_id } = props.route.params;

  // Auth Context
  const authContext = useContext(AuthContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  // Data
  const [userProfile, setUserProfile] = useState({
    name: 'avd seller',
    address: 'Thành phố Hồ Chí Minh',
    avatar: 'https://i.pinimg.com/1200x/3e/51/b7/3e51b7003375fb7e9e9c233a7f52c79e.jpg'
  });
  const [currentTab, setCurrentTab] = useState(1);
  // Data for products
  const [products, setProducts] = useState([
    {
      name: 'New Basic Stussy Mens Black/White L/S Tee T Shirt Size Medium',
      price: '553,658',
      url: 'https://i.ebayimg.com/images/g/SqQAAOSw9w9jYyqQ/s-l1600.jpg'
    },
    {
      name: 'Trump shirt Wanted for President rea Mugshot DJT Tee shirt Republican party tee',
      price: '426,097',
      url: 'https://i.ebayimg.com/images/g/r-YAAOSwe4Vk63Ai/s-l1600.jpg'
    },
    {
      name: 'adidas Originals Mens Street Grp Tea Graphic Shirt AZ1138 White XS-XL',
      price: '699,268',
      url: 'https://i.ebayimg.com/images/g/PeoAAOSwiFFesyqM/s-l1600.jpg'
    },
    {
      name: 'Supreme Scarface The World Is Yours T-Shirt Black XL 100% Authentic Tee',
      price: '4,756,097',
      url: 'https://i.ebayimg.com/images/g/fIUAAOSwmnFk2PPY/s-l1600.jpg'
    }
  ]);

  return <View style={styles.container}>
    {/* Fixed screen title: Cart */}
    <View style={styles.titleContainer}>
      <TouchableOpacity style={styles.iconButton}
        onPress={() => {
          goBack()
        }}>
        <IconFeather name='arrow-left' size={30} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.titleText}>Hồ sơ</Text>
    </View>

    {/* Description */}
    <ScrollView>
      {/* User profile */}
      <View style={{
        flexDirection: 'row',
        gap: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: colors.grey
      }}>
        <Image source={{ uri: userProfile.avatar }}
          style={{
            resizeMode: 'cover',
            width: 100,
            height: 100,
            borderRadius: 50
          }} />
        <View style={{ gap: 2 }}>
          <Text style={{
            color: 'black',
            fontFamily: 'OpenSans-Bold',
            fontSize: fontSizes.h3
          }}>{userProfile.name}</Text>
          <Text style={{
            color: 'black',
            fontFamily: 'OpenSans-Medium',
            fontSize: fontSizes.h5
          }}>{userProfile.address}</Text>
          <Text style={{
            color: 'black',
            fontFamily: 'OpenSans-Medium',
            fontSize: fontSizes.h5
          }}>Đánh giá: 5</Text>
        </View>
      </View>

      {/* Tab navigation */}
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginVertical: 15,
        gap: 30
      }}>
        <TouchableOpacity style={{
          alignItems: 'center'
        }}
          onPress={() => setCurrentTab(1)}>
          <Text style={{
            color: currentTab == 1 ? 'black' : colors.darkGreyText,
            fontFamily: 'OpenSans-Medium',
            fontSize: fontSizes.h5
          }}>Đang bán</Text>
          {currentTab == 1 && <View style={{
            height: 1.5,
            backgroundColor: 'black',
            width: '80%',
            marginTop: 15
          }}></View>}
        </TouchableOpacity>

        <TouchableOpacity style={{
          alignItems: 'center'
        }}
          onPress={() => setCurrentTab(2)}>
          <Text style={{
            color: currentTab == 2 ? 'black' : colors.darkGreyText,
            fontFamily: 'OpenSans-Medium',
            fontSize: fontSizes.h5
          }}>Đang đấu giá</Text>
          {currentTab == 2 && <View style={{
            height: 1.5,
            backgroundColor: 'black',
            width: '80%',
            marginTop: 15
          }}></View>}
        </TouchableOpacity>

        <TouchableOpacity style={{
          alignItems: 'center'
        }}
          onPress={() => setCurrentTab(3)}>
          <Text style={{
            color: currentTab == 3 ? 'black' : colors.darkGreyText,
            fontFamily: 'OpenSans-Medium',
            fontSize: fontSizes.h5
          }}>Thêm</Text>
          {currentTab == 3 && <View style={{
            height: 1.5,
            backgroundColor: 'black',
            width: '80%',
            marginTop: 15
          }}></View>}
        </TouchableOpacity>
      </View>

      {/* Tab content */}
      {currentTab == 1 ? <View>
        {/* Title (type of list: for sale/auction) section */}
        {(Array.isArray(products) && products.length) ? <View>
          <View style={{
            paddingVertical: 10,
            paddingHorizontal: 15
          }}>
            <Text style={{
              color: 'black',
              fontFamily: 'OpenSans-Bold',
              fontSize: fontSizes.h2
            }}>Tất cả sản phẩm</Text>
          </View>

          <View style={{
            flex: 1
          }}>
            {products.map((product) =>
              <ProductListingCard key={product.name} product={product} onPress={() => {
                navigate('ListingDetail', { product_id: product.name })
              }} />
            )}
          </View>
        </View> : <View style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 150
        }}>
          <Image source={images.searchImage} style={{
            resizeMode: 'cover',
            width: 140,
            height: 140
          }} />
          <Text style={{
            fontSize: fontSizes.h4,
            fontFamily: 'OpenSans-Medium',
            color: 'black',
            textAlign: 'center',
            marginHorizontal: 35,
            marginTop: 10
          }}>Không thể tìm thấy sản phẩm nào. Bạn hãy thử tìm kiếm với từ khóa khác xem sao!</Text>
        </View>}
      </View> : currentTab == 2 ? <View>
        <Text>Dang dau gia</Text>
      </View> : <View>
        <View style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          gap: 10
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{
              fontSize: fontSizes.h4,
              fontFamily: 'OpenSans-Medium',
              color: colors.darkGreyText
            }}>Địa chỉ: </Text>
            <Text style={{
              fontSize: fontSizes.h4,
              fontFamily: 'OpenSans-Bold',
              color: 'black'
            }}>Thành phố Hồ Chí Minh</Text>
          </View>

          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{
              fontSize: fontSizes.h4,
              fontFamily: 'OpenSans-Medium',
              color: colors.darkGreyText
            }}>Ngày gia nhập: </Text>
            <Text style={{
              fontSize: fontSizes.h4,
              fontFamily: 'OpenSans-Bold',
              color: 'black'
            }}>17/09/2022</Text>
          </View>
        </View>
      </View>}

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

export default Profile;