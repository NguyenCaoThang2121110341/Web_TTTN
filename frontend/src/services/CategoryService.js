
import { callApi } from "../httpAxios";

function GET_ALL_CATEGORIES_WITHOUT_PARENT(endpoint) {
    return callApi(endpoint, 'GET');
}


function GET_CATEGORIES_BY_PARENT_ID(endpoint, parentId) {
    return callApi(`${endpoint}/${parentId}`, 'GET');
}

function GET_ALL_CATEGORIES(endpoint) {
    return callApi(endpoint, "GET");
}

const categoryservice = {
    GET_ALL_CATEGORIES_WITHOUT_PARENT: GET_ALL_CATEGORIES_WITHOUT_PARENT,
    GET_CATEGORIES_BY_PARENT_ID: GET_CATEGORIES_BY_PARENT_ID,
    GET_ALL_CATEGORIES: GET_ALL_CATEGORIES
}
export default categoryservice;

