import { callApi } from "../httpAxios";

function POST_ADD_GALLERY(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

function PUT_EDIT_GALLERY(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}

const galleryservice = {
    POST_ADD_GALLERY: POST_ADD_GALLERY,
    PUT_EDIT_GALLERY: PUT_EDIT_GALLERY
}
export default galleryservice;