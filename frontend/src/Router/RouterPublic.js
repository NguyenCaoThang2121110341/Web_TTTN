

import Home from "../Pages/Home";
import AllProduct from "../components/Products/AllProduct"
import Details from "../components/Products/Detail";
import Register from "../components/User/Register";
import Login from "../components/User/Login";
import ProductCate from "../components/Products/ProductCate";
import Cart from "../Pages/Cart";
import Payment from "../Pages/Payment";
import ContactUsPage from "../Pages/Contact";
import AboutUs from "../Pages/AboutUs";
import PostAndTopic from "../Pages/PostAndTopic";
const RouterPublic = [
    { path: '/', component: Home},
    { path: '/details/:id', component: Details },
    { path: '/allproducts', component: AllProduct },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/products/categories/:slug', component: ProductCate},
    { path: '/cart', component: Cart},
    // { path: '/danh-muc-san-pham/:slug', component: ProductCategory },
    // { path: '/thuong-hieu/:slug', component: ProductBrand },
    // { path: '/shop', component: Product},
    // { path: '/Contact', component: Contact},
    // { path: '/About', component: About}
    { path: '/payment', component: Payment},
    { path: '/contact', component: ContactUsPage},
    { path: '/aboutus', component: AboutUs},
    { path: '/posts', component: PostAndTopic},
    




];
export default RouterPublic;