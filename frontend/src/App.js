import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import Footer from './Components/Footer/Footer';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Success from './Components/CheckoutSuccess/Success';
import Cancel from './Components/CheckoutSuccess/Cancel';
import UserOrderList from './Components/UserOrderList/UserOrderList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>} />
          <Route path='/men' element={<ShopCategory category='men' />} />
          <Route path='/women' element={<ShopCategory category='women' />} />
          <Route path='/kids' element={<ShopCategory category='kids' />} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
          <Route path='/login' element={<LoginSignup/>} />
          <Route path='/favorites' element={<ProtectedRoute><Favorites/></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path='/orders' element={<ProtectedRoute><UserOrderList/></ProtectedRoute>} />
          <Route path='/success' element={<ProtectedRoute><Success/></ProtectedRoute>} />
          <Route path='/cancel' element={<ProtectedRoute><Cancel/></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
