import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const allShops = [
  { id: 1, name: 'Shwe Zun Restaurant', cuisine: 'Myanmar Cuisine', rating: 4.8, items: 3, status: 'open', link: '/foodorder',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' },
  { id: 2, name: 'Shwe LattYar', cuisine: 'Myanmar Cuisine', rating: 4.0, items: 3, status: 'closed', link: null,
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80' },
  { id: 3, name: 'Burma Tea House', cuisine: 'Myanmar Drink', rating: 4.8, items: 3, status: 'unavailable', link: null,
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80' },
];

const cuisineOptions = ['All', 'Myanmar Cuisine', 'Myanmar Drink', 'Japanese', 'Western'];

const FoodHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // all, open, top-rated
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [minRating, setMinRating] = useState('any');

  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setSelectedCuisine('All');
    setMinRating('any');
  };

  const filteredShops = useMemo(() => {
    return allShops.filter((shop) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!shop.name.toLowerCase().includes(q) && !shop.cuisine.toLowerCase().includes(q)) return false;
      }
      // Status filter
      if (activeFilter === 'open' && shop.status !== 'open') return false;
      if (activeFilter === 'top-rated' && shop.rating < 4.5) return false;
      // Cuisine
      if (selectedCuisine !== 'All' && shop.cuisine !== selectedCuisine) return false;
      // Min rating
      if (minRating !== 'any' && shop.rating < Number(minRating)) return false;
      return true;
    });
  }, [searchQuery, activeFilter, selectedCuisine, minRating]);

  const statusConfig = {
    open: { label: 'Open Now', dotColor: 'bg-green-500', cardClass: '', imgClass: '', btnClass: 'bg-primary text-white hover:bg-orange-600' },
    closed: { label: 'Closed Now', dotColor: 'bg-gray-400', cardClass: 'opacity-90', imgClass: 'grayscale-[0.3]', btnClass: 'bg-gray-300 text-white cursor-not-allowed' },
    unavailable: { label: 'Unavailable', dotColor: 'bg-red-400', cardClass: 'opacity-90', imgClass: 'grayscale-[0.5]', btnClass: 'bg-gray-300 text-white cursor-not-allowed' },
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden" data-purpose="food-hero">
          <div className="absolute inset-0 z-0">
              <img alt="Burmese Cuisine background" className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80" />
              <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl text-white mb-4 drop-shadow-lg font-serif">A Taste of Myanmar,<br />Just Like Home</h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 font-medium">Your favorite Mohinga, just a tap away.</p>
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                  <div className="relative flex items-center bg-white rounded-2xl shadow-2xl">
                      <svg className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for restaurants, dishes or categories..."
                          className="flex-1 pl-14 pr-4 py-4 text-sm text-gray-700 rounded-l-2xl focus:outline-none bg-transparent"
                      />
                      <button
                          onClick={() => setShowFilters(!showFilters)}
                          className={`flex items-center gap-2 px-5 py-4 border-l border-gray-200 text-sm font-semibold rounded-r-2xl transition-colors ${showFilters ? 'text-primary bg-orange-50' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}`}
                      >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                          </svg>
                          Filters
                      </button>
                  </div>

                  {/* Filter Panel (slides under search bar) */}
                  {showFilters && (
                      <div className="mt-3 bg-white rounded-2xl shadow-2xl p-6 space-y-5 text-left">
                          {/* Cuisine Type */}
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-3">Cuisine Type</label>
                              <div className="flex flex-wrap gap-2">
                                  {cuisineOptions.map((c) => (
                                      <button key={c} onClick={() => setSelectedCuisine(c)}
                                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCuisine === c ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                          {c}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          {/* Minimum Rating */}
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-3">Minimum Rating</label>
                              <div className="flex flex-wrap gap-2">
                                  {['any', '3', '3.5', '4', '4.5'].map((r) => (
                                      <button key={r} onClick={() => setMinRating(r)}
                                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${minRating === r ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                          {r === 'any' ? 'Any' : `★ ${r}+`}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          {/* Reset */}
                          <div className="flex items-center justify-end pt-1">
                              <button onClick={resetFilters} className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors">
                                  Reset All
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </section>

      {/* Food Store Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                  <h2 className="text-4xl font-serif text-dark mb-2">Available <span className="text-primary">Food Stores</span></h2>
                  <p className="text-gray-600">{filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''} found. Select a shop to view its menu.</p>
              </div>
              <div className="flex space-x-3 mt-6 md:mt-0">
                  <button onClick={() => setActiveFilter('all')}
                      className={`px-8 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'all' ? 'bg-primary text-white shadow-md' : 'border border-primary text-primary hover:bg-orange-50'}`}>
                      All Shop
                  </button>
                  <button onClick={() => setActiveFilter('open')}
                      className={`px-8 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'open' ? 'bg-primary text-white shadow-md' : 'border border-primary text-primary hover:bg-orange-50'}`}>
                      Open Now
                  </button>
                  <button onClick={() => setActiveFilter('top-rated')}
                      className={`px-8 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'top-rated' ? 'bg-primary text-white shadow-md' : 'border border-primary text-primary hover:bg-orange-50'}`}>
                      Top Rated
                  </button>
              </div>
          </div>
          
          {filteredShops.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No shops found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
                  <button onClick={resetFilters} className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-colors">
                      Reset Filters
                  </button>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredShops.map((shop) => {
                      const cfg = statusConfig[shop.status];
                      const CardTag = shop.link ? Link : 'div';
                      const cardProps = shop.link ? { to: shop.link } : {};
                      return (
                          <CardTag key={shop.id} {...cardProps}
                              className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow block ${cfg.cardClass}`}>
                              <div className={`relative h-64 ${cfg.imgClass}`}>
                                  <img alt={shop.name} className="w-full h-full object-cover" src={shop.img} />
                                  <div className="absolute top-4 left-4">
                                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                          <span className={`w-2 h-2 rounded-full ${cfg.dotColor}`}></span>
                                          {cfg.label}
                                      </span>
                                  </div>
                              </div>
                              <div className="p-6">
                                  <div className="flex justify-between items-start mb-2">
                                      <h3 className="text-xl font-bold text-gray-900">{shop.name}</h3>
                                      <div className="flex items-center text-sm font-bold">
                                          <span className="text-primary mr-1">★</span> {shop.rating}
                                      </div>
                                  </div>
                                  <div className="flex items-center text-gray-500 text-sm mb-6 space-x-2">
                                      <span className="flex items-center">
                                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"></path>
                                          </svg>
                                          {shop.cuisine}
                                      </span>
                                      <span>•</span>
                                      <span>{shop.items} items available</span>
                                  </div>
                                  <button className={`w-full py-3 font-bold rounded-lg transition-colors ${cfg.btnClass}`}
                                      disabled={shop.status !== 'open'}>
                                      Explore
                                  </button>
                              </div>
                          </CardTag>
                      );
                  })}
              </div>
          )}
      </main>

      <Footer />
    </div>
  );
};

export default FoodHome;
