import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { IMAGE_URL } from '../../../api/apiService';

function ImageProduct({ productId, images }) {
    // const [images, setImages] = useState(images);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/api/galleries/product/${productId}`);
    //             console.log('yyyyyyyyyyyyyyyyyyy')
    //             setImages(response.data);
    //             setLoading(false); // Đã tải xong dữ liệu
    //         } catch (error) {
    //             console.error('Error fetching images:', error);
    //         }
    //     };

    //     fetchImages();
    // }, [productId]);

    return (
        <div>

               {images &&images.length > 0 && (
                    <img  src={IMAGE_URL + images[0].imagePath} style={{ width:100 }} alt={images [0].imagePath} />
                )}      
                
                 </div>
    );
}

export default ImageProduct;
