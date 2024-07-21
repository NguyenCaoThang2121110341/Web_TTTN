import { callApi } from "../httpAxios";

function GET_ALL_STAFFACCOUNTS(endpoint) {
    return callApi(endpoint, "GET");
}

const staffAccountsService = {
    GET_ALL_STAFFACCOUNTS:GET_ALL_STAFFACCOUNTS
}
export default staffAccountsService;