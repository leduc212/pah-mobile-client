import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors, fontSizes, fonts } from '../../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { ListingDetailInfoText } from '../../components';

function AuctionBidding(props) {
  // Get auction_id from routes
  const { auction_id } = props.route.params;

  // Auth Context
  const authContext = useContext(AuthContext);

  // Navigation
  const { navigation, route } = props;

  // Function of navigate to/back
  const { navigate, goBack } = navigation;

  // Data
  const [bidAmount, setBidAmount] = useState('8600000');
  const [confirmModal, setConfirmModal] = useState(false);
  // validating
  const validationBidAmount = () => parseInt(bidAmount) >= 8600000;

  return <View style={styles.container}>
    {/* Fixed screen title: Cart */}
    <View style={styles.titleContainer}>
      <TouchableOpacity style={styles.iconButton}
        onPress={() => {
          goBack()
        }}>
        <IconFeather name='x' size={30} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.titleText}>Đấu giá</Text>
    </View>

    {/* Information section */}
    <View style={{
      paddingHorizontal: 15,
      alignItems: 'center',
      gap: 5
    }}>
      <Text style={{
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h5,
        color: 'black'
      }}>Mức giá hiện tại: 8,550,000 VNĐ</Text>
      <Text style={{
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h5,
        color: 'black'
      }}>Bước giá: 50,000 VNĐ</Text>
      <Text style={{
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h5,
        color: 'black'
      }}>Lần đặt trước của bạn: 8,400,000 VNĐ</Text>
      <Text style={{
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h5,
        color: 'black'
      }}>Số dư khả dụng cần để đặt: 200,000 VNĐ</Text>
      <Text style={{
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h5,
        color: 'black'
      }}>Số dư khả dụng của bạn: 2,000,000 VNĐ</Text>
    </View>

    {/* Bidding section */}
    <View style={{
      paddingHorizontal: 15,
      alignItems: 'center',
      marginTop: 70,
      gap: 5
    }}>
      <Text style={{
        fontFamily: fonts.MontserratBold,
        fontSize: fontSizes.h2,
        color: 'black'
      }}>Số tiền đặt của bạn</Text>
      <View style={{
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
      }}>
        <TextInput
          value={bidAmount}
          keyboardType='number-pad'
          onChangeText={(text) => setBidAmount(text)}
          autoFocus={true}
          style={{
            fontFamily: fonts.MontserratMedium,
            fontSize: fontSizes.h1 * 2,
            color: 'black'
          }} />
        <Text style={{
          fontFamily: fonts.MontserratMedium,
          fontSize: fontSizes.h1,
          color: 'black'
        }}>VNĐ</Text>
      </View>
      {!validationBidAmount() && <Text style={{
        fontFamily: fonts.MontserratMedium,
        fontSize: fontSizes.h4,
        color: 'red'
      }}>Số tiền đặt tối thiểu là 8,600,000 VNĐ</Text>}
    </View>

    {/* Bid buttons */}
    <View style={{
      paddingHorizontal: 15,
      gap: 10,
      marginBottom: 20,
      flex: 1,
      justifyContent: 'flex-end'
    }}>
      <TouchableOpacity
        disabled={!validationBidAmount()}
        style={{
          borderRadius: 5,
          backgroundColor: validationBidAmount() ? colors.primary : colors.grey,
          paddingVertical: 10
        }}
        onPress={() => setConfirmModal(!confirmModal)}>
        <Text style={{
          fontSize: fontSizes.h3,
          fontFamily: fonts.MontserratBold,
          color: validationBidAmount() ? 'white' : colors.greyText,
          textAlign: 'center'
        }}>Đấu giá</Text>
      </TouchableOpacity>
    </View>

    {/* Confirm modal */}
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={confirmModal}
      onRequestClose={() => {
        setConfirmModal(!confirmModal);
      }}
      style={{ margin: 0 }}>
      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.iconButton}
            onPress={() => {
              setConfirmModal(!confirmModal)
            }}>
            <IconFeather name='x' size={30} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.titleText}>Xác nhận đấu giá</Text>
        </View>

        {/* Bidding information */}
        <View style={{
          gap: 10,
          marginHorizontal: 20,
          marginBottom: 30
        }}>
          <ListingDetailInfoText label='Giá đặt mới' text='8,600,000 VNĐ' />
          <ListingDetailInfoText label='Thời gian còn lại' text='2 ngày 13 giờ' />
          <ListingDetailInfoText label='Số dư khả dụng bị trừ' text='200,000 VNĐ'
            secondText='Người tham gia cần có đủ số dư khả dụng trong ví PAH' />
        </View>

        {/* Confirm buttons */}
        <View style={{
          paddingHorizontal: 20,
          gap: 10,
          marginBottom: 20,
          flex: 1,
          justifyContent: 'flex-end'
        }}>
          <Text style={{
            fontSize: fontSizes.h5,
            fontFamily: fonts.MontserratMedium,
            color: 'black',
          }}>Khi bạn xác nhận giá đặt của mình, điều đó có nghĩa là bạn cam kết mua mặt hàng này nếu bạn là người thắng cuộc. Điều đó cũng có nghĩa là bạn đã đọc và đồng ý với Điều khoản của PAH.</Text>
          <TouchableOpacity style={{
            borderWidth: 1.2,
            borderColor: colors.primary,
            borderRadius: 5,
            backgroundColor: colors.primary,
            paddingVertical: 10
          }}
            onPress={() => goBack()}>
            <Text style={{
              fontSize: fontSizes.h3,
              fontFamily: fonts.MontserratBold,
              color: 'white',
              textAlign: 'center'
            }}>Xác nhận đấu giá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View >
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  iconButton: {
    padding: 12,
    borderRadius: 5
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
    fontSize: fontSizes.h3,
    alignSelf: 'center'
  }
});

export default AuctionBidding;