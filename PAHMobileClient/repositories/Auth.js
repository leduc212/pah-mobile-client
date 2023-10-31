async function login(axiosContext, userInfo) {
    const loginPath = `/login`;
    try {
        let responseData = await axiosContext.publicAxios.post(loginPath, userInfo);
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

async function loginWithGoogle(axiosContext, userInfo) {
    const loginPath = `/login/google`;
    try {
        let responseData = await axiosContext.publicAxios.post(loginPath, userInfo);
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

async function register(axiosContext, userInfo) {
    const registerPath = `/register`;
    try {
        let responseData = await axiosContext.publicAxios.post(registerPath, userInfo);
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
    login,
    register,
    loginWithGoogle
}