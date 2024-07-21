import { callApi } from "../httpAxios";

function GET_ALL_TAGS(endpoint) {
    return callApi(endpoint, "GET");
}

const tagservice = {
    GET_ALL_TAGS: GET_ALL_TAGS,
}
export default tagservice;