import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, fontSizes, images } from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

function ListingFeedback(props) {
    // Get product_id from routes
    const { product_id } = props.route.params;

    // Auth Context
    const authContext = useContext(AuthContext);

    // Navigation
    const { navigation, route } = props;

    // Function of navigate to/back
    const { navigate, goBack } = navigation;

    // Data
    const [feedbacks, setFeedbacks] = useState([
        {
            id: 12,
            star: 4,
            user_name: 'Lê Đức Hiền',
            content: 'Sản phẩm tốt, đẹp'
        },
        {
            id: 15,
            star: 3,
            user_name: 'Trần Ngọc Châu',
            content: 'Nhìn có vẻ tạm'
        },
        {
            id: 26,
            star: 5,
            user_name: 'Nguyễn Huỳnh Tuấn',
            content: 'Sản phẩm rất tuyệt vời Sản phẩm rất tuyệt vời Sản phẩm rất tuyệt vời Sản phẩm rất tuyệt vời'
        },
        {
            id: 29,
            star: 4,
            user_name: 'Hoàng Lê Gia Bảo',
            content: 'Sản phẩm rất phù hợp với nhu cầu của tôi'
        },
        {
            id: 65,
            star: 2,
            user_name: 'Vũ Triều Dương',
            content: 'Khi tôi nhận được sản phẩm thì phát hiện ra 1 vết nứt nhẹ'
        },
        {
            id: 81,
            star: 3,
            user_name: 'Trần Dương Phúc Đạt',
            content: 'Nhìn khác so với hình ảnh'
        },
        {
            id: 92,
            star: 4,
            user_name: 'Mike Tyson',
            content: 'Good'
        },
        {
            id: 95,
            star: 3,
            user_name: 'Donald Trump',
            content: 'A nice piece of art'
        }
    ])

    return <View style={styles.container}>
        {/* Fixed screen title: Cart */}
        <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.iconButton}
                onPress={() => {
                    goBack()
                }}>
                <IconFeather name='arrow-left' size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Tất cả phản hồi</Text>
        </View>

        {/* Description */}
        <ScrollView style={{
            paddingHorizontal: 15
        }}>
            <View style={{ marginTop: 5 }}>
                {(Array.isArray(feedbacks) && feedbacks.length) ? <View>
                    {feedbacks.map((feedback, index) =>
                        <View key={feedback.id} style={{
                            marginBottom: 15
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5
                                }}>{feedback.user_name}</Text>
                                <Text style={{
                                    color: colors.darkGreyText,
                                    fontFamily: 'OpenSans-Medium',
                                    fontSize: fontSizes.h5
                                }}> - 1 tháng trước</Text>
                            </View>
                            <Text style={{
                                color: colors.greyText,
                                fontFamily: 'OpenSans-Medium',
                                fontSize: fontSizes.h5
                            }}>Đánh giá: {feedback.star} sao</Text>
                            <Text style={{
                                color: 'black',
                                fontFamily: 'OpenSans-Medium',
                                fontSize: fontSizes.h4,
                                marginVertical: 15,
                            }}>{feedback.content}</Text>
                            {index != (feedbacks.length - 1) && <View style={styles.separator}></View>}
                        </View>)}
                </View> : <View>
                    <Text style={styles.emptyText}>Không có phản hồi về sản phẩm này</Text>
                </View>}
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
        height: 1,
        backgroundColor: colors.darkGrey,
        marginRight: 10
    },
    emptyText: {
        color: colors.greyText,
        fontSize: fontSizes.h4,
        textAlign: 'center',
        fontFamily: 'OpenSans-Medium',
        marginVertical: 30
    }
});

export default ListingFeedback;