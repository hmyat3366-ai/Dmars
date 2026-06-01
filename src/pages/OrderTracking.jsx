import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
  // 0: Confirmed, 1: Preparing, 2: On the way, 3: Delivered
  const [activeStep, setActiveStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(35); // mins

  useEffect(() => {
    // Simulate order progression every 5 seconds for demonstration purposes
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < 3) {
          setTimeRemaining(old => Math.max(0, old - 10)); // drop time by 10 mins each step
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: "Order Confirmed", icon: "M5 13l4 4L19 7" },
    { title: "Preparing", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "On the way", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { title: "Delivered!", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" }
  ];

  return (
    <div className="bg-[#FCF8F1] font-sans min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
          {/* Title and Back Navigation */}
          <div className="flex items-center gap-6 mb-8">
              <Link to="/checkout" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-primary hover:bg-gray-50 transition" data-purpose="back-button">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
              </Link>
              <h1 className="font-serif text-4xl text-black">Order Tracking</h1>
          </div>

          {/* BEGIN: Map Section */}
          <section className="bg-white rounded-3xl p-2 shadow-sm border border-gray-50 mb-8 overflow-hidden h-64 md:h-80 relative" data-purpose="map-card">
              {/* Fake Map embedded via iframe (Google Maps Dubai) */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115507.03920958189!2d55.19794025178526!3d25.21556942082729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1689530000000!5m2!1sen!2s" 
                className="w-full h-full rounded-2xl" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
              {/* Overlay elements to make it look like an active delivery */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" alt="Driver" className="w-full h-full object-cover" />
                      </div>
                      <div>
                          <p className="font-bold text-gray-900">Kyaw Kyaw</p>
                          <p className="text-xs text-gray-500">Your Delivery Partner</p>
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <a href="tel:+" className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      </a>
                  </div>
              </div>
          </section>

          {/* BEGIN: SummaryCard */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 mb-8" data-purpose="estimated-delivery-card">
              <div className="mb-4">
                  <p className="text-gray-500 font-medium text-sm mb-1">Estimated Delivery</p>
                  <h2 className="text-4xl font-bold text-primary">{activeStep === 3 ? 'Arrived' : `${timeRemaining} min`}</h2>
              </div>
              <div className="relative w-full mb-4">
                  <div className="bg-[#F3E5D3] h-2 rounded-full w-full"></div>
                  <div 
                    className="bg-primary h-2 rounded-full absolute top-0 left-0 transition-all duration-1000 ease-in-out" 
                    style={{ width: `${(activeStep / 3) * 100}%` }}>
                  </div>
              </div>
              <p className="text-gray-400 text-sm">Order #MM-{Math.floor(Math.random() * 9000) + 1000}</p>
          </section>

          {/* BEGIN: TrackingDetails */}
          <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-50 mb-16" data-purpose="tracking-details-card">
              <h3 className="font-serif text-2xl mb-10 text-black">Order Status</h3>
              <div className="flex flex-col gap-12">
                  {steps.map((step, index) => {
                      const isCompleted = index < activeStep;
                      const isActive = index === activeStep;
                      const isPending = index > activeStep;

                      return (
                          <div key={index} className="flex items-start gap-4 relative">
                              {/* Vertical Line connecting steps (hide on last item) */}
                              {index !== steps.length - 1 && (
                                  <div className={`w-[2px] absolute left-[17px] top-[24px] bottom-[-48px] transition-colors duration-500 ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`}></div>
                              )}
                              
                              {/* Icon Circle */}
                              <div className="z-10 bg-white py-1">
                                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors duration-500 ${
                                      isCompleted ? 'border-primary bg-primary text-white' : 
                                      isActive ? 'border-primary bg-orange-50 text-primary shadow-[0_0_15px_rgba(226,149,47,0.3)] animate-pulse' : 
                                      'border-gray-200 bg-gray-50 text-gray-300'
                                  }`}>
                                      {isCompleted ? (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                        </svg>
                                      ) : (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {/* Step specific icons parsed from string */}
                                            {step.icon.split(' M').map((pathD, i) => (
                                              <path key={i} d={pathD.startsWith('M') ? pathD : `M${pathD}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            ))}
                                        </svg>
                                      )}
                                  </div>
                              </div>

                              {/* Text */}
                              <div className={`transition-opacity duration-500 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                                  <h4 className="font-bold text-black text-lg">{step.title}</h4>
                                  <p className="text-gray-500 text-sm">
                                      {isCompleted ? 'Completed' : isActive ? 'In progress...' : 'Pending'}
                                  </p>
                                  {isActive && (
                                      <div className="flex items-center gap-2 mt-1">
                                          <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                                          <span className="text-primary text-xs font-semibold uppercase tracking-wider">Live</span>
                                      </div>
                                  )}
                              </div>
                          </div>
                      );
                  })}
              </div>
          </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTracking;
