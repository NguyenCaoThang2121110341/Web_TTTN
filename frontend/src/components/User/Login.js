import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {toast   } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');

  const [passwordHash, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token, firstName, lastName, phone,id) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("phone", phone);
    localStorage.setItem("User_id", id);
    setIsLoggedIn(true);
    console.log("user_id:", localStorage.getItem("User_id"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/api/Users/login', { email, passwordHash });
      console.log(response.data);
      handleLogin(response.data.token, response.data.user.firstName, response.data.user.lastName, response.data.user.phone, response.data.user.id);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Email hoặc password không đúng");
     
    }
  };

  if (isLoggedIn) {
    toast.success('Thành công!', {
      className: 'custom-toast'
    });
    return <Navigate to="/" state={{ email: email }} />;
  }
  return (
    <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
    {/* ============================ COMPONENT LOGIN   ================================= */}
    <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
      <div className="card-body">
        <h2 className="card-title mb-4" >Login</h2>
        <form onSubmit={handleSubmit}>
          {/* <a href="#" className="btn btn-facebook btn-block mb-2">
            {" "}
            <i className="fab fa-facebook-f" /> &nbsp; Sign in with Facebook
          </a>
          <a href="#" className="btn btn-google btn-block mb-4">
            {" "}
            <i className="fab fa-google" /> &nbsp; Sign in with Google
          </a> */}
          <div className="form-group">
            <input
             value={email}
              name=""
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="text"
            />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group">
            <input
              name=""
              value={passwordHash}
              className="form-control"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group">
            <a href="#" className="float-right">
              Forgot password?
            </a>
            <label className="float-left custom-control custom-checkbox">
              {" "}
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked=""
              />{" "}
              <div className="custom-control-label"> Remember </div>{" "}
            </label>
          </div>{" "}
          {/* form-group form-check .// */}
          <div className="form-group">
            <button style={{ backgroundColor: '#b0b435' }} type="submit" className="btn btn-primary btn-block">
              {" "}
              Login
            </button>
          </div>{" "}
          {/* form-group// */}
        </form>
      </div>{" "}
      {/* card-body.// */}
    </div>{" "}
    {/* card .// */}
    <p className="text-center mt-4">
      Don't have account? <Link to={`/register`} style={{ backgroundColor: '#b0b435' }} href="#">Sign up</Link>
    </p>
    <br />
    <br />
    {/* ============================ COMPONENT LOGIN  END.// ================================= */}
  </section>
  
  )
}

export default Login







