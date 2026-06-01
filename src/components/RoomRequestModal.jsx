import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RoomRequestModal = ({ isOpen, onClose, roomName }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    moveInDate: '',
    tenants: 1,
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addRoomAppointment, user } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to request a room.");
      return;
    }
    // Simulate API call and save to user's history
    addRoomAppointment(roomName, formData.moveInDate, 'TBD');
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Room</h2>
          <p className="text-sm text-gray-500 mb-6">
            You are requesting: <span className="font-semibold text-primary">{roomName || 'Selected Room'}</span>
          </p>

          {isSubmitted ? (
            <div className="text-center py-6 px-4 animate-in fade-in zoom-in duration-300">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-green-500 text-white rounded-full w-full h-full flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg className="w-10 h-10 animate-[bounce_1s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Sent to Owner!</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Great news! Your request for <strong className="text-dark">{roomName}</strong> has been directly forwarded to the owner. 
              </p>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8 text-sm text-slate-700 text-left">
                <span className="font-bold flex items-center gap-2 mb-2 text-primary">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                  What happens next?
                </span>
                The owner will review your details and contact you via WhatsApp at <strong className="text-dark">{formData.phone}</strong> very soon.
              </div>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="+971 XX XXX XXXX"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Move-in Date</label>
                  <input 
                    type="date" 
                    name="moveInDate"
                    required
                    value={formData.moveInDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenants</label>
                  <input 
                    type="number" 
                    name="tenants"
                    min="1"
                    required
                    value={formData.tenants}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message to Owner (Optional)</label>
                <textarea 
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Any questions or specific requirements?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-accent transition-colors mt-6"
              >
                Send Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomRequestModal;
