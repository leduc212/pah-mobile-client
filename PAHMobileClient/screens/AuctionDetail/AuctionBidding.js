import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {AxiosContext} from '../../context/AxiosContext';
import {colors, fontSizes, fonts, images} from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {SliderBox} from 'react-native-image-slider-box';
import {ListingDetailInfoText} from '../../components';
import CountDown from 'react-native-countdown-fixed';
import {numberWithCommas} from '../../utilities/PriceFormat';
import {differenceInSeconds} from 'date-fns';
import {
  Auction as AuctionRepository,
  Bid as BidRepository,
} from '../../repositories';
import {current} from '@reduxjs/toolkit';

function AuctionBidding(props) {
  // Get auction_id from routes
  const {auction_id, currentPrice, step} = props.route.params;

  // Auth Context
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);

  // Navigation
  const {navigation, route} = props;

  // Function of navigate to/back
  const {navigate, goBack} = navigation;

  // Data
  const [confirmModal, setConfirmModal] = useState(false);
  const [auction, setAuction] = useState({});
  const [bidHistory, setBidHistory] = useState([]);
  const [bidAmount, setBidAmount] = useState(parseInt(currentPrice + step));
  const [minBidAmount, setMinBidAmount] = useState(
    parseInt(currentPrice + step),
  );
  const isAllEmpty = () => !(Array.isArray(bidHistory) && bidHistory.length);
  // validating
  const validationBidAmount = () =>
    parseInt(bidAmount) >= auction.currentPrice + auction.step;
  const duration = differenceInSeconds(
    new Date(auction.endedAt),
    new Date(auction.startedAt),
  );

  // Data for loading and refreshing
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  //increment/decrement bid amount
  const bidIncrement = () => {
    setBidAmount(bidAmount + auction.step);
  };
  const bidDecrement = () => {
    setBidAmount(bidAmount - auction.step);
  };

  ////FUNCTION
  function getAuctionDetail() {
    setIsLoading(true);
    const promiseAuctionDetail = AuctionRepository.getAuctionDetail(
      axiosContext,
      auction_id,
    ).then(response => {
      setAuction(response);
    });

    const promiseBidHistory = BidRepository.getBidsByAuctionId(
      axiosContext,
      auction_id,
    ).then(response => {
      setBidHistory(response);
    });

    Promise.all([promiseAuctionDetail, promiseBidHistory])
      .then(values => {
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }

  function getBidAmount() {
    setBidAmount(auction.currentPrice + auction.step);
    setMinBidAmount(auction.currentPrice + auction.step);
  }

  useEffect(() => {
    getAuctionDetail();
  }, []);

  // Scroll view refresh
  const onRefresh = () => {
    setRefreshing(true);
    getBidAmount();
    getAuctionDetail();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* Fixed screen title: Cart */}
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            goBack();
          }}>
          <IconFeather name="chevron-left" size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Đấu giá</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            alert('go to wallet');
          }}>
          <IconAntDesign name="wallet" size={30} color={'black'} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {auction.title ? (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {/* Information section */}
              <View>
                <SliderBox
                  images={auction.imageUrls}
                  sliderBoxHeight={480}
                  dotColor={colors.primary}
                  inactiveDotColor="#90A4AE"
                />
                <Text style={styles.auctionTitleText}>{auction.title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                  }}>
                  <View>
                    <Text style={styles.auctionDetailText}>Kết thúc trong</Text>
                    <CountDown
                      size={14}
                      until={duration}
                      onFinish={() => alert('Finished')}
                      digitStyle={{borderWidth: 2, borderColor: '#1CC625'}}
                      timeLabels={{m: null, s: null}}
                      separatorStyle={{color: '#1CC625'}}
                      showSeparator
                    />
                  </View>
                  <View>
                    <Text style={styles.auctionDetailText}>Giá cao nhất</Text>
                    <Text style={styles.auctionHighestBidText}>
                      ₫{numberWithCommas(auction.currentPrice)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Bidding History */}
              <View style={{paddingHorizontal: 15, marginTop: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.auctionHistoryTitle}>
                    Lịch sử đấu giá
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigate('BiddingHistory', {auction_id: auction.id});
                    }}>
                    <Text style={styles.auctionHistoryButtonText}>
                      Xem tất cả
                    </Text>
                  </TouchableOpacity>
                </View>
                {isAllEmpty() ? (
                  <View style={styles.auctionBidderDetail}>
                    <Text style={styles.biddingHistoryNote}>
                      Chưa có người đặt giá
                    </Text>
                  </View>
                ) : (
                  <View>
                    {bidHistory.slice(0, 3).map(bid => (
                      <View style={styles.auctionBidderDetail} key={bid.id}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode="cover"
                            height={50}
                            width={50}
                            borderRadius={5}
                            source={{
                              uri: 'https://i.pinimg.com/564x/34/e0/7a/34e07adbd823772cde8247405733a0e2.jpg',
                            }}
                          />
                          <Text style={styles.auctionBidderName}>
                            {bid.bidderName}
                          </Text>
                        </View>
                        <Text style={styles.auctionBidderMoney}>
                          ₫{numberWithCommas(bid.bidAmount)}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* Bidding section */}
              <View
                style={{
                  paddingVertical: 5,
                  borderWidth: 2,
                  borderRadius: 5,
                  marginHorizontal: 15,
                  marginTop: 10,
                  borderColor: colors.primary,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.MontserratBold,
                    fontSize: fontSizes.h4,
                    color: colors.greyText,
                    alignSelf: 'center',
                  }}>
                  Số tiền đặt của bạn
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 0,
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity onPress={bidDecrement}>
                    <IconAntDesign
                      name="minussquare"
                      size={30}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: fonts.MontserratMedium,
                      fontSize: fontSizes.h2,
                      color: 'black',
                    }}>
                    ₫{numberWithCommas(bidAmount)} VNĐ
                  </Text>
                  <TouchableOpacity onPress={bidIncrement}>
                    <IconAntDesign
                      name="plussquare"
                      size={30}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
                {!validationBidAmount() && (
                  <Text
                    style={{
                      fontFamily: fonts.MontserratMedium,
                      fontSize: fontSizes.h6,
                      color: 'red',
                      alignSelf: 'center',
                    }}>
                    Số tiền đặt tối thiểu là ₫{numberWithCommas(minBidAmount)}{' '}
                    VNĐ
                  </Text>
                )}
              </View>

              {/* Bid buttons */}
              <View
                style={{
                  paddingHorizontal: 15,
                  marginBottom: 20,
                  marginTop: 20,
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  disabled={!validationBidAmount()}
                  style={{
                    borderRadius: 5,
                    backgroundColor: validationBidAmount()
                      ? colors.primary
                      : colors.darkGrey,
                    paddingVertical: 10,
                  }}
                  onPress={() => setConfirmModal(!confirmModal)}>
                  <Text
                    style={{
                      fontSize: fontSizes.h3,
                      fontFamily: fonts.MontserratBold,
                      color: validationBidAmount() ? 'white' : colors.greyText,
                      textAlign: 'center',
                    }}>
                    Đấu giá
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                alignItems: 'center',
                paddingTop: 150,
              }}>
              <Image
                source={images.warningImage}
                style={{
                  resizeMode: 'cover',
                  width: 140,
                  height: 140,
                }}
              />
              <Text
                style={{
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.MontserratMedium,
                  color: 'black',
                  textAlign: 'center',
                  marginHorizontal: 35,
                  marginTop: 10,
                }}>
                Không thể tìm thấy thông tin sản phẩm này.
              </Text>
              <TouchableOpacity onPress={() => getAutionDetail()}>
                <Text
                  style={{
                    fontSize: fontSizes.h5,
                    fontFamily: fonts.MontserratMedium,
                    color: colors.primary,
                    textAlign: 'center',
                    marginHorizontal: 35,
                    marginTop: 20,
                  }}>
                  Tải lại
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Confirm modal */}
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={confirmModal}
        onRequestClose={() => {
          setConfirmModal(!confirmModal);
        }}
        style={{margin: 0}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setConfirmModal(!confirmModal);
              }}>
              <IconFeather name="x" size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Xác nhận đấu giá</Text>
          </View>

          {/* Bidding information */}
          <View
            style={{
              gap: 10,
              marginHorizontal: 20,
              marginBottom: 30,
            }}>
            <ListingDetailInfoText label="Giá đặt mới" text="8,600,000 VNĐ" />
            <ListingDetailInfoText
              label="Thời gian còn lại"
              text="2 ngày 13 giờ"
            />
            <ListingDetailInfoText
              label="Số dư khả dụng bị trừ"
              text="200,000 VNĐ"
              secondText="Người tham gia cần có đủ số dư khả dụng trong ví PAH"
            />
          </View>

          {/* Confirm buttons */}
          <View
            style={{
              paddingHorizontal: 20,
              gap: 10,
              marginBottom: 20,
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: fontSizes.h5,
                fontFamily: fonts.MontserratMedium,
                color: 'black',
              }}>
              Khi bạn xác nhận giá đặt của mình, điều đó có nghĩa là bạn cam kết
              mua mặt hàng này nếu bạn là người thắng cuộc. Điều đó cũng có
              nghĩa là bạn đã đọc và đồng ý với Điều khoản của PAH.
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1.2,
                borderColor: colors.primary,
                borderRadius: 5,
                backgroundColor: colors.primary,
                paddingVertical: 10,
              }}
              onPress={() => goBack()}>
              <Text
                style={{
                  fontSize: fontSizes.h3,
                  fontFamily: fonts.MontserratBold,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Xác nhận đấu giá
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconButton: {
    padding: 12,
    borderRadius: 5,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.MontserratBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
  titleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  separator: {
    height: 1.5,
    backgroundColor: colors.darkGreyText,
    marginRight: 10,
  },
  descriptionText: {
    color: 'black',
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h3,
    alignSelf: 'center',
  },
  itemImageZone: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    height: 140,
    width: '100%',
  },
  auctionTitleText: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  auctionDetailText: {
    color: colors.greyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
    paddingVertical: 1,
  },
  auctionHighestBidText: {
    color: colors.primary,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h3,
  },
  auctionHistoryTitle: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h2,
  },
  auctionHistoryButtonText: {
    color: colors.primary,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  auctionBidderDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    backgroundColor: colors.darkGrey,
    marginTop: 7,
  },
  auctionBidderName: {
    marginStart: 10,
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  auctionBidderMoney: {
    marginStart: 10,
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  biddingHistoryNote: {
    marginStart: 10,
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
});

export default AuctionBidding;
