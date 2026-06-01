import Header from '../components/Header';
import Footer from '../components/Footer';

const AddFood = () => {
  return (
    <div className="bg-[#fffcf2] font-sans text-gray-900 min-h-screen flex flex-col">
      <Header />
      
      {/* BEGIN: MainContentArea */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 w-full">
          {/* BEGIN: Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0" data-purpose="user-sidebar">
              <div className="bg-white rounded-2xl border border-[#e69d3a]/20 p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-center overflow-hidden">
                  {/* Profile Header Color Block */}
                  <div className="bg-[#e69d3a] h-20 -mx-6 -mt-6 mb-4"></div>
                  <div className="relative inline-block -mt-14 mb-4">
                      <img alt="Clovie Profile" className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq2GpDotXXSdsVyct9bvdDUXVVvA96r7tOw6EwgGEgVrzxPnDjq0vY8KBXgd2mH6K3cqtuidFYQ8TjwUOQ3J9IBrVeOUf5oIi7MykzbEP-chYMhBrI2UiqKCiSp0hO2so-b0YkPL8U5jqnnghFXTInvn30dHyfRFgxA-M4B4PTAma9xNi0dvQgT1vZeYUrRrc2y_3JjkU9S61OgXxoZ52Q-QH4xO963ZUm8uMpqY6sjuADocSq6GNUyCOLHzLdoKsB8mk163KFIQs"
                          style={{ objectPosition: 'center 20%' }} />
                  </div>
                  <h2 className="font-bold text-xl mb-1">Clovie</h2>
                  <span className="inline-block px-3 py-1 bg-gray-200 text-xs font-semibold text-gray-600 rounded-full mb-8 uppercase tracking-wider">Owner account</span>
                  <nav className="flex flex-col gap-3">
                      <a className="flex items-center justify-center gap-2 py-3 px-4 bg-[#e69d3a] text-white rounded-lg font-medium transition-all hover:opacity-90" href="#">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          </svg>
                          Room
                      </a>
                      <a className="flex items-center justify-center gap-2 py-3 px-4 bg-white text-black border border-[#e69d3a] rounded-lg font-medium shadow-inner" href="#">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M21 15.546c0 1.587-1.416 2.454-2.888 2.454H5.888C4.416 18 3 17.133 3 15.546c0-1.276.993-2.31 2.308-2.438a2.441 2.441 0 010-4.88c1.315-.128 2.308-1.162 2.308-2.438a2.441 2.441 0 014.88 0c0 1.276.993 2.31 2.308 2.438a2.441 2.441 0 010 4.88c1.315.128 2.308 1.162 2.308 2.438z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          </svg>
                          Food
                      </a>
                      <a className="flex items-center justify-center gap-2 py-3 px-4 bg-[#e69d3a] text-white rounded-lg font-medium transition-all hover:opacity-90" href="#">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          </svg>
                          Settings
                      </a>
                  </nav>
              </div>
          </aside>
          {/* END: Sidebar */}
          
          {/* BEGIN: DashboardContent */}
          <section className="flex-grow" data-purpose="food-menu-list">
              <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-4xl font-bold text-[#0b192e]">Food Menu</h2>
                  <button className="flex items-center gap-2 px-5 py-2 border-2 border-[#e69d3a] text-[#0b192e] font-semibold rounded-lg hover:bg-[#e69d3a]/5 transition-all">
                      <svg className="w-5 h-5 text-[#e69d3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                      Add Food
                  </button>
              </div>
              
              <div className="space-y-6">
                  {/* Menu Item: Myaungmya Mohinga */}
                  <div className="bg-white rounded-2xl border-2 border-[#e69d3a]/40 p-5 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)]" data-purpose="menu-card">
                      <img alt="Myaungmya Mohinga" className="w-full md:w-40 h-28 object-cover rounded-xl flex-shrink-0"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoqcqm7cMrsKUmKuf86WAan4loix6bR6IkdyYobxWswD1f7E8NLSADefosDwM3fET6JH3t43rOgZPyjd5ANmJXmx7ojYsi4d4NXxy_lmKRzxUCgQ1W11xAKENw8ObbI98VjTyiu3HeVH9QFUEzAi3rQazSxjalAJbHhuHdON60q3qLQiLcDE4-YnImtD363YICZWsCIC4AlZVfSYwWujOCyk2fB8Z86S6LbEG5IoLDgfsXB6Nd9Z2i4k46OWqlaRS-XLK4HVtR9F8" />
                      <div className="flex-grow">
                          <h3 className="font-bold text-xl mb-1">Myaungmya Mohinga</h3>
                          <p className="text-gray-500 mb-1">Price: <span className="text-[#e69d3a] font-medium">AED 8.50</span></p>
                          <a className="text-green-600 font-medium hover:underline" href="#">Publish</a>
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="px-8 py-2 border border-[#e69d3a]/30 rounded-full text-sm font-bold bg-white">Approved</span>
                          <div className="flex items-center gap-3">
                              <button className="p-2 bg-[#0b192e] text-white rounded-lg hover:opacity-80 transition-opacity">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                              <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                      <path clipRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" fillRule="evenodd"></path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
                  
                  {/* Menu Item: Kyah Ohh */}
                  <div className="bg-white rounded-2xl border-2 border-green-500/30 p-5 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)]" data-purpose="menu-card">
                      <img alt="Kyah Ohh" className="w-full md:w-40 h-28 object-cover rounded-xl flex-shrink-0"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJU2YQ9MYU0X-Gc60hMj57RepfIxFT8ONvK8ahVPS2--nLpu4-ljdBBpfDCNo8-PXX6KHjA_iN7YypsboYsHPOojcZk0WpUNHxcFcbw8aIfaAHVgWG9dAULLmQLbd2X8WImGezLTmffz9u1D1JVxr2sR5Pp6hUC9dYcbf44g35H2ZmulM-0mYXZHlney5Bf2tnDKUyA7v176LaCObKq7m2TKG2LhpELtuGW4xMHO7WPFP7LLDGPVGw5F0EiMWdfBLQ8ObB4m4H1fw" />
                      <div className="flex-grow">
                          <h3 className="font-bold text-xl mb-1">Kyah Ohh</h3>
                          <p className="text-gray-500 mb-1">Price: <span className="text-[#e69d3a] font-medium">AED 8.50</span></p>
                          <a className="text-green-600 font-medium hover:underline" href="#">Publish</a>
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="px-8 py-2 border border-green-500/30 rounded-full text-sm font-bold bg-white">Available</span>
                          <div className="flex items-center gap-3">
                              <button className="p-2 bg-[#0b192e] text-white rounded-lg hover:opacity-80 transition-opacity">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                              <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                      <path clipRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" fillRule="evenodd"></path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
                  
                  {/* Menu Item: Noodle Salad */}
                  <div className="bg-white rounded-2xl border-2 border-gray-400/30 p-5 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)]" data-purpose="menu-card">
                      <img alt="Noodle Salad" className="w-full md:w-40 h-28 object-cover rounded-xl flex-shrink-0 grayscale"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLLPtHj0xLckre9XpXk_wRDM32Dfdu0WEqo8LB0Voa9dnfnXMxnkXoHLeNwJhvz5KgfQuRC0rdrz316vzJbD8t_-GF_r1Kscwz9hcTzaxeSub3Ku23FdZF-vihmQSnFLd3fBoN6g_o8GMU3buQ_WhLJ_o8CczwoNRYTIfXomn3CcMRVDdJsJ5HS_nDBEs8tHqrodzr2Bo_XZiN2sU954nKdS1o7X0GXVl2VvD9sdy6h10Lqod0Xu_ZBxdU-ZqRtWxmPDuKYZ-w76I" />
                      <div className="flex-grow">
                          <h3 className="font-bold text-xl mb-1">Noodle Salad</h3>
                          <p className="text-gray-500 mb-1">Price: <span className="text-[#e69d3a] font-medium">AED 8.50</span></p>
                          <a className="text-green-600 font-medium hover:underline" href="#">Publish</a>
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="px-8 py-2 border border-gray-400/30 rounded-full text-sm font-bold bg-white text-gray-500">Sold Out</span>
                          <div className="flex items-center gap-3">
                              <button className="p-2 bg-[#0b192e] text-white rounded-lg hover:opacity-80 transition-opacity">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                              <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                      <path clipRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" fillRule="evenodd"></path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
                  
                  {/* Menu Item: SweetMilk Tea */}
                  <div className="bg-white rounded-2xl border-2 border-green-500/30 p-5 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)]" data-purpose="menu-card">
                      <img alt="SweetMilk Tea" className="w-full md:w-40 h-28 object-cover rounded-xl flex-shrink-0"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4k_fiKcnfXXbfFJcgAv9QDZKdzPC3aSphH8dyjAjv42pKCNeyti3TDOqFF0mtZgbn-S9lPa5OFOcG2aypv5FqYFqYb7bJiUGMjf9hbYfaJFr4PJ0V5GCwRK5aXXAFJiG_C7fh2CwCF3FWahaqCriwQ8qQWzuZ-qhVYKVJWErJzrdWF4tghk73l6OWHuFJ_iX8w8Sgg24awjJklQuTqBc6OSnOjBOQ-RQwX8iAnP-OIb3Zp6KnZ-Q-rxstb9Ge-lB2ZdNrqkGXDmQ" />
                      <div className="flex-grow">
                          <h3 className="font-bold text-xl mb-1">SweetMilk Tea</h3>
                          <p className="text-gray-500 mb-1">Price: <span className="text-[#e69d3a] font-medium">AED 8.50</span></p>
                          <a className="text-green-600 font-medium hover:underline" href="#">Publish</a>
                      </div>
                      <div className="flex items-center gap-6">
                          <span className="px-8 py-2 border border-green-500/30 rounded-full text-sm font-bold bg-white">Available</span>
                          <div className="flex items-center gap-3">
                              <button className="p-2 bg-[#0b192e] text-white rounded-lg hover:opacity-80 transition-opacity">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                  </svg>
                              </button>
                              <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                      <path clipRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" fillRule="evenodd"></path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* END: DashboardContent */}
      </main>

      <Footer />
    </div>
  );
};

export default AddFood;
