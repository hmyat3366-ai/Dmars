import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const RoomContext = createContext();

export const useRoom = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch rooms from Supabase on mount
  useEffect(() => {
    fetchRooms();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('rooms-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, () => {
        fetchRooms();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching rooms:', error);
    } else {
      setRooms(data || []);
    }
    setLoading(false);
  };

  const addRoom = async (newRoom) => {
    // Get current user for owner_id
    const { data: { user } } = await supabase.auth.getUser();
    
    const roomToAdd = {
      name: newRoom.name,
      price: newRoom.price,
      location: newRoom.location || '',
      type: newRoom.type || '',
      bedrooms: newRoom.bedrooms || 1,
      amenities: newRoom.amenities || [],
      img: newRoom.img || '',
      owner_id: user?.id || null
    };

    const { data, error } = await supabase
      .from('rooms')
      .insert(roomToAdd)
      .select()
      .single();

    if (error) {
      console.error('Error adding room:', error);
      throw error;
    }

    // Update local state immediately
    setRooms((prevRooms) => [data, ...prevRooms]);
    return data;
  };

  const deleteRoom = async (id) => {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting room:', error);
      throw error;
    }

    // Update local state immediately
    setRooms((prevRooms) => prevRooms.filter(item => item.id !== id));
  };

  return (
    <RoomContext.Provider value={{ rooms, loading, addRoom, deleteRoom, fetchRooms }}>
      {children}
    </RoomContext.Provider>
  );
};
