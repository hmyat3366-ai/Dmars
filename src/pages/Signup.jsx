import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, socialLogin } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      await signup(name, email, password, activeTab);
      setSuccess('Account created successfully! You can now log in.');
      // Small delay to show success message
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await socialLogin(provider, activeTab);
      // OAuth will redirect
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
      {/* BEGIN: Main Login Container */}
      <main className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-[40px] shadow-2xl overflow-hidden min-h-[85vh]">
          {/* BEGIN: Left Info Section */}
          <section className="md:w-5/12 bg-warm-gradient p-10 lg:p-16 flex flex-col justify-center relative">
              {/* Background Shapes */}
              <div className="shape-1"></div>
              <div className="shape-2"></div>
              <div className="shape-3"></div>
              
              <div className="relative z-10">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 font-serif">
                      Welcome Back to DMar
                  </h1>
                  <p className="text-gray-800 text-lg mb-12 max-w-md">
                      Your trusted Myanmar community platform in Dubai for rooms and authentic food.
                  </p>
                  
                  {/* Feature List */}
                  <div className="space-y-4">
                      {/* Feature Item 1 */}
                      <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 lg:p-5 shadow-sm">
                          <div className="flex-shrink-0 bg-green-600 rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                              </svg>
                          </div>
                          <span className="text-white font-semibold">500 + Verified Listings</span>
                      </div>
                      
                      {/* Feature Item 2 */}
                      <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 lg:p-5 shadow-sm">
                          <div className="flex-shrink-0 bg-green-600 rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                              </svg>
                          </div>
                          <span className="text-white font-semibold">Authentic Myanmar Cuisine</span>
                      </div>
                      
                      {/* Feature Item 3 */}
                      <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 lg:p-5 shadow-sm">
                          <div className="flex-shrink-0 bg-green-600 rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                              </svg>
                          </div>
                          <span className="text-white font-semibold">Trusted Community Network</span>
                      </div>
                      
                      {/* Feature Item 4 */}
                      <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 lg:p-5 shadow-sm">
                          <div className="flex-shrink-0 bg-green-600 rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                              </svg>
                          </div>
                          <span className="text-white font-semibold">Cash on Delivery Available</span>
                      </div>
                  </div>
              </div>
          </section>
          {/* END: Left Info Section */}
          
          {/* BEGIN: Right Login Section */}
          <section className="md:w-7/12 p-10 lg:p-16 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 font-serif">Create Account</h2>
                  <p className="text-gray-500 mb-8">Join your Myanmar community today</p>
                  
                  {/* Account Tabs */}
                  <div className="bg-gray-100 p-1.5 rounded-xl flex mb-8" data-purpose="account-toggle">
                      <button 
                          onClick={() => setActiveTab('user')}
                          className={`flex-1 py-3 text-center rounded-lg font-semibold transition-all ${activeTab === 'user' ? 'text-[#e6a847] tab-active' : 'text-gray-600 hover:text-gray-900'}`}>
                          User Account
                      </button>
                      <button 
                          onClick={() => setActiveTab('owner')}
                          className={`flex-1 py-3 text-center rounded-lg font-semibold transition-all ${activeTab === 'owner' ? 'text-[#e6a847] tab-active' : 'text-gray-600 hover:text-gray-900'}`}>
                          Owner Account
                      </button>
                  </div>
                  
                  {/* Signup Form */}
                  <form className="space-y-6" onSubmit={handleSignup}>
                      {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-semibold border border-red-100">
                          {error}
                        </div>
                      )}
                      {success && (
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm font-semibold border border-green-100">
                          {success}
                        </div>
                      )}
                      <div data-purpose="name-field">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                          <input 
                            className="w-full p-4 rounded-xl input-field focus:ring-0" 
                            placeholder="Enter your name" 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                      </div>
                      <div data-purpose="email-field">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                          <input 
                            className="w-full p-4 rounded-xl input-field focus:ring-0" 
                            placeholder="Enter your email" 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                      </div>
                      <div data-purpose="password-field">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                          <div className="relative">
                            <input 
                              className="w-full p-4 pr-12 rounded-xl input-field focus:ring-0" 
                              placeholder="Enter your password" 
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              minLength={6}
                              disabled={isLoading}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              )}
                            </button>
                          </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                          <label className="flex items-center cursor-pointer">
                              <input className="w-5 h-5 rounded border-gray-300 text-[#e6a847] focus:ring-[#e6a847]" type="checkbox" required />
                              <span className="ml-2 text-gray-500 font-medium">I agree to Terms & Conditions</span>
                          </label>
                      </div>
                      
                      {/* Submit Button */}
                      <button 
                        className="w-full bg-[#e6a847] hover:bg-[#d49635] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-200 disabled:opacity-60" 
                        type="submit"
                        disabled={isLoading}
                      >
                          {isLoading ? 'Creating Account...' : 'Sign Up'}
                      </button>
                  </form>
                  
                  {/* Divider */}
                  <div className="relative my-10">
                      <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span>
                      </div>
                  </div>
                  
                  {/* Social Logins */}
                  <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => handleSocialLogin('Google')} className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                          <img alt="Google Logo" className="mr-2 w-5 h-5"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC04oQb9eFz7XRpw-CdZBbLrn64yyN5yRzBDp4-iPuCm0O9w7Ssz_sBwT1MYsXoAGomwNxLB6CBnQMudzy8eXm1zlt99ybPoZ5PntXsaGu0WwfTc2BAqSFReGSDYz-YmviQoxsQr-vKWA7oU4s1pBPrd-FOr1QK81FknaCQxz43LB-V-YX7jYl-VH3X7n7FD2ouU_g8SXVTgx96l69DllveMm-qo7ymVp7m102E3yZnEbgO1SS9xoADBpTDfwUoh9P2EFygY3hthRc" />
                          <span className="font-bold text-gray-700">Google</span>
                      </button>
                      <button type="button" onClick={() => handleSocialLogin('Facebook')} className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                          <img alt="Facebook Logo" className="mr-2 w-5 h-5"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHLUa6oeBtRB6tD1o07EJ-a9CKf7mYGhvZHdilQg8GNLZDYeU8nhoZaq-ppFXjOKFtyf_u7bp6aVI0adiuuw2x_7ILpVOBX16s-735hlEVOs_d2NCzTv8-yH0_XsYySjTTSvanc-Jkbe6x-hRKTviXTqQv6bbrM7XQRX1DPiORQiAz7OCQpLVqs-MqiNnKZjGoMz9xXAB3TszLWD4MX9gpRlBVNaRdys0WndS0ILO4tPRIMwgO-7eP2GhOSrWJirxHkSVfN5zgDyo" />
                          <span className="font-bold text-gray-700">Facebook</span>
                      </button>
                  </div>
                  
                  {/* Log In Link */}
                  <p className="text-center mt-10 text-gray-600 font-medium">
                      Already have an account? <Link className="text-[#e6a847] font-bold hover:underline" to="/login">Log in</Link>
                  </p>
              </div>
          </section>
          {/* END: Right Login Section */}
      </main>
      {/* END: Main Login Container */}
    </div>
  );
};

export default Signup;
