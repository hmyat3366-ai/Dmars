import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="bg-white font-sans text-slate-800">
      <Header />
      
      <main>
          {/* BEGIN: OurMissionSection */}
          <section className="py-16 px-6 max-w-7xl mx-auto" data-purpose="mission-section">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Mission Text Card */}
                  <div className="lg:col-span-8">
                      <div className="bg-white border-2 border-primary/20 rounded-[2.5rem] p-10 md:p-16 text-center shadow-[0_10px_30px_-5px_rgba(230,145,39,0.15),_0_4px_10px_-5px_rgba(0,0,0,0.1)]">
                          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-10">Our Mission</h2>
                          <div className="space-y-6 text-gray-700 leading-relaxed max-w-2xl mx-auto text-lg">
                              <p>Moving to a new country is challenging, and finding a community that feels like home is
                                  even harder. Dubai Myanmar Hub was created to bridge the gap for Myanmar expats living
                                  in the UAE.</p>
                              <p>We focus on two main pillars: helping you find safe, comfortable accommodation with
                                  fellow community members, and providing access to authentic home-cooked meals. By
                                  keeping the platform simple and community-driven, we aim to make your life in Dubai a
                                  little bit easier.</p>
                          </div>
                      </div>
                  </div>
                  
                  {/* Mission Visuals */}
                  <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-sm">
                          {/* Top Right Image (Room) */}
                          <div className="ml-auto w-4/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-4">
                              <img alt="Myanmar Expat Housing" className="w-full h-full object-cover"
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArjcyZpssDqIFOhcISdEhXfl69un5PSL7rzWI87XmmMWEOZltgYJI_i2megEUf9LUTdjwo2fjAB_oO8GWjOIZbG0JK7qw_M_VxUoaE7RiRUZBVrcWRM_ZJWNPyNrNAp-8rqY4SRvq-JhH9sxxKyg3Y2sBjz53CqgFvJPKrH_C-vZKudGeFTEAR3UQ7XK6vMS7MGtwgFnQTKWbsvhT4X_524r7IuI_Nbd-Abn2zcj08kjXcwB1TtJbCEMGIQ16j-7QZTSk9DjSCdMY" />
                          </div>
                          {/* Bottom Left Image (Food) */}
                          <div className="-mt-20 mr-auto w-4/5 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                              <img alt="Myanmar Authentic Food" className="w-full h-full object-cover"
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH38CNc_XD1glU2vwBu9aoPmCB_7G74TlIErYOIkCyqvX12foH8HTdp92TAHGtgIls1ws2T7w8i1bElv53hsNQgAm8HP_Lcys5hEJfeubUM50qpJPMTNgDJqe86lui_e_L8xYGfx5N6-ss5dq1d_GUutAhAR7uL74Bb4vKc8f04o2AOrwrZYB7N3Voh1h3FzDgj9CFCLeW7wEoajXavBn6aMsUlo9w_TMbxNl9WlXnWGl2IHomw8kFY2ZMSj84fRwfVNgS60NQKzY" />
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* BEGIN: CommunitySection */}
          <section className="py-16 px-6 max-w-7xl mx-auto" data-purpose="community-details">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Image */}
                  <div className="lg:col-span-3">
                      <div className="h-full min-h-[400px] rounded-[2rem] overflow-hidden shadow-lg">
                          <img alt="Myanmar Food Spread" className="w-full h-full object-cover"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHZCLSPFPj2bAT0PMpnnyYjxZJkvbmTe3RYXn1rEuD-juS27fnPpnqoBm4m_OnfUMT-FwwkLm8o5210Wh68EGCkwMttICCUt7_uPaqgMBRoQ_5Je6RZwLrXPr05PVmx6s0huDEcsmaa26KOFHFuXMcvPEWlNGjPsrVlaxQoqe3dxs664AMEt6Dwvg73yHAuPZJy2zdl3C4yuQIYQ9DlgAK6wO2cVEs2fiAwo4Jeh2EW_nZT6d0WZgi5vDjVKoJP4WgwMQ5ZONTG5U" />
                      </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="lg:col-span-9">
                      <div className="bg-white border-2 border-primary/20 rounded-[2.5rem] p-10 md:p-14 shadow-[0_10px_30px_-5px_rgba(230,145,39,0.15),_0_4px_10px_-5px_rgba(0,0,0,0.1)] h-full flex flex-col justify-center">
                          <div className="text-center mb-12">
                              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">About Our Community</h2>
                              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                                  We built this platform to make life easier for Myanmar expats living in Dubai. Whether
                                  you're looking for a cozy bedspace with friendly roommates or craving a warm bowl of
                                  Mohinga, we connect you directly with trusted owners in our community.
                              </p>
                          </div>
                          
                          {/* Stats Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-[#FBEEDC] rounded-2xl p-8 text-center" data-purpose="stat-card">
                                  <div className="text-4xl font-bold font-serif mb-2">500+</div>
                                  <div className="text-gray-600 text-sm font-medium">Active Listings</div>
                              </div>
                              <div className="bg-[#FBEEDC] rounded-2xl p-8 text-center" data-purpose="stat-card">
                                  <div className="text-4xl font-bold font-serif mb-2">COD</div>
                                  <div className="text-gray-600 text-sm font-medium">Cash on Delivery</div>
                              </div>
                              <div className="bg-[#FBEEDC] rounded-2xl p-8 text-center" data-purpose="stat-card">
                                  <div className="text-4xl font-bold font-serif mb-2">100%</div>
                                  <div className="text-gray-600 text-sm font-medium">Community Focused</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* BEGIN: HowItWorksSection */}
          <section className="bg-[#FFF9F0] py-20 px-6" data-purpose="how-it-works">
              <div className="max-w-7xl mx-auto">
                  <h2 className="text-5xl font-serif font-bold text-center mb-16">How it Works</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Card 1: Cash on Delivery */}
                      <div className="bg-white border-2 border-primary/30 rounded-3xl p-8 flex flex-col items-center text-center">
                          <div className="mb-8 w-32 h-32 flex items-center justify-center">
                              <svg className="w-24 h-24 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                  <path d="M5 18h14M5 14h14M3 10l2-4h14l2 4M10 18v3m4-3v3M12 6V3"></path>
                                  <circle cx="7" cy="18" r="2"></circle>
                                  <circle cx="17" cy="18" r="2"></circle>
                                  <path d="M12 10a2 2 0 100-4 2 2 0 000 4z"></path>
                              </svg>
                          </div>
                          <h3 className="text-2xl font-bold font-serif mb-4">Cash on Delivery</h3>
                          <p className="text-gray-600">To keep things simple and trustworthy, all food orders are Cash on Delivery (COD). Pay only when your food arrives.</p>
                      </div>
                      
                      {/* Card 2: Browse & Connect (Highlighted/Center) */}
                      <div className="bg-white border-4 border-primary rounded-3xl p-8 flex flex-col items-center text-center transform md:scale-105 shadow-xl relative z-10">
                          <div className="mb-8 w-32 h-32 flex items-center justify-center border-2 border-gray-200 rounded-lg">
                              <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path d="M2 12h20M12 2a15.3 15.3 0 010 20"></path>
                                  <text fontSize="4" fontWeight="bold" x="5" y="14">WWW</text>
                              </svg>
                          </div>
                          <h3 className="text-2xl font-bold font-serif mb-4">Browse &amp; Connect</h3>
                          <p className="text-gray-600">Find the room or food you like. For rooms, request a booking and the owner will contact you directly via WhatsApp or Phone.</p>
                      </div>
                      
                      {/* Card 3: Community First */}
                      <div className="bg-white border-2 border-primary/30 rounded-3xl p-8 flex flex-col items-center text-center">
                          <div className="mb-8 w-32 h-32 flex items-center justify-center">
                              <svg className="w-24 h-24 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="3"></circle>
                                  <path d="M12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"></path>
                                  <circle cx="12" cy="4" r="2"></circle>
                                  <circle cx="12" cy="20" r="2"></circle>
                                  <circle cx="4" cy="12" r="2"></circle>
                                  <circle cx="20" cy="12" r="2"></circle>
                              </svg>
                          </div>
                          <h3 className="text-2xl font-bold font-serif mb-4">Community First</h3>
                          <p className="text-gray-600">We rely on our community to maintain quality. Only verified owners can post listings.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* BEGIN: Team Section */}
          <section className="py-20 px-6 max-w-7xl mx-auto" data-purpose="team-section">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">Meet The Creators</h2>
              
              {/* Developers */}
              <h3 className="text-2xl font-bold font-serif text-gray-800 mb-8 text-center border-b pb-4">Development Team</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16">
                  {['Mr Miles', 'Hedy Livz', 'Jeeryvpro', 'Aks'].map((name, i) => (
                      <div key={name} className="text-center group">
                          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-orange-100 group-hover:border-[#E39D33] transition-colors shadow-lg bg-gray-50">
                              <img src={`https://randomuser.me/api/portraits/lego/${i}.jpg`} alt={name} className="w-full h-full object-cover" />
                          </div>
                          <h4 className="font-bold text-lg font-serif text-gray-900">{name}</h4>
                          <p className="text-[#E39D33] font-medium text-sm mt-1">Developer</p>
                      </div>
                  ))}
              </div>

              {/* Designers */}
              <h3 className="text-2xl font-bold font-serif text-gray-800 mb-8 text-center border-b pb-4">UI/UX Design Team</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
                  {['Hsu Wai Wai Hlaing', 'Kubo', 'MoMotaro', 'Mio', 'Gouki', 'Zuri', 'Clovie'].map((name, i) => (
                      <div key={name} className="text-center group">
                          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-4 border-4 border-orange-100 group-hover:border-[#E39D33] transition-colors shadow-lg bg-gray-50">
                              <img src={`https://randomuser.me/api/portraits/lego/${(i + 4) % 10}.jpg`} alt={name} className="w-full h-full object-cover" />
                          </div>
                          <h4 className="font-bold text-md font-serif text-gray-900 leading-tight">{name}</h4>
                          <p className="text-[#E39D33] font-medium text-xs mt-1">UI/UX Designer</p>
                      </div>
                  ))}
              </div>
          </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
