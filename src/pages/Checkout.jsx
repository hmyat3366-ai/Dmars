import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, getSubtotal, clearCart } = useCart();
  const { addFoodOrder } = useAuth();
  const navigate = useNavigate();
  const [isPlaced, setIsPlaced] = useState(false);

  const subtotal = getSubtotal();
  const deliveryFee = 0;
  const serviceFee = cartItems.length > 0 ? 1.00 : 0;
  const total = subtotal + deliveryFee + serviceFee;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    // Generate order and save to user's history
    const restaurantName = cartItems.length > 0 ? (cartItems[0].restaurant || 'DMAR Food') : 'DMAR Food';
    addFoodOrder({ 
      restaurant: restaurantName, 
      total: `$${total.toFixed(2)}`, 
      items: cartItems 
    });

    setIsPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/ordertracking');
    }, 2000);
  };

  if (isPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDF9F0] font-sans">
        <Header />
        <main className="flex-grow flex items-center justify-center">
            <div className="text-center bg-white p-12 rounded-3xl shadow-lg border border-gray-100 animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-500 text-lg">Redirecting to order tracking...</p>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF9F0] font-sans">
      <Header />
      
      {/* Abstract Wave Background Pattern */}
      <div className="absolute top-0 right-0 w-[300px] h-[150px] bg-no-repeat z-0 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1440 320\"><path fill=\"%23e6912c\" fill-opacity=\"0.2\" d=\"M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z\"></path><path fill=\"%23e6912c\" fill-opacity=\"0.3\" d=\"M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,149.3C960,149,1056,203,1152,218.7C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z\"></path></svg>')" }}></div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative">
          {/* Title Section */}
          <div className="flex items-center mb-8">
              <Link to="/foodcart" className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
              </Link>
              <h1 className="text-4xl font-serif font-bold text-dark">Checkout</h1>
          </div>

          {/* Delivery Address Section */}
          <section className="mb-8 relative" data-purpose="delivery-address-container">
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-100 relative z-10">
                  <h2 className="text-xl font-bold text-dark mb-4">Delivery address</h2>
                  <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                          <svg className="h-5 w-5 text-dark" fill="currentColor" viewBox="0 0 20 20">
                              <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                          </svg>
                      </div>
                      <div>
                          <p className="font-bold text-dark">Home</p>
                          <p className="text-sm text-gray-500">Dubai Mall, Dubai</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Payment Method Section */}
          <section className="mb-8 relative" data-purpose="payment-method-container">
              <h2 className="text-2xl font-serif font-bold text-dark mb-6">Payment Method</h2>
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border-2 border-primary/20 relative z-10">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center">
                          <div className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center mr-4">
                              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              </svg>
                          </div>
                          <div>
                              <p className="font-bold text-dark">Cash On Delivery</p>
                              <p className="text-xs text-gray-400 font-semibold">CASH</p>
                          </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                          <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
                          </svg>
                      </div>
                  </div>
              </div>
          </section>

          {/* Order Summary Section */}
          <section className="mb-12 relative overflow-hidden" data-purpose="order-summary-container">
              <div className="bg-white rounded-3xl shadow-lg p-10 relative z-10 border border-gray-50 min-h-[400px] flex flex-col justify-between">
                  <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-no-repeat bg-bottom-right z-0 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1440 320\"><path fill=\"%23e6912c\" fill-opacity=\"0.2\" d=\"M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\"></path></svg>')" }}></div>
                  
                  <div className="relative z-10">
                      <h2 className="text-3xl font-serif font-bold text-dark mb-10">Order summary</h2>
                      <div className="space-y-6 mb-12">
                          <div className="flex justify-between items-center text-gray-600 font-medium text-lg">
                              <span>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
                              <span>AED {subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-gray-600 font-medium text-lg">
                              <span>Delivery and Service fee</span>
                              <span>AED {(deliveryFee + serviceFee).toFixed(2)}</span>
                          </div>
                      </div>
                      <div className="flex justify-between items-center pt-8 border-t border-gray-100 mb-8">
                          <h3 className="text-4xl font-bold text-dark">Total Amount</h3>
                          <p className="text-4xl font-bold text-primary">AED {total.toFixed(2)}</p>
                      </div>
                  </div>
                  <div className="mt-auto relative z-10">
                      <p className="text-center text-sm text-gray-500 mb-6">
                          By placing this order, you agree to our <a className="text-primary underline" href="#">Terms &amp; Conditions.</a>
                      </p>
                      <button 
                        onClick={handlePlaceOrder}
                        disabled={cartItems.length === 0}
                        className="w-full py-5 bg-primary text-white text-xl font-bold rounded-xl shadow-lg hover:bg-opacity-90 disabled:opacity-50 transition-all uppercase tracking-wider"
                      >
                          Place Order
                      </button>
                  </div>
              </div>
          </section>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
