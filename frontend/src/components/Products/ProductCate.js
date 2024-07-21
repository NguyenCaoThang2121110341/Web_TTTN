
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Route } from 'react-router-dom';
import axios from 'axios';
import ImageProduct from '../Home/ImageProduct';
import { useParams } from 'react-router-dom';
import baseURL from '../../api/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { getProductByCategory } from '../../api/apiService';
import { useLocation } from 'react-router-dom';
function ProductCate(props) {
  const location = useLocation();
  const categoryName = location.state?.categoryName || '';

  const { slug } = useParams();









  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/categories/${slug}`)
      .then(response => {
        console.log("product", response.data)
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [slug]);








  
  return (
    <>
  
    {/* Start All Title Box */}
    <div className="all-title-box">
    
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2> {categoryName}</h2>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Shop</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    {/* End All Title Box */}
    {/* Start Shop Page  */}
    <div className="shop-box-inner">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
            <div className="right-product-box">
              <div className="product-item-filter row">
                {/* <div className="col-12 col-sm-8 text-center text-sm-left">
                  <div className="toolbar-sorter-right">
                    <span>Sort by </span>
                    <select
                      id="basic"
                      className="selectpicker show-tick form-control"
                      data-placeholder="$ USD"
                    >
                      <option data-display="Select">Nothing</option>
                      <option value={1}>Popularity</option>
                      <option value={2}>High Price → High Price</option>
                      <option value={3}>Low Price → High Price</option>
                      <option value={4}>Best Selling</option>
                    </select>
                  </div>
                  <p>Showing all 4 results</p>
                </div> */}
                <div className="col-12 col-sm-4 text-center text-sm-right">
                  <ul className="nav nav-tabs ml-auto">
                    <li>
                      <a
                        className="nav-link active"
                        href="#grid-view"
                        data-toggle="tab"
                      >
                        {" "}
                        <i className="fa fa-th" />{" "}
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="#list-view" data-toggle="tab">
                        {" "}
                        <i className="fa fa-list-ul" />{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product-categorie-box">
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    className="tab-pane fade show active"
                    id="grid-view"
                  >
                    <div className="row">
                    {products.map((product) => (
                      <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div className="products-single fix">
                          <div className="box-img-hover">
                            <div className="type-lb">
                              <p className="sale">Sale</p>
                            </div>
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
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left">
            <div className="product-categori">
              <div className="search-product">
                <form action="#">
                  <input
                    className="form-control"
                    placeholder="Search here..."
                    type="text"
                  />
                  <button type="submit">
                    {" "}
                    <i className="fa fa-search" />{" "}
                  </button>
                </form>
              </div>
              <div className="filter-sidebar-left">
                <div className="title-left">
                  <h3>Categories</h3>
                </div>
                <div
                  className="list-group list-group-collapse list-group-sm list-group-tree"
                  id="list-group-men"
                  data-children=".sub-men"
                >
                  <div className="list-group-collapse sub-men">
                    <a
                      className="list-group-item list-group-item-action"
                      href="#sub-men1"
                      data-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="sub-men1"
                    >
                      Fruits &amp; Drinks{" "}
                      <small className="text-muted">(100)</small>
                    </a>
                    <div
                      className="collapse show"
                      id="sub-men1"
                      data-parent="#list-group-men"
                    >
                      <div className="list-group">
                        <a
                          href="#"
                          className="list-group-item list-group-item-action active"
                        >
                          Fruits 1 <small className="text-muted">(50)</small>
                        </a>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          Fruits 2 <small className="text-muted">(10)</small>
                        </a>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          Fruits 3 <small className="text-muted">(10)</small>
                        </a>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          Fruits 4 <small className="text-muted">(10)</small>
                        </a>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          Fruits 5 <small className="text-muted">(20)</small>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-collapse sub-men">
                    <a
                      className="list-group-item list-group-item-action"
                      href="#sub-men2"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="sub-men2"
                    >
                      Vegetables
                      <small className="text-muted">(50)</small>
                    </a>
                    <div
                      className="collapse"
                      id="sub-men2"
                      data-parent="#list-group-men"
                    >
                      <div className="list-group">
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          Vegetables 1 <small className="text-muted">(10)</small>
                        </a>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          Vegetables 2 <small className="text-muted">(20)</small>
                        </a>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          Vegetables 3 <small className="text-muted">(20)</small>
                        </a>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="list-group-item list-group-item-action">
                    {" "}
                    Grocery <small className="text-muted">(150) </small>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    {" "}
                    Grocery <small className="text-muted">(11)</small>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    {" "}
                    Grocery <small className="text-muted">(22)</small>
                  </a>
                </div>
              </div>
              <div className="filter-price-left">
                <div className="title-left">
                  <h3>Price</h3>
                </div>
                <div className="price-box-slider">
                  <div id="slider-range" />
                  <p>
                    <input
                      type="text"
                      id="amount"
                      readOnly=""
                      style={{ border: 0, color: "#fbb714", fontWeight: "bold" }}
                    />
                    <button className="btn hvr-hover" type="submit">
                      Filter
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Shop Page */}
  </>
  
  )
}

export default ProductCate







