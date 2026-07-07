import { createContext, useState, useContext, useEffect } from 'react';
import { fetchApi } from '../lib/api';

const RoomContext = createContext();

export const useRoom = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await fetchApi('/rooms');
      const mappedRooms = (data || []).map(r => ({
        ...r,
        desc: r.description,
        id: r._id
      }));
      setRooms(mappedRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRoom = async (newRoom) => {
    try {
      const roomToAdd = {
        name: newRoom.name,
        price: newRoom.price,
        location: newRoom.location || '',
        type: newRoom.type || '',
        bedrooms: newRoom.bedrooms || 1,
        amenities: newRoom.amenities || [],
        img: newRoom.img || '',
        description: newRoom.desc || newRoom.description || '',
      };

      const data = await fetchApi('/rooms', {
        method: 'POST',
        body: JSON.stringify(roomToAdd)
      });
      
      const mappedData = { ...data, desc: data.description, id: data._id };
      setRooms((prevRooms) => [mappedData, ...prevRooms]);
      return mappedData;
    } catch (error) {
      console.error('Error adding room:', error);
      throw error;
    }
  };

  const deleteRoom = async (id) => {
    try {
      await fetchApi(`/rooms/${id}`, { method: 'DELETE' });
      setRooms((prevRooms) => prevRooms.filter(item => item.id !== id && item._id !== id));
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  };

  return (
    <RoomContext.Provider value={{ rooms, loading, addRoom, deleteRoom, fetchRooms }}>
      {children}
    </RoomContext.Provider>
  );
};
