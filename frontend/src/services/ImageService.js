import axios from 'axios';
let API_URL = "http://localhost:8080/api";
export function uploadImageToFIleSystem(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    return axios.post(`${API_URL}/fileSystem`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.error("Error uploading image:", error);
        throw error;
    });
}