import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import getAllSlideShow from '../../api/BaseUrl';
import { Container, Carousel } from 'react-bootstrap';
import baseURL from '../../api/BaseUrl';

function Sliders() {
  const [slideShows, setSlideShows] = useState([]);

  
  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await axios.get(baseURL + 'slideshows');
      setSlideShows(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
<Container>
      <Carousel id="header-carousel" className="carousel slide" interval={6000}>
        {slideShows.map((slideShow, index) => (
          <Carousel.Item key={index} className="carousel-item" style={{ height: 410 }}>
            <img
              className="d-block w-100"
              src={`http://localhost:8080/upload/${slideShow.imageUrl}`}
              width={400}
              height={400}
              alt={`Slide ${index + 1}`}
            />
            <Carousel.Caption>
              <Link to="/allproducts" className="btn btn-light py-2 px-3">
                Shop Now
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
    );
}
export default Sliders
