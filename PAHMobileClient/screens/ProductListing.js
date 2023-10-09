import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, fontSizes, fonts, roles} from '../constants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {ProductPricing} from '../components';

function ProductListing(props) {
  //Photos
  const [Photo, setPhoto] = useState(null);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
    quality: 1,
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setPhoto(result.assets[0].uri);
  };
  // Navigation
  const {navigation, route} = props;
  // Function of navigate to/back
  const {navigate, goBack} = navigation;
  //product detail state
  const [categoryFocus, setCategoryFocus] = useState(false);
  const [conditionFocus, setConditionFocus] = useState(false);
  const [product, setProduct] = useState({
    name: null,
    category: null,
    description: null,
    condition: null,
    origin: null,
    weight: null,
    dimension: null,
    packageMethod: null,
    packageContent: null,
    price: 0,
    type: 1,
  });
  //Data
  const categoryData = [
    {label: 'Đá Phong Thủy', value: '1'},
    {label: 'Trang sức cổ', value: '2'},
    {label: 'Nội thất cổ', value: '3'},
  ];
  const conditionData = [
    {label: 'Mới', value: '1'},
    {label: 'Như mới', value: '2'},
    {label: 'Tốt', value: '3'},
    {label: 'Khá', value: '4'},
    {label: 'Cũ', value: '5'},
  ];
  //Input is enabled
  const [enableTitle, setEnableTitle] = useState(false);
  const [enableDescription, setEnableDescription] = useState(false);
  //Ready to list
  const [ready, setReady] = useState(false);
  //Edit Pricing
  const [pricingMode, setPricingMode] = useState(false);
  const [duration, setDuration] = useState(0);
  const [entryFee, setEntryFee] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [step, setStep] = useState(0);
  return pricingMode == true ? (
    <ProductPricing
      product={product}
      setProduct={setProduct}
      setPricingMode={setPricingMode}
      duration={duration}
      setDuration={setDuration}
      entryFee={entryFee}
      setEntryFee={setEntryFee}
      startDate={startDate}
      setStartDate={setStartDate}
      step={step}
      setStep={setStep}
    />
  ) : (
    <View style={styles.container}>
      {/* Fixed screen title*/}
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            goBack();
          }}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: fonts.OpenSansMedium,
              fontSize: fontSizes.h3,
              alignSelf: 'center',
            }}>
            Hủy
          </Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>Tạo sản phẩm</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            alert('faq');
          }}>
          <IconAntDesign
            name="questioncircleo"
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      {/* listing information */}
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}>
        <ScrollView>
          {/* Photos */}
          <View style={styles.sectionStyle}>
            <Text style={styles.titleSection}>Hình ảnh</Text>
            {Photo != null ? (
              <View>
                <Image style={styles.imageStyle} source={{uri: Photo}} />
                <TouchableOpacity
                  onPress={() => {
                    setPhoto(null);
                  }}
                  style={{
                    marginLeft: 'auto',
                  }}>
                  <IconAntDesign name="delete" size={20} color={'red'} />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: colors.darkGrey,
                    padding: 15,
                    borderRadius: 5,
                  }}>
                  <Text style={styles.detailTextSection}>
                    Cung cấp hình ảnh cho sản phẩm của bạn
                  </Text>
                </View>
                <View style={styles.imageZone}>
                  <TouchableOpacity
                    style={styles.imageZoneButton}
                    onPress={openCamera}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h5,
                      }}>
                      Chụp hình sản phẩm
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.imageZoneButton}
                    onPress={openGallery}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: fonts.OpenSansMedium,
                        fontSize: fontSizes.h5,
                      }}>
                      Lấy từ thư viện
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {/* Title */}
          <View style={styles.sectionStyle}>
            <Text style={styles.titleSection}>Tựa đề</Text>
            <TextInput
              placeholder="Tên sản phẩm"
              value={product.name}
              onChangeText={text => {
                setProduct(item => {
                  return {
                    ...item,
                    name: text,
                  };
                });
              }}
              multiline
              editable={enableTitle == true}
              style={{
                color: colors.black,
                fontSize: fontSizes.h4,
                fontFamily: fonts.OpenSansMedium,
                marginTop: 10,
                borderBottomWidth: enableTitle == true ? 1 : 0,
              }}
            />
            {enableTitle == true ? (
              <TouchableOpacity
                onPress={() => {
                  setEnableTitle(false);
                }}
                style={styles.enableTextButtonStyle}>
                <IconAntDesign name="checkcircle" size={20} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setEnableTitle(true);
                }}
                style={styles.enableTextButtonStyle}>
                <IconAntDesign name="edit" size={20} color={colors.black} />
              </TouchableOpacity>
            )}
          </View>
          {/* Category */}
          <View style={styles.sectionStyle}>
            <Text style={styles.titleSection}>Danh mục</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              searchPlaceholder="Search..."
              placeholder={!categoryFocus ? 'Chọn danh mục' : '...'}
              search
              data={categoryData}
              labelField="label"
              valueField="value"
              onFocus={() => setCategoryFocus(true)}
              onBlur={() => setCategoryFocus(false)}
              value={product.category}
              onChange={item => {
                setProduct(i => {
                  return {
                    ...i,
                    category: item,
                  };
                });
                setCategoryFocus(false);
              }}
            />
          </View>
          {/* Detail */}
          <View style={styles.sectionStyle}>
            <Text style={styles.titleSection}>Chi tiết</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: 100,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                Tình trạng
              </Text>
              <Dropdown
                style={{
                  height: 30,
                  width: 130,
                  borderColor: colors.black,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  marginStart: 20,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                placeholder={!conditionFocus ? 'Chọn' : '...'}
                data={conditionData}
                labelField="label"
                valueField="value"
                onFocus={() => setConditionFocus(true)}
                onBlur={() => setConditionFocus(false)}
                value={product.condition}
                onChange={item => {
                  setProduct(detail => {
                    return {
                      ...detail,
                      condition: item,
                    };
                  });
                  setConditionFocus(false);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: 100,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                Xuất xứ
              </Text>
              <TextInput
                value={product.origin}
                onChangeText={text => {
                  setProduct(detail => {
                    return {
                      ...detail,
                      origin: text,
                    };
                  });
                }}
                placeholder="Hà Nội"
                style={{
                  width: 130,
                  borderColor: colors.black,
                  marginStart: 20,
                  color: colors.black,
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: 100,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                Khối lượng
              </Text>
              <TextInput
                value={product.weight}
                onChangeText={text => {
                  setProduct(detail => {
                    return {
                      ...detail,
                      weight: text,
                    };
                  });
                }}
                keyboardType="numeric"
                placeholder="300"
                style={{
                  width: 130,
                  borderColor: colors.black,
                  marginStart: 20,
                  color: colors.black,
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                }}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                (g)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: 100,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                Kích thước
              </Text>
              <TextInput
                value={product.dimension}
                onChangeText={text => {
                  setProduct(detail => {
                    return {
                      ...detail,
                      dimension: text,
                    };
                  });
                }}
                placeholder="120x300x150"
                style={{
                  width: 130,
                  borderColor: colors.black,
                  marginStart: 20,
                  color: colors.black,
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                }}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                (mm)
              </Text>
            </View>
          </View>
          {/* Package detail */}
          <View style={styles.sectionStyle}>
            <Text style={styles.titleSection}>Gói hàng</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: 130,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                Phương pháp
              </Text>
              <TextInput
                value={product.packageMethod}
                onChangeText={text => {
                  setProduct(detail => {
                    return {
                      ...detail,
                      packageMethod: text,
                    };
                  });
                }}
                placeholder="Hộp cacton"
                style={{
                  width: 130,
                  borderColor: colors.black,
                  marginStart: 20,
                  color: colors.black,
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: 130,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                Bao gồm
              </Text>
              <TextInput
                multiline
                value={product.packageContent}
                onChangeText={text => {
                  setProduct(detail => {
                    return {
                      ...detail,
                      packageContent: text,
                    };
                  });
                }}
                placeholder="5 chén , 1 dĩa ..."
                style={{
                  width: 130,
                  borderColor: colors.black,
                  marginStart: 20,
                  color: colors.black,
                  fontSize: fontSizes.h5,
                  fontFamily: fonts.OpenSansMedium,
                }}
              />
            </View>
          </View>
          {/* Description */}
          <View style={styles.sectionStyle}>
            <Text style={styles.titleSection}>Mô tả</Text>
            <TextInput
              placeholder="Thông tin thêm về sản phẩm"
              value={product.description}
              onChangeText={text => {
                setProduct(item => {
                  return {
                    ...item,
                    description: text,
                  };
                });
              }}
              multiline
              editable={enableDescription == true}
              style={{
                color: colors.black,
                fontSize: fontSizes.h4,
                fontFamily: fonts.OpenSansMedium,
                marginTop: 10,
                borderBottomWidth: enableDescription == true ? 1 : 0,
              }}
            />
            {enableDescription == true ? (
              <TouchableOpacity
                onPress={() => {
                  setEnableDescription(false);
                }}
                style={styles.enableTextButtonStyle}>
                <IconAntDesign name="checkcircle" size={20} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setEnableDescription(true);
                }}
                style={styles.enableTextButtonStyle}>
                <IconAntDesign name="edit" size={20} color={colors.black} />
              </TouchableOpacity>
            )}
          </View>
          {/* Pricing */}
          {product.type == 1 ? (
            <View style={styles.sectionStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleSection}>Định giá</Text>
                <TouchableOpacity
                  onPress={() => {
                    setPricingMode(true);
                  }}
                  style={{
                    marginRight: 20,
                  }}>
                  <IconFeather name="edit" size={20} color={colors.black} />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: 20,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>
                Mua ngay
              </Text>
              <View style={{flexDirection: 'row', gap: 100}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: fontSizes.h5,
                    fontFamily: fonts.OpenSansBold,
                  }}>
                  Giá
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: fontSizes.h5,
                    fontFamily: fonts.OpenSansBold,
                  }}>
                  VND {product.price}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.sectionStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleSection}>Định giá</Text>
                <TouchableOpacity
                  onPress={() => {
                    setPricingMode(true);
                  }}
                  style={{
                    marginRight: 20,
                  }}>
                  <IconFeather name="edit" size={20} color={colors.black} />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: 20,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansBold,
                }}>
                Đấu giá
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text
                    style={{
                      color: colors.darkGreyText,
                      fontSize: fontSizes.h5,
                      fontFamily: fonts.OpenSansMedium,
                    }}>
                    Thời gian đấu giá
                  </Text>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: fontSizes.h3,
                      fontFamily: fonts.OpenSansMedium,
                    }}>
                    {duration} ngày
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: colors.darkGrey,
                    padding:5,
                    alignItems: 'center'
                  }}>
                  <Text style={{
                      color: colors.black,
                      fontSize: fontSizes.h3,
                      fontFamily: fonts.OpenSansMedium,
                    }}>Giá khởi điểm</Text>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: fontSizes.h4,
                      fontFamily: fonts.OpenSansMedium,
                    }}>
                    VND {product.price}
                  </Text>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: fontSizes.h5,
                      fontFamily: fonts.OpenSansMedium,
                    }}>
                    Entry Fee : {entryFee} VND
                  </Text>
                </View>
              </View>
              <View style={{
                alignItems:'center',}}>
                <Text style={{
                  marginTop: 20,
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansMedium,
                }}>Thời điểm bắt đầu</Text>
                <Text style={{
                  color: colors.black,
                  fontSize: fontSizes.h4,
                  fontFamily: fonts.OpenSansBold,
                }}>{startDate.toLocaleString()}</Text>
              </View>
            </View>
          )}
          {/* Start listing */}
          <View
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: fonts.OpenSansMedium,
                fontSize: fontSizes.h5,
                marginBottom: 20,
              }}>
              Đăng bán miễn phí
            </Text>
            <Text>
              <Text
                style={{
                  color: colors.darkGreyText,
                  fontFamily: fonts.OpenSansMedium,
                  fontSize: fontSizes.h5,
                }}>
                Khi nhấn{' '}
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fonts.OpenSansBold,
                  fontSize: fontSizes.h4,
                }}>
                Bắt đầu đăng bán
              </Text>
              <Text
                style={{
                  color: colors.darkGreyText,
                  fontFamily: fonts.OpenSansMedium,
                  fontSize: fontSizes.h5,
                }}>
                , bạn đồng ý trả các khoản phí phụ
              </Text>
            </Text>
            <TouchableOpacity
              disabled={ready == false}
              onPress={() => {
                alert('bắt đầu bán');
              }}
              style={{
                backgroundColor:
                  ready == false ? colors.darkGreyText : colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15,
                padding: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.OpenSansMedium,
                  fontSize: fontSizes.h3,
                }}>
                Bắt đầu đăng bán
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setReady(!ready);
              }}
              style={{flexDirection: 'row', marginVertical: 10, gap: 10}}>
              {ready == true ? (
                <IconFeather name="check-square" size={20} />
              ) : (
                <IconFeather name="square" size={20} />
              )}
              <Text
                style={{
                  color: colors.darkGreyText,
                  fontFamily: fonts.OpenSansMedium,
                  fontSize: fontSizes.h5,
                }}>
                Tôi đồng ý với các điều khoản
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  iconButton: {
    padding: 12,
    borderRadius: 50,
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'black',
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
  titleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  sectionStyle: {
    borderBottomWidth: 1,
    borderColor: colors.darkGrey,
    paddingBottom: 15,
  },
  titleSection: {
    marginTop: 10,
    color: colors.black,
    fontFamily: fonts.OpenSansBold,
    fontSize: fontSizes.h3,
  },
  detailTextSection: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h5,
  },
  imageStyle: {
    flex: 1,
    backgroundColor: colors.darkGrey,
    marginTop: 10,
    resizeMode: 'cover',
    borderRadius: 20,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  imageZone: {
    marginTop: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 'auto',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageZoneButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: 170,
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  dropdown: {
    height: 50,
    borderColor: colors.black,
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    color: colors.darkGreyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  selectedTextStyle: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  inputSearchStyle: {
    color: colors.darkGreyText,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  itemTextStyle: {
    color: colors.black,
    fontFamily: fonts.OpenSansMedium,
    fontSize: fontSizes.h4,
  },
  enableTextButtonStyle: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 20,
  },
});

export default ProductListing;
