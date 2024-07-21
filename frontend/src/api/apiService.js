import axios from 'axios';

const API_URL = "http://localhost:8080/api";
export const IMAGE_URL = "http://localhost:8080/upload/";

export function callApi(endpoint, method = 'GET', body) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch(e => {
    console.log(e);
  });
}

export function getAllProducts(endpoint) {
  return callApi(endpoint, "GET");
}

export function getProductById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, "GET");
}

export function addProduct(endpoint, data) {
  return callApi(endpoint, "POST", data);
}

export function editProduct(endpoint, data) {
  return callApi(endpoint, "PUT", data);
}

export function deleteProductById(endpoint,id) {
  return callApi(`${endpoint}/${id}`, "DELETE");
}

export function getAllCategories(endpoint) {
  return callApi(endpoint, "GET");
}
export function addCategory(endpoint, data) {
    return callApi(endpoint, "POST", data);
  }

  export function addUser(endpoint, data) {
    return callApi(endpoint, "POST", data);
  }
  export function getProductByCategory(endpoint, categoryId) {
    return callApi(`${endpoint}?category=${categoryId}`, "GET");
  }
//order
export function OrderC(endpoint, data) {
  return callApi(endpoint, "POST", data);
}
//slider
export function getAllSlideShow(endpoint) {
  return callApi(endpoint, "GET");
}
export function Contact(endpoint, data) {
  return callApi(endpoint, "POST", data);
}

