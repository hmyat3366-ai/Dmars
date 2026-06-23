import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from profiles table
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  };

  // Listen for auth state changes
  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const profileData = await fetchProfile(session.user.id);
        if (profileData) {
          setProfile(profileData);
        }
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Small delay to allow the trigger to create the profile
        if (event === 'SIGNED_IN') {
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id);
            if (profileData) {
              setProfile(profileData);
            }
          }, 500);
        } else {
          const profileData = await fetchProfile(session.user.id);
          if (profileData) {
            setProfile(profileData);
          }
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Sign up with email & password
  const signup = async (name, email, password, role) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role }
      }
    });

    if (error) throw error;

    // Update profile with name and role (in case trigger hasn't fired yet)
    if (data.user) {
      await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          name,
          email,
          role
        });
      
      setProfile({ id: data.user.id, name, email, role });
    }

    return data;
  };

  // Log in with email & password
  const login = async (email, password, role) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Verify the user has the correct role
    const profileData = await fetchProfile(data.user.id);
    if (profileData && profileData.role !== role) {
      await supabase.auth.signOut();
      throw new Error(`This account is registered as "${profileData.role}", not "${role}".`);
    }

    setProfile(profileData);
    return data;
  };

  // Social login (Google/Facebook)
  const socialLogin = async (provider, role) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider.toLowerCase(),
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) throw error;
    return data;
  };

  // Add a food order
  const addFoodOrder = async (order) => {
    if (!user) return;
    
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      user_id: user.id,
      user_email: user.email,
      items: order.items || [],
      subtotal: order.subtotal || 0,
      delivery_fee: order.deliveryFee || 0,
      total: order.total || 0,
      status: 'Processing',
      delivery_address: order.deliveryAddress || {},
      payment_method: order.paymentMethod || ''
    };

    const { error } = await supabase.from('orders').insert(newOrder);
    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }
    return newOrder;
  };

  // Add room appointment
  const addRoomAppointment = async (roomName, date, time) => {
    if (!user) return;
    
    const newApt = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      user_id: user.id,
      user_email: user.email,
      room: roomName,
      date,
      time,
      status: 'Pending'
    };

    const { error } = await supabase.from('appointments').insert(newApt);
    if (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
    return newApt;
  };

  // Get user's own orders
  const getUserOrders = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    return data || [];
  };

  // Get user's own appointments
  const getUserAppointments = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
    return data || [];
  };

  // Get ALL orders (for owner dashboard)
  const getAllOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all orders:', error);
      return [];
    }
    return data || [];
  };

  // Get ALL appointments (for owner dashboard)
  const getAllAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all appointments:', error);
      return [];
    }
    return data || [];
  };

  // Update order status (owner)
  const updateOrderStatus = async (orderId, status) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
    
    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  // Update appointment status (owner)
  const updateAppointmentStatus = async (aptId, status) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', aptId);
    
    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  // Create a compatible user object for components that expect { name, email, role }
  const compatibleUser = profile ? {
    name: profile.name,
    email: profile.email,
    role: profile.role,
    id: user?.id
  } : null;

  return (
    <AuthContext.Provider value={{
      user: compatibleUser,
      supabaseUser: user,
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
