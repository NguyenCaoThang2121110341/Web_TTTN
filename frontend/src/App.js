

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import RouterSite from '../src/Router/index'
import LayoutSite from './Layouts/Main';
import { AuthProvider } from './components/User/AuthContext';
import {CartProvider} from './context/CartContext'
import { Toaster } from "react-hot-toast";
function App() {
  return (
<BrowserRouter>
<AuthProvider>
  <CartProvider>
    <Routes>
      <Route path="/" element={<LayoutSite />}>
        {RouterSite.RouterPublic.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Route>
    </Routes>
    <Toaster />
  </CartProvider>
</AuthProvider>
</BrowserRouter>    );
}

export default App;
