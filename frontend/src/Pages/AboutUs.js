import React from 'react';

const AboutUs = () => {
  return (
    <>
      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>ABOUT US</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">ABOUT US</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}

      {/* Start About Page */}
      <div className="about-box-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-frame">
                <img className="img-fluid" src={require("./../asset/images/about-img.jpg")} alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="noo-sh-title-top">We are Kiet & Thang <span>SmartPhone Shop</span></h2>
              <p>HI EVERYONE!</p>
              <p>Welcome to our website, we're happy to show you guys our website. Here you can see what We was taught through 3 years. This is our attempt, our hobby, and we hope you guys will appreciate this. Beside. Additionally, we are thankful for the guidance of the teacher. </p>
              <a className="btn hvr-hover" href="#">Read More</a>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>We are Trusted</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>We are Professional</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>We are Expert</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End About Page */}
    </>
  );
};

export default AboutUs;