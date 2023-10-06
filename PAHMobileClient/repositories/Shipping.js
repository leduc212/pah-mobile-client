import axios from "axios";
import config from "../config";

async function calculateShippingCost(addressInput) {
    const categoryPath = `${config.GHN_API_URL}/fee`;
    let configAxios = {
        headers: {
            Token: config.GHN_TOKEN,
            ShopId: config.GHN_SHOPID
        }
    }
    try {
        let responseData = await axios.post(categoryPath, addressInput, configAxios);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseShipping = responseData.data.data;
        let shipping = {};
        
        shipping.total = responseShipping.total  ?? 0;
        shipping.service_fee = responseShipping.service_fee  ?? 0;

        return shipping;
    } catch (error) {
        throw error;
    }
}

export default {
    calculateShippingCost
}