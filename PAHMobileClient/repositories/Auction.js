import axios from "axios";
import config from "../config";

async function getAuctionsHome() {
    const urlGetAuctions = `${config.BASE_API_URL}/auction`;
    try {
        let result = [];
        let responseData = await axios.get(urlGetAuctions);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.title = item.title;
            myObject.endedAt = item.endedAt;
            myObject.entryFee = item.entryFee;
            myObject.imageUrl = item.imageUrl;
            result.push(myObject);
        })
        return result;
    } catch (error) {
        throw error;
    }
}

async function getAuctions(query) {
    const { materialId = 0, categoryId = 0, orderBy = 0 } = query
    const urlGetAuctions = `${config.BASE_API_URL}/auction?materialId=${materialId}&categoryId=${categoryId}&orderBy=${orderBy}`;
    console.log(urlGetAuctions);
    try {
        let result = [];
        let responseData = await axios.get(urlGetAuctions);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.auctionId = item.auctionId;
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

async function getAuctionDetail(auction_id) {
    const urlAuctionDetail = `${config.BASE_API_URL}/auction/${auction_id}`;
    try {
        let responseData = await axios.get(urlAuctionDetail);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseAuction = responseData.data.data;
        let auction = {};
        
        auction.id = responseAuction.id  ?? 0;
        auction.productId = responseAuction.productId  ?? 0;
        auction.staffName = responseAuction.staffName  ?? '';
        auction.title = responseAuction.title ?? '';
        auction.entryFee = responseAuction.entryFee ?? 0;
        auction.startingPrice = responseAuction.startingPrice ?? 0;
        auction.currentPrice = responseAuction.currentPrice ?? 0;
        auction.step = responseAuction.step ?? 0;
        auction.startedAt = responseAuction.startedAt ?? '';
        auction.endedAt = responseAuction.endedAt ?? '';
        auction.product = responseAuction.product  ?? {};
        auction.imageUrls = responseAuction.imageUrls ?? [];
        auction.seller = responseAuction.seller ?? {};

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