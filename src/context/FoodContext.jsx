import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch foods from Supabase on mount
  useEffect(() => {
    fetchFoods();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('foods-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'foods' }, () => {
        fetchFoods();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFoods = async () => {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching foods:', error);
    } else {
      // Map database fields to match the format components expect
      const mappedData = (data || []).map(item => ({
        ...item,
        desc: item.description,
        oldPrice: item.old_price
      }));
      setMenuItems(mappedData);
    }
    setLoading(false);
  };

  const addFood = async (newFood) => {
    // Get current user for owner_id
    const { data: { user } } = await supabase.auth.getUser();

    const foodToAdd = {
      name: newFood.name,
      description: newFood.desc || newFood.description || '',
      price: newFood.price,
      old_price: newFood.oldPrice || newFood.price * 1.2,
      category: newFood.category || '',
      img: newFood.img || '',
      sold: '0',
      tags: ['New', newFood.category].filter(Boolean),
      toppings: newFood.toppings || [],
      fbt: newFood.fbt || [],
      owner_id: user?.id || null
    };

    const { data, error } = await supabase
      .from('foods')
      .insert(foodToAdd)
      .select()
      .single();

    if (error) {
      console.error('Error adding food:', error);
      throw error;
    }

    // Map and update local state immediately
    const mappedItem = {
      ...data,
      desc: data.description,
      oldPrice: data.old_price
    };
    setMenuItems((prevItems) => [mappedItem, ...prevItems]);
    return data;
  };

  const deleteFood = async (id) => {
    const { error } = await supabase
      .from('foods')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting food:', error);
      throw error;
    }

    // Update local state immediately
    setMenuItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <FoodContext.Provider value={{ menuItems, loading, addFood, deleteFood, fetchFoods }}>
      {children}
    </FoodContext.Provider>
  );
};
