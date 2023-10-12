import React, {useState, useContext, useEffect, useCallback} from 'react';
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
import {colors, fontSizes, images, fonts} from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {AxiosContext} from '../../context/AxiosContext';
import {Order as OrderRepository} from '../../repositories';
import {useIsFocused} from '@react-navigation/native';
function OrderList(props) {
  //// AXIOS AND NAVIGATION
  // Axios Context
  const axiosContext = useContext(AxiosContext);

  // Navigation
  const {navigation, route} = props;

  // Function of navigate to/back
  const {navigate, goBack} = navigation;

  // On focus
  const isFocused = useIsFocused();

  //// DATA
  // Data for orders
  const [orders, setOrders] = useState([]);

  // Loading state data
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isAllEmpty = () => !(Array.isArray(orders) && orders.length);

  //// FUNCTIONS
  // Get all orders
  function getAllOrder() {
    setIsLoading(true);
    OrderRepository.getAllOrderCurrentUser(axiosContext)
      .then(response => {
        setOrders(response);
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
    getAllOrder();
  }, [isFocused]);

  // Scroll view refresh
  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
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
            <IconFeather name="shopping-cart" size={25} color={'black'} />
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
          <View>
            <ScrollView
              style={{
                paddingHorizontal: 15,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View style={{marginBottom:15}}>
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
                    source={{uri:'https://i.pinimg.com/564x/34/e0/7a/34e07adbd823772cde8247405733a0e2.jpg'}}/>
                  </View>
                  <View style={{flex: 70}}>
                    <Text style={styles.orderStatusText}>HOÀN THÀNH</Text>
                    <Text numberOfLines={1} style={styles.orderTitleText}>Tựa đềTựa đềTựa đềTựa đềTựa đềTựa đềTựa đềTựa đề</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.orderMoneyText}>
                        1.222.800.000 đ
                      </Text>
                      <Text style={styles.orderDateText}>10/1/2023</Text>
                    </View>
                    <Text style={styles.orderShippingText}>
                      Giao hàng miễn phí
                    </Text>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
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
                  onPress={()=>{
                    navigate('OrderDetail')
                  }}
                  style={styles.orderDetailButton}>
                    <Text style={styles.orderDetailText}>Chi tiết</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buyAgainButton}>
                    <Text style={styles.buyAgainText}>Mua lại</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
    padding: 8,
    borderRadius: 50,
    backgroundColor: colors.grey,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
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
  buySimilarButton:{
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
    paddingHorizontal:5
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
  orderItemCountText:{
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  }
});
export default OrderList;
