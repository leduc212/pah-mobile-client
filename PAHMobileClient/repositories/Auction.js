async function getAuctionsHome(axiosContext) {
    const auctionPath = `/auction?status=5`;
    try {
        let result = [];
        let responseData = await axiosContext.publicAxios.get(auctionPath);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.title = item.title;
            myObject.endedAt = item.endedAt;
            myObject.currentPrice = item.currentPrice;
            myObject.imageUrl = item.imageUrl;
            result.push(myObject);
        })
        return result;
    } catch (error) {
        throw error;
    }
}

async function getAuctions(axiosContext, query) {
    const { materialId = 0, categoryId = 0, orderBy = 0 } = query
    const auctionPath = `/auction?materialId=${materialId}&categoryId=${categoryId}&orderBy=${orderBy}&status=5`;

    try {
        let result = [];
        let responseData = await axiosContext.publicAxios.get(auctionPath);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.productId = item.productId;
            myObject.title = item.title;
            myObject.entryFee = item.entryFee;
            myObject.startingPrice = item.startingPrice;
            myObject.currentPrice = item.currentPrice;
            myObject.startedAt = item.startedAt;
            myObject.endedAt = item.endedAt;
            myObject.imageUrl = item.imageUrl;
            result.push(myObject);
        })

        return result;
    } catch (error) {
        throw error;
    }
}

async function getAuctionDetail(axiosContext, auction_id) {
    const auctionPath = `/auction/${auction_id}`;
    try {
        let responseData = await axiosContext.publicAxios.get(auctionPath);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseAuction = responseData.data.data;
        let auction = {};

        auction.id = responseAuction.id ?? 0;
        auction.productId = responseAuction.productId ?? 0;
        auction.staffName = responseAuction.staffName ?? '';
        auction.title = responseAuction.title ?? '';
        auction.entryFee = responseAuction.entryFee ?? 0;
        auction.startingPrice = responseAuction.startingPrice ?? 0;
        auction.currentPrice = responseAuction.currentPrice ?? 0;
        auction.step = responseAuction.step ?? 0;
        auction.startedAt = responseAuction.startedAt ?? '';
        auction.endedAt = responseAuction.endedAt ?? '';
        auction.product = responseAuction.product ?? {};
        auction.imageUrls = responseAuction.imageUrls ?? [];
        auction.seller = responseAuction.seller ?? {};
        auction.numberOfBids = responseAuction.numberOfBids ?? 0;
        auction.numberOfBidders = responseAuction.numberOfBidders ?? 0;

        return auction;
    } catch (error) {
        throw error;
    }
}

export default {
    getAuctionsHome,
    getAuctions,
    getAuctionDetail
}