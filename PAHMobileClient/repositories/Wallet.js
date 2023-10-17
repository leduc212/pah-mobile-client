async function getWalletCurrentUser(axiosContext) {
    const walletPath = `/wallet/current`;
    try {
        let responseData = await axiosContext.authAxios.get(walletPath);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseWallet = responseData.data.data;
        let wallet = {};

        wallet.id = responseWallet.id ?? 0;
        wallet.availableBalance = responseWallet.availableBalance ?? 0;
        wallet.lockedBalance = responseWallet.lockedBalance ?? 0;

        return wallet;
    } catch (error) {
        throw error;
    }
}

async function topup(axiosContext, topupInfo) {
    const walletPath = `/wallet/topup`;
    try {
        let responseData = await axiosContext.authAxios.post(walletPath, topupInfo);
        
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseWallet = responseData.data.data;
        
        return responseWallet;
    } catch (error) {
        throw error;
    }
}

export default {
    getWalletCurrentUser,
    topup
}