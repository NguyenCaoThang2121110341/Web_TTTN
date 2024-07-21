import { callApi } from "../httpAxios";

function GET_PRODUCTS_BY_TAG_ID(endpoint, tagId) {
    return callApi(`${endpoint}/tag/${tagId}`, 'GET');
}

function GET_ALL_PRODUCTS(endpoint) {
    return callApi(endpoint, 'GET');
}

function DELETE_PRODUCT_ID(endpoint) {
    return callApi(endpoint, "DELETE");
}

function POST_ADD_PRODUCT(endpoint, data) {
    return callApi(endpoint, "POST", data);
}





function DELETE_PRODUCT_TAGS_BY_PRODUCT_ID(endpoint, productId) {
    return callApi(`${endpoint}/product/${productId}`, 'DELETE');
}

function DELETE_PRODUCT_CATEGORIES_BY_PRODUCT_ID(endpoint, productId) {
    return callApi(`${endpoint}/product/${productId}`, 'DELETE');
}

function DELETE_GALLERY_BY_PRODUCT_ID(endpoint, productId) {
    return callApi(`${endpoint}/product/${productId}`, 'DELETE');
}

function GET_PRODUCT_ID(endpoint, id) {
    return callApi(endpoint + "/" + id, "GET");
}

function PUT_EDIT_PRODUCT(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}

function PUT_EDIT_PRODUCT_TAG(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}

function PUT_EDIT_PRODUCT_CATEGORY(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}

function GET_GALLERY_BY_PRODUCT_ID(endpoint, productId) {
    return callApi(`${endpoint}/product/${productId}`, 'GET');
}

function GET_PRODUCT_CATEGORIES_BY_PRODUCT_ID(endpoint, productId) {
    return callApi(`${endpoint}/product/${productId}`, 'GET');
}

function GET_PRODUCT_TAGS_BY_PRODUCT_ID(endpoint, productId) {
    return callApi(`${endpoint}/product/${productId}`, 'GET');
}

function DELETE_PRODUCT_TAGS_BY_TAG_ID_FROM_PRODUCT(endpoint, productId, tagId) {
    return callApi(`${endpoint}/product/${productId}/tag/${tagId}`, 'DELETE');
}
function POST_ADD_PRODUCT_TAG(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

function POST_ADD_PRODUCT_CATEGORY(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

function DELETE_PRODUCT_CATEGORIES_BY_PRODUCT_ID_AND_CATEGORY_ID(endpoint, productId, categoryId) {
    return callApi(`${endpoint}/product/${productId}/category/${categoryId}`, 'DELETE');
}

function GET_SEARCH_PRODUCTS(endpoint, productName) {
    return callApi(`${endpoint}/search?name=${productName}`);
}

function POST_ADD_PRODUCT_IMAGE(endpoint, data) {
    return callApi(endpoint, "POST", data);
}


const productservice = {
    GET_PRODUCTS_BY_TAG_ID: GET_PRODUCTS_BY_TAG_ID,
    GET_ALL_PRODUCTS: GET_ALL_PRODUCTS,
    DELETE_PRODUCT_ID: DELETE_PRODUCT_ID,
    POST_ADD_PRODUCT: POST_ADD_PRODUCT,
    POST_ADD_PRODUCT_TAG: POST_ADD_PRODUCT_TAG,
    POST_ADD_PRODUCT_CATEGORY: POST_ADD_PRODUCT_CATEGORY,
    DELETE_PRODUCT_TAGS_BY_PRODUCT_ID: DELETE_PRODUCT_TAGS_BY_PRODUCT_ID,
    DELETE_PRODUCT_CATEGORIES_BY_PRODUCT_ID: DELETE_PRODUCT_CATEGORIES_BY_PRODUCT_ID,
    DELETE_GALLERY_BY_PRODUCT_ID: DELETE_GALLERY_BY_PRODUCT_ID,
    PUT_EDIT_PRODUCT: PUT_EDIT_PRODUCT,
    PUT_EDIT_PRODUCT_TAG: PUT_EDIT_PRODUCT_TAG,
    PUT_EDIT_PRODUCT_CATEGORY: PUT_EDIT_PRODUCT_CATEGORY,
    GET_PRODUCT_ID: GET_PRODUCT_ID,
    GET_GALLERY_BY_PRODUCT_ID: GET_GALLERY_BY_PRODUCT_ID,
    GET_PRODUCT_CATEGORIES_BY_PRODUCT_ID: GET_PRODUCT_CATEGORIES_BY_PRODUCT_ID,
    GET_PRODUCT_TAGS_BY_PRODUCT_ID: GET_PRODUCT_TAGS_BY_PRODUCT_ID,
    DELETE_PRODUCT_TAGS_BY_TAG_ID_FROM_PRODUCT: DELETE_PRODUCT_TAGS_BY_TAG_ID_FROM_PRODUCT,
    DELETE_PRODUCT_CATEGORIES_BY_PRODUCT_ID_AND_CATEGORY_ID: DELETE_PRODUCT_CATEGORIES_BY_PRODUCT_ID_AND_CATEGORY_ID,
    GET_SEARCH_PRODUCTS: GET_SEARCH_PRODUCTS,
    POST_ADD_PRODUCT_IMAGE: POST_ADD_PRODUCT_IMAGE
}
export default productservice;