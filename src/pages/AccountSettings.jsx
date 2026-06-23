import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
  const { user, getUserOrders, getUserAppointments } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  const [roomAppointments, setRoomAppointments] = useState([]);
  const [foodOrders, setFoodOrders] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const apts = await getUserAppointments();
        const orders = await getUserOrders();
        setRoomAppointments(apts);
        setFoodOrders(orders);
      } catch (err) {
        console.error("Failed to load user data:", err);
      } finally {
        setLoadingData(false);
      }
    };
    if (user) fetchData();
  }, [user, getUserAppointments, getUserOrders]);

  const sidebarItems = [
    { key: 'appointments', label: 'Room Appointments', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    )},
    { key: 'orders', label: 'Food Orders', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
      </svg>
    )},
    { key: 'settings', label: 'Account Settings', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    )},
  ];

  return (
    <div className="bg-[#FDF9F0] text-[#333] font-sans min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar */}
              <aside className="w-full lg:w-1/4">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-orange-100 flex flex-col items-center">
                      <div className="w-full h-24 bg-gradient-to-r from-[#F5B85D] to-[#E39D33]"></div>
                      <div className="relative -mt-12 text-center px-6 pb-8 w-full">
                          <div className="inline-block p-1 bg-white rounded-full shadow-sm">
                              <img alt="User Profile" className="w-24 h-24 rounded-full object-cover"
                                  src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=F5B85D&color=fff`} />
                          </div>
                          <h2 className="mt-4 text-xl font-bold text-gray-800">{user?.name || 'User'}</h2>
                          <span className="inline-block mt-1 px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-full font-bold uppercase tracking-wide">Standard User</span>

                          {/* Navigation Buttons */}
                          <div className="mt-8 space-y-2">
                              {sidebarItems.map((item) => (
                                  <button
                                      key={item.key}
                                      onClick={() => setActiveTab(item.key)}
                                      className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                          activeTab === item.key
                                              ? 'bg-[#E39D33] text-white shadow-md'
                                              : 'text-gray-700 bg-white border border-gray-200 hover:bg-orange-50 hover:border-orange-200'
                                      }`}
                                  >
                                      <span className="mr-3">{item.icon}</span>
                                      {item.label}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 space-y-8">

                  {/* Room Appointments Tab */}
                  {activeTab === 'appointments' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-serif text-gray-900 font-bold">Room Appointments</h2>
                              <p className="text-gray-500 mt-1">View and manage your scheduled room viewings.</p>
                          </div>
                          <section className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <div className="space-y-4">
                                  {roomAppointments.length > 0 ? roomAppointments.map((apt) => (
                                      <div key={apt.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-orange-50 transition-colors z-10 relative">
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
                                  )) : (
                                    <div className="text-center py-12 text-gray-500 z-10 relative">
                                      You haven't requested any room viewings yet.
                                    </div>
                                  )}
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </section>
                      </>
                  )}

                  {/* Food Orders Tab */}
                  {activeTab === 'orders' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-serif text-gray-900 font-bold">Food Orders</h2>
                              <p className="text-gray-500 mt-1">Track your recent food orders and delivery status.</p>
                          </div>
                          <section className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <div className="space-y-4">
                                  {foodOrders.length > 0 ? foodOrders.map((order) => (
                                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-orange-50 transition-colors z-10 relative">
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
                                              {order.status !== 'Delivered' && (
                                                <Link to="/ordertracking" className="px-5 py-2 bg-[#E39D33] text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-colors shadow-sm">
                                                    Track Order
                                                </Link>
                                              )}
                                          </div>
                                      </div>
                                  )) : (
                                    <div className="text-center py-12 text-gray-500 z-10 relative">
                                      You haven't placed any food orders yet.
                                    </div>
                                  )}
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </section>
                      </>
                  )}

                  {/* Account Settings Tab */}
                  {activeTab === 'settings' && (
                      <>
                          <div>
                              <h2 className="text-3xl font-serif text-gray-900 font-bold">Account Settings</h2>
                              <p className="text-gray-500 mt-1">Manage your profile information and security.</p>
                          </div>

                          {/* Profile Information */}
                          <section className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden">
                              <div className="flex justify-between items-start mb-6">
                                  <h3 className="text-2xl font-serif font-bold text-gray-800">Profile Information</h3>
                                  <button className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Change</button>
                              </div>
                              <div className="space-y-5">
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                      <input type="text" defaultValue={user?.name || "User"} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#E39D33] transition-colors" readOnly />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                      <input type="email" defaultValue={user?.email || "user@example.com"} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#E39D33] transition-colors" readOnly />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                      <input type="tel" defaultValue="+971 XX XXX XXXX" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#E39D33] transition-colors" readOnly />
                                  </div>
                              </div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-200 rounded-br-3xl pointer-events-none opacity-50"></div>
                          </section>

                          {/* Security */}
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

              </div>
          </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountSettings;
