import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../api/BaseUrl';

function ImageProduct({id, name,tagName}) {
    const [images, setImages] = useState([]);
    console.log("iddd", id);

    useEffect(() => {
        // Gọi API để lấy danh sách hình ảnh khi component được render
        axios.get(baseURL + `galleries/product/` + id)
            .then(response => {
                console.log("image", response.data);
                // Xử lý dữ liệu trả về từ API
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }, [id]);

    // Kiểm tra xem images có dữ liệu không trước khi truy cập images.image
    if (!images || images.length === 0) {
        return <div>No images available</div>;
    }
    if(tagName==="best sellers"){
        return(
            <img src={`http://localhost:8080/upload/${images[0].imagePath}`} alt={name} width={200} height={200} className="showcase-img" />
        )
    }
    if(tagName==="toplist"){
        return(
            <img src={`http://localhost:8080/upload/${images[0].imagePath}`} alt={name} className="showcase-img" width={70} />
        )
    }
    if(tagName==="deal"){
        return (
            <img src={`http://localhost:8080/upload/${images[0].imagePath}`} alt={name} className="showcase-img" />
        )
    }
    if(tagName===" "){
        return (
            <img src={`http://localhost:8080/upload/${images[0].imagePath}`} alt={name} className="showcase-img" />
        )
    }
    if(tagName==="new"){
        return (
            <div>
                {images.length>1?
                (<><img src={`http://localhost:8080/upload/${images[0].imagePath}`} alt={name} width={300} className="product-img default" />
                <img src={`http://localhost:8080/upload/${images[1].imagePath}`} alt={name} width={300} className="product-img hover" /></>)
                :<><img src={`http://localhost:8080/upload/${images[0].imagePath}`} alt={name} width={300} className="product-img default" />
                <img src={`http://localhost:8080/upload/${images[0].imagePath}`} alt={name} width={300} className="product-img hover" />
                </>
            }
                
                
            </div>
        );
    }
    
}

export default ImageProduct;
