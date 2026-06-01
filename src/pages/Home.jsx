import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import RoomRequestModal from '../components/RoomRequestModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [stepTab, setStepTab] = useState('user');

  const handleRequestRoom = (roomName) => {
    setSelectedRoom(roomName);
    setIsModalOpen(true);
  };

  return (
    <div className="text-slate-800 font-sans min-h-screen">
      <Header />

      {/* BEGIN: Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            CONNECTING MYANMAR EXPATS IN DUBAI
          </div>
          <h1 className="text-5xl md:text-6xl font-myanmar font-bold leading-tight text-dark">
            Your <span className="text-primary italic">Myanmar</span><br />Community<br />In Dubai
          </h1>
          <p className="text-slate-500 max-w-md leading-relaxed">
            Find the perfect room to stay or taste authentic Myanmar food delivered right to your door.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/rooms" className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-md hover:scale-[1.02] transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              Find a Room
            </Link>
            <Link to="/foods" className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-orange-50 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              Order Food
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
            {/* Main Hero Illustration */}
            <div className="relative w-full h-[500px]">
                <img src="/3.png" alt="Hero Illustration" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
        </div>
      </section>

      {/* BEGIN: Available Rooms */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2 block">Available Now</span>
            <h2 className="text-4xl font-myanmar font-bold text-dark">Available Rooms</h2>
            <p className="text-slate-500 mt-2">Find a comfortable place to stay.</p>
          </div>
          <Link className="text-primary font-semibold flex items-center gap-1 hover:underline" to="/rooms">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Room Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="relative h-48">
                    <img alt="Bed Space" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPn7IvUHXKRMXx1Unfm_56D5fa43fL3UmfY4muONkEwiQY-uAoWPVjLvBwV1Qpic2YH2jlsIMu6YJoyj0fpUGC0x1D_tGkraLF2j5kxZ8vfEVWpPpouWZQYOcRQOPq-C54J8TYQHBac-AksK5qvxygFsXJgQ2vXApFs5srjnxhEs_Uk9h1AWkW1wpxqbLb2H4qxlzZghuBqVN6r1bT0KnZEPta1Lu0oj5d0zgD-nVamYEGNHbMbvguY5SMlPJ6GR2P2yMDsFWWB3s" />
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">AVAILABLE</span>
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-dark">Bed Space near Al Rigga Metro</h3>
                        <span className="text-primary font-bold">AED 1200</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                        </svg>
                        Deira, Dubai
                    </div>
                    <div className="flex gap-3 mb-6">
                        <span className="flex items-center gap-1 text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600">Wifi</span>
                        <span className="flex items-center gap-1 text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600">Kitchen</span>
                        <span className="flex items-center gap-1 text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600">Aircon</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/room-details" className="py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition text-center text-slate-700 block">Detail</Link>
                        <button onClick={() => handleRequestRoom('Bed Space near Al Rigga Metro')} className="py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-accent transition text-center block w-full">Request</button>
                    </div>
                </div>
            </div>
            {/* Room Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="relative h-48">
                    <img alt="Shared Room" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdXGWDTbKUZYeKnqxgkrnTRWR1bU2P0Ve1kAmu1fJwrvybT34nPN6FXtoiXjNBX0v8E3e60IkFT-sfBH8v1PsjzMcXxh6y8rHN2pgD-cHaHGTS2nVwHCQpQPwMYIU9lXgIg2UTL_4hMg78s98MHnkSFMV-I_uAE2vj_iAtg50k5NafaomhnA7QkV74zGe-nCxuDzXEhF2LL66sw2JC265vKc3Ikvjwh082P6b0sFRZqvTeuJO0Nls38Ft_NmnXNk6g6R6u95bPBP0" />
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">AVAILABLE</span>
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-dark">Shared Room near Union Metro</h3>
                        <span className="text-primary font-bold">AED 800</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                        </svg>
                        Deira, Dubai
                    </div>
                    <div className="flex gap-3 mb-6">
                        <span className="flex items-center gap-1 text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600">Wifi</span>
                        <span className="flex items-center gap-1 text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600">Kitchen</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/room-details" className="py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition text-center text-slate-700 block">Detail</Link>
                        <button onClick={() => handleRequestRoom('Shared Room near Union Metro')} className="py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-accent transition text-center block w-full">Request</button>
                    </div>
                </div>
            </div>
            {/* Room Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="relative h-48">
                    <img alt="Private Room" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2tKIwE6ojTaiTpnmA2Rrzx8I3okRQ_VVpf_lqgo_L8Qsa7mWuWW8EvJcFzzaR-Ivh9bAp48ZANmQUOHXw1ZgDpg1kLyIJW_gK1sN36aTJllche5dSaNajOv5BaOYf8axOMP2CuRd1RFcpmnUssqe-Z3F3Ntehs9duSe26ATOF1HOGhsmImaBMxj-hpAIVSVdEnd5zWl8jQGX3oiuZOYqX4q3VxPSan7CxOPP-M6cRmtKdD_msoSLh3A9ZPhvihwsGieYZxREah7I" />
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">AVAILABLE</span>
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-dark">Private Room with Balcony, Al Nahda</h3>
                        <span className="text-primary font-bold">AED 1200</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                        </svg>
                        Al Nahda, Dubai
                    </div>
                    <div className="flex gap-3 mb-6">
                        <span className="flex items-center gap-1 text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600">Wifi</span>
                        <span className="flex items-center gap-1 text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600">Kitchen</span>
                        <span className="flex items-center gap-1 text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600">Aircon</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/room-details" className="py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition text-center text-slate-700 block">Detail</Link>
                        <button onClick={() => handleRequestRoom('Private Room with Balcony, Al Nahda')} className="py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-accent transition text-center block w-full">Request</button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* BEGIN: Food Delivery */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2 block">Taste of Home</span>
            <h2 className="text-4xl font-myanmar font-bold text-dark">Food Delivery</h2>
            <p className="text-slate-500 mt-2">Authentic Myanmar Food Delivered ( <span className="text-primary italic">COD only</span> )</p>
          </div>
          <Link className="text-primary font-semibold flex items-center gap-1 hover:underline" to="/foods">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Restaurant Card 1 */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 group transition hover:-translate-y-1">
                <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-slate-100 flex items-center justify-center">
                    <img alt="Shwe Zun" className="w-3/4 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHPDBES9jJw_FLranmPk9vRM-8nnRMvFxgWeeIrmnUucXc-0fJ3I3-67RYVzY8CJRNLumbLObYgIf2UPHeEdNSDlnwdk7V2T9uzaf005cyi_jqy2k_xTVJPPYgGEm69jyuVATqb95RrEGJ4uVMpIszgBvkySx7dHMjMPdsL2S_uCzqSffDglimejImkvO5tJKqTmq3aparHHfbr4w7qihG7JBGUGhIXANHMpFJtpp9nfmhQ2N1CYOuf7PTsaxGP31LswdLWxTlJFQ" />
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Open Now
                    </div>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-lg text-dark">Shwe Zun Restaurant</h3>
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                        <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        4.8
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Myanmar Cuisine</span>
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> 3 items available</span>
                </div>
                <Link to="/foodorder" className="block text-center w-full py-2.5 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-accent transition">Explore</Link>
            </div>
            {/* Restaurant Card 2 */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 group transition hover:-translate-y-1">
                <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-slate-100 flex items-center justify-center">
                    <img alt="Shwe LattYar" className="w-3/4 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhvmaeU8bkPH10bqSS9uIwh4pQgBvQDmCiHBNvYGu_NhPfFCFSbef2mzHC2K5nHCGId4w9aawMv1ILbpoYCPAAqVNAypYR_-TWw28USD7w4zQ41KzVxViJGtw_gGCYHacpFByPVi2pqqzDXz_9DSNDFZYShtPJc9ZwNAu8__hu4obibPLvF3MR4InJIGlJGJVQJmwIr9DocL3fGZWd97GAdZkph4aNdLEBvdOwmaYL7wup2W0xZ01dNBf3MzKGMHEmv-e4rB_mGa8" />
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span> Closed Now
                    </div>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-lg text-dark">Shwe LattYar</h3>
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                        <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        4.0
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Myanmar Cuisine</span>
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> 3 items available</span>
                </div>
                <Link to="/foodorder" className="block text-center w-full py-2.5 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-accent transition">Explore</Link>
            </div>
            {/* Restaurant Card 3 */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 group transition hover:-translate-y-1">
                <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-slate-100 flex items-center justify-center">
                    <img alt="Burma Tea House" className="w-3/4 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSS9y5-Y54vRKmYJRTbblDzNVu3nrfPkUuf2rl9EvOlVQl_N91oMOp-5_-wr-oHxDLU8wD8w3qHNzzGwPXzCjx-pv74Rf6TMINmPYk-dLM8vyIh7zH_Z6bUyD-CciM5-TZyu8LpB7Jetl6SxouDO76xo3uZdo21OTkwPovnsK2eRCiV_sUAGRF2d1ZtCRHwQVbeU42RbC3zXlkWDZh592Wf4bxGz-SCRMtUjiSMtxVbePxJYRe-REKfwf8qEP0_5O58UE51G4Kah8" />
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Unavailable
                    </div>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-lg text-dark">Burma Tea House</h3>
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                        <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        4.8
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Myanmar Drink</span>
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> 3 items available</span>
                </div>
                <Link to="/foodorder" className="block text-center w-full py-2.5 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-accent transition">Explore</Link>
            </div>
        </div>
      </section>

      {/* BEGIN: About Our Community */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-[#FDF6E9] border border-primary/20 rounded-[40px] p-12 text-center shadow-sm">
            <h2 className="text-4xl font-myanmar font-bold text-dark mb-6">About Our Community</h2>
            <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
                We built this platform to make life easier for Myanmar expats living in Dubai. Whether you're looking
                for a cozy bedspace with friendly roommates or craving a warm bowl of Mohinga, we connect you directly
                with trusted owners in our community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F9EBD3] p-8 rounded-2xl border border-primary/10">
                    <div className="text-4xl font-bold font-myanmar text-dark mb-1">500+</div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Active Listings</div>
                </div>
                <div className="bg-[#F9EBD3] p-8 rounded-2xl border border-primary/10">
                    <div className="text-4xl font-bold font-myanmar text-dark mb-1">COD</div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Cash on Delivery</div>
                </div>
                <div className="bg-[#F9EBD3] p-8 rounded-2xl border border-primary/10">
                    <div className="text-4xl font-bold font-myanmar text-dark mb-1">100%</div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Community Focused</div>
                </div>
            </div>
        </div>
      </section>

      {/* BEGIN: Dashboard Preview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-myanmar font-bold text-dark">Your Dashboard</h2>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-orange-100 shadow-xl shadow-orange-900/5">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <img alt="Thurein profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS6itmUs_Qhtaxzp6pMNSvhWAlBlLY644HkRPRvKrCh4YfWi_gYV7RNZoocKr7qlrGs_hzLgViF40mD2eNMVWU-qwrdqIEVroD8za3HnmPDT1oftfpZFR1b5jzB0JaiFGjSthAy_3SYnt81KO8BfVRS2FHTmqGhDgF9pcRHT79ITsj8D1bmqu_VUdVDNMD4y8Y4_i8dmbkc9eVGfJf8WJpZ11VnH4DjGDLJjD6kqEhU7kvPqCm8JTLi3IYTn2SkCRlSPKtSDllmcc" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-dark">Thurein</h3>
                    <p className="text-slate-500 text-sm font-medium">User Account</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-dark">My Room Requests</div>
                        <div className="text-[10px] text-slate-400">1 Pending Viewing</div>
                    </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-dark">My Food Orders</div>
                        <div className="text-[10px] text-slate-400">1 Active Order</div>
                    </div>
                </div>
            </div>
            <Link to="/account-settings" className="block text-center w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform">Go to full profile</Link>
        </div>
      </section>

      {/* BEGIN: Simple Steps */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-myanmar font-bold text-dark mb-4">SIMPLE STEPS TO GET STARTED</h2>
        <p className="text-slate-500 text-sm mb-12">Whether you're looking for a home or listing your services, we make it easy.</p>
        <div className="inline-flex p-1 bg-slate-100 rounded-full mb-16 transition-colors duration-300">
            <button 
                onClick={() => setStepTab('user')}
                className={`px-8 py-2 rounded-full font-bold transition-all duration-300 ${stepTab === 'user' ? 'bg-[#E39D33] text-white shadow-sm' : 'text-slate-500 hover:text-dark'}`}>
                User
            </button>
            <button 
                onClick={() => setStepTab('owner')}
                className={`px-8 py-2 rounded-full font-bold transition-all duration-300 ${stepTab === 'owner' ? 'bg-[#E39D33] text-white shadow-sm' : 'text-slate-500 hover:text-dark'}`}>
                Owner
            </button>
        </div>
        
        {stepTab === 'user' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in">
              <div className="flex flex-col items-center">
                  <div className="w-64 h-64 mb-8 relative">
                      <div className="absolute inset-0 bg-orange-100 rounded-full scale-90 -z-10 opacity-50"></div>
                      <img alt="Step 1" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB42iLOxYLDD3OgJRaqOIUBfNPmwBJayy4f3K1qX5aWK-bJequZWoVXSJHQZ7BPJvBA-su4jSAbZgGputNtHAam7TnM5_-s6i0oDzIRmtw1Gcpi4XSVnfVVohZaxHtzuXjHHOt_ggo7IwxVNk8jo2VyN8eOkMroLsszpxlqPcsRKjFFPG6ZOvkvRe9UDBANH0w8FAt1XvOo4Io45AU8OfgY21WxkYR8saicEQVAqqlNAlVA0ffGjge6httei33PpYwwmgM_onjuDLw" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">01 Explore Listings</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Browse verified homes &amp; authentic Burmese food.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-64 h-64 mb-8 relative">
                      <div className="absolute inset-0 bg-orange-100 rounded-full scale-90 -z-10 opacity-50"></div>
                      <img alt="Step 2" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNoy3VZB6of_XYgfy9FeCBNqKC9sWCKVKmPxqJq1boUVjKpFd_k-E1wBCRUITeoJX8VdT5yor2toA8JmukIZaWXKJUXfkbt9M6IujfuhJYx32UC7f8p_1YFm-GD2CeXSo6SsuH545HeepERm-K43Xop8eRGzEv-UUeySt10d3ynwxYK8017GenijIzselLjFk6Ncn8uK3mzOS-gGnd_57ta9NrGcmduIRaPJSZOH3SS_3d5Vbkzg6DWqdcMhJAVkHP7mAxlGlozss" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">02 Direct Contact</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Connect with owners instantly via WhatsApp or Call.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-64 h-64 mb-8 relative">
                      <div className="absolute inset-0 bg-orange-100 rounded-full scale-90 -z-10 opacity-50"></div>
                      <img alt="Step 3" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_gNa50FAF3OOk7gB1zIkO4sM1MH2PfEY3uaqjWVkOcX7TSUxgeloMAaY0gUtQucTmHm0GVuIn88iuAfOkrUXZ6sC4K3wjajNfeChhK99h7SulgPjfFkka2jak0sk8lvcUxiw2d0yJfFugcZj4LKArnARTiGjFERZAeecLncteTy2Z0iXwv4hwtXwO-TzcZBxVt-mRjycqfiJlk6SjDHt3MWPjWXSTaID18P5IFrppkoBXDjMVcnBZnPKi1C3c1w_9-eFbGvge70Q" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">03 Secure Your Deal</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Schedule viewings &amp; enjoy your new home or meal.</p>
              </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in">
              <div className="flex flex-col items-center">
                  <div className="w-64 h-64 mb-8 relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-full scale-90 -z-10 opacity-50"></div>
                      <img alt="Owner Step 1" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHZCLSPFPj2bAT0PMpnnyYjxZJkvbmTe3RYXn1rEuD-juS27fnPpnqoBm4m_OnfUMT-FwwkLm8o5210Wh68EGCkwMttICCUt7_uPaqgMBRoQ_5Je6RZwLrXPr05PVmx6s0huDEcsmaa26KOFHFuXMcvPEWlNGjPsrVlaxQoqe3dxs664AMEt6Dwvg73yHAuPZJy2zdl3C4yuQIYQ9DlgAK6wO2cVEs2fiAwo4Jeh2EW_nZT6d0WZgi5vDjVKoJP4WgwMQ5ZONTG5U" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">01 Post Your Listing</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Easily list your room for rent or authentic food menu.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-64 h-64 mb-8 relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-full scale-90 -z-10 opacity-50"></div>
                      <img alt="Owner Step 2" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2tKIwE6ojTaiTpnmA2Rrzx8I3okRQ_VVpf_lqgo_L8Qsa7mWuWW8EvJcFzzaR-Ivh9bAp48ZANmQUOHXw1ZgDpg1kLyIJW_gK1sN36aTJllche5dSaNajOv5BaOYf8axOMP2CuRd1RFcpmnUssqe-Z3F3Ntehs9duSe26ATOF1HOGhsmImaBMxj-hpAIVSVdEnd5zWl8jQGX3oiuZOYqX4q3VxPSan7CxOPP-M6cRmtKdD_msoSLh3A9ZPhvihwsGieYZxREah7I" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">02 Connect with Users</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Receive requests and communicate directly with customers.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-64 h-64 mb-8 relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-full scale-90 -z-10 opacity-50"></div>
                      <img alt="Owner Step 3" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArjcyZpssDqIFOhcISdEhXfl69un5PSL7rzWI87XmmMWEOZltgYJI_i2megEUf9LUTdjwo2fjAB_oO8GWjOIZbG0JK7qw_M_VxUoaE7RiRUZBVrcWRM_ZJWNPyNrNAp-8rqY4SRvq-JhH9sxxKyg3Y2sBjz53CqgFvJPKrH_C-vZKudGeFTEAR3UQ7XK6vMS7MGtwgFnQTKWbsvhT4X_524r7IuI_Nbd-Abn2zcj08kjXcwB1TtJbCEMGIQ16j-7QZTSk9DjSCdMY" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">03 Grow Your Income</h3>
                  <p className="text-slate-500 text-sm max-w-xs">Turn your extra space or cooking skills into a thriving side hustle.</p>
              </div>
          </div>
        )}
        <Link to="/guide" className="inline-block mt-20 px-10 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:border-primary hover:text-primary transition">Learn More in Full Guide</Link>
      </section>

      <Footer />

      <RoomRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        roomName={selectedRoom} 
      />
    </div>
  );
};

export default Home;
