import Header from '../components/Header';
import Footer from '../components/Footer';

const Guide = () => {
  return (
    <div className="bg-white font-sans text-[#1a2b4b]">
      <Header />

      {/* BEGIN: HeroSection */}
      <section className="text-center py-16 px-6" data-purpose="hero-section">
          <h1 className="text-4xl md:text-5xl font-black text-[#1a2b4b] uppercase tracking-wider mb-4">How It Works?</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A comprehensive guide for our community members to find the perfect home and taste.
          </p>
      </section>

      {/* BEGIN: StepsSection */}
      <main className="max-w-6xl mx-auto px-6 space-y-32 py-12">
          {/* Step 01 */}
          <section className="flex flex-col md:flex-row items-center gap-12" data-purpose="step-1">
              <div className="flex-1">
                  <img alt="Registration Illustration" className="w-full h-auto"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXoXhmGku5mQRlYNjAK-mvd9Ke6DFinx1cAz3x4BPn-AmOeKcbcsmJY30VElvmD0NQfoRRhl-mY8yR2YMsbFnLHQqnBO4c5zR-YBDUDbWfPMBdUdgPtruGENo0t_mRckSdUd4awkAkEBRCd2vjO_rN_28SQJnDjAWfDRRf7Y49Zig0sDslhqPhu8LNrew7HC7H1SqMV2dGAZRqm7SJJEmzKc-6DG_NoeXENexGI8Gq1wF5IJmuXTBf1JDAnAgeco_jV-_hX2vZsvQ" />
              </div>
              <div className="flex-1 space-y-4">
                  <span className="text-[3.5rem] font-extrabold text-[#fbbd08] leading-none block">01</span>
                  <h2 className="text-3xl font-extrabold">Complete Your Profile</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                      Start by setting up your profile with accurate contact details. A complete profile helps you build
                      instant trust with owners and service providers.
                  </p>
              </div>
          </section>
          
          {/* Step 02 */}
          <section className="flex flex-col md:flex-row-reverse items-center gap-12" data-purpose="step-2">
              <div className="flex-1">
                  <img alt="Search and Filter Illustration" className="w-full h-auto"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqpuekmqJC5nrFOTNksGrTei5C-1TeQWOdygn6kpeBKdZ2bhOl34uPK_uIT3Y8De_vlRrh6mIJpS3NtWAyEfsIUqMe1FOomOdwnb6XWiX22Z9lEUn-XjQxZkBPVe8h5KyIaWoaJQiNTvoLOYaOW3rwYKi1msn7gYKeQxOtXyCL9D-6c0K1I4sl-lgYvbxkZJeJPt9i_471MsEZsJCN7SlLfNdPLozyHtBabPo18bTa3PKMPgRzIy7_tUnu2k5ia_BdVeBn56B-Ssk" />
              </div>
              <div className="flex-1 space-y-4 text-right">
                  <span className="text-[3.5rem] font-extrabold text-[#fbbd08] leading-none block">02</span>
                  <h2 className="text-3xl font-extrabold">Smart Search and Filter</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                      Use our filters to sort by location, price, and room type. Whether it's a cozy partition or
                      home-cooked Burmese food, find exactly what you need in seconds.
                  </p>
              </div>
          </section>
          
          {/* Step 03 */}
          <section className="flex flex-col md:flex-row items-center gap-12" data-purpose="step-3">
              <div className="flex-1">
                  <img alt="Media Viewing Illustration" className="w-full h-auto"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy_v8qwD-c5-bVLLpSbovEyPjEdzYeC4T7KXoRtLjTbq7-DDyZMlOI5OtJ9-cFoWbxMjyLf9y0tGSn37Maz9LLd-gRE_SMhF4x2y3hh5gJMZ6wewvfoOwMDlSws5xXmHYVFGPqgY7DAwbeHiuk_T5rNZSsUHjZhCWYXkvWaDGto_7tBROW3HdHXDSMXZEw-gbPfpHGd0k8eR7e0qaiZj24ktpjEm0lpfQPa4DTG8vTQkWjuh51yxclNDk7EWEOuyCLEKvX5Q3cl-w" />
              </div>
              <div className="flex-1 space-y-4">
                  <span className="text-[3.5rem] font-extrabold text-[#fbbd08] leading-none block">03</span>
                  <h2 className="text-3xl font-extrabold">View High-Quality Media</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                      Don't just take their word for it. Review high-resolution photos and immersive video tours to get a
                      real feel for the place or the taste before you commit.
                  </p>
              </div>
          </section>
          
          {/* Step 04 */}
          <section className="flex flex-col md:flex-row-reverse items-center gap-12" data-purpose="step-4">
              <div className="flex-1">
                  <img alt="Mobile Connect Illustration" className="w-full h-auto"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn3J7RO3bPRNtfrm0K0Vs__oNdrzKI2q_6GRL_eT_yT0LQSOcuBvbgfQo4HrNDHJ_nna02LL9SfEOhXvNk9r5X2sxzQAj_3363rO1hUapvfB9mhWgnvVRLYtdsPQOoQeNt10gEkqHvFB-c7nWN_Y4rtiFZKE3o2vxcmBr1WEQvR_H5iYDoWmpydkC07tOgbIx6ibb_btgyVqrxtnJMthYp9rnDhWOSy8vcw3qgXxXo6C8_tF5nBDVJiZkfaPzDf7fFgwqw_efscQw" />
              </div>
              <div className="flex-1 space-y-4 text-right">
                  <span className="text-[3.5rem] font-extrabold text-[#fbbd08] leading-none block">04</span>
                  <h2 className="text-3xl font-extrabold">Connect Instantly</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                      Connect with owners directly via our integrated WhatsApp and calling features. Inquire about
                      availability or schedule a viewing with just one click.
                  </p>
              </div>
          </section>
          
          {/* Step 05 */}
          <section className="flex flex-col md:flex-row items-center gap-12 pb-20" data-purpose="step-5">
              <div className="flex-1">
                  <img alt="Review Experience Illustration" className="w-full h-auto"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEkiMvcF8EgOdPsfx-nxN7P8qgq7Wjfvx6intQ1svzcSeYgQOhaYlcxW-B4FhFjbXNsTPDUrvFkcB88UI5oBCohB6eI3nrCSx_g6r5RrXzzLxaBUKjOVLCj4KkywjsvBH7O1UvWGdojF8YiGeFwBNSl-XUz8Ckjb1kvG5A6y_FlwB2YcddLHBIlYAYCJ7ti7YVCOReV2O-EJI1rA6HNzg2gkZ-SDO1vGDee6giKbSp0yT-cK1rBk_HL83CTLpfEZ6OzDm_0uBITIk" />
              </div>
              <div className="flex-1 space-y-4">
                  <span className="text-[3.5rem] font-extrabold text-[#fbbd08] leading-none block">05</span>
                  <h2 className="text-3xl font-extrabold">Share Your Experience</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                      Follow our safety guidelines for secure transactions. Once satisfied, leave a review to help others
                      in the Myanmar community find the best services.
                  </p>
              </div>
          </section>
      </main>

      {/* BEGIN: SafetyChecklist */}
      <section className="max-w-5xl mx-auto px-6 py-12" data-purpose="safety-section">
          <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 md:p-12 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 uppercase tracking-wide">Safety First Checklist</h2>
              <p className="text-gray-500 text-center mb-10">Your security is our priority. Follow these tips for a safe experience.</p>
              <div className="space-y-4 text-sm md:text-base">
                  <div className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <p><span className="font-bold">Verify the Details:</span> Always double-check the location and amenities. Ask for a live video call if you cannot visit immediately.</p>
                  </div>
                  <div className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <p><span className="font-bold">Public Meetings:</span> For food pickups or initial meetings, choose well-lit, public locations within your community.</p>
                  </div>
                  <div className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <p><span className="font-bold">Secure Communication:</span> Keep your initial conversations within the app or use our official WhatsApp links to maintain a record of your interactions.</p>
                  </div>
                  <div className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <p><span className="font-bold">Report Suspicious Activity:</span> If a deal sounds "too good to be true" or an owner acts suspiciously, report it to the DMar support team immediately.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* BEGIN: FAQSection */}
      <section className="max-w-4xl mx-auto px-6 py-20" data-purpose="faq-section">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-2">
              <details className="border-b border-gray-200 group">
                  <summary className="cursor-pointer py-6 font-bold text-lg list-none outline-none flex justify-between items-center">
                      Q: Is DMar free for all users?
                      <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                  </summary>
                  <div className="pb-6 text-gray-600">
                      Yes, browsing and contacting owners is free for our community members.
                  </div>
              </details>
              
              <details className="border-b border-gray-200 group">
                  <summary className="cursor-pointer py-6 font-bold text-lg list-none outline-none flex justify-between items-center">
                      Q: How do I contact a property owner or food provider?
                      <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                  </summary>
                  <div className="pb-6 text-gray-600">
                      You can use the direct WhatsApp link or the built-in calling feature on each listing page.
                  </div>
              </details>
              
              <details className="border-b border-gray-200 group">
                  <summary className="cursor-pointer py-6 font-bold text-lg list-none outline-none flex justify-between items-center">
                      Q: What should I do if a listing is no longer available?
                      <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                  </summary>
                  <div className="pb-6 text-gray-600">
                      Please report the listing so our moderation team can verify and remove it from the platform.
                  </div>
              </details>
              
              <details className="border-b border-gray-200 group">
                  <summary className="cursor-pointer py-6 font-bold text-lg list-none outline-none flex justify-between items-center">
                      Q: Can I save listings to view them later?
                      <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                  </summary>
                  <div className="pb-6 text-gray-600">
                      Yes, logged-in users can use the bookmark icon to save their favorite listings.
                  </div>
              </details>
              
              <details className="border-b border-gray-200 group">
                  <summary className="cursor-pointer py-6 font-bold text-lg list-none outline-none flex justify-between items-center">
                      Q: How can I change my profile information?
                      <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                  </summary>
                  <div className="pb-6 text-gray-600">
                      Go to your "User Dashboard" and select "Profile Settings" to update your information.
                  </div>
              </details>
          </div>
      </section>

      {/* BEGIN: SupportSection */}
      <section className="text-center py-20 bg-white" data-purpose="support-cta">
          <h2 className="text-3xl font-bold mb-8">Still need Help?</h2>
          <button className="px-10 py-3 border-2 border-[#1a2b4b] font-bold rounded-lg hover:bg-gray-50 transition">
              Chat with Support
          </button>
      </section>

      <Footer />
    </div>
  );
};

export default Guide;
