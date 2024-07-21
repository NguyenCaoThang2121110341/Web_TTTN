import React, { useEffect, useState } from 'react'
import { Link, Navigate,useNavigate } from "react-router-dom";
import axios from "axios";
import {CartContext} from '../context/CartContext';
import { useContext } from 'react';
import {
  IMAGE_URL,
  OrderC,
  getProductById,
} from "../api/apiService";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId)
    }
    const handleUpdateQuantity = (productId, newQuantity) => {
        updateQuantity(productId, newQuantity);
    };

    const [quantity, setQuantity] = useState(1)

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
          setQuantity(item.quantity - 1);
          handleUpdateQuantity(item.id, item.quantity - 1);
          updateTotalPrice(item, item.quantity - 1);
        }
      };
      
      const handleIncrement = (item) => {
        setQuantity(item.quantity + 1);
        handleUpdateQuantity(item.id, item.quantity + 1);
        updateTotalPrice(item, item.quantity + 1);
      };

    const ImgUrl = "http://localhost:8080/upload/"

    const [totalPrice, setTotalPrice] = useState(0);

    const updateTotalPrice = (updatedUniqueProducts) => {
        const newTotalPrice = Object.values(updatedUniqueProducts).reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        setTotalPrice(newTotalPrice);
      };
    
    useEffect(() => {
        const initialTotalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalPrice(initialTotalPrice);
      }, [cartItems]);

      const [uniqueProducts, setUniqueProducts] = useState({});

      useEffect(() => {
        const initialUniqueProducts = {};
        cartItems.forEach((item) => {
          if (initialUniqueProducts[item.id]) {
            initialUniqueProducts[item.id].quantity += item.quantity;
          } else {
            initialUniqueProducts[item.id] = { ...item };
          }
        });
        setUniqueProducts(initialUniqueProducts);
      
        const initialTotalPrice = Object.values(initialUniqueProducts).reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        setTotalPrice(initialTotalPrice);
      }, [cartItems]);

      const navigate = useNavigate();

      const handleCheckout = () => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            navigate("/payment");
        } else {
            alert("Vui lòng đăng nhập trước khi thanh toán");
            navigate("/login");
        }
    };

  return (
    <>
  {/* Start All Title Box */}
  <div className="all-title-box">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2>Cart</h2>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Shop</a>
            </li>
            <li className="breadcrumb-item active">Cart </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* End All Title Box */}
  {/* Start Cart  */}
  <div className="cart-box-main" >
    <div className="container" >
      <div className="row" style={{ backgroundColor: '#b0b435' }}>
        <div className="col-lg-12" >
          <div className="table-main table-responsive" >
            <table className="table" >
              <thead >
                <tr >
                  <th>Images</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  
                  <th className='text-center'>Quantity</th>
                  <th>Remove</th>
                  <th></th>

                </tr>
                
              </thead>
              <tbody>
              {Object.values(uniqueProducts).map((item, index) => (
                <tr key={index}>
                  <th className="thumbnail-img">
                    <a href="#">
                    {item.image && item.image.length > 0 && (
                            <img src={ImgUrl + item.image} alt="" style={{ width: "50px" }} />
                          )}
                      {/* <img
                        className="img-fluid"
                        src={IMAGE_URL +item.imagePath}
                        alt={item.productName}
                      /> */}
                    </a>
                  </th>
                  <th className="name-pr">
                    <a href="#">{item.name}</a>
                  </th>
                  <th className="price-pr">
                    <p>$ {item.price}</p>
                  </th>
                  <td className="quantity-box">
                  {/* <input
  type="number"
  size={4}
  defaultValue={item.quantity}
  min={0}
  step={1}
  className="c-input-text qty text"
 
/> */}
<div class="input-group quantity mx-auto" style={{ width: "100px" }}>
                                                <div class="input-group-btn">
                                                    <button class="btn btn-sm  btn-minus" onClick={() => handleDecrement(item)}>
                                                        <i class="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" class="form-control  text-center" value={item.quantity} />
                                                <div class="input-group-btn">
                                                    <button class="btn btn-sm  btn-plus" onClick={() => handleIncrement(item)}>
                                                        <i class="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                  </td>
                 
                  <td className="remove-pr">
                    <a href="#">
                      <i className="fas fa-times" onClick={() => handleRemoveFromCart(item.id)} />
                    </a>
                  </td>
                  <td className="total-pr">
                    <p></p>
                  </td>
                </tr>
                
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-6 col-sm-6">
          <div className="coupon-box">
            <div className="input-group input-group-sm">
              <input
                className="form-control"
                placeholder="Enter your coupon code"
                aria-label="Coupon code"
                type="text"
              />
              <div className="input-group-append">
                <button className="btn btn-theme" type="button">
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-6">
          <div className="update-box">
          <div className="col-12 d-flex shopping-box">
          <Link to={`/allproducts`} className="ml-auto btn hvr-hover">
            Shopping
          </Link>{" "}
        </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-8 col-sm-12" />
        <div className="col-lg-4 col-sm-12">
          <div className="order-box">
            <h3>Order summary</h3>
            {/* <div className="d-flex">
              <h4>Sub Total</h4>
              <div className="ml-auto font-weight-bold"> $ 130 </div>
            </div>
            <div className="d-flex">
              <h4>Discount</h4>
              <div className="ml-auto font-weight-bold"> $ 40 </div>
            </div>
            <hr className="my-1" />
            <div className="d-flex">
              <h4>Coupon Discount</h4>
              <div className="ml-auto font-weight-bold"> $ 10 </div>
            </div>
            <div className="d-flex">
              <h4>Tax</h4>
              <div className="ml-auto font-weight-bold"> $ 2 </div>
            </div>
            <div className="d-flex">
              <h4>Shipping Cost</h4>
              <div className="ml-auto font-weight-bold"> Free </div>
            </div>
            <hr /> */}
            <div className="d-flex gr-total">
              <h5>Grand Total</h5>
              <div className="ml-auto h5"> ${totalPrice} </div>
            </div>
            <hr />{" "}
          </div>
        </div>
        <div className="col-12 d-flex shopping-box">
          <a  href="#" className="ml-auto btn hvr-hover" onClick={handleCheckout}>
            Checkout
          </a>{" "}
        </div>
      </div>
    </div>
  </div>
  {/* End Cart */}
</>

  
  )
}

export default Cart;