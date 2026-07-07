import { createContext, useState, useContext, useEffect } from 'react';
import { fetchApi } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on start
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({ id: parsedUser.id, email: parsedUser.email });
          setProfile(parsedUser);
        } catch (e) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const signup = async (name, email, password, role) => {
    const data = await fetchApi('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setUser({ id: data.user.id, email: data.user.email });
    setProfile(data.user);
    
    return data;
  };

  const login = async (email, password, role) => {
    const data = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setUser({ id: data.user.id, email: data.user.email });
    setProfile(data.user);
    
    return data;
  };

  const socialLogin = async (provider, role) => {
    // For social login, you might need a different flow with MongoDB
    // such as using Passport.js or a Firebase/Auth0 proxy.
    // For now, this is a mock using the social endpoint we created.
    const mockEmail = `user@${provider}.com`;
    const data = await fetchApi('/auth/social', {
      method: 'POST',
      body: JSON.stringify({ email: mockEmail, name: `User from ${provider}`, role }),
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setUser({ id: data.user.id, email: data.user.email });
    setProfile(data.user);
    
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setProfile(null);
  };

  const addFoodOrder = async (order) => {
    if (!user) return;
    
    const newOrderData = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      user_email: user.email,
      items: order.items || [],
      subtotal: order.subtotal || 0,
      delivery_fee: order.deliveryFee || 0,
      total: order.total || 0,
      status: 'Processing',
      delivery_address: order.deliveryAddress || {},
      payment_method: order.paymentMethod || ''
    };

    return await fetchApi('/orders', {
      method: 'POST',
      body: JSON.stringify(newOrderData)
    });
  };

  const addRoomAppointment = async (roomName, date, time) => {
    if (!user) return;
    
    const newAptData = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      user_email: user.email,
      room: roomName,
      date,
      time,
      status: 'Pending'
    };

    return await fetchApi('/appointments', {
      method: 'POST',
      body: JSON.stringify(newAptData)
    });
  };

  const getUserOrders = async () => {
    if (!user) return [];
    return await fetchApi('/orders/user');
  };

  const getUserAppointments = async () => {
    if (!user) return [];
    return await fetchApi('/appointments/user');
  };

  const getAllOrders = async () => {
    return await fetchApi('/orders');
  };

  const getAllAppointments = async () => {
    return await fetchApi('/appointments');
  };

  const updateOrderStatus = async (orderId, status) => {
    return await fetchApi(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  };

  const updateAppointmentStatus = async (aptId, status) => {
    return await fetchApi(`/appointments/${aptId}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  };

  const compatibleUser = profile ? {
    name: profile.name,
    email: profile.email,
    role: profile.role,
    id: profile.id || user?.id
  } : null;

  return (
    <AuthContext.Provider value={{
      user: compatibleUser,
      profile,
      loading,
      login,
      signup,
      socialLogin,
      logout,
      addFoodOrder,
      addRoomAppointment,
      getUserOrders,
      getUserAppointments,
      getAllOrders,
      getAllAppointments,
      updateOrderStatus,
      updateAppointmentStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
