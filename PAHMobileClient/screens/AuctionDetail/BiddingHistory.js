import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {
  ListingDetailInfoText,
  TimeLeft,
  BidHistoryItem
} from '../../components';
import {
  Auction as AuctionRepository,
  Bid as BidRepository
} from '../../repositories';
import moment from 'moment';

function BiddingHistory(props) {

  //// AUTH AND NAVIGATION
  // Auth Context
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  //// Data
  // Get auction_id from routes
  const { auction_id } = props.route.params;

  // Data for loading and refreshing
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Auction data
  const [auction, setAuction] = useState({
    product: {},
    seller: {},
    imageUrls: []
  });

  const [bidHistory, setBidHistory] = useState([]);

  //// FUNCTION
  // Get auction detail from current auction id
  function getAutionDetail() {
    setIsLoading(true);

    const promiseAuctionDetail = AuctionRepository.getAuctionDetail(axiosContext, auction_id)
      .then(response => {
        setAuction(response)
      })

    const promiseBidHistory = BidRepository.getBidsByAuctionId(axiosContext, auction_id)
      .then(response => {
        setBidHistory(response);
      })

    Promise.all([promiseAuctionDetail, promiseBidHistory])
      .then((values) => {
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAutionDetail();
  }, []);

  // Price format function
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

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

    {isLoading ? <View style={{
      flex: 1,
      justifyContent: 'center'
    }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View> : <ScrollView>
      {/* Auction basic info section */}
      <View style={{
        paddingHorizontal: 15,
        marginBottom: 15
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 10
        }}>
          <Image source={{ uri: auction.imageUrls.at(0) }}
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
            }}>{auction.product.name}</Text>
            <Text style={{
              color: 'black',
              fontFamily: fonts.OpenSansBold,
              fontSize: fontSizes.h2
            }}>{numberWithCommas(auction.currentPrice)} VNĐ</Text>
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
        }}>Thông tin cuộc đấu giá</Text>
        <View style={{ gap: 10, marginTop: 5 }}>
          <ListingDetailInfoText label='Thời gian còn lại' text={moment(auction.endedAt).fromNow()}
            secondText={moment(auction.endedAt).format('dd, Do MMMM YYYY, h:mm A')} />
          <ListingDetailInfoText label='Số lần đặt' text={auction.numberOfBids} />
          <ListingDetailInfoText label='Người tham gia' text={auction.numberOfBidders} />
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
                  }}>{numberWithCommas(auction.startingPrice)} VNĐ</Text>
                  <Text style={{
                    color: colors.darkGreyText,
                    fontFamily: fonts.OpenSansMedium,
                    fontSize: fontSizes.h4
                  }}>{auction.seller.name}</Text>
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
    </ScrollView>}

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