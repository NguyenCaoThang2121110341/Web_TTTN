
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseURL from '../../api/BaseUrl';
import ImageProduct from './ImageProduct';
import { IonIcon } from '@ionic/react'; // Import IonIcon từ @ionic/react
import { star } from 'ionicons/icons'; 
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react'; 
import { AuthContext } from '../User/AuthContext';

function Trending() {
  const [products, setProducts] = useState([]);
  const { lastName } = useContext(AuthContext);
    useEffect(() => {
    // Gọi API để lấy danh sách category khi component được render
    axios.get(baseURL+`products/tag/${"Trending"}`)
      .then(response => {
        console.log("produtc",response.data)
        // Xử lý dữ liệu trả về từ API
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <>
    {/* Start Products  */}
   
    <div className="products-box">
      <div className="container">
     
        <div className="row">
          <div className="col-lg-12">
            <div className="title-all text-center">
              <h1>Trending</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                amet lacus enim.
              </p>
            </div>
          </div>
        </div>
 
        {/* <div className="row">
          <div className="col-lg-12">
            <div className="special-menu text-center">
              <div className="button-group filter-button-group">
                <button className="active" data-filter="*">
                  All
                </button>
                <button data-filter=".top-featured">Top featured</button>
                <button data-filter=".best-seller">Best seller</button>
              </div>
            </div>
          </div>
        </div> */}
       
        <div className="row special-list">
        {products&&products.map((product)=>(
          <div className="col-lg-3 col-md-6 special-grid best-seller">
            <div className="products-single fix">
              <div className="box-img-hover">
                <div className="type-lb">
            
                </div>
                {/* <img
                src={require("../../asset/images/img-pro-01.jpg")}
                 
                  className="img-fluid"
                  alt="Image"
                /> */} 
                <ImageProduct id={product.id} name={product.productName} tagName={"best sellers"} style={{ width: '200', height: '200' }} className="img-fluid"/>
                <div className="mask-icon">
                  <ul>
                    <li>
                    <Link to={`/details/${product.id}`}
                      
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="View"
                      >
                        <i className="fas fa-eye" />
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Compare"
                      >
                        <i className="fas fa-sync-alt" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Add to Wishlist"
                      >
                        <i className="far fa-heart" />
                      </a>
                    </li>
                  </ul>
                  <a className="cart" href="#">
                    Add to Cart
                  </a>
                
                </div>
              </div>
              <div className="why-text">
                <h4>{product.productName}</h4>
                <del>${product.discountPrice}.00</del>
                <h5>${product.regularPrice}.00</h5>
              </div>
            </div>
          </div>

        
))}
        </div>
         
      </div>
      
    </div>
 

  </>
  
  
  )
}

export default Trending







