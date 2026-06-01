import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RoomRequestModal from '../components/RoomRequestModal';
import { useAuth } from '../context/AuthContext';
import { useRoom } from '../context/RoomContext';

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms } = useRoom();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const room = rooms.find(r => r.id === Number(id));

  const handleRequestClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setIsModalOpen(true);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEF9F0]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Room not found</h2>
          <Link to="/rooms" className="text-brand-orange hover:underline">Return to Rooms</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF9F0] font-sans text-gray-900 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Title and Status */}
        <section className="mb-8" data-purpose="page-title-section">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{room.name}</h1>
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">Available</span>
        </section>

        {/* Gallery Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12" data-purpose="image-gallery">
            {/* Main Large Image */}
            <div className="lg:col-span-7 h-[500px]">
                <img alt="Bedroom main view" className="w-full h-full object-cover rounded-xl shadow-md"
                    src={room.img} />
            </div>
            {/* Right Side Smaller Images */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-rows-2 gap-4 h-[500px]">
                <div className="col-span-1 h-full lg:h-auto">
                    <img alt="Kitchen area" className="w-full h-full object-cover rounded-xl shadow-md"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2FKDCib8ONQ2gsDzdqodQzr3vfFWlvbOQ4csHT7w0HC1_oaSRspzg6mUwAeQmt0OO6U83JGvl6p_gT9rm4N1Gblx-x2-i5lhxPyQESiMaPuNdSkACL2JOKV_ltOJu2hOGxHYtSs967w0BeQoNL-IrJmW4OiavU1ZdOJI5taLt3huoDXEfXyRAuF_gIIbBJzBEUVXIE5auddflFbn4Fa2_ftyDg2YJXSMaSZ1Na03e1CjykPq6KP4erjrAiWzndYr0YGbt-JOD6rg" />
                </div>
                <div className="col-span-1 h-full lg:h-auto">
                    <img alt="Living area" className="w-full h-full object-cover rounded-xl shadow-md"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqTJ25YRSTz1jDR51x_XwO-qhk5WLYTXlUPaSjIexN_Aj0J2-qUZe_skK8bSlCJ8eUw0ePo5KCIsaO9P-inpiOjRDC6-3RY90GUrKPkl2bbNYCzsz38kkPIaq8Ozijc0PET2JwheHP1WUhE9QSjXgW7D79puAvtPkRHTTZ_89LKbESEgYiilinvDUO1H_l6MruBUfsUqRJMBWMM5R2zpaH_FBlKj9SYQha8Ix0gcsqdwiLjIoNAZzSxZTbz6s7Z_vljZavAKUSVlk" />
                </div>
                <div className="col-span-2 h-full lg:h-auto">
                    <img alt="Bathroom and storage" className="w-full h-full object-cover rounded-xl shadow-md"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiVvguHiHvcgdJv00g4HKPc_QBHhkwbZRV2lJ2HCRxm90yF0KCUK0QKo5mdLPo8jwNXdBz-3L1xTDRzfyCgyWNq2Kb3Ykl4j7g1zaAVOGiWAK5_h9qCqMbhHCrF8Q770REdLyIGVNY0CyCVEKiwKQub1_Or7Vl_lLO0R_eg_4lQa2CBySTqlZv3foxeyE1aHZ9ZcRUfewcliFKmm9KdQkTLY5CE9kaQc1DDGudTplQgUhbm_sM3wTNgMyvuRmhMvZltFet2gm6-O4" />
                </div>
            </div>
        </section>

        {/* Details and Owner Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            {/* Left Column: Room Details */}
            <section className="lg:col-span-8 space-y-6" data-purpose="room-details">
                {/* Detail Items */}
                <div className="grid grid-cols-[120px_1fr] items-start">
                    <span className="font-bold text-lg">Price</span>
                    <span className="text-lg">- AED {room.price} per month</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start">
                    <span className="font-bold text-lg">Type</span>
                    <span className="text-lg">- {room.type}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start">
                    <span className="font-bold text-lg">Location</span>
                    <span className="text-lg">- {room.location}, Dubai.</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start">
                    <span className="font-bold text-lg">Description</span>
                    <p className="text-lg leading-relaxed">- {room.desc || "Affordable space available in Dubai. The apartment is clean and well maintained. This place is suitable for individuals who need easy access to public transportation."}</p>
                </div>
                {/* Facilities */}
                <div className="grid grid-cols-[120px_1fr] items-center pt-4">
                    <span className="font-bold text-lg">Facilities</span>
                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-lg mr-2">-</span>
                        {/* Facility Tags */}
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm border border-gray-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.343 8.414a16 16 0 0121.314 0"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                            wifi
                        </div>
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm border border-gray-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                            kitchen
                        </div>
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm border border-gray-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2 2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                            aircon
                        </div>
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm border border-gray-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                            washing machine
                        </div>
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm border border-gray-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                            shared bathroom
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Right Column: Owner Profile */}
            <aside className="lg:col-span-4" data-purpose="owner-sidebar">
                <div className="bg-[#E2952F] rounded-2xl p-8 text-white shadow-lg">
                    <h2 className="text-center text-xl font-semibold mb-6">Owner Profile</h2>
                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-3 shadow-sm">
                            <img alt="Julia Robert" className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBHnjpH5e6JHzhjOOvzsgwqtyPSX7SMCIiSzKaE3RL_DLlztCE00HVGn7Rd0gOb95hF9moNBeERyioGCn205m7eChXixOw-g-1JrJn9zm7QIYszAAAeNy7r1SKubP81MT7nioWD07SeE8cn4T60PKZzVReL9fqHrtoHYPLj4X1dNFPs5ocHsCdQa6sMogkuCx6tXsKV6JK084RZVNB1CMQ7ljW4KOeaCv-UowmT5sYqGhGCCRIm4FMJWsd6rU9dNKWYW7rWoGhweQ" />
                        </div>
                        <p className="text-xl font-bold">Julia Robert</p>
                        <div className="flex items-center mt-1 text-sm opacity-90">
                            <svg className="w-4 h-4 mr-1 text-green-300 fill-current" viewBox="0 0 20 20">
                                <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                            </svg>
                            verified member
                        </div>
                    </div>
                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input className="w-full bg-white text-gray-800 rounded-lg py-2.5 px-4 border-none shadow-inner focus:ring-0"
                                readOnly type="text" value="+09 123456789" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input className="w-full bg-white text-gray-800 rounded-lg py-2.5 px-4 border-none shadow-inner focus:ring-0"
                                readOnly type="text" value="julia2k3@gmail.com" />
                        </div>
                    </div>
                </div>
            </aside>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200" data-purpose="bottom-actions">
            <Link to="/rooms" className="px-16 py-3 border-2 border-[#E2952F] text-[#0D1B2A] font-bold rounded-lg hover:bg-orange-50 transition-all flex items-center justify-center">
                Back
            </Link>
            <button 
              onClick={handleRequestClick}
              className="px-16 py-3 bg-[#E2952F] text-white font-bold rounded-lg hover:bg-opacity-90 shadow-md transition-all"
            >
                Request
            </button>
        </div>
      </main>

      <Footer />

      <RoomRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        roomName={room.name} 
      />
    </div>
  );
};

export default RoomDetails;
