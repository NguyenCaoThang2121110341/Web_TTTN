import { Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';



// để link boostrap ở đây để các con của nó dùng luôn


function LayoutSite() {
    return ( 
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
     );
}
export default LayoutSite;