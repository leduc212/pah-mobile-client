import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { colors, fontSizes, images, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import { AxiosContext } from '../../context/AxiosContext';
import { Order as OrderRepository } from '../../repositories';
import { orderStatusText } from '../../utilities/OrderStatus';
import { numberWithCommas } from '../../utilities/PriceFormat';
import moment from 'moment';

function OrderList(props) {
  //// AXIOS AND NAVIGATION
  // Axios Context
  const axiosContext = useContext(AxiosContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  //// DATA
  // Data for orders
  const [orders, setOrders] = useState([]);

  // Loading state data
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isAllEmpty = () => !(Array.isArray(orders) && orders.length);

  // Order status filter
  const [orderStatus, setOrderStatus] = useState([5, 2, 3, 4, 10, 11, 12]);
  const [currentOrderStatus, setCurrentOrderStatus] = useState(5);

  // Filtered order
  const [filteredOrders, setFilteredOrders] = useState([]);

  //// FUNCTIONS
  // Get all orders
  function getAllOrder() {
    setIsLoading(true);
    OrderRepository.getAllOrderCurrentBuyer(axiosContext)
      .then(response => {
        console.log(response);
        setOrders(response);
        setFilteredOrders(response.filter(item => item.status == currentOrderStatus));
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getAllOrder();
  }, []);

  useEffect(() => {
    setFilteredOrders(orders.filter(item => item.status == currentOrderStatus));
  }, [currentOrderStatus]);

  // Scroll view refresh
  const onRefresh = () => {
    setRefreshing(true);
    getAllOrder();
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              goBack();
            }}>
            <IconFeather name="chevron-left" size={25} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.titleText}>Đơn hàng</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigate('Cart');
            }}>
            <IconFeather name="shopping-cart" size={20} color={'black'} />
          </TouchableOpacity>
        </View>

        {/* Filter section */}
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={orderStatus}
            renderItem={({ item }) => {
              return <TouchableOpacity style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderBottomWidth: item == currentOrderStatus ? 2 : null,
                borderBottomColor: item == currentOrderStatus ? colors.primary : null
              }}
              onPress={() => {
                setCurrentOrderStatus(item);
              }}>
                <Text style={{
                  color: item == currentOrderStatus ? colors.primary : 'black',
                  fontFamily: fonts.OpenSansMedium,
                  fontSize: fontSizes.h5
                }}>{orderStatusText(item)}</Text>
              </TouchableOpacity>
            }}
            keyExtractor={status => status}
          />
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
          <View style={{ flex: 1 }}>
            {isAllEmpty() ? <View style={{
              flex: 1,
              alignItems: 'center',
              paddingTop: 150
            }}>
              <Image source={images.warningImage} style={{
                resizeMode: 'cover',
                width: 140,
                height: 140
              }} />
              <Text style={{
                fontSize: fontSizes.h4,
                fontFamily: fonts.OpenSansMedium,
                color: 'black',
                textAlign: 'center',
                marginHorizontal: 35,
                marginTop: 10
              }}>Không thể tìm thấy đơn hàng nào.</Text>
              <TouchableOpacity onPress={() => getAllOrder()}>
                <Text style={{
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                  color: colors.primary,
                  textAlign: 'center',
                  marginHorizontal: 35,
                  marginTop: 20
                }}>Tải lại</Text>
              </TouchableOpacity>
            </View> : <View style={{ backgroundColor: colors.grey, flex: 1 }}>
              <ScrollView
                style={{
                  paddingVertical: 5
                }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {filteredOrders.map(order =>
                  <View style={{
                    marginBottom: 5,
                    backgroundColor: 'white',
                    padding: 15,
                  }} key={order.id}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <View style={styles.orderImageZone}>
                        <Image
                          width={100}
                          height={100}
                          borderRadius={10}
                          source={{ uri: order.orderItems[0].imageUrl }} />
                      </View>
                      <View style={{ flex: 70 }}>
                        <Text style={styles.orderStatusText}>{orderStatusText(order.status)}</Text>
                        <Text numberOfLines={1} style={styles.orderTitleText}>Đơn hàng #{order.id}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                          }}>
                          <Text style={styles.orderMoneyText}>
                            {numberWithCommas(order.totalAmount)} VNĐ
                          </Text>
                          <Text style={styles.orderDateText}>{moment(order.orderDate).format('DD/MM/YYYY')}</Text>
                        </View>
                        <Text style={styles.orderShippingText}>
                          {numberWithCommas(order.shippingCost)} VNĐ cước vận chuyển
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={styles.orderFeedbackText}>Đã phản hồi</Text>
                          <Text style={styles.orderItemCountText}>2 sản phảm</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigate('OrderDetail', { orderId: order.id })
                        }}
                        style={styles.orderDetailButton}>
                        <Text style={styles.orderDetailText}>Chi tiết</Text>
                      </TouchableOpacity>
                      {[4, 10, 11, 12].includes(order.status) && <TouchableOpacity style={styles.buyAgainButton}>
                        <Text style={styles.buyAgainText}>Mua lại</Text>
                      </TouchableOpacity>}
                    </View>
                  </View>)}
              </ScrollView>
            </View>}
          </View>
        )}
      </View>
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
    padding: 12,
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
  emptyText: {
    color: colors.greyText,
    fontSize: fontSizes.h4,
    textAlign: 'center',
    fontFamily: fonts.OpenSansMedium,
    marginVertical: 30,
  },
  orderDetailButton: {
    width: '48%',
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderDetailText: {
    color: 'white',
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansBold,
  },
  buyAgainButton: {
    width: '48%',
    height: 40,
    borderRadius: 100,
    borderColor: colors.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyAgainText: {
    color: colors.primary,
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansMedium,
  },
  buySimilarButton: {
    width: '100%',
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buySimilarText: {
    color: 'white',
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansBold,
  },
  orderImageZone: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  orderStatusText: {
    color: colors.primary,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  orderTitleText: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  orderMoneyText: {
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h4,
  },
  orderDateText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  orderShippingText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  orderFeedbackText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  orderItemCountText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  }
});
export default OrderList;
