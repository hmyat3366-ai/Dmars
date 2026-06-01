import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useFood } from '../context/FoodContext';

const categories = ['All', 'Popular', 'Main Menu', 'Salad', 'Drink'];

const FoodOrder = () => {
  const { menuItems } = useFood();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.desc.toLowerCase().includes(q) && !item.tags.some(t => t.toLowerCase().includes(q))) {
          return false;
        }
      }
      // Category
      if (activeCategory === 'All') return true;
      if (activeCategory === 'Popular') return item.tags.includes('Popular');
      return item.category === activeCategory;
    });
  }, [searchQuery, activeCategory, menuItems]);

  return (
    <div className="min-h-screen bg-[#FEFBF1] font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Navigation Back Button */}
          <div className="mb-6">
              <Link to="/foods" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-primary hover:bg-gray-50">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
              </Link>
          </div>

          {/* RestaurantHeroCard */}
          <section className="bg-white rounded-2xl p-6 mb-12 flex flex-col md:flex-row gap-8 items-start shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm">
                  <img alt="Shwe Zun Restaurant" className="w-full h-auto object-cover"
                      src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
                      style={{ aspectRatio: '4/3', objectPosition: '50% 50%' }} />
              </div>
              <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">Shwe Zun Restaurant</h1>
                      <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Open Now
                      </span>
                  </div>
                  <p className="text-gray-500 mb-8 flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                      Myanmar Cuisine • {menuItems.length} Items Available
                  </p>
                  <div className="grid grid-cols-3 divide-x border-t pt-6 border-gray-100">
                      <div className="px-4">
                          <div className="flex items-center gap-1 mb-1">
                              <span className="text-primary">★</span>
                              <span className="font-bold text-gray-900">4.8</span>
                          </div>
                          <p className="text-xs text-gray-400">1.2k+ Reviews</p>
                      </div>
                      <div className="px-4">
                          <div className="flex items-center gap-2 mb-1">
                              <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              </svg>
                              <span className="font-bold text-gray-900">Free Delivery</span>
                          </div>
                          <p className="text-xs text-gray-400">On orders above AED 20</p>
                      </div>
                      <div className="px-4">
                          <div className="flex items-center gap-2 mb-1">
                              <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              </svg>
                              <span className="font-bold text-gray-900">Time</span>
                          </div>
                          <p className="text-xs text-gray-400">24-25 min</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Filter Tabs + Search */}
          <section className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                  {categories.map((cat) => (
                      <button key={cat} onClick={() => setActiveCategory(cat)}
                          className={`px-10 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                              activeCategory === cat
                                  ? 'bg-primary text-white'
                                  : 'border border-primary text-primary bg-white hover:bg-orange-50'
                          }`}>
                          {cat}
                      </button>
                  ))}
              </div>
              <div className="relative w-full md:w-80">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                  </div>
                  <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-sm"
                      placeholder="Search for dishes or categories" type="text" />
              </div>
          </section>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-4">{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}</p>

          {/* Menu Grid */}
          {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No dishes found</h3>
                  <p className="text-gray-500 mb-6">Try a different search or category.</p>
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                      className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-colors">
                      Reset
                  </button>
              </div>
          ) : (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item) => (
                      <Link key={item.id} to={`/food-details/${item.id}`} className="bg-white p-4 rounded-2xl flex gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative group cursor-pointer hover:shadow-[0_4px_25px_rgba(0,0,0,0.1)] transition-all">
                          <div className="w-1/3 relative rounded-xl overflow-hidden aspect-square">
                              <img alt={item.name} className="w-full h-full object-cover" src={item.img} />
                              <button className="absolute top-2 right-2 p-1 text-white hover:text-red-500" onClick={(e) => e.preventDefault()}>
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                          </div>
                          <div className="flex-1 flex flex-col">
                              <div className="flex gap-1 mb-2">
                                  {item.tags.map((tag) => (
                                      <span key={tag} className="bg-primary text-[10px] text-white px-2 py-0.5 rounded">{tag}</span>
                                  ))}
                              </div>
                              <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-1">{item.desc}</p>
                              <span className="text-[10px] text-gray-400 mb-auto">{item.sold} Sold</span>
                              <div className="mt-2 flex items-end justify-between">
                                  <div>
                                      <span className="text-xs text-gray-400 line-through block">AED {item.oldPrice.toFixed(2)}</span>
                                      <span className="text-primary font-bold">AED {item.price.toFixed(2)}</span>
                                  </div>
                                  <button className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-orange-600" onClick={(e) => e.preventDefault()}>
                                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                      </svg>
                                  </button>
                              </div>
                          </div>
                      </Link>
                  ))}
              </section>
          )}
      </main>

      <Footer />
    </div>
  );
};

export default FoodOrder;
