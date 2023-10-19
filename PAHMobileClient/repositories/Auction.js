async function getAuctionsHome(axiosContext) {
  const auctionPath = `/auction?status=5&PageSize=8&PageNumber=1`;
  try {
    let result = {
      auctionList: {},
      count: 0,
    };
    let responseData = await axiosContext.publicAxios.get(auctionPath);

    result.auctionList = responseData.data.data.auctionList;
    result.count = responseData.data.data.count;
    return result;
  } catch (error) {
    throw error;
  }
}

async function getAuctions(axiosContext, query) {
  const {materialId = 0, categoryId = 0, orderBy = 0} = query;
  const auctionPath = `/auction?materialId=${materialId}&categoryId=${categoryId}&orderBy=${orderBy}&status=5`;

  try {
    let result = {
      auctionList: {},
      count: 0,
    };
    let responseData = await axiosContext.publicAxios.get(auctionPath);
    result.auctionList = responseData.data.data.auctionList;
    result.count = responseData.data.data.count;
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

async function getAuctionsByBidder(axiosContext,status) {
  const auctionPath = `/auction/bidder?status=${status}`;
  try {
    let result = [];
    let responseData = await axiosContext.authAxios.get(auctionPath);
    responseData.data.data.forEach(function (responseAuction) {
      let auction = {};

      auction.id = responseAuction.id ?? 0;
      auction.productId = responseAuction.productId ?? 0;
      auction.title = responseAuction.title ?? '';
      auction.entryFee = responseAuction.entryFee ?? 0;
      auction.status = responseAuction.status ?? 0;
      auction.startingPrice = responseAuction.startingPrice ?? 0;
      auction.currentPrice = responseAuction.currentPrice ?? 0;
      auction.startedAt = responseAuction.startedAt ?? '';
      auction.endedAt = responseAuction.endedAt ?? '';
      auction.imageUrl = responseAuction.imageUrl ?? '';

      result.push(auction);
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export default {
  getAuctionsHome,
  getAuctions,
  getAuctionDetail,
  getAuctionsByBidder,
};
