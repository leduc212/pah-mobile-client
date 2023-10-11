async function getProductsHome(axiosContext) {
    const productPath = `/product?type=1&PageSize=8&PageNumber=1`;
    try {
        let result = {
            productList: {},
            count: 0
        };
        let responseData = await axiosContext.publicAxios.get(productPath);
        result.productList = responseData.data.data.productList;
        result.count = responseData.data.data.count;
        return result;
    } catch (error) {
        throw error;
    }
}

async function getProducts(axiosContext, query) {
    const { nameSearch = '', materialId = 0, categoryId = 0,
        type = 1, priceMin = 0, priceMax = 0, orderBy = 0 } = query
    const productPath = `/product?nameSearch=${nameSearch}&materialId=${materialId}&categoryId=${categoryId}&type=${type}&priceMin=${priceMin}&priceMax=${priceMax}&orderBy=${orderBy}`;

    try {
        let result = {
            productList: {},
            count: 0
        };
        let responseData = await axiosContext.publicAxios.get(productPath);
        result.productList = responseData.data.data.productList;
        result.count = responseData.data.data.count;
        return result;
    } catch (error) {
        throw error;
    }
}

async function getProductDetail(axiosContext, product_id) {
    const productPath = `/product/${product_id}`;
    try {
        let responseData = await axiosContext.publicAxios.get(productPath);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseProduct = responseData.data.data;
        let product = {};

        product.id = responseProduct.id ?? 0;
        product.name = responseProduct.name ?? '';
        product.description = responseProduct.description ?? '';
        product.price = responseProduct.price ?? 0;
        product.dimension = responseProduct.dimension ?? '';
        product.weight = responseProduct.weight ?? '';
        product.origin = responseProduct.origin ?? '';
        product.packageMethod = responseProduct.packageMethod ?? '';
        product.packageContent = responseProduct.packageContent ?? '';
        product.condition = responseProduct.condition ?? '';
        product.type = responseProduct.type ?? '';
        product.ratings = responseProduct.ratings ?? '';
        product.categoryName = responseProduct.categoryName ?? '';
        product.materialName = responseProduct.materialName ?? '';
        product.sellerName = responseProduct.sellerName ?? '';
        product.imageUrls = responseProduct.imageUrls ?? [];
        product.seller = responseProduct.seller ?? {};
        product.feedbacks = responseProduct.feedbacks ?? [];

        return product;
    } catch (error) {
        throw error;
    }
}

export default {
    getProductsHome,
    getProducts,
    getProductDetail
}