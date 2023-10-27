async function getTransactionsByCurrentUser(axiosContext, type) {
    const transactionPath = `/transaction/current?type=${type}`;
    try {
      let result = [];
      let responseData = await axiosContext.authAxios.get(transactionPath);
      responseData.data.data.forEach(function (responseTransaction) {
        let transaction = {};
  
        transaction.id = responseTransaction.id ?? 0;
        transaction.walletId = responseTransaction.walletId ?? 0;
        transaction.paymentMethod = responseTransaction.paymentMethod ?? 0;
        transaction.amount = responseTransaction.amount ?? 0;
        transaction.type = responseTransaction.type ?? 0;
        transaction.date = responseTransaction.date ?? '';
        transaction.description = responseTransaction.description ?? '0';
        transaction.status = responseTransaction.status ?? 0;
  
        result.push(transaction);
      });   
      return result;
    } catch (error) {
      throw error;
    }
  }

  export default {
    getTransactionsByCurrentUser
  }