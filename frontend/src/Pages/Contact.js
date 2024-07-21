import React, { useState } from 'react';
import { Contact } from '../api/apiService';
// import { ToastContainer } from 'react-toastify';
import {toast   } from 'react-hot-toast';

const ContactUsPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const handleContact = (event) => {
        event.preventDefault();
        if (name !== "",
            email !== "",
            message !== ""
        ) {
            const contact = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
            console.log(contact);
            // console.log("images", selectedImages);

            Contact("Contact", contact)
                .then((response) => {
                    console.log("added", response);
                    if (response.status === 201 && response.data) {
                        toast.success('Thành công!', {
                            className: 'custom-toast'
                          });
                    } else {
                        alert("Lỗi khi thực hiện contact!");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Lỗi khi gọi API!");
                });
        } else {
            alert("Bạn chưa nhập đủ thông tin!");
        }
    };
    //



    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Xử lý việc gửi form tại đây
    //     console.log({ name, email, subject, message });
    //     // Đặt lại giá trị của các trường
    //   };

    return (
        <div>
            {/* Start All Title Box */}
            <div className="all-title-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Contact Us</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active"> Contact Us </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* End All Title Box */}
            {/* Start Contact Us */}
            <div className="contact-box-main">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-8 col-sm-12">
                            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Bootstrap</strong>
                                    <small>11 mins ago</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    {/* <ToastContainer /> */}
                                </div>
                            </div>


                            <div className="contact-form-right">
                            {/* <ToastContainer /> */}
                                <h2>GET IN TOUCH</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio justo, ultrices ac nisl sed, lobortis porta elit. Fusce in metus ac ex venenatis ultricies at cursus mauris.</p>
                                <form >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    placeholder="Your Email"
                                                    id="email"
                                                    className="form-control"
                                                    name="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="subject"
                                                    name="subject"
                                                    placeholder="Subject"
                                                    required
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <textarea
                                                    className="form-control"
                                                    id="message"
                                                    placeholder="Your Message"
                                                    rows="4"
                                                    required
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                ></textarea>
                                                <div className="help-block with-errors"></div>
                                            </div>
                                            <div className="submit-button text-center">
                                                <button onClick={handleContact} className="btn hvr-hover" id="submit" type="submit">
                                                    Send Message
                                                </button>
                                                <div id="msgSubmit" className="h3 text-center hidden"></div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="contact-info-left">
                                <h2>CONTACT INFO</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna diam, maximus ut ullamcorper quis, placerat id eros. Duis semper justo sed condimentum rutrum. Nunc tristique purus turpis. Maecenas vulputate.
                                </p>
                                <ul>
                                    <li>
                                        <p><i className="fas fa-map-marker-alt"></i>Address: Michael I. Days 9000 <br />Preston Street Wichita,<br /> KS 87213 </p>
                                    </li>
                                    <li>
                                        <p><i className="fas fa-phone-square"></i>Phone: <a href="tel:+1-888705770">+1-888 705 770</a></p>
                                    </li>
                                    <li>
                                        <p><i className="fas fa-envelope"></i>Email: <a href="mailto:contactinfo@gmail.com">contactinfo@gmail.com</a></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Contact Us */}
        </div>
    );
};

export default ContactUsPage;