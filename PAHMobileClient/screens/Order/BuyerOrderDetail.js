import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { colors, fontSizes, images, fonts, enumConstants } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import { AxiosContext } from '../../context/AxiosContext';
import { numberWithCommas } from '../../utilities/PriceFormat';
import { Order as OrderRepository } from '../../repositories';
import moment from 'moment';
function BuyerOrderDetail(props) {
  //// AXIOS AND NAVIGATION
  // Axios Context
  const axiosContext = useContext(AxiosContext);
  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  //// DATA
  // Get orderId from routes
  const { orderId } = props.route.params;

  // Order detail data
  const [order, setOrder] = useState({});

  // Loading state data
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  //// FUNCTIONS
  // Get all orders
  function getOrder() {
    setIsLoading(true);
    OrderRepository.getOrderDetail(axiosContext, orderId)
      .then(response => {
        setOrder(response);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }

  // Complete order
  function orderComplete() {
    OrderRepository.orderComplete(axiosContext, orderId)
      .then(response => {
        getOrder();
      })
      .catch(error => {
      });
  }

  useEffect(() => {
    getOrder();
  }, []);

  // Scroll view refresh
  const onRefresh = () => {
    setRefreshing(true);
    getOrder();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            goBack();
          }}>
          <IconFeather name="chevron-left" size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Thông tin đơn hàng</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigate('Cart');
          }}>
          <IconFeather name="shopping-cart" size={20} color={'black'} />
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
      ) : <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        {/* Status and note */}
        <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
          {order.status == enumConstants.orderStatus.WaitingSellerConfirm && <View style={styles.statusSection}>
            <View style={{ flex: 80 }}>
              <Text style={styles.statusText}>Chờ xác nhận</Text>
              <Text style={styles.noteText}>
                Đang chờ người bán xác nhận đơn hàng, trong thời gian này, bạn có thể liên hệ với người bán để xác nhận thêm thông tin đơn hàng nhé!
              </Text>
            </View>
            <View style={{ flex: 20, alignItems: 'center' }}>
              <Image
                source={images.walletImage}
                style={{
                  resizeMode: 'cover',
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          </View>}

          {order.status == enumConstants.orderStatus.ReadyForPickup && <View style={styles.statusSection}>
            <View style={{ flex: 80 }}>
              <Text style={styles.statusText}>Chờ lấy hàng</Text>
              <Text style={styles.noteText}>
                Đơn hàng của bạn đã được người bán xác nhận và trong giai đoạn chuẩn bị hàng hóa giao đi. Hãy kiên nhẫn chờ đợi nhé!
              </Text>
            </View>
            <View style={{ flex: 20, alignItems: 'center' }}>
              <Image
                source={images.walletImage}
                style={{
                  resizeMode: 'cover',
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          </View>}

          {order.status == enumConstants.orderStatus.Delivering && <View style={styles.statusSection}>
            <View style={{ flex: 80 }}>
              <Text style={styles.statusText}>Đang vận chuyển</Text>
              <Text style={styles.noteText}>
                Đơn hàng của bạn đã được giao cho đơn vị vận chuyển và đang trên đường tới chỗ bạn. Hãy kiên nhẫn chờ đợi nhé!
              </Text>
            </View>
            <View style={{ flex: 20, alignItems: 'center' }}>
              <Image
                source={images.walletImage}
                style={{
                  resizeMode: 'cover',
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          </View>}

          {order.status == enumConstants.orderStatus.Delivered && <View style={styles.statusSection}>
            <View style={{ flex: 80 }}>
              <Text style={styles.statusText}>Đơn hàng đã được giao thành công</Text>
              <Text style={styles.noteText}>
                Bạn hãy xác nhận việc nhận hàng. Nếu không xác nhận thì đơn hàng sẽ được đánh dấu là giao thành công trong vòng 48 giờ.
              </Text>
            </View>
            <View style={{ flex: 20, alignItems: 'center' }}>
              <Image
                source={images.walletImage}
                style={{
                  resizeMode: 'cover',
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          </View>}

          {order.status == enumConstants.orderStatus.Done && <View style={styles.statusSection}>
            <View style={{ flex: 80 }}>
              <Text style={styles.statusText}>Đơn hàng đã hoàn thành</Text>
              <Text style={styles.noteText}>
                Cảm ơn các bạn đã mua sắm tại PAH!
              </Text>
            </View>
            <View style={{ flex: 20, alignItems: 'center' }}>
              <Image
                source={images.walletImage}
                style={{
                  resizeMode: 'cover',
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          </View>}

          {([enumConstants.orderStatus.CancelledByBuyer, enumConstants.orderStatus.CancelledBySeller]
            .includes(order.status)) && <View style={styles.statusSection}>
              <View style={{ flex: 80 }}>
                <Text style={styles.statusText}>Đơn hàng đã bị hủy</Text>
                <Text style={styles.noteText}>
                  Chi tiết tại mục 'Chi tiết đơn hủy'
                </Text>
              </View>
              <View style={{ flex: 20, alignItems: 'center' }}>
                <Image
                  source={images.walletImage}
                  style={{
                    resizeMode: 'cover',
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
            </View>}

          <View style={{ marginVertical: 15, marginLeft: 5, marginRight: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <IconEvilIcons name="location" size={30} color={colors.black} />
              <Text style={styles.addressTitleText}>Địa chỉ nhận hàng</Text>
              <TouchableOpacity style={{ marginLeft: 'auto' }}>
                <Text style={styles.copyTextButton}>SAO CHÉP</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 10, paddingHorizontal: 30 }}>
              <Text style={styles.addressDetailText}>{order.recipientName}</Text>
              <Text style={styles.addressDetailText}>(+84) {order.recipientPhone}</Text>
              <Text style={styles.addressDetailText}>{order.recipientAddress}</Text>
            </View>
          </View>
        </View>
        {/* Order Items */}
        <View
          style={{
            backgroundColor: 'white',
            marginBottom: 10,
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: colors.grey,
              paddingVertical: 15,
            }}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10
                }}>
                <IconFA5 name='store-alt' size={15} color={colors.black} />
                <Text style={styles.sellerNameText}>{order.seller.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 'auto',
                }}>
                <Text style={styles.goToSellerText}>Xem người bán</Text>
                <IconAntDesign name="right" size={15} color={colors.black} />
              </View>
            </TouchableOpacity>
          </View>
          {order.orderItems.map(orderItem =>
            <TouchableOpacity style={styles.itemSection} key={orderItem.productId}
              onPress={() => navigate('ListingDetail', { product_id: orderItem.productId })}>
              <View style={styles.itemImageZone}>
                <Image
                  width={70}
                  height={70}
                  borderRadius={10}
                  source={{
                    uri: orderItem.imageUrl,
                  }}
                />
              </View>
              <View style={styles.itemDetailSection}>
                <Text numberOfLines={1} style={styles.itemTitleText}>
                  {orderItem.productName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.itemDescriptionText}></Text>
                  <Text style={styles.itemQuantityText}>x{orderItem.quantity}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.itemMoneyText}>{order.orderItems[0].productType == 2 ?
                    'Sản phẩm đấu giá' : `đ${numberWithCommas(orderItem.price)}`
                  }</Text>
                </View>
              </View>
            </TouchableOpacity>)}

          <View style={styles.orderDetailFooter}>
            {order.orderItems[0].productType == 1 && <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.orderMoneyText}>Tổng tiền hàng</Text>
              <Text style={styles.orderMoneyText}>đ{numberWithCommas(order.totalAmount)}</Text>
            </View>}
            <View
              style={{
                marginBottom: order.orderItems[0].productType == 1 ? 10 : null,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.orderMoneyText}>Phí vận chuyển</Text>
              <Text style={styles.orderMoneyText}>{order.orderItems[0].productType == 1 ?
                `đ${numberWithCommas(order.shippingCost)}` : 'Người bán trả'}</Text>
            </View>
            {order.orderItems[0].productType == 1 && <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.orderTotalMoneyText}>Thành tiền</Text>
              <Text style={styles.orderTotalMoneyText}>đ{numberWithCommas(order.totalAmount + order.shippingCost)}</Text>
            </View>}
          </View>
        </View>
        {/* Payment method */}
        <View style={{ backgroundColor: 'white', padding: 15, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <IconFA5 name="wallet" size={18} color={colors.black} />
            <Text style={styles.paymentMethodTitle}>
              Phương thức thanh toán
            </Text>
          </View>
          <Text style={styles.paymentMethodText}>Trả trước qua ví điện tử</Text>
        </View>
        {/* Order time and id */}
        <View style={{ backgroundColor: 'white', padding: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.orderIdText}>Mã đơn hàng</Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 'auto',
              }}>
              <Text style={styles.orderIdText}>#{order.id}</Text>
              <TouchableOpacity>
                <Text style={styles.copyTextButton}>SAO CHÉP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.orderTimeText}>Thời gian đặt hàng</Text>
            <Text style={styles.orderTimeText}>{moment(order.orderDate).format('DD/MM/YYYY HH:mm')}</Text>
          </View>
        </View>

        {/* Cancel button */}
        {order.status == enumConstants.orderStatus.WaitingSellerConfirm && <View style={{
          padding: 15,
          marginVertical: 10
        }}>
          <TouchableOpacity style={styles.buyAgainButton}>
            <Text style={styles.buyAgainText}>Hủy đơn hàng</Text>
          </TouchableOpacity>
        </View>}
      </ScrollView>}
      {[enumConstants.orderStatus.WaitingSellerConfirm, enumConstants.orderStatus.ReadyForPickup, enumConstants.orderStatus.Delivering]
        .includes(order.status) && <View style={{
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 10
        }}>
          <TouchableOpacity
            disabled={true}
            style={{
              borderRadius: 5,
              paddingVertical: 10,
              backgroundColor: colors.grey
            }}>
            <Text style={styles.buyAgainText}>Đang xử lý</Text>
          </TouchableOpacity>
        </View>}
      {order.status == enumConstants.orderStatus.Delivered && <View style={{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10
      }}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            paddingVertical: 10,
            backgroundColor: colors.primary
          }}
          onPress={() => orderComplete()}>
          <Text style={{
            fontSize: fontSizes.h3,
            fontFamily: fonts.MontserratMedium,
            textAlign: 'center',
            color: 'white'
          }}>Tôi đã nhận được hàng</Text>
        </TouchableOpacity>
      </View>}
      {order.status == enumConstants.orderStatus.Done && order.orderItems[0].productType == 1
        && <View style={{
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 10
        }}>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              paddingVertical: 10,
              backgroundColor: colors.primary
            }}
            onPress={() => { }}>
            <Text style={{
              fontSize: fontSizes.h3,
              fontFamily: fonts.MontserratMedium,
              textAlign: 'center',
              color: 'white'
            }}>Mua lại</Text>
          </TouchableOpacity>
        </View>}
      {[enumConstants.orderStatus.CancelledByBuyer, enumConstants.orderStatus.CancelledBySeller]
        .includes(order.status) && <View style={{
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 10
        }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 5,
                paddingVertical: 10,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.primary
              }}>
              <Text style={{
                fontSize: fontSizes.h3,
                fontFamily: fonts.MontserratMedium,
                textAlign: 'center',
                color: colors.primary
              }}>Chi tiết đơn hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 5,
                paddingVertical: 10,
                backgroundColor: colors.primary
              }}>
              <Text style={{
                fontSize: fontSizes.h3,
                fontFamily: fonts.MontserratMedium,
                textAlign: 'center',
                color: 'white'
              }}>Mua lại</Text>
            </TouchableOpacity>
          </View>
        </View>}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
  backButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.grey,
  },
  addButton: {
    marginLeft: 'auto',
    padding: 12,
    borderRadius: 5,
    backgroundColor: colors.grey,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white'
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.MontserratBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
  emptyText: {
    color: colors.greyText,
    fontSize: fontSizes.h4,
    textAlign: 'center',
    fontFamily: fonts.MontserratMedium,
    marginVertical: 30,
  },
  statusSection: {
    backgroundColor: colors.darkGrey,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  statusText: {
    marginBottom: 15,
    color: colors.black,
    fontSize: fontSizes.h4,
    fontFamily: fonts.MontserratBold,
  },
  noteText: {
    color: colors.black,
    fontSize: fontSizes.h5,
    fontFamily: fonts.MontserratMedium,
  },
  addressTitleText: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  addressDetailText: {
    color: colors.greyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  copyTextButton: {
    marginLeft: 7,
    color: colors.primary,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  sellerNameText: {
    color: colors.black,
    fontFamily: fonts.MontserratBold,
    fontSize: fontSizes.h4,
  },
  goToSellerText: {
    marginRight: 5,
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  itemSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImageZone: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  itemDetailSection: {
    flex: 80,
    paddingVertical: 15,
    paddingStart: 10,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  itemTitleText: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  itemDescriptionText: {
    color: colors.greyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  itemQuantityText: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  itemMoneyText: {
    marginLeft: 'auto',
    color: colors.primary,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  orderDetailFooter: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.grey,
  },
  orderTotalMoneyText: {
    color: colors.black,
    fontFamily: fonts.MontserratBold,
    fontSize: fontSizes.h5,
  },
  orderMoneyText: {
    color: colors.darkGreyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  orderNoteText: {
    color: colors.greyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h6,
  },
  orderNoteMoneyText: {
    color: colors.primary,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  paymentMethodTitle: {
    color: colors.black,
    fontFamily: fonts.MontserratBold,
    fontSize: fontSizes.h4,
  },
  paymentMethodText: {
    marginTop: 10,
    marginStart: 28,
    color: colors.greyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  orderIdText: {
    color: colors.black,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4,
  },
  orderTimeText: {
    color: colors.greyText,
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h5,
  },
  buyAgainButton: {
    borderRadius: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.darkGreyText
  },
  buyAgainText: {
    fontSize: fontSizes.h3,
    fontFamily: fonts.MontserratMedium,
    textAlign: 'center',
    color: colors.darkGreyText
  }
});
export default BuyerOrderDetail;
