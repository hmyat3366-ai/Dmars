import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { menuItems } = useFood();
  
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedFbt, setSelectedFbt] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    // Find item by ID (params are strings, data id is number)
    const foundItem = menuItems.find(i => i.id === Number(id));
    if (foundItem) {
      setItem(foundItem);
    } else {
      // Handle not found
      navigate('/foodorder');
    }
  }, [id, navigate, menuItems]);

  if (!item) return null;

  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev => {
      const exists = prev.find(t => t.id === topping.id);
      if (exists) {
        return prev.filter(t => t.id !== topping.id);
      }
      if (prev.length < 2) {
        return [...prev, topping];
      }
      return prev; // Max 2
    });
  };

  const handleFbtToggle = (fbt) => {
    setSelectedFbt(prev => {
      const exists = prev.find(f => f.id === fbt.id);
      if (exists) {
        return prev.filter(f => f.id !== fbt.id);
      }
      return [...prev, fbt];
    });
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({
      ...item,
      quantity,
      selectedToppings,
      selectedFbt,
      specialInstructions
    });
    navigate('/foodcart');
  };

  const currentPrice = item.price + 
    selectedToppings.reduce((sum, t) => sum + t.price, 0) + 
    selectedFbt.reduce((sum, f) => sum + f.price, 0);

  return (
    <div className="bg-[#FCF9EE] font-sans text-[#333333] min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 pb-32">
          {/* BackButton */}
          <div className="mb-6">
              <Link to="/foodorder" className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 text-primary hover:bg-gray-50 transition">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
              </Link>
          </div>

          {/* HeroSection */}
          <section className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-12">
              <div className="relative">
                  <img alt={item.name} className="w-full h-[400px] object-cover" src={item.img} />
              </div>
              <div className="p-8">
                  <div className="flex justify-between items-start">
                      <div>
                          <h1 className="text-3xl font-bold font-serif mb-2">{item.name}</h1>
                          <p className="text-gray-500 text-sm max-w-md">{item.desc}</p>
                      </div>
                      <div className="text-right">
                          <div className="text-gray-400 text-sm line-through">AED {item.oldPrice.toFixed(2)}</div>
                          <div className="flex items-center space-x-2">
                              <span className="text-primary font-bold text-sm">Sale</span>
                              <span className="text-primary text-3xl font-bold">AED {item.price.toFixed(2)}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* ChoiceOfTopping */}
          {item.toppings && item.toppings.length > 0 && (
            <section className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold font-serif">Choice Of Topping</h2>
                        <p className="text-gray-500 text-sm">Select up to 2</p>
                    </div>
                    <span className="bg-gray-100 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-700">Optional</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.toppings.map(topping => {
                        const isSelected = selectedToppings.some(t => t.id === topping.id);
                        return (
                            <div key={topping.id} onClick={() => handleToppingToggle(topping)} className={`p-4 rounded-xl flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border cursor-pointer transition ${isSelected ? 'border-primary bg-orange-50' : 'border-gray-50 bg-white'}`}>
                                <div>
                                    <h3 className="font-semibold">{topping.name}</h3>
                                    <p className="text-gray-400 text-xs">+AED {topping.price.toFixed(2)}</p>
                                </div>
                                <button className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${isSelected ? 'border-primary bg-primary text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}>
                                    {isSelected ? (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
          )}

          {/* FrequentlyBroughtTogether */}
          {item.fbt && item.fbt.length > 0 && (
            <section className="mb-12 relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold font-serif">Frequently Bought Together</h2>
                        <p className="text-gray-500 text-sm">Others Customers also ordered these</p>
                    </div>
                    <span className="bg-gray-100 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-700">Optional</span>
                </div>
                {item.fbt.map(fbt => {
                    const isSelected = selectedFbt.some(f => f.id === fbt.id);
                    return (
                        <div key={fbt.id} onClick={() => handleFbtToggle(fbt)} className={`max-w-md p-4 rounded-xl flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border cursor-pointer relative z-10 ${isSelected ? 'border-primary bg-orange-50' : 'bg-white border-gray-50'}`}>
                            <img alt={fbt.name} className="w-16 h-16 rounded-lg object-cover mr-4" src={fbt.img} />
                            <div className="flex-grow">
                                <h3 className="font-semibold">{fbt.name}</h3>
                                <p className="text-gray-400 text-xs">+AED {fbt.price.toFixed(2)}</p>
                            </div>
                            <input readOnly checked={isSelected} className="w-6 h-6 text-primary border-gray-300 rounded focus:ring-primary" type="checkbox" />
                        </div>
                    );
                })}
            </section>
          )}

          {/* SpecialInstructions */}
          <section className="mb-12">
              <h2 className="text-2xl font-bold font-serif mb-2">Special Instructions</h2>
              <p className="text-gray-500 text-sm mb-4">Please let us know if you are allergic to anything or if we need to avoid anything</p>
              <div className="relative">
                  <textarea 
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value.slice(0, 500))}
                    className="w-full h-32 p-4 bg-white border border-gray-200 rounded-xl focus:ring-primary focus:border-primary" 
                    placeholder="eg. no mayo">
                  </textarea>
                  <div className="absolute bottom-3 right-4 text-xs text-gray-400">{specialInstructions.length}/500</div>
              </div>
          </section>
      </main>

      {/* BottomStickyBar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-5xl mx-auto px-4 py-6 flex items-center space-x-6">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-white rounded-md transition font-bold">-</button>
                  <span className="px-6 font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-primary hover:bg-white rounded-md transition font-bold">+</button>
              </div>
              <div className="flex-grow flex items-center gap-4">
                  <div className="hidden md:block text-right">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="font-bold text-xl text-primary">AED {(currentPrice * quantity).toFixed(2)}</div>
                  </div>
                  <button onClick={handleAddToCart} className="flex-grow text-center py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                      Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <Footer />
    </div>
  );
};

export default FoodDetails;
