import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FoodCart = () => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal } = useCart();
  
  const subtotal = getSubtotal();
  const deliveryFee = 0; // Free for first order
  const serviceFee = cartItems.length > 0 ? 1.00 : 0;
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="bg-[#FDFBF4] font-sans text-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8 flex-grow w-full">
          {/* Cart Title & Back */}
          <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                  <Link to="/foodorder" aria-label="Go back" className="p-2 border border-gray-200 rounded-full hover:bg-white bg-white shadow-sm">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                  </Link>
                  <h1 className="text-3xl font-bold text-gray-900">Cart</h1>
              </div>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">{cartItems.length} items</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 mb-8">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/foodorder" className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 transition">
                    Browse Menu
                </Link>
            </div>
          ) : (
            <>
                {/* Delivery Banner */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 mb-8">
                    <div className="bg-orange-50 p-3 rounded-full">
                        {/* Bicycle Icon */}
                        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.5,5.5A1.5,1.5 0 0,1 17,7A1.5,1.5 0 0,1 15.5,8.5A1.5,1.5 0 0,1 14,7A1.5,1.5 0 0,1 15.5,5.5M19.5,9H18L14.86,4.5H11V6H13.63L15.37,8.5H12A3,3 0 0,0 9,11.5A3,3 0 0,0 12,14.5H14.15L15,16H11V18H16L18,15.5H19.5V14.5H17.47L16,12H19.5V9M5,15A3,3 0 0,0 8,18A3,3 0 0,0 11,15A3,3 0 0,0 8,12A3,3 0 0,0 5,15M19,15A3,3 0 0,0 22,18A3,3 0 0,0 25,15A3,3 0 0,0 22,12A3,3 0 0,0 19,15Z"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">Estimated delivery</h3>
                        <p className="text-gray-500">Standard Delivery (15-30min)</p>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-4 mb-8">
                    {cartItems.map((item) => {
                        const itemBaseTotal = item.price;
                        const toppingsTotal = item.selectedToppings ? item.selectedToppings.reduce((sum, t) => sum + t.price, 0) : 0;
                        const fbtTotal = item.selectedFbt ? item.selectedFbt.reduce((sum, f) => sum + f.price, 0) : 0;
                        const unitPrice = itemBaseTotal + toppingsTotal + fbtTotal;
                        const lineTotal = unitPrice * item.quantity;

                        return (
                            <div key={item.cartId} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                                <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500 transition">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        </button>
                                    </div>
                                    
                                    {/* Options */}
                                    <div className="text-xs text-gray-500 mt-1 mb-3 space-y-1">
                                        {item.selectedToppings && item.selectedToppings.map(t => (
                                            <div key={t.id}>+ {t.name}</div>
                                        ))}
                                        {item.selectedFbt && item.selectedFbt.map(f => (
                                            <div key={f.id}>+ {f.name}</div>
                                        ))}
                                        {item.specialInstructions && (
                                            <div className="italic text-orange-500">Note: {item.specialInstructions}</div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-end mt-auto">
                                        <div className="font-bold text-primary">AED {lineTotal.toFixed(2)}</div>
                                        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                                            <button onClick={() => updateQuantity(item.cartId, -1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded transition">-</button>
                                            <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartId, 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded transition">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Link to="/foodorder" className="w-full bg-orange-50 text-primary border border-orange-200 py-3 rounded-xl font-bold text-center hover:bg-orange-100 transition mb-12 block">
                    Add More Items
                </Link>

                {/* Summary Section */}
                <section className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-900">AED {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Standard delivery</span>
                            <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Service fee</span>
                            <span className="font-semibold text-gray-900">AED {serviceFee.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Total</h2>
                            <p className="text-gray-500 text-sm">(Incl. fees and tax)</p>
                        </div>
                        <div className="text-3xl font-extrabold text-primary">AED {total.toFixed(2)}</div>
                    </div>
                </section>

                {/* Proceed Button */}
                <Link to="/checkout" className="block text-center w-full bg-primary text-white py-4 rounded-xl font-bold text-xl shadow-lg hover:opacity-95 transition mb-24">
                    Proceed to Checkout
                </Link>
            </>
          )}

      </main>

      <Footer />
    </div>
  );
};

export default FoodCart;
