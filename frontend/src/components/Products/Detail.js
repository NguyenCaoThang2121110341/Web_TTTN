import React, { useContext,useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ImageProduct from "../Home/ImageProduct";
import baseURL from "../../api/BaseUrl";
import {CartContext} from '../../context/CartContext'
import { Container, Carousel } from 'react-bootstrap';
import {toast   } from 'react-hot-toast';
function Details() {
  const [products, setProducts] = useState([]);
  const ImgUrl = "http://localhost:8080/upload/"
  const { id } = useParams();
  const [isProductLoaded, setIsProductLoaded] = useState(false);
  const [categories, setCategories] = useState([]);






  const [productrelates, setProductRelates] = useState([]);



  useEffect(() => {
    axios.get(baseURL + `products/${id}`)
      .then(response => {
        console.log("product", response.data)
        setProducts([response.data]);
        setIsProductLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  useEffect(() => {
    if (products.length > 0 && products[0].tags.length > 0) {
      axios.get(`http://localhost:8080/api/products/tag/${products[0].tags[0].name}`)
        .then(response => {
          console.log("product", response.data)
          setProductRelates(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    }
  }, [products]);
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const showSuccessAlert = () => {
    alert("Thêm vào giỏ hàng thành công");
  };

  const handleAddToCart = () => {
    const newCartItem = {
      id: products[0].id,
      name: products[0].productName,
      price: products[0].regularPrice,
      image: products[0].galleries && products[0].galleries[0] ? products[0].galleries[0].imagePath : '',
      quantity: quantity
    };
    addToCart(newCartItem);
    // showSuccessAlert();
    toast.success('Thành công!', {
      className: 'custom-toast'
    });
  };
  return (
  <>
  {/* Start All Title Box */}
  <div className="all-title-box">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2>Shop Detail</h2>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Shop</a>
            </li>
            <li className="breadcrumb-item active">Shop Detail </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* End All Title Box */}
  {/* Start Shop Detail  */}
  <div className="shop-detail-box-main">
    
  {products.map(product => (
    <div className="container">
      <div className="row">
        
        <div className="col-xl-5 col-lg-5 col-md-6">
          <div
            id="carousel-example-1"
            className="single-product-slider carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                {" "}
                <img class="w-100 h-100" src={ImgUrl + product.galleries[0].imagePath} alt="Image" />

                          </div>
              <div className="carousel-item">
                {" "}
                <img
                  className="d-block w-100"
                  src="images/big-img-02.jpg"
                  alt="Second slide"
                />{" "}
              </div>
              <div className="carousel-item">
                {" "}
                <img
                  className="d-block w-100"
                  src="images/big-img-03.jpg"
                  alt="Third slide"
                />{" "}
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carousel-example-1"
              role="button"
              data-slide="prev"
            >
              <i className="fa fa-angle-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel-example-1"
              role="button"
              data-slide="next"
            >
              <i className="fa fa-angle-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
            <ol className="carousel-indicators">
              <li
                data-target="#carousel-example-1"
                data-slide-to={0}
                className="active"
              >
                <img
                  className="d-block w-100 img-fluid"
                  src="images/smp-img-01.jpg"
                  alt=""
                />
              </li>
              <li data-target="#carousel-example-1" data-slide-to={1}>
                <img
                  className="d-block w-100 img-fluid"
                  src="images/smp-img-02.jpg"
                  alt=""
                />
              </li>
              <li data-target="#carousel-example-1" data-slide-to={2}>
                <img
                  className="d-block w-100 img-fluid"
                  src="images/smp-img-03.jpg"
                  alt=""
                />
              </li>
            </ol>
          </div>
        </div>
        <div className="col-xl-7 col-lg-7 col-md-6">
          <div className="single-product-details">
          <h2>{product.productName}</h2>
            <h5>
              {" "}
              <del>${product.discountPrice}</del>${product.regularPrice}
            </h5>
            <p className="available-stock">
              <span>
                {" "}
                More than 20 available / <a href="#">8 sold </a>
              </span>
            </p>
            <p></p>
            <h4>Short Description:</h4>
            <p>
            {product.shortDescription}
            </p>
            <ul>
              <li>
                <div className="form-group quantity-box">
                  <label className="control-label">Quantity</label>
                  <input type="text" class="form-controlr" value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} />
                </div>
              </li>
            </ul>
            <div className="price-box-bar">
              <div className="cart-and-bay-btn">
                <a className="btn hvr-hover" data-fancybox-close="" href="#">
                  Buy New
                </a>
   
                
                <a className="btn hvr-hover" data-fancybox-close="" href="#" onClick={handleAddToCart}> 
                
                  Add to cart
                </a>
              
           
              </div>
            </div>
            <div className="add-to-btn">
              <div className="add-comp">
                <a className="btn hvr-hover" href="#">
                  <i className="fas fa-heart" /> Add to wishlist
                </a>
                <a className="btn hvr-hover" href="#">
                  <i className="fas fa-sync-alt" /> Add to Compare
                </a>
              </div>
              <div className="share-bar">
                <a className="btn hvr-hover" href="#">
                  <i className="fab fa-facebook" aria-hidden="true" />
                </a>
                <a className="btn hvr-hover" href="#">
                  <i className="fab fa-google-plus" aria-hidden="true" />
                </a>
                <a className="btn hvr-hover" href="#">
                  <i className="fab fa-twitter" aria-hidden="true" />
                </a>
                <a className="btn hvr-hover" href="#">
                  <i className="fab fa-pinterest-p" aria-hidden="true" />
                </a>
                <a className="btn hvr-hover" href="#">
                  <i className="fab fa-whatsapp" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="card card-outline-secondary my-4">
          <div className="card-header">
            <h2>Product Reviews</h2>
          </div>
          <div className="card-body">
            <div className="media mb-3">
              <div className="mr-2">
                <img
                  className="rounded-circle border p-1"
                  src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_160c142c97c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_160c142c97c%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.5546875%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                  alt="Generic placeholder image"
                />
              </div>
              <div className="media-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/18
                </small>
              </div>
            </div>
            <hr />
            <div className="media mb-3">
              <div className="mr-2">
                <img
                  className="rounded-circle border p-1"
                  src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_160c142c97c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_160c142c97c%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.5546875%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                  alt="Generic placeholder image"
                />
              </div>
              <div className="media-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/18
                </small>
              </div>
            </div>
            <hr />
            <div className="media mb-3">
              <div className="mr-2">
                <img
                  className="rounded-circle border p-1"
                  src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_160c142c97c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_160c142c97c%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.5546875%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                  alt="Generic placeholder image"
                />
              </div>
              <div className="media-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/18
                </small>
              </div>
            </div>
            <hr />
            <a href="#" className="btn hvr-hover">
              Leave a Review
            </a>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-lg-12">
          <div className="title-all text-center">
            <h1>Featured Products</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet lacus enim.
            </p>
          </div>
          <div className="products-box">
      <div className="container">

          <div className="row special-list">
          {productrelates&&productrelates.map((productrelate)=>(
          <div className="col-lg-3 col-md-6 special-grid best-seller">
            <div className="item">
              <div className="products-single fix">
                <div className="box-img-hover">
                    <img
            src={`http://localhost:8080/upload/${productrelate.galleries[0].imagePath}`}  width={200} height={200} className="showcase-img"
                 
                    />
                  <div className="mask-icon">
                    <ul>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="View"
                        >
                          <i className="fas fa-eye" />
                        </a>
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
                  <h4>{productrelate.productName}</h4>
                  <h5> {productrelate.regularPrice}</h5>
                </div>
              </div>
            </div>
            </div>

                  ))}

          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
       ))}
  </div>
  {/* End Cart */}
</>

  
  )
}

export default Details







