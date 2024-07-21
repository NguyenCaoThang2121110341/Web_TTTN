import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../api/BaseUrl';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Category() {
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [hideCategories, setHideCategories] = useState(false);

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

  const limitedCategories = showAllCategories ? categories : categories.slice(0, 6);

  const handleShowMore = () => {
    setShowAllCategories(true);
  };

  const handleHideCategories = () => {
    setShowAllCategories(false);
    setHideCategories(true);
  };

  return (
    <div className="categories-shop">
      <div className="container">
        <div className="title-all text-center">
          <h1>Category</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet lacus enim.
          </p>
        </div>
        <Row>
          {limitedCategories.map((category) => (
            <Col key={category.id} lg={4} md={4} sm={12} xs={12}>
              <div className="shop-cat-box">
                <img
                  className="img-fluid"
                  src={require('../../asset/images/xam.jpg')}
                  alt=""
                  style={{ height: '50px' }}
                />
                <Link className="btn hvr-hover" href="#" to={`products/categories/${category.categoryName}`}>
                  {category.categoryName}
                </Link>
              </div>
            </Col>
          ))}
        </Row>
        {!showAllCategories && categories.length > 6 && (
          <div className="text-center mt-4">
            <Button style={{ backgroundColor: '#b0b435' }} onClick={handleShowMore}>More</Button>
          </div>
        )}
        {showAllCategories && (
          <div className="text-center mt-4">
            <Button style={{ backgroundColor: '#b0b435' }} onClick={handleHideCategories}>Hide</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;