import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {CartContext} from '../context/CartContext'


function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    window.location.reload();

  };
  useEffect(() => {
    // Check if the user is logged in
   
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isUserLoggedIn);
    const username = localStorage.getItem('email');
    setUsername(username)
   
    
  }, [location.pathname]);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
 
  
  return (
<>
  {/* Start Main Top */}
  <div className="main-top">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="custom-select-box">
            <select
              id="basic"
              className="selectpicker show-tick form-control"
              data-placeholder="$ USD"
            >
              <option>¥ JPY</option>
              <option>$ USD</option>
              <option>€ EUR</option>
            </select>
          </div>
          <div className="right-phone-box">
            <p>
              Call US :- <a href="#"> +11 900 800 100</a>
            </p>
          </div>
          <div className="our-link">
            <ul>
             
              <li>
                <a href="#">
                  <i className="fas fa-location-arrow" /> Our location
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-headset" /> Contact Us
                </a>
              </li>
              <li>
                    {isLoggedIn && (
                      <>

                        <Link href="#" onClick={handleLogout}>
                          <i className="fa fa-user s_color" /> Logout
                        </Link>
                      </>
                    )}
                    {!isLoggedIn && (
                      <Link href="#" to={`/login`}>
                        <i className="fa fa-user s_color" /> Login
                      </Link>

                    )}
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="login-box">
            <select
              id="basic"
              className="selectpicker show-tick form-control"
              data-placeholder="Sign In"
            >
              <option>Register Here</option>
              <option>Sign In</option>
            </select>
          </div>
          <div className="text-slid-box">
            <div id="offer-box" className="carouselTicker">
              <ul className="offer-box">
              <li>
                {isLoggedIn && (
                      <>
  <i className="fab fa-opencart" /> WELCOME USER :  {username}
                        
                      </>
                    )}
                    {!isLoggedIn && (
                         <>
                         <i className="fab fa-opencart" /> 20% off Entire Purchase
                                         Promo code: offT80
                                               
                                             </>

                    )}
                </li>
            
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Main Top */}
  {/* Start Main Top */}
  <header className="main-header">
    {/* Start Navigation */}
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
      <div className="container">
        {/* Start Header Navigation */}
        <div className="navbar-header">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-menu"
            aria-controls="navbars-rs-food"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" />
          </button>
          <a className="navbar-brand" href="/">
            <img  src={require("../asset/images/logormbg.png")} style={{ maxWidth: '300px', maxHeight: '150px' }} className="logo" alt="" />
          
          </a>
        </div>
        {/* End Header Navigation */}
        {/* Collect the nav links, forms, and other content for toggling */}
        <div className="collapse navbar-collapse" id="navbar-menu">
          <ul
            className="nav navbar-nav ml-auto"
            data-in="fadeInDown"
            data-out="fadeOutUp"
          >
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/aboutus">
                About Us
              </a>
            </li>
            <li className="dropdown">
              <a
                href="/allproducts"
                className="nav-link dropdown-toggle arrow"
                data-toggle="dropdown"
              >
                SHOP
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="shop.html">Sidebar Shop</a>
                </li>
                <li>
                  <a href="shop-detail.html">Shop Detail</a>
                </li>
                <li>
                  <a href="cart.html">Cart</a>
                </li>
                <li>
                  <a href="checkout.html">Checkout</a>
                </li>
                <li>
                  <a href="my-account.html">My Account</a>
                </li>
                <li>
                  <a href="wishlist.html">Wishlist</a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/posts">
               Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        {/* /.navbar-collapse */}
        {/* Start Atribute Navigation */}
        <div className="attr-nav">
          <ul>
            <li className="search">
              <a href="#">
                <i className="fa fa-search" />
              </a>
            </li>
            <li className="side-menu">
              <Link href="#"  to={`/cart`}>
             
                <i className="fa fa-shopping-bag" />
                <span className="badge">3</span>
                <CartContext.Consumer>
                {({ cartItems}) => <p>My Cart( {cartItems.length} )</p>}

                
                </CartContext.Consumer>
              </Link>
            </li>
          </ul>
        </div>
        {/* End Atribute Navigation */}
      </div>
      {/* Start Side Menu */}
      <div className="side">
        <a href="#" className="close-side">
          <i className="fa fa-times" />
        </a>
        <li className="cart-box">
          <ul className="cart-list">
            <li>
              <a href="#" className="photo">
                <img
                  src="images/img-pro-01.jpg"
                  className="cart-thumb"
                  alt=""
                />
              </a>
              <h6>
                <a href="#">Delica omtantur </a>
              </h6>
              <p>
                1x - <span className="price">$80.00</span>
              </p>
            </li>
            <li>
              <a href="#" className="photo">
                <img
                  src="images/img-pro-02.jpg"
                  className="cart-thumb"
                  alt=""
                />
              </a>
              <h6>
                <a href="#">Omnes ocurreret</a>
              </h6>
              <p>
                1x - <span className="price">$60.00</span>
              </p>
            </li>
            <li>
              <a href="#" className="photo">
                <img
                  src="images/img-pro-03.jpg"
                  className="cart-thumb"
                  alt=""
                />
              </a>
              <h6>
                <a href="#">Agam facilisis</a>
              </h6>
              <p>
                1x - <span className="price">$40.00</span>
              </p>
            </li>
            <li className="total">
              <a href="#" className="btn btn-default hvr-hover btn-cart">
                VIEW CART
              </a>
              <span className="float-right">
                <strong>Total</strong>: $180.00
              </span>
            </li>
          </ul>
        </li>
      </div>
      {/* End Side Menu */}
    </nav>
    {/* End Navigation */}
  </header>
  {/* End Main Top */}
  {/* Start Top Search */}
  <div className="top-search">
    <div className="container">
      <div className="input-group">
        <span className="input-group-addon">
          <i className="fa fa-search" />
        </span>
        <input type="text" className="form-control" placeholder="Search" />
        <span className="input-group-addon close-search">
          <i className="fa fa-times" />
        </span>
      </div>
    </div>
  </div>
  {/* End Top Search */}
</>
    )
}

export default Header












