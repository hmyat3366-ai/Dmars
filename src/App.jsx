import { Routes, Route } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { CartProvider } from './context/CartContext';
import { FoodProvider } from './context/FoodContext';
import { RoomProvider } from './context/RoomContext';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import FoodHome from './pages/FoodHome';
import FoodDetails from './pages/FoodDetails';
import FoodOrder from './pages/FoodOrder';
import FoodCart from './pages/FoodCart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Guide from './pages/Guide';
import About from './pages/About';
import AccountSettings from './pages/AccountSettings';
import OwnerDashboard from './pages/OwnerDashboard';
import AddFood from './pages/AddFood';
import AddRoom from './pages/AddRoom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <ReactLenis root>
      <RoomProvider>
      <FoodProvider>
        <CartProvider>
          <AnimatedBackground />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room-details/:id" element={<RoomDetails />} />
            <Route path="/foods" element={<FoodHome />} />
            <Route path="/food-details/:id" element={<FoodDetails />} />
            <Route path="/foodorder" element={<FoodOrder />} />
            <Route path="/foodcart" element={
              <ProtectedRoute>
                <FoodCart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/ordertracking" element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            } />
            <Route path="/guide" element={<Guide />} />
            <Route path="/about" element={<About />} />
            <Route path="/account-settings" element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            } />
            <Route path="/owner-dashboard" element={
              <ProtectedRoute>
                <OwnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/add-food" element={<AddFood />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Other routes will be added here as we convert more files */}
          </Routes>
        </CartProvider>
      </FoodProvider>
    </RoomProvider>
    </ReactLenis>
  );
}

export default App;
