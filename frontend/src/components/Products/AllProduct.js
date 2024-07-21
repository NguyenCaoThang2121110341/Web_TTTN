import React, { useEffect, useState } from 'react'
import baseURL from '../../api/BaseUrl';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
import ImageProduct from '../Home/ImageProduct';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [productCart, setProductCart] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [isProductsFetched, setIsProductsFetched] = useState(false);
  const [tagName, setTagName] = useState(null);
  const [tags, setTags] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Phân loại');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const handleItemClick = (eventKey, event) => {
    setSelectedItem(event.target.innerText);
    handleSortPrice(eventKey);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(baseURL + 'categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get(baseURL + 'tags');
      setTags(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchProducts = () => {
    // Kiểm tra nếu giá trị tìm kiếm là rỗng, hiển thị tất cả sản phẩm
    if (!searchValue) {
      return currentProducts;
    }

    // Tìm kiếm các sản phẩm có productName chứa giá trị tìm kiếm
    const filteredProducts = currentProducts.filter((product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase())
    );

    //Lọc category
    // if (productCart) {
    //   return productCart


    // }
    return filteredProducts;
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };
  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  const fetchCatProd = async () => {
    if (!isProductsFetched) {
      fetchProducts();
      setIsProductsFetched(true);
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/products/categories/${categoryName}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTagProd = async () => {
    if (!isProductsFetched) {
      fetchProducts();
      setIsProductsFetched(true);
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/products/tag/${tagName}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterTag = (event, name) => {
    setTagName(name);
    console.log(name);
    fetchTagProd();
  };



  const handleFilterCategory = (event, categoryName) => {
    setCategoryName(categoryName);
    console.log(categoryName);
    fetchCatProd();
  };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // Tính toán số trang cần thiết
  const totalPages = Math.ceil(products.length / productsPerPage);

   // Tính toán các sản phẩm cần hiển thị trên trang hiện tại
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
   // Hàm xử lý khi người dùng chọn trang khác
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
    const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}products`);
      console.log("products", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const sortedLowToHigh = [...products].sort((a, b) => a.discountPrice - b.discountPrice);
  const sortedHighToLow = [...products].sort((a, b) => b.discountPrice - a.discountPrice);

  const handleSortPrice = (eventKey) => {
    if(eventKey === "High Price → Low Price")
      {
        setProducts(sortedHighToLow);
      } else if(eventKey === "Low Price → High Price")
      {
        setProducts(sortedLowToHigh)
      }
  }
  useEffect(() => {
    if (!isProductsFetched) {
      fetchProducts();
      setIsProductsFetched(true);
    }
  }, [isProductsFetched]);
  return (
    <>
      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>All Products</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">All Products</li>
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
                  <div className="col-12 col-sm-8 text-center text-sm-left">
                  <div class="toolbar-sorter-right">
                  <span>Sort by </span>
                    <Dropdown onSelect={handleItemClick}>
                      <Dropdown.Toggle variant="non" id="dropdown-basic">
                      {selectedItem}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="High Price → Low Price">High Price → Low Price</Dropdown.Item>
                        <Dropdown.Item eventKey="Low Price → High Price">Low Price → High Price</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>

                    <p>Showing all {products.length} results</p>
                  </div>
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
                      id="grid-view">

                      <div className="row">
                        {searchProducts().map((product) => (
                          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                            <div className="products-single fix">
                              <div className="box-img-hover">
                                <div className="type-lb">

                                </div>
                                <ImageProduct id={product.id} name={product.productName} tagName={"best sellers"} style={{ width: '200', height: '200' }} className="img-fluid" />

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
                                <del>${product.regularPrice}.00</del>
                                <h5>${product.discountPrice}.00</h5>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                    <Pagination className="justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
      </Pagination>


                    <div role="tabpanel" className="tab-pane fade" id="list-view">

                      <div className="list-view-box">
                        <div className="row">
                          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                            <div className="products-single fix">
                              <div className="box-img-hover">
                                <div className="type-lb">
                                  <p className="sale">Sale</p>
                                </div>
                                <img
                                  src="images/img-pro-02.jpg"
                                  className="img-fluid"
                                  alt="Image"
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
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-lg-8 col-xl-8">
                            <div className="why-text full-width">
                              <h4>Lorem ipsum dolor sit amet</h4>
                              <h5>
                                {" "}
                                <del>$ 60.00</del> $40.79
                              </h5>
                              <p>
                                Integer tincidunt aliquet nibh vitae dictum. In
                                turpis sapien, imperdiet quis magna nec, iaculis
                                ultrices ante. Integer vitae suscipit nisi. Morbi
                                dignissim risus sit amet orci porta, eget aliquam
                                purus sollicitudin. Cras eu metus felis. Sed arcu
                                arcu, sagittis in blandit eu, imperdiet sit amet
                                eros. Donec accumsan nisi purus, quis euismod ex
                                volutpat in. Vestibulum eleifend eros ac lobortis
                                aliquet. Suspendisse at ipsum vel lacus vehicula
                                blandit et sollicitudin quam. Praesent vulputate
                                semper libero pulvinar consequat. Etiam ut placerat
                                lectus.
                              </p>
                              <a className="btn hvr-hover" href="#">
                                Add to Cart
                              </a>
                            </div>
                          </div>
                        </div>
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
                      value={searchValue}
                      onChange={handleSearchChange}

                    />
                    <button type="submit">
                      {" "}
                      <i className="fa fa-search" />{" "}
                    </button>
                  </form>
                </div>
                <div className="filter-sidebar-left">
                  <div className="title-left">
                    <h3>Phân loại</h3>
                  </div>


                  <div className="list-group-collapse sub-men">
                    <a class="list-group-item list-group-item-action" href="#sub-men1" data-toggle="collapse" aria-expanded="true" aria-controls="sub-men1" />Categories<small class="text-muted"></small>
                    {categories && categories.map((categories) => (

                      <a
                        className="list-group-item list-group-item-action"
                        href="#tags"
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="sub-men2"
                        onClick={(event) => handleFilterCategory(event, categories.categoryName)}                    >
                        {categories.categoryName}
                        <small className="text-muted"></small>
                      </a>
                    ))}

                  </div>
                  <div className="list-group-collapse sub-men">
                    <a class="list-group-item list-group-item-action" href="#sub-men1" data-toggle="collapse" aria-expanded="true" aria-controls="sub-men1" />Tags<small class="text-muted"></small>
                    {tags && tags.map((tags) => (

                      <a
                        className="list-group-item list-group-item-action"
                        href="#tags"
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="sub-men2"
                        onClick={(event) => handleFilterTag(event, tags.name)}                    >
                        {tags.name}
                        <small className="text-muted"></small>
                      </a>
                    ))}

                  </div>
                </div>
              </div>

             
              <button onClick={() => fetchProducts()} fetchProducts className="btn hvr-hover">
                Filter
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* End Shop Page */}
    </>

  )
}

export default AllProducts







