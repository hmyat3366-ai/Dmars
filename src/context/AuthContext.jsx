import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize from localStorage on load to simulate persistent session
  useEffect(() => {
    const storedUser = localStorage.getItem('dmar_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (name, email, password, role) => {
    const usersDB = JSON.parse(localStorage.getItem('dmar_users_db')) || [];
    
    // Check if email already exists
    const existingUser = usersDB.find(u => u.email === email);
    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = { name, email, password, role };
    usersDB.push(newUser);
    localStorage.setItem('dmar_users_db', JSON.stringify(usersDB));
    
    // Log the user in after signup
    setUser({ name, email, role });
    localStorage.setItem('dmar_user', JSON.stringify({ name, email, role }));
  };

  const login = (email, password, role) => {
    const usersDB = JSON.parse(localStorage.getItem('dmar_users_db')) || [];
    
    const validUser = usersDB.find(u => u.email === email && u.password === password && u.role === role);
    
    if (!validUser) {
      throw new Error("Invalid email, password, or account type.");
    }

    const loggedInUser = { name: validUser.name, email: validUser.email, role: validUser.role };
    setUser(loggedInUser);
    localStorage.setItem('dmar_user', JSON.stringify(loggedInUser));
  };

  const socialLogin = (provider, role) => {
    const email = `user@${provider.toLowerCase()}.com`;
    const name = `${provider} User`;
    const usersDB = JSON.parse(localStorage.getItem('dmar_users_db')) || [];
    
    let userAccount = usersDB.find(u => u.email === email && u.role === role);
    if (!userAccount) {
      userAccount = { name, email, password: 'social_login', role };
      usersDB.push(userAccount);
      localStorage.setItem('dmar_users_db', JSON.stringify(usersDB));
    }
    
    const loggedInUser = { name: userAccount.name, email: userAccount.email, role: userAccount.role };
    setUser(loggedInUser);
    localStorage.setItem('dmar_user', JSON.stringify(loggedInUser));
  };

  const addFoodOrder = (order) => {
    if (!user) return;
    const ordersDB = JSON.parse(localStorage.getItem('dmar_orders_db')) || [];
    const newOrder = { 
        ...order, 
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, 
        userEmail: user.email, 
        date: new Date().toISOString().split('T')[0], 
        status: 'Processing' 
    };
    ordersDB.push(newOrder);
    localStorage.setItem('dmar_orders_db', JSON.stringify(ordersDB));
  };

  const addRoomAppointment = (roomName, date, time) => {
    if (!user) return;
    const aptDB = JSON.parse(localStorage.getItem('dmar_apt_db')) || [];
    const newApt = { 
        id: `APT-${Math.floor(1000 + Math.random() * 9000)}`, 
        room: roomName, 
        date, 
        time, 
        status: 'Pending', 
        userEmail: user.email 
    };
    aptDB.push(newApt);
    localStorage.setItem('dmar_apt_db', JSON.stringify(aptDB));
  };

  const getUserOrders = () => {
    if (!user) return [];
    const ordersDB = JSON.parse(localStorage.getItem('dmar_orders_db')) || [];
    return ordersDB.filter(o => o.userEmail === user.email).reverse();
  };

  const getUserAppointments = () => {
    if (!user) return [];
    const aptDB = JSON.parse(localStorage.getItem('dmar_apt_db')) || [];
    return aptDB.filter(a => a.userEmail === user.email).reverse();
  };

  const getAllOrders = () => {
    return (JSON.parse(localStorage.getItem('dmar_orders_db')) || []).reverse();
  };

  const getAllAppointments = () => {
    return (JSON.parse(localStorage.getItem('dmar_apt_db')) || []).reverse();
  };

  const updateOrderStatus = (orderId, status) => {
    const ordersDB = JSON.parse(localStorage.getItem('dmar_orders_db')) || [];
    const updatedOrders = ordersDB.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem('dmar_orders_db', JSON.stringify(updatedOrders));
  };

  const updateAppointmentStatus = (aptId, status) => {
    const aptDB = JSON.parse(localStorage.getItem('dmar_apt_db')) || [];
    const updatedApt = aptDB.map(a => a.id === aptId ? { ...a, status } : a);
    localStorage.setItem('dmar_apt_db', JSON.stringify(updatedApt));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dmar_user');
  };

  return (
    <AuthContext.Provider value={{ 
        user, login, signup, socialLogin, logout, 
        addFoodOrder, addRoomAppointment, 
        getUserOrders, getUserAppointments,
        getAllOrders, getAllAppointments,
        updateOrderStatus, updateAppointmentStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
