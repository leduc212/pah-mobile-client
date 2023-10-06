import axios from "axios";
import config from "../config";

async function login(userInfo) {
    const urlLogin = `${config.BASE_API_URL}/login`;
    try {
        let responseData = await axios.post(urlLogin, userInfo);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseUser = responseData.data.data;
        let user = {};
        user.accessToken = responseUser.accessToken  ?? '';
        user.refreshToken = responseUser.refreshToken ?? '';
        
        return user;
    } catch (error) {
        throw error;
    }
}

export default {
    login,
}