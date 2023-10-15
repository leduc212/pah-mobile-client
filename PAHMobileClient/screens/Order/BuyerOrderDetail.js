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
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';

function BuyerOrderDetail(props) {
  // Navigation
  const {navigation, route} = props;

  // Function of navigate to/back
  const {navigate, goBack} = navigation;
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
          <IconFeather name="shopping-cart" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Status and note */}
        <View style={{backgroundColor: 'white', marginBottom: 10}}>
          <View style={styles.statusSection}>
            <View style={{flex: 80}}>
              <Text style={styles.statusText}>Đơn hàng đã hoàn thành</Text>
              <Text style={styles.noteText}>
                Nếu hàng nhận được có vấn đề, bạn có thể gửi yêu cầu Trả
                hàng/Hoàn tiền trước 16/10/2023
              </Text>
            </View>
            <View style={{flex: 20, alignItems: 'center'}}>
              <IconAntDesign name="like2" size={30} color={colors.primary} />
            </View>
          </View>
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <IconEvilIcons name="location" size={30} color={colors.black} />
              <Text style={styles.addressTitleText}>Địa chỉ nhận hàng</Text>
              <TouchableOpacity style={{marginLeft: 'auto'}}>
                <Text style={styles.copyTextButton}>SAO CHÉP</Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: 10, paddingHorizontal: 25}}>
              <Text style={styles.addressDetailText}>Nguyễn Huỳnh Tuấn</Text>
              <Text style={styles.addressDetailText}>0966948473</Text>
              <Text style={styles.addressDetailText}>
                Safira Khang Điền, đường Võ Chí Công, Phường Phú Hữu, Thành Phố
                Thủ Đức, TP. Hồ Chí Minh
              </Text>
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
              style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.sellerNameText}>Seller</Text>
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
          <View style={styles.itemSection}>
            <View style={styles.itemImageZone}>
              <Image
                width={70}
                height={70}
                borderRadius={10}
                source={{
                  uri: 'https://i.pinimg.com/564x/34/e0/7a/34e07adbd823772cde8247405733a0e2.jpg',
                }}
              />
            </View>
            <View style={styles.itemDetailSection}>
              <Text numberOfLines={1} style={styles.itemTitleText}>
                Tựa đề
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.itemDescriptionText}>Airpods 3-Xám</Text>
                <Text style={styles.itemQuantityText}>x1</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemMoneyText}>đ 59.000</Text>
              </View>
            </View>
          </View>
          <View style={styles.orderDetailFooter}>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.orderTotalMoneyText}>Thành tiền</Text>
              <Text style={styles.orderTotalMoneyText}>đ 75.500</Text>
            </View>
            <Text>
              <Text style={styles.orderNoteText}>Vui lòng thanh toán </Text>
              <Text style={styles.orderNoteMoneyText}>đ 75.500</Text>
              <Text style={styles.orderNoteText}> khi nhận hàng</Text>
            </Text>
          </View>
        </View>
        {/* Payment method */}
        <View style={{backgroundColor: 'white', padding: 15, marginBottom: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconEvilIcons name="location" size={20} color={colors.black} />
            <Text style={styles.paymentMethodTitle}>
              Phương thức thanh toán
            </Text>
          </View>
          <Text style={styles.paymentMethodText}>Thanh toán khi nhận hàng</Text>
        </View>
        {/* Order time and id */}
        <View style={{backgroundColor: 'white', padding: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.orderIdText}>Mã đơn hàng</Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 'auto',
              }}>
              <Text style={styles.orderIdText}>2324324ASSDF</Text>
              <TouchableOpacity>
                <Text style={styles.copyTextButton}>SAO CHÉP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingVertical:10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.orderTimeText}>Thời gian đặt hàng</Text>
            <Text style={styles.orderTimeText}>22-09-2023 13:24</Text>
          </View>
          <View style={{
            padding:10,
            borderColor:colors.grey,
            borderTopWidth:1
          }}>
            <TouchableOpacity style={styles.buyAgainButton}>
                <Text style={styles.buyAgainText}>Mua lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
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
  statusSection: {
    backgroundColor: colors.darkGrey,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  statusText: {
    marginBottom: 15,
    color: colors.black,
    fontSize: fontSizes.h3,
    fontFamily: fonts.OpenSansBold,
  },
  noteText: {
    color: colors.black,
    fontSize: fontSizes.h5,
    fontFamily: fonts.OpenSansMedium,
  },
  addressTitleText: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  addressDetailText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  copyTextButton: {
    marginLeft: 7,
    color: colors.primary,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  sellerNameText: {
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h4,
  },
  goToSellerText: {
    marginRight: 5,
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
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
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  itemDescriptionText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  itemQuantityText: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  itemMoneyText: {
    marginLeft: 'auto',
    color: 'red',
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  orderDetailFooter: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.grey,
  },
  orderTotalMoneyText: {
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h5,
  },
  orderNoteText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h6,
  },
  orderNoteMoneyText: {
    color: 'red',
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  paymentMethodTitle: {
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h4,
  },
  paymentMethodText: {
    marginTop: 10,
    marginStart: 15,
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  orderIdText: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  orderTimeText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  buyAgainButton: {
    flex: 1,
    alignItems: 'center',
    borderWidth:1,
    borderRadius:10,
},
  buyAgainText: {
    color: colors.greyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h3,
  }
});
export default BuyerOrderDetail;
