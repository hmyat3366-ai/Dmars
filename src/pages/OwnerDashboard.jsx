import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useFood } from '../context/FoodContext';
import { useRoom } from '../context/RoomContext';
import { useAuth } from '../context/AuthContext';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { addFood, deleteFood, menuItems } = useFood();
  const { addRoom, deleteRoom, rooms } = useRoom();
  const { getAllOrders, getAllAppointments, updateOrderStatus, updateAppointmentStatus } = useAuth();
  const navigate = useNavigate();

  const [foodOrders, setFoodOrders] = useState([]);
  const [roomRequests, setRoomRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders();
      const appointments = await getAllAppointments();
      setFoodOrders(orders);
      setRoomRequests(appointments);
    };
    fetchData();
  }, [activeTab, getAllOrders, getAllAppointments]);

  const handleConfirmOrder = async (id, status) => {
    await updateOrderStatus(id, status);
    const orders = await getAllOrders();
    setFoodOrders(orders);
  };

  const handleConfirmAppointment = async (id, status) => {
    await updateAppointmentStatus(id, status);
    const appointments = await getAllAppointments();
    setRoomRequests(appointments);
  };

  // Add Food Form State
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodCategory, setFoodCategory] = useState('Myanmar Cuisine');
  const [foodDesc, setFoodDesc] = useState('');
  const [foodImgUrl, setFoodImgUrl] = useState('');

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!foodName || !foodPrice || !foodDesc) {
      alert("Please fill in all required fields!");
      return;
    }

    await addFood({
      name: foodName,
      price: parseFloat(foodPrice),
      category: foodCategory,
      desc: foodDesc,
      img: foodImgUrl || 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    });

    alert("Food item added successfully!");
    
    // Reset form
    setFoodName('');
    setFoodPrice('');
    setFoodDesc('');
    setFoodImgUrl('');
    navigate('/foodorder');
  };

  // Add Room Form State
  const [roomName, setRoomName] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [roomLocation, setRoomLocation] = useState('');
  const [roomType, setRoomType] = useState('Private Room');
  const [roomBedrooms, setRoomBedrooms] = useState('1');
  const [roomDesc, setRoomDesc] = useState('');
  const [roomImgUrl, setRoomImgUrl] = useState('');

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!roomName || !roomPrice || !roomLocation) {
      alert("Please fill in all required fields!");
      return;
    }

    await addRoom({
      name: roomName,
      price: parseFloat(roomPrice),
      location: roomLocation,
      type: roomType,
      bedrooms: parseInt(roomBedrooms),
      amenities: ['WiFi', 'Air Conditioning'], // Defaulting for now
      desc: roomDesc,
      img: roomImgUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    });

    alert("Room added successfully!");
    
    // Reset form
    setRoomName('');
    setRoomPrice('');
    setRoomLocation('');
    setRoomType('Private Room');
    setRoomBedrooms('1');
    setRoomDesc('');
    setRoomImgUrl('');
    
    // Optionally redirect to rooms page to see it
    navigate('/rooms');
  };

  // Buyer Mock Data (Kept for fallback UI if needed, but not used in owner specific tabs)
  const myRoomAppointments = [
    { id: 'APT-001', room: 'Luxury Apartment in Marina', date: '2026-06-25', time: '10:00 AM', status: 'Approved' },
  ];

  const myFoodOrders = [
    { id: 'ORD-9800', restaurant: 'Pizza Hut', total: '$25.00', date: '2026-05-30', status: 'Delivered' },
  ];

  const sidebarGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        )},
      ]
    },
    {
      title: 'SELLING',
      items: [
        { key: 'add-food', label: 'Add Food', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        )},
        { key: 'confirm-order', label: 'Confirm Food', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
        )},
        { key: 'add-room', label: 'Add Room', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        )},
        { key: 'confirm-room', label: 'Confirm Room', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        )},
        { key: 'manage-listings', label: 'Manage Listings', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        )},
      ]
    },
    {
      title: 'BUYING',
      items: [
        { key: 'my-appointments', label: 'My Appointments', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        )},
        { key: 'my-orders', label: 'My Food Orders', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        )},
      ]
    },
    {
      title: 'GENERAL',
      items: [
        { key: 'settings', label: 'Account Settings', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        )},
      ]
    }
  ];

  return (
    <div className="bg-[#FAF3E7] text-[#2C1810] min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar */}
              <aside className="w-full lg:w-72 flex-shrink-0">
                  <div className="bg-white rounded-3xl shadow-sm border border-orange-100 sticky top-24">
                      <div className="bg-gradient-to-r from-[#F5B85D] to-[#E39D33] h-32 rounded-t-3xl"></div>
                      <div className="px-6 pb-8 -mt-14 flex flex-col items-center text-center">
                          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-sm relative z-10">
                              <img alt="Profile" className="w-full h-full object-cover"
                                  src="https://ui-avatars.com/api/?name=Owner&background=E39D33&color=fff" />
                          </div>
                          <h2 className="mt-4 text-xl font-bold font-serif">Clovie</h2>
                          <span className="inline-block mt-1 px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-full font-bold uppercase tracking-wide">Owner Account</span>

                          {/* Navigation Buttons by Groups */}
                          <div className="w-full mt-6 space-y-6 text-left">
                              {sidebarGroups.map((group) => (
                                <div key={group.title}>
                                  <h3 className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest pl-2">{group.title}</h3>
                                  <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <button
                                            key={item.key}
                                            onClick={() => setActiveTab(item.key)}
                                            className={`w-full flex items-center justify-start px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                                                activeTab === item.key
                                                    ? 'bg-[#E39D33] text-white shadow-md'
                                                    : 'text-gray-600 bg-transparent hover:bg-orange-50 hover:text-orange-600'
                                            }`}
                                        >
                                            <span className="mr-3">{item.icon}</span>
                                            {item.label}
                                        </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </aside>

              {/* Main Content */}
              <section className="flex-1 space-y-8">

                  {/* Dashboard Overview Tab */}
                  {activeTab === 'dashboard' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-bold font-serif text-gray-900">Dashboard Overview</h2>
                              <p className="text-gray-500 mt-1">Here's what's happening with your business today.</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Stat Card 1 */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 flex items-center gap-4">
                              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-500">Today's Earnings</p>
                                <p className="text-2xl font-bold text-gray-900">$124.50</p>
                              </div>
                            </div>
                            {/* Stat Card 2 */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 flex items-center gap-4">
                              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-500">Pending Orders</p>
                                <p className="text-2xl font-bold text-gray-900">3 Orders</p>
                              </div>
                            </div>
                            {/* Stat Card 3 */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 flex items-center gap-4">
                              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-500">Active Listings</p>
                                <p className="text-2xl font-bold text-gray-900">12 Items</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                              <div className="flex gap-4">
                                <button onClick={() => setActiveTab('add-food')} className="px-6 py-3 bg-orange-50 text-[#E39D33] font-bold rounded-xl hover:bg-orange-100 transition shadow-sm border border-orange-200">
                                  + Add New Food
                                </button>
                                <button onClick={() => setActiveTab('add-room')} className="px-6 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition shadow-sm border border-blue-200">
                                  + List New Room
                                </button>
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </div>
                      </>
                  )}

                  {/* Add Food Tab */}
                  {activeTab === 'add-food' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-bold font-serif text-gray-900">Add Food</h2>
                              <p className="text-gray-500 mt-1">Add a new menu item for your customers.</p>
                          </div>
                          <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100">
                              <form className="space-y-6" onSubmit={handleAddFood}>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Food Name</label>
                                      <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="e.g. Shan Noodles" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors" required />
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Price (AED)</label>
                                          <input type="number" step="0.01" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} placeholder="0.00" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors" required />
                                      </div>
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                          <select value={foodCategory} onChange={(e) => setFoodCategory(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors">
                                              <option>Myanmar Cuisine</option>
                                              <option>Popular</option>
                                              <option>Main Menu</option>
                                              <option>Salad</option>
                                              <option>Drink</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                      <textarea value={foodDesc} onChange={(e) => setFoodDesc(e.target.value)} rows="4" placeholder="Describe your dish..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors resize-none" required></textarea>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                      <input type="url" value={foodImgUrl} onChange={(e) => setFoodImgUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors" />
                                      <p className="text-xs text-gray-400 mt-1">Leave blank to use a default image.</p>
                                  </div>
                                  <button type="submit" className="w-full bg-[#E39D33] text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-colors shadow-sm">
                                      Add Food Item
                                  </button>
                              </form>
                          </div>
                      </>
                  )}

                  {/* Confirm Order Tab */}
                  {activeTab === 'confirm-order' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-bold font-serif text-gray-900">Confirm Order</h2>
                              <p className="text-gray-500 mt-1">Review and confirm incoming food orders from customers.</p>
                          </div>
                          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
                              <div className="p-6 space-y-4">
                                  {foodOrders.length > 0 ? foodOrders.map((order) => (
                                      <div key={order.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-orange-50 transition-colors">
                                          <div>
                                              <div className="flex items-center gap-3">
                                                  <h4 className="font-bold text-gray-800 text-lg">{order.userEmail}</h4>
                                                  <span className="text-[#E39D33] font-bold">{order.total}</span>
                                              </div>
                                              <p className="text-sm text-gray-600 mt-1">{order.restaurant} - {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                                              <div className="flex items-center gap-3 mt-1">
                                                  <p className="text-xs text-gray-400">Order ID: {order.id}</p>
                                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                                      order.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                                                      'bg-yellow-100 text-yellow-700'
                                                  }`}>
                                                      {order.status}
                                                  </span>
                                              </div>
                                          </div>
                                          <div className="mt-4 lg:mt-0 flex items-center gap-3">
                                              {order.status !== 'Delivered' && order.status !== 'Rejected' && (
                                                <>
                                                  <button onClick={() => handleConfirmOrder(order.id, 'Delivered')} className="px-5 py-2 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 transition-colors shadow-sm">
                                                      ✓ Confirm
                                                  </button>
                                                  <button onClick={() => handleConfirmOrder(order.id, 'Rejected')} className="px-5 py-2 bg-white border border-red-200 text-red-500 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors">
                                                      ✕ Reject
                                                  </button>
                                                </>
                                              )}
                                          </div>
                                      </div>
                                  )) : (
                                    <div className="text-center py-12 text-gray-500">
                                      No food orders pending.
                                    </div>
                                  )}
                              </div>
                          </div>
                      </>
                  )}

                  {/* Add Room Tab */}
                  {activeTab === 'add-room' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-bold font-serif text-gray-900">Add Room</h2>
                              <p className="text-gray-500 mt-1">List a new room or property for users to rent.</p>
                          </div>
                          <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100">
                              <form className="space-y-6" onSubmit={handleAddRoom}>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Room Title</label>
                                      <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="e.g. Cozy Studio in Downtown" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors" required />
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Price / Month</label>
                                          <input type="number" value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} placeholder="0.00" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors" required />
                                      </div>
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                          <input type="text" value={roomLocation} onChange={(e) => setRoomLocation(e.target.value)} placeholder="e.g. Yangon, Hlaing" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors" required />
                                      </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      <div className="md:col-span-2">
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                                          <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors">
                                            <option>Private Room</option>
                                            <option>Shared Room</option>
                                            <option>Bed Space</option>
                                            <option>Studio</option>
                                          </select>
                                      </div>
                                      <div>
                                          <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                                          <input type="number" value={roomBedrooms} onChange={(e) => setRoomBedrooms(e.target.value)} placeholder="1" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors" required />
                                      </div>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                      <textarea value={roomDesc} onChange={(e) => setRoomDesc(e.target.value)} rows="4" placeholder="Describe the property..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors resize-none"></textarea>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                      <input type="url" value={roomImgUrl} onChange={(e) => setRoomImgUrl(e.target.value)} placeholder="https://example.com/room.jpg" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E39D33] transition-colors" />
                                  </div>
                                  <button type="submit" className="w-full bg-[#E39D33] text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-colors shadow-sm">
                                      List Room
                                  </button>
                              </form>
                          </div>
                      </>
                  )}

                  {/* Manage Listings Tab */}
                  {activeTab === 'manage-listings' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-bold font-serif text-gray-900">Manage Listings</h2>
                              <p className="text-gray-500 mt-1">Delete items you have listed for sale or rent.</p>
                          </div>
                          
                          {/* Foods List */}
                          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden mb-6">
                              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                  <h3 className="font-bold text-gray-800">Your Food Items</h3>
                              </div>
                              <div className="p-6 space-y-4">
                                  {menuItems.map((item) => (
                                      <div key={`food-${item.id}`} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white">
                                          <div className="flex items-center gap-4">
                                              <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                              <div>
                                                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                                                  <p className="text-sm text-gray-500">AED {item.price}</p>
                                              </div>
                                          </div>
                                          <button onClick={() => deleteFood(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                          </button>
                                      </div>
                                  ))}
                                  {menuItems.length === 0 && <p className="text-gray-500 text-sm">No food items found.</p>}
                              </div>
                          </div>

                          {/* Rooms List */}
                          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
                              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                  <h3 className="font-bold text-gray-800">Your Rooms</h3>
                              </div>
                              <div className="p-6 space-y-4">
                                  {rooms.map((room) => (
                                      <div key={`room-${room.id}`} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white">
                                          <div className="flex items-center gap-4">
                                              <img src={room.img} alt={room.name} className="w-12 h-12 rounded-lg object-cover" />
                                              <div>
                                                  <h4 className="font-bold text-gray-800">{room.name}</h4>
                                                  <p className="text-sm text-gray-500">AED {room.price} / Month</p>
                                              </div>
                                          </div>
                                          <button onClick={() => deleteRoom(room.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                          </button>
                                      </div>
                                  ))}
                                  {rooms.length === 0 && <p className="text-gray-500 text-sm">No rooms found.</p>}
                              </div>
                          </div>
                      </>
                  )}

                  {/* Confirm Room Tab */}
                  {activeTab === 'confirm-room' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-bold font-serif text-gray-900">Confirm Room</h2>
                              <p className="text-gray-500 mt-1">Accept or decline room appointment requests from users.</p>
                          </div>
                          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
                              <div className="p-6 space-y-4">
                                  {roomRequests.length > 0 ? roomRequests.map((req) => (
                                      <div key={req.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-orange-50 transition-colors">
                                          <div>
                                              <h4 className="font-bold text-gray-800 text-lg">{req.room}</h4>
                                              <p className="text-sm text-gray-600 mt-1">Requested by: <span className="font-semibold">{req.userEmail}</span></p>
                                              <p className="text-sm text-gray-500 mt-1">{req.date} at {req.time}</p>
                                              <div className="flex items-center gap-3 mt-1">
                                                  <p className="text-xs text-gray-400">Request ID: {req.id}</p>
                                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                      req.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                                      req.status === 'Declined' ? 'bg-red-100 text-red-700' : 
                                                      'bg-yellow-100 text-yellow-700'
                                                  }`}>
                                                      {req.status}
                                                  </span>
                                              </div>
                                          </div>
                                          <div className="mt-4 lg:mt-0 flex items-center gap-3">
                                              {req.status !== 'Approved' && req.status !== 'Declined' && (
                                                <>
                                                  <button onClick={() => handleConfirmAppointment(req.id, 'Approved')} className="px-5 py-2 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 transition-colors shadow-sm">
                                                      ✓ Accept
                                                  </button>
                                                  <button onClick={() => handleConfirmAppointment(req.id, 'Declined')} className="px-5 py-2 bg-white border border-red-200 text-red-500 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors">
                                                      ✕ Decline
                                                  </button>
                                                </>
                                              )}
                                          </div>
                                      </div>
                                  )) : (
                                    <div className="text-center py-12 text-gray-500">
                                      No room requests pending.
                                    </div>
                                  )}
                              </div>
                          </div>
                      </>
                  )}

                  {/* My Appointments (Buyer) Tab */}
                  {activeTab === 'my-appointments' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-serif text-gray-900 font-bold">My Appointments</h2>
                              <p className="text-gray-500 mt-1">View and manage the room viewings you have requested.</p>
                          </div>
                          <section className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <div className="space-y-4">
                                  {myRoomAppointments.map((apt) => (
                                      <div key={apt.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-orange-50 transition-colors">
                                          <div>
                                              <h4 className="font-bold text-gray-800 text-lg">{apt.room}</h4>
                                              <p className="text-sm text-gray-500 mt-1">ID: {apt.id} • {apt.date} at {apt.time}</p>
                                          </div>
                                          <div className="mt-4 md:mt-0">
                                              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                  apt.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                              }`}>
                                                  {apt.status}
                                              </span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </section>
                      </>
                  )}

                  {/* My Food Orders (Buyer) Tab */}
                  {activeTab === 'my-orders' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-serif text-gray-900 font-bold">My Food Orders</h2>
                              <p className="text-gray-500 mt-1">Track the food orders you have placed.</p>
                          </div>
                          <section className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <div className="space-y-4">
                                  {myFoodOrders.map((order) => (
                                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-orange-50 transition-colors">
                                          <div>
                                              <div className="flex items-center gap-3">
                                                  <h4 className="font-bold text-gray-800 text-lg">{order.restaurant}</h4>
                                                  <span className="text-[#E39229] font-bold">{order.total}</span>
                                              </div>
                                              <p className="text-sm text-gray-500 mt-1">ID: {order.id} • Ordered on {order.date}</p>
                                          </div>
                                          <div className="mt-4 md:mt-0 flex items-center gap-3">
                                              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                              }`}>
                                                  {order.status}
                                              </span>
                                              <Link to="/ordertracking" className="px-5 py-2 bg-[#E39D33] text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-colors shadow-sm">
                                                  Track Order
                                              </Link>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </section>
                      </>
                  )}

                  {/* Account Settings Tab */}
                  {activeTab === 'settings' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-bold font-serif text-gray-900">Account Settings</h2>
                              <p className="text-gray-500 mt-1">Manage your profile and security settings.</p>
                          </div>

                          <section className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <div className="flex justify-between items-start mb-6">
                                  <h3 className="text-2xl font-serif font-bold text-gray-800">Profile Information</h3>
                                  <button className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Change</button>
                              </div>
                              <div className="space-y-5">
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                      <input type="text" defaultValue="Clovie" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#E39D33] transition-colors" readOnly />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                      <input type="email" defaultValue="clovie@business.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#E39D33] transition-colors" readOnly />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                      <input type="tel" defaultValue="+95 9987654321" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#E39D33] transition-colors" readOnly />
                                  </div>
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </section>

                          <section className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <div className="flex justify-between items-center mb-6">
                                  <h3 className="text-2xl font-serif font-bold text-gray-800">Shop Detail</h3>
                                  <button className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Edit Details</button>
                              </div>
                              <div className="flex items-center space-x-6">
                                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">🏪</div>
                                  <p className="text-2xl font-serif font-bold text-gray-800">Shop Name</p>
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </section>

                          <section className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <div className="flex justify-between items-center mb-6">
                                  <h3 className="text-2xl font-serif font-bold text-gray-800">Security</h3>
                                  <button className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Change</button>
                              </div>
                              <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                  <p className="text-2xl tracking-widest text-gray-800 font-bold">••••••••</p>
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </section>
                      </>
                  )}

              </section>
          </div>
      </main>

      <Footer />
    </div>
  );
};

export default OwnerDashboard;
