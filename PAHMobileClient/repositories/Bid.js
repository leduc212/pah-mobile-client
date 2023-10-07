async function getBidsByAuctionId(axiosContext, auction_id) {
    const bidPath = `/bid/auction/${auction_id}`;
    try {
        let result = [];
        let responseData = await axiosContext.publicAxios.get(bidPath);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.auctionId = item.auctionId;
            myObject.bidderId = item.bidderId;
            myObject.bidderName = item.bidderName;
            myObject.bidAmount = item.bidAmount;
            myObject.bidDate = item.bidDate;
            result.push(myObject);
        })
        return result;
    } catch (error) {
        throw error;
    }
}

export default {
    getBidsByAuctionId
}