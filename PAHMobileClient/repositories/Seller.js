async function getSellerCurrentUser(axiosContext) {
    const sellerPath = `/seller/current`;
    try {
        let responseData = await axiosContext.authAxios.get(sellerPath);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseUser = responseData.data.data;
        let seller = {};

        seller.id = responseUser.id ?? 0;
        seller.name = responseUser.name ?? '';
        seller.phone = responseUser.phone ?? '';
        seller.profilePicture = responseUser.profilePicture ?? '';
        seller.registeredAt = responseUser.registeredAt ?? '';
        seller.ratings = responseUser.ratings ?? 0;
        seller.recipientName = responseUser.recipientName ?? '';
        seller.recipientPhone = responseUser.recipientPhone ?? '';
        seller.province = responseUser.province ?? '';
        seller.provinceId = responseUser.provinceId ?? 0;
        seller.district = responseUser.district ?? '';
        seller.districtId = responseUser.districtId ?? 0;
        seller.ward = responseUser.ward ?? '';
        seller.wardCode = responseUser.wardCode ?? '';
        seller.street = responseUser.street ?? '';
        seller.status = responseUser.status ?? 0;

        return seller;
    } catch (error) {
        throw error;
    }
}

async function createSeller(axiosContext, sellerinfo) {
    const sellerPath = `/seller`;
    try {
        let responseData = await axiosContext.authAxios.post(sellerPath, sellerinfo);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseUser = responseData.data.data;
        
        return responseUser;
    } catch (error) {
        throw error;
    }
}

export default {
    getSellerCurrentUser,
    createSeller
}