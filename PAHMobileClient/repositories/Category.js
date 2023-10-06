import axios from "axios";
import config from "../config";

async function getCategories() {
    const urlGetCategories = `${config.BASE_API_URL}/category`;
    try {
        let result = [];
        let responseData = await axios.get(urlGetCategories);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.name = item.name;
            result.push(myObject);
        })
        return result;
    } catch (error) {
        throw error;
    }
}

async function getCategoriesHome() {
    const urlGetCategories = `${config.BASE_API_URL}/category`;
    try {
        let result = [];
        let responseData = await axios.get(urlGetCategories);
        responseData.data.data.forEach(function (item) {
            let myObject = {};
            myObject.id = item.id;
            myObject.name = item.name;
            myObject.imageUrl = item.imageUrl;
            result.push(myObject);
        })
        return result;
    } catch (error) {
        throw error;
    }
}

export default {
    getCategories,
    getCategoriesHome
}