import axios from "axios";
import config from "../config";

async function getProductsHome() {
    const urlGetProducts = `${config.BASE_API_URL}/product?type=1`;
    try {
        let result = [];
        let responseData = await axios.get(urlGetProducts);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.name = item.name;
            myObject.price = item.price;
            myObject.imageUrl = item.imageUrl;
            result.push(myObject);
        })
        return result;
    } catch (error) {
        throw error;
    }
}

async function getProducts(query) {
    const { nameSearch = '', materialId = 0, categoryId = 0,
        type = 1, priceMin = 0, priceMax = 0, orderBy = 0 } = query
    const urlGetProducts = `${config.BASE_API_URL}/product?nameSearch=${nameSearch}&materialId=${materialId}&categoryId=${categoryId}&type=${type}&priceMin=${priceMin}&orderBy=${orderBy}`;
    console.log(urlGetProducts);
    try {
        let result = [];
        let responseData = await axios.get(urlGetProducts);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.name = item.name;
            myObject.price = item.price;
            myObject.imageUrl = item.imageUrl;
            result.push(myObject);
        })
        return result;
    } catch (error) {
        throw error;
    }
}

async function getProductDetail(product_id) {
    const urlProductDetail = `${config.BASE_API_URL}/product/${product_id}`;
    try {
        let responseData = await axios.get(urlProductDetail);
        if (responseData.status != 200) {
            throw responseData.message;
        }
        let responseProduct = responseData.data.data;
        let product = {};
        
        product.id = responseProduct.id  ?? 0;
        product.name = responseProduct.name ?? '';
        product.description = responseProduct.description  ?? '';
        product.price = responseProduct.price ?? 0;
        product.dimension = responseProduct.dimension  ?? '';
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