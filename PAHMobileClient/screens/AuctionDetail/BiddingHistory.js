import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {
  ListingDetailInfoText,
  TimeLeft,
  BidHistoryItem
} from '../../components';

function BiddingHistory(props) {
  // Get auction_id from routes
  const { auction_id } = props.route.params;

  // Auth Context
  const authContext = useContext(AuthContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  // Data
  const [product, setProduct] = useState({
    name: 'Đá thạch anh hồng phong thuỷ',
    price: '1,220,000',
    package_content: 'Đá cảnh + đế gỗ + túi giấy sang trọng + dầu dưỡng đá + giấy kiểm định chất lượng đá',
    package_method: 'Hộp kèm đế',
    condition: 'Tốt',
    category: 'Đá Phong Thủy',
    material: 'Đá quý',
    origin: 'Việt Nam',
    dimension: '14.8x12x6.3 cm',
    weight: '1,5',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    images: [
      'https://media.loveitopcdn.com/25808/thumb/da-canh-thach-anh-hong-m277415-3.jpg',
      'https://media.loveitopcdn.com/25808/thumb/da-canh-fluorite-xanh-m282420.jpg',
      'https://media.loveitopcdn.com/25808/thumb/da-canh-thach-anh-trang-m150083-1.jpg',
      'https://media.loveitopcdn.com/25808/thumb/tru-da-fluorite-xanh-m0752059-3.jpg'
    ],
    seller: {
      seller_name: 'avd seller',
      seller_address: 'Thành phố Hồ Chí Minh',
      seller_avatar: 'https://i.pinimg.com/1200x/3e/51/b7/3e51b7003375fb7e9e9c233a7f52c79e.jpg'
    }
  });

  const [bidHistory, setBidHistory] = useState([
    {
      id: 13,
      user: {
        id: 101,
        name: 'Trần Dương Phúc Đạt'
      },
      bid_amount: '8,550,000',
      bid_date: '2023-10-02'
    },
    {
      id: 12,
      user: {
        id: 105,
        name: 'Lê Minh Đức'
      },
      bid_amount: '8,400,000',
      bid_date: '2023-10-01'
    },
    {
      id: 11,
      user: {
        id: 101,
        name: 'Trần Dương Phúc Đạt'
      },
      bid_amount: '8,200,000',
      bid_date: '2023-09-30'
    },
  ]);

  return <View style={styles.container}>
    {/* Fixed screen title: Cart */}
    <View style={styles.titleContainer}>
      <TouchableOpacity style={styles.iconButton}
        onPress={() => {
          goBack()
        }}>
        <IconFeather name='x' size={30} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.titleText}>Lịch sử đặt giá</Text>
    </View>

    <ScrollView>
      {/* Product basic info section */}
      <View style={{
        paddingHorizontal: 15,
        marginBottom: 15
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 10
        }}>
          <Image source={{ uri: product.images.at(0) }}
            style={{
              resizeMode: 'cover',
              width: 100,
              height: 100,
              borderRadius: 15
            }} />
          <View style={{
            flex: 1
          }}>
            <Text style={{
              color: 'black',
              fontFamily: fonts.OpenSansMedium,
              fontSize: fontSizes.h3
            }}>{product.name}</Text>
            <Text style={{
              color: 'black',
              fontFamily: fonts.OpenSansBold,
              fontSize: fontSizes.h2
            }}>{product.price} VNĐ</Text>
          </View>
        </View>
      </View>

      {/* Bidding summary section */}
      <View style={{
        paddingHorizontal: 15,
        gap: 10,
        marginVertical: 10
      }}>
        <Text style={{
          color: 'black',
          fontFamily: fonts.OpenSansBold,
          fontSize: fontSizes.h2
        }}>Thông tin sản phẩm</Text>
        <View style={{ gap: 10, marginTop: 5 }}>
          <ListingDetailInfoText label='Thời gian còn lại' text='2 ngày 13 giờ'
            secondText='Chủ nhật, 8 tháng 10 2023, 09:56 PM' />
          <ListingDetailInfoText label='Số lần đặt' text='3' />
          <ListingDetailInfoText label='Người tham gia' text='2' />
        </View>
      </View>

      {/* Bidding history section */}
      <View style={{
        paddingHorizontal: 15,
        gap: 10,
        marginVertical: 10
      }}>
        <Text style={{
          color: 'black',
          fontFamily: fonts.OpenSansBold,
          fontSize: fontSizes.h2
        }}>Lịch sử đặt giá</Text>
        <View style={{ gap: 10, marginTop: 5 }}>
          {(Array.isArray(bidHistory) && bidHistory.length) ? <View>
            {bidHistory.map((bid) =>
              <BidHistoryItem bid={bid} key={bid.id} />)}
            <View>
              <View style={{
                flexDirection: 'row',
                marginVertical: 5
              }}>
                <View style={{ flex: 5 }}>
                  <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h4
                  }}>8,000,000 VNĐ</Text>
                  <Text style={{
                    color: colors.darkGreyText,
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h4
                  }}>{product.seller.seller_name}</Text>
                </View>
                <View style={{ flex: 4, flexDirection: 'row' }}>
                  <Text style={{
                    color: 'black',
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h4
                  }}>Giá khởi điểm</Text>
                </View>
              </View>
            </View>
          </View> : <View>
            <Text style={{
              color: colors.greyText,
              fontSize: fontSizes.h4,
              textAlign: 'center',
              fontFamily: fonts.OpenSansMedium,
              marginVertical: 30
            }}>Không có lần đặt giá nào để hiển thị</Text>
          </View>}
        </View>
      </View>
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
    fontFamily: fonts.OpenSansBold,
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
    height: 1.2,
    backgroundColor: colors.darkGrey,
    marginRight: 10,
    marginTop: 10
  }
});

export default BiddingHistory;