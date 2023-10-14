async function getOrderCurrentUser(axiosContext) {
  const orderPath = `/buyer/order`;
  try {
    let responseData = await axiosContext.authAxios.get(orderPath);
    if (responseData.status != 200) {
      throw responseData.message;
    }
    let responseOrder = responseData.data.data;
    let order = {};

    order.id = responseOrder.id;
    order.buyerId = responseOrder.buyerId;
    order.sellerId = responseOrder.sellerId;
    order.recipientName = responseOrder.recipientName;
    order.recipientPhone = responseOrder.recipientPhone;
    order.recipientOrder = responseOrder.recipientOrder;
    order.orderDate = responseOrder.orderDate;
    order.totalAmount = responseOrder.totalAmount;
    order.shippingCost = responseOrder.shippingCost;
    order.status = responseOrder.status;

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrderCurrentUser(axiosContext) {
  const orderPath = `/buyer/order`;
  try {
    let result = [];
    let responseData = await axiosContext.authAxios.get(orderPath);
    responseData.data.data.forEach(function (responseOrder) {
      let order = {};
      order.id = responseOrder.id;
      order.buyerId = responseOrder.buyerId;
      order.sellerId = responseOrder.sellerId;
      order.recipientName = responseOrder.recipientName;
      order.recipientPhone = responseOrder.recipientPhone;
      order.recipientOrder = responseOrder.recipientOrder;
      order.orderDate = responseOrder.orderDate;
      order.totalAmount = responseOrder.totalAmount;
      order.shippingCost = responseOrder.shippingCost;
      order.status = responseOrder.status;
      result.push(order);
    });

    return result;
  } catch (error) {
    throw error;
  }
}

async function checkout(axiosContext, cartInfo) {
  const orderPath = `/buyer/checkout`;
  try {
    let responseData = await axiosContext.authAxios.post(orderPath, cartInfo);
    if (responseData.status != 200) {
      throw responseData.message;
    }
    let response = responseData.data.data;

    return response;
  } catch (error) {
    throw error;
  }
}

export default {
  getAllOrderCurrentUser,
  checkout
};
