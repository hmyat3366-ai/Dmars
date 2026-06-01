import Header from '../components/Header';
import Footer from '../components/Footer';

const AddRoom = () => {
  return (
    <div className="bg-[#FCF8F1] font-sans min-h-screen flex flex-col">
      <Header />
      
      {/* BEGIN: MainContent */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-10">
          {/* BEGIN: Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden" data-purpose="user-profile-card">
                  {/* Profile Header Color Block */}
                  <div className="h-24 bg-[#E39D33] w-full"></div>
                  <div className="px-6 pb-8 -mt-12 flex flex-col items-center">
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md mb-3 bg-gray-200">
                          <img alt="Clovie Profile" className="w-full h-full object-cover"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnCdOQG2gzu9MWA8s-BF2U9dNAtfCNH7SSqv-9kSCkemPyoRSfFDnu0-xYA72PNh4wWnHPJYPA17I7r4Ntdb-BBVWR2rrEUkKe8t2Ctb0POf8ovlB_jZePFwuuFR5L5VZkJPMg71mMlsE2xQxHXJgPDwXOgWW583YhtYAYzQ-6M57ESL2veI1d1c0rBU5iLBXa1M7x51HNp_FBT3810sTo35RzOwQ1S0fFzOi_aX05A5o7GrNfAU3gjlJ6elFJJ2vo8QJoKIyInxA" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Clovie</h2>
                      <span className="mt-1 px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wider">Owner account</span>
                      
                      {/* Navigation Menu */}
                      <div className="mt-8 w-full space-y-3">
                          <button className="w-full flex items-center px-4 py-3 bg-white border border-[#E39D33] text-[#E39D33] rounded-xl font-semibold transition-all">
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              </svg>
                              Room
                          </button>
                          <button className="w-full flex items-center px-4 py-3 bg-[#E39D33] text-white rounded-xl font-semibold hover:bg-[#cf8b2a] transition-all">
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              </svg>
                              Food
                          </button>
                          <button className="w-full flex items-center px-4 py-3 bg-[#E39D33] text-white rounded-xl font-semibold hover:bg-[#cf8b2a] transition-all">
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              </svg>
                              Settings
                          </button>
                      </div>
                  </div>
              </div>
          </aside>
          {/* END: Sidebar */}
          
          {/* BEGIN: DashboardBody */}
          <section className="flex-grow">
              <div className="flex justify-between items-center mb-8">
                  <h1 className="font-serif text-4xl font-bold text-gray-900">My Room</h1>
                  <button className="flex items-center px-5 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 font-semibold shadow-sm hover:bg-gray-50 transition-all">
                      <svg className="w-5 h-5 mr-2 text-[#E39D33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                      Add Room
                  </button>
              </div>
              
              {/* Room Cards List */}
              <div className="space-y-6">
                  {/* Room Item 1: Booked */}
                  <div className="bg-white rounded-2xl p-6 border-2 border-blue-600 shadow-md flex flex-col sm:flex-row gap-6 items-center" data-purpose="room-card-booked">
                      <div className="w-full sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                          <img alt="Bed Space near Al Rigga Metro" className="w-full h-full object-cover"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd0k9e97t1a1dB2qF9PRjigQUTMUwTgrJDL7crfL4q64ucEtAY7TWrFkzD7Lw5hwufA_qpqevUmA7N3G_DH2kNbzKrNHMr279z6k02liVL-VL69CiS-O65vpBbBUqqCL0CvAIA3pBN18VTovSKiVWvwARIXhH_6fiOaX1DqX3NDi5nDukuVxga7lgMHL84frn8wMSiLZ5DVn4skcAxWE72FqL7WPyc7CGSWSucXKTVweIV0hA8-5zf2SjfqesT2wku5sCKVEa8WJE" />
                      </div>
                      <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900">Bed Space near Al Rigga Metro</h3>
                          <div className="mt-2 text-gray-600">Price: <span className="text-[#E39D33] font-semibold">AED 1200</span></div>
                          <button className="mt-3 text-green-500 font-semibold hover:underline text-sm">Publish</button>
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="px-8 py-2 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-full text-sm">Booked</span>
                          <div className="flex items-center gap-3">
                              <button className="p-2 text-gray-800 hover:bg-gray-100 rounded-full border border-gray-200" title="Edit">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-full border border-gray-200" title="Delete">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
                  
                  {/* Room Item 2: Available */}
                  <div className="bg-white rounded-2xl p-6 border-2 border-green-500 shadow-sm flex flex-col sm:flex-row gap-6 items-center" data-purpose="room-card-available">
                      <div className="w-full sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                          <img alt="Shared Room near Union Metro" className="w-full h-full object-cover"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmEpnEn1EdrNyNnlDCR9lqA0RXpSyH_ZDYbAI9OWJgi4TzkYuMZGSAL1up1Jm7ahvNqwzLqRx6cd9TfDp_0s5wFOZoNcNj3qYmb4Wgv4uuxp4UDcRMRl8JnTTsdDc701D3tToE950ziggrSPEJYM4wOARjczF-gyzYX6jRzO3xP-X4Bxe4P-L52CLe-JXQLZ_uJKApOL_szo19f_5fNhymxmG8Mc_EUrxgzbsZZdZ12AwIfR0uiG_obS8FFZ5fp2KDebKYp7y7qyI" />
                      </div>
                      <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900">Shared Room near Union Metro</h3>
                          <div className="mt-2 text-gray-600">Price: <span className="text-[#E39D33] font-semibold">AED 800</span></div>
                          <button className="mt-3 text-green-500 font-semibold hover:underline text-sm">Publish</button>
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="px-8 py-2 bg-white border-2 border-green-500 text-green-500 font-bold rounded-full text-sm">Available</span>
                          <div className="flex items-center gap-3">
                              <button className="p-2 text-gray-800 hover:bg-gray-100 rounded-full border border-gray-200" title="Edit">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-full border border-gray-200" title="Delete">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
                  
                  {/* Room Item 3: Available */}
                  <div className="bg-white rounded-2xl p-6 border-2 border-green-500 shadow-sm flex flex-col sm:flex-row gap-6 items-center" data-purpose="room-card-available-2">
                      <div className="w-full sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                          <img alt="Private Room with Balcony" className="w-full h-full object-cover"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8wcptro40Nr4pCRDxANfqEBeTmaY7KQQ-QZ1yw6wT_FqBOcbYEROfNIGPkMK446sAxw-E72J7ZG8k4ad6gPCydOjzNvKM8_CvXhuCh4VDnTjP7U7CCmZupdVccsZjZH47jD8-0NkWNsPEqNS0lk0IST8ycCu5FaVEljZMx4UQ-GhI2F9MaDM4fC_PEMhp_9_I8-5Bi_AAND6R2ULLE326qdCAtXOqjB-uUIRcCnJqehZd-F0V2KGnXjNSO7Ttsj-VpHPssfWU6wM" />
                      </div>
                      <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900">Private Room with Balcony, Al Nahda</h3>
                          <div className="mt-2 text-gray-600">Price: <span className="text-[#E39D33] font-semibold">AED 1200</span></div>
                          <button className="mt-3 text-green-500 font-semibold hover:underline text-sm">Publish</button>
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="px-8 py-2 bg-white border-2 border-green-500 text-green-500 font-bold rounded-full text-sm">Available</span>
                          <div className="flex items-center gap-3">
                              <button className="p-2 text-gray-800 hover:bg-gray-100 rounded-full border border-gray-200" title="Edit">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-full border border-gray-200" title="Delete">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* END: DashboardBody */}
      </main>

      <Footer />
    </div>
  );
};

export default AddRoom;
