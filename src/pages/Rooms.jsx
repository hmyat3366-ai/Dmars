import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import RoomRequestModal from '../components/RoomRequestModal';
import { useAuth } from '../context/AuthContext';
import { useRoom } from '../context/RoomContext';

const locations = ['Anywhere', 'Deira', 'Bur Dubai', 'Al Nahda', 'Al Karama', 'Al Qusais', 'Al Rigga', 'International City', 'Dubai Marina', 'Jumeirah', 'Al Barsha', 'Business Bay', 'Downtown Dubai', 'Muhaisnah', 'Satwa', 'Al Quoz', 'Others'];
const amenityOptions = ['WiFi', 'Kitchen', 'Air Conditioning', 'Parking', 'Laundry', 'Balcony', 'Furnished', 'Gym'];

const Rooms = () => {
  const { rooms } = useRoom();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRequestRoom = (roomName) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedRoom(roomName);
      setIsModalOpen(true);
    }
  };
  const [activeLocation, setActiveLocation] = useState('Anywhere');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [roomType, setRoomType] = useState('all');
  const [bedrooms, setBedrooms] = useState('any');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveLocation('Anywhere');
    setPriceMin('');
    setPriceMax('');
    setRoomType('all');
    setBedrooms('any');
    setSelectedAmenities([]);
  };

  // The actual filtering logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!room.name.toLowerCase().includes(q) && !room.location.toLowerCase().includes(q)) {
          return false;
        }
      }
      // Location
      if (activeLocation !== 'Anywhere' && room.location !== activeLocation) return false;
      // Price range
      if (priceMin && room.price < Number(priceMin)) return false;
      if (priceMax && room.price > Number(priceMax)) return false;
      // Room type
      if (roomType !== 'all' && room.type !== roomType) return false;
      // Bedrooms
      if (bedrooms !== 'any') {
        if (bedrooms === '4+' && room.bedrooms < 4) return false;
        if (bedrooms !== '4+' && room.bedrooms !== Number(bedrooms)) return false;
      }
      // Amenities
      if (selectedAmenities.length > 0) {
        if (!selectedAmenities.every((a) => room.amenities.includes(a))) return false;
      }
      return true;
    });
  }, [searchQuery, activeLocation, priceMin, priceMax, roomType, bedrooms, selectedAmenities, rooms]);

  return (
    <div className="font-sans text-slate-800 bg-brand-cream">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <section className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 text-center">Find Your Room Anywhere in Dubai</h1>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-6">
                <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-gray-200">
                    <svg className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by room name, location, or keyword..."
                        className="flex-1 pl-14 pr-4 py-4 text-sm rounded-l-2xl focus:outline-none bg-transparent"
                    />
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-5 py-4 border-l border-gray-200 text-sm font-semibold rounded-r-2xl transition-colors ${showFilters ? 'text-brand-orange bg-orange-50' : 'text-gray-500 hover:text-brand-orange hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        Filters
                        {selectedAmenities.length > 0 || roomType !== 'all' || bedrooms !== 'any' || priceMin || priceMax ? (
                            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                        ) : null}
                    </button>
                </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
                <div className="max-w-3xl mx-auto mb-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Price Range (AED / month)</label>
                        <div className="flex items-center gap-4">
                            <input type="number" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-orange transition-colors" />
                            <span className="text-gray-400 font-bold">—</span>
                            <input type="number" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-orange transition-colors" />
                        </div>
                    </div>

                    {/* Room Type & Bedrooms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Room Type</label>
                            <div className="flex flex-wrap gap-2">
                                {['all', 'Bed Space', 'Shared Room', 'Private Room', 'Studio'].map((type) => (
                                    <button key={type} onClick={() => setRoomType(type)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${roomType === type ? 'bg-brand-orange text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        {type === 'all' ? 'All Types' : type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Bedrooms</label>
                            <div className="flex flex-wrap gap-2">
                                {['any', '1', '2', '3', '4+'].map((num) => (
                                    <button key={num} onClick={() => setBedrooms(num)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${bedrooms === num ? 'bg-brand-orange text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        {num === 'any' ? 'Any' : num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Amenities</label>
                        <div className="flex flex-wrap gap-3">
                            {amenityOptions.map((amenity) => (
                                <label key={amenity} className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-colors ${selectedAmenities.includes(amenity) ? 'bg-orange-50 border-brand-orange' : 'bg-gray-50 border-gray-200 hover:border-brand-orange'}`}>
                                    <input type="checkbox" checked={selectedAmenities.includes(amenity)} onChange={() => toggleAmenity(amenity)}
                                        className="w-4 h-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange" />
                                    <span className="text-sm text-gray-700 font-medium">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Apply / Reset */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button onClick={resetFilters} className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors">
                            Reset All
                        </button>
                    </div>
                </div>
            )}

            {/* Location Chips */}
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                {locations.map((loc) => (
                    <button key={loc} onClick={() => setActiveLocation(loc)}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeLocation === loc ? 'bg-brand-orange text-white' : 'bg-white border border-gray-200 hover:border-brand-orange'}`}>
                        {loc}
                    </button>
                ))}
            </div>
        </section>

        {/* Room Listings */}
        <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Available Rooms in Dubai</h2>
                    <p className="text-gray-500 mt-1">{filteredRooms.length} Result{filteredRooms.length !== 1 ? 's' : ''} {activeLocation === 'Anywhere' ? 'anywhere in Dubai' : `in ${activeLocation}`}</p>
                </div>
            </div>

            {filteredRooms.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No rooms found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
                    <button onClick={resetFilters} className="px-6 py-2.5 bg-brand-orange text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-colors">
                        Reset Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRooms.map((room) => (
                        <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-card p-4 hover:shadow-lg transition-shadow">
                            <div className="relative mb-4">
                                <img alt={room.name} className="w-full h-56 object-cover rounded-xl" src={room.img} />
                                <span className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Available</span>
                            </div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-slate-800">{room.name}</h3>
                                <span className="text-brand-orange font-bold whitespace-nowrap">AED {room.price}</span>
                            </div>
                            <p className="text-gray-500 text-sm flex items-center mb-2">
                                <svg className="h-4 w-4 mr-1 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                                    <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                                </svg>
                                {room.location}, Dubai
                            </p>
                            <p className="text-gray-400 text-xs mb-4">{room.type} • {room.bedrooms} Bedroom{room.bedrooms > 1 ? 's' : ''}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {room.amenities.map((a) => (
                                    <span key={a} className="bg-gray-100 px-3 py-1 rounded text-xs font-medium text-gray-600">{a}</span>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Link to={`/room-details/${room.id}`} className="py-3 border border-brand-orange rounded-xl text-sm font-bold text-slate-800 hover:bg-orange-50 transition-colors text-center block">Detail</Link>
                                <button onClick={() => handleRequestRoom(room.name)} className="py-3 bg-brand-orange text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors w-full block">Request</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
      </main>
      <Footer />
      
      <RoomRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        roomName={selectedRoom} 
      />
    </div>
  );
};

export default Rooms;
