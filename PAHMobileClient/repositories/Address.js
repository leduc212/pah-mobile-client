import axios from "axios";
import config from "../config";

async function getAdrressCurrentUser(axiosContext) {
    const addressPath = `/address/current`;
    try {
        let responseData = await axiosContext.authAxios.get(addressPath);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseAddress = responseData.data.data;
        let address = {};
        
        address.id = responseAddress.id  ?? 0;
        address.customerId = responseAddress.customerId  ?? 0;
        address.recipientName = responseAddress.recipientName  ?? '';
        address.recipientPhone = responseAddress.recipientPhone ?? '';
        address.province = responseAddress.province ?? '';
        address.district = responseAddress.district ?? '';
        address.districtId = responseAddress.districtId ?? 0;
        address.ward = responseAddress.ward ?? '';
        address.wardCode = responseAddress.wardCode ?? '';
        address.street = responseAddress.street ?? '';
        address.type = responseAddress.type ?? 0;
        address.isDefault = responseAddress.isDefault;
        address.createdAt = responseAddress.createdAt ?? '';
        address.updatedAt = responseAddress.updatedAt ?? '';

        return address;
    } catch (error) {
        throw error;
    }
}

async function getAllAdrressCurrentUser(axiosContext) {
    const addressPath = `/address`;
    try {
        let result = [];
        let responseData = await axiosContext.authAxios.get(addressPath);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.customerId = item.customerId;
            myObject.recipientName = item.recipientName;
            myObject.recipientPhone = item.recipientPhone;
            myObject.province = item.province;
            myObject.district = item.district;
            myObject.districtId = item.districtId;
            myObject.ward = item.ward;
            myObject.wardCode = item.wardCode;
            myObject.street = item.street;
            myObject.type = item.type;
            myObject.isDefault = item.isDefault;
            myObject.createdAt = item.createdAt;
            myObject.updatedAt = item.updatedAt;
            result.push(myObject);
        })

        return result;
    } catch (error) {
        throw error;
    }
}

export default {
    getAdrressCurrentUser,
    getAllAdrressCurrentUser
}