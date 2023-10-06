import axios from "axios";
import config from "../config";

async function getMaterials() {
    const urlGetMaterials = `${config.BASE_API_URL}/material`;
    try {
        let result = [];
        let responseData = await axios.get(urlGetMaterials);
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

export default {
    getMaterials,
}