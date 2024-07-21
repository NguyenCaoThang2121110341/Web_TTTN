  import axios from 'axios';

  const API_URL = "http://localhost:8080/api";
  export const IMAGE_URL = "http://localhost:8080/upload/";

  export function callApi(endpoint, method = 'GET', body) {
    return axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data: body,
      // /headers: {
      //   'Content-Type': 'application/json' // Thêm header Content-Type: application/json
      // }
    }).catch(e => {
      console.log(e);
    });
  }
  //Products APi
  //getAll
  export function getAllProducts(endpoint) {
    return callApi(endpoint, "GET");
  }
  //getbyid
  export function getProductById(endpoint, id) {
    return callApi(`${endpoint}/${id}`, "GET");
  }
  //add
  export function addProduct(endpoint, data) {
    return callApi(endpoint, "POST", data);
  }
  //edit
  export function editProduct(endpoint, data) {
    return callApi(endpoint, "PUT", data);
  }
  //delete
  export function deleteProductById(endpoint,id) {
    return callApi(`${endpoint}/${id}`, "DELETE");
  }

  //Categories APi
      //getAll
  export function getAllCategories(endpoint) {
    return callApi(endpoint, "GET");
  }
      //getbyid
  export function createCategory(endpoint, data) {
      return callApi(endpoint, "POST", data);
    }
      //add
    export function deleteCategoryById(endpoint,id) {
      return callApi(`${endpoint}/${id}`, "DELETE");
    }
     //edit
    export function getCategoryById(endpoint, id) {
      return callApi(`${endpoint}/${id}`, "GET");
    }
      //delete
    export function editCategory(endpoint, data) {
      return callApi(endpoint, "PUT", data);
    }

  //Tags APi    
      //getAll
    export function getAllTags(endpoint) {
      return callApi(endpoint, "GET");
    }
      //getbyid
    export function getTagById(endpoint, id) {
      return callApi(`${endpoint}/${id}`, "GET");
    }
      //add
    export function addTag(endpoint, data) {
      return callApi(endpoint, "POST", data);
    }
      //edit
    export function editTag(endpoint, data) {
      return callApi(endpoint, "PUT", data);
    }
      //delete
    export function deleteTagById(endpoint,id) {
      return callApi(`${endpoint}/${id}`, "DELETE");
    }

  //Customers APi
        //getAll
    export function getAllCustomer(endpoint) {
      return callApi(endpoint, "GET");
    }
        //delete
    export function deleteCustomerById(endpoint,id) {
      return callApi(`${endpoint}/${id}`, "DELETE");
    }
        //add
    export function addCustomer(endpoint, data) {
      return callApi(endpoint, "POST", data);
    }
        //getbyid
    export function getCustomerById(endpoint, id) {
      return callApi(`${endpoint}/${id}`, "GET");
    }
        //edit
    export function editCustomer(endpoint, data) {
      return callApi(endpoint, "PUT", data);
    }
  //Slider API
        //getAll
     export function getAllSlideShow(endpoint) {
      return callApi(endpoint, "GET");
    }
        //add
     export function addSlide(endpoint, data) {
      return callApi(endpoint, "POST", data);
    }
        //delete
    export function deleteSlideById(endpoint,id) {
      return callApi(`${endpoint}/${id}`, "DELETE");
    }
        //getbyid
    export function getSlideById(endpoint, id) {
      return callApi(`${endpoint}/${id}`, "GET");
    }
        //edit
    export function editSlideShow(endpoint, data) {
      return callApi(endpoint, "PUT", data);
    }