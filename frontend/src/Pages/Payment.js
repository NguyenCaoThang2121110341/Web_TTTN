import { useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import axios from "axios";
import {toast   } from 'react-hot-toast';
function Payment() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [price, setPrice] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {

        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');
        const storedEmail = localStorage.getItem('email');
        const storedPhone = localStorage.getItem('phone');
        const storedUser_id = localStorage.getItem("User_id")
       


        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedEmail) setEmail(storedEmail);
        if (storedPhone) setPhone(storedPhone);
        if (storedUser_id) setCustomerId(storedUser_id);



        
        

    }, []);
    console.log("user_id:", localStorage.getItem("User_id"));

    const { cartItems, clearCart } = useContext(CartContext);

    useEffect(() => {
        // Lưu user id và quantity vào biến productId
        if (cartItems.length > 0) {
            setProductId(` ${cartItems[0].id}`);
            setQuantity(`  ${cartItems[0].quantity}`)
            setPrice(` ${cartItems[0].price}`);
        }

        // Các logic khác
    }, [cartItems]);

    // let totalPrice = 0;
    // cartItems.forEach(item => {
    //     totalPrice += item.price * item.quantity;
    // });
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const initialTotalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalPrice(initialTotalPrice);
    }, [cartItems]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/order-items', {
                customerId,
                productId,
                quantity,
                price,
            });
            console.log(response.data);
            toast.success('Thành công!', {
              className: 'custom-toast'
            });
            clearCart(); // Gọi hàm clearCart để xóa tất cả dữ liệu trong CartContext
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Thanh toán không thành công");
        }
    };

    return (
        <>
         
  {/* Start All Title Box */}
  <div className="all-title-box">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2>Checkout</h2>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Shop</a>
            </li>
            <li className="breadcrumb-item active">Checkout</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* End All Title Box */}


  {/* Start Cart  */}
  <div className="cart-box-main">
    <div className="container">
      <div className="row new-account-login">
      
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-6 mb-3">
          <div className="checkout-address">
            <div className="title-left">
              <h3>Billing address</h3>
            </div>
            <form className="needs-validation" noValidate="">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name *</label>
                  <input
                  value={firstName}
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    {" "}
                    Valid first name is required.{" "}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name *</label>
                  <input
                  value={lastName}
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    {" "}
                    Valid last name is required.{" "}
                  </div>
                </div>
              </div>
           
              <div className="mb-3">
                <label htmlFor="email">Email Address </label>
                <input
                value={email}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder=""
                />
                <div className="invalid-feedback">
                  {" "}
                  Please enter a valid email address for shipping updates.{" "}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                value={phone}
                  type="phone"
                  className="form-control"
                  id="phone"
                  placeholder=""
                />
                <div className="invalid-feedback">
                  {" "}
                  Please enter a valid phone for shipping updates.{" "}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address (Please enter your delivery address)</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">
                  {" "}
                  Please enter your shipping address.{" "}
                </div>
              </div>
          
           
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="same-address"
                />
                <label className="custom-control-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="save-info"
                />
                <label className="custom-control-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>
              <hr className="mb-4" />
            
         
          
              <hr className="mb-1" />{" "}
            </form>
          </div>
        </div>
        <div className="col-sm-6 col-lg-6 mb-3">
          <div className="row">
           
            <div className="col-md-12 col-lg-12">
              <div className="odr-box">
                <div className="title-left">
                  <h3>Shopping cart</h3>
                </div>
                <div className="rounded p-2 bg-light">
                {cartItems.map((item, index) => (

                  
               
                  <div className="media mb-2"  key={index}>
                    <div className="media-body">
                      {" "}
                      <a href="detail.html">{item.name}</a>
                      <div className="small text-muted">
                        Price: ${item.price} <span className="mx-2">|</span> Qty: {item.quantity}{" "}
                        
                      </div>
                    </div>
                  </div>
         ))}


                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-12">
              <div className="order-box">
                <div className="title-left">
                  <h3>Your order</h3>
                </div>
                <div className="d-flex">
                  <div className="font-weight-bold">Product</div>
                  <div className="ml-auto font-weight-bold">Total</div>
                </div>
                <hr className="my-1" />
               
                <div className="d-flex">
                  <h4>Discount</h4>
                  <div className="ml-auto font-weight-bold"> $0 </div>
                </div>
                <hr className="my-1" />
               
                <div className="d-flex">
                  <h4>Tax</h4>
                  <div className="ml-auto font-weight-bold"> $ 0 </div>
                </div>
                <div className="d-flex">
                  <h4>Shipping Cost</h4>
                  <div className="ml-auto font-weight-bold"> Free </div>
                </div>
                <hr />
                <div className="d-flex gr-total">
                  <h5>Grand Total</h5>
                  <div className="ml-auto h5"> ${totalPrice} </div>
                </div>
                <hr />{" "}
              </div>
            </div>
            <div className="col-12 d-flex shopping-box">
              {" "}
              <a href="checkout.html" className="ml-auto btn hvr-hover" onClick={handleSubmit}>
                Place Order
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Cart */}
</>


           
    )
}

export default Payment