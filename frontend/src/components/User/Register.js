import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../api/apiService";
import {toast   } from 'react-hot-toast';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     marginTop: 20,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: "auto",
//     maxWidth: 600,
//   },
//   title: {
//     fontSize: 30,
//     textAlign: "center",
//   },
//   txtInput: {
//     width: "98%",
//     margin: "10px",
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));
function Register() {
  // const classes = useStyles();
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkAdd, setCheckAdd] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [passwordHash, SetpasswordHash] = useState(null);



  const navigate = useNavigate();


 
  
  const handleRegister = (event) => {
    event.preventDefault();

    if (firstName !== "" && lastName !== "" && phone !== "" && email !== ""&& passwordHash !== "") {
      const user = {
        firstName,
        lastName,
        phone,
        email,
        passwordHash,
      };
      console.log(user);
      setCheckAdd(true);
      addUser("Users", user).then((item) => {
        console.log("added", item);
        

    });
    toast.success('Thành công!', {
      className: 'custom-toast'
    });
} else {
    alert("Bạn chưa nhập đủ thông tin!");
}
};


     
useEffect(() => {
  if (checkAdd) {
      const timeout = setTimeout(() => {
          navigate("/login");
      }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

      // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
      return () => clearTimeout(timeout);
  }
}, [checkAdd, navigate]);

  


 
  return (
    <>
    {/* ============================ COMPONENT REGISTER   ================================= */}

    <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
      <article className="card-body">
        <header className="mb-4">
          <h2 className="card-title">Register</h2>
        </header>
        <form>
          <div className="form-row">
            <div className="col form-group">
              <label>First name</label>
              <input    onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" placeholder="" />
            </div>{" "}
            {/* form-group end.// */}
            <div className="col form-group">
              <label>Last name</label>
              <input type="text"  onChange={(e) => setLastName(e.target.value)} className="form-control" placeholder="" />
            </div>{" "}
            {/* form-group end.// */}
          </div>{" "}
          {/* form-row end.// */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="" />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>{" "}
          <div className="form-group">
            <label>Phone</label>
            <input type="phone" onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="" />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>{" "}
          {/* form-group end.// */}
          {/* <div className="form-group">
            <label className="custom-control custom-radio custom-control-inline">
              <input
                className="custom-control-input"
                defaultChecked=""
                type="radio"
                name="gender"
                defaultValue="option1"
              />
              <span className="custom-control-label"> Male </span>
            </label>
            <label className="custom-control custom-radio custom-control-inline">
              <input
                className="custom-control-input"
                type="radio"
                name="gender"
                defaultValue="option2"
              />
              <span className="custom-control-label"> Female </span>
            </label>
          </div>{" "} */}
          {/* form-group end.// */}
          {/* <div className="form-row">
            <div className="form-group col-md-6">
              <label>City</label>
              <input type="text" className="form-control" />
            </div>{" "}
 
            <div className="form-group col-md-6">
              <label>Country</label>
              <select id="inputState" className="form-control">
                <option> Choose...</option>
                <option>Uzbekistan</option>
                <option>Russia</option>
                <option selected="">United States</option>
                <option>India</option>
                <option>Afganistan</option>
              </select>
            </div>{" "}
     
          </div>{" "} */}
          {/* form-row.// */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Create password</label>
              <input onChange={(e) => SetpasswordHash(e.target.value)} className="form-control" type="password" />
            </div>{" "}
            {/* form-group end.// */}
            <div className="form-group col-md-6">
              <label>Repeat password</label>
              <input className="form-control" type="password" />
            </div>{" "}
            {/* form-group end.// */}
          </div>
          <div className="form-group">
            <button        onClick={handleRegister} style={{ backgroundColor: '#b0b435' }} type="submit" className="btn btn-primary btn-block">
              {" "}
              Register
            </button>
          </div>{" "}
          {/* form-group// */}
          <div className="form-group">
            <label className="custom-control custom-checkbox">
              {" "}
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked=""
              />{" "}
              <div className="custom-control-label">
                {" "}
                I am agree with <a href="#">terms and contitions</a>
              </div>{" "}
            </label>
          </div>{" "}
          {/* form-group end.// */}
        </form>
      </article>
      {/* card-body.// */}
    </div>{" "}
    {/* card .// */}
    <p className="text-center mt-4">
      Have an account? <Link  to={`/login`} style={{ backgroundColor: '#b0b435' }} href="">Log In</Link>
    </p>
    <br />
    <br />
    {/* ============================ COMPONENT REGISTER  END.// ================================= */}
    {/* ========================= SECTION CONTENT END// ========================= */}
    {isRegistered && <p className="text-success">Đăng ký thành công!</p>}
  </>
  
  )
}

export default Register







