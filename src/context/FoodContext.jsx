import { createContext, useState, useContext, useEffect } from 'react';
import { fetchApi } from '../lib/api';

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const data = await fetchApi('/foods');
      const mappedData = (data || []).map(item => ({
        ...item,
        desc: item.description,
        oldPrice: item.old_price,
        id: item._id
      }));
      setMenuItems(mappedData);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (newFood) => {
    try {
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
        fbt: newFood.fbt || []
      };

      const data = await fetchApi('/foods', {
        method: 'POST',
        body: JSON.stringify(foodToAdd)
      });
      
      const mappedItem = {
        ...data,
        desc: data.description,
        oldPrice: data.old_price,
        id: data._id
      };
      setMenuItems((prevItems) => [mappedItem, ...prevItems]);
      return mappedItem;
    } catch (error) {
      console.error('Error adding food:', error);
      throw error;
    }
  };

  const deleteFood = async (id) => {
    try {
      await fetchApi(`/foods/${id}`, { method: 'DELETE' });
      setMenuItems((prevItems) => prevItems.filter(item => item.id !== id && item._id !== id));
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  };

  return (
    <FoodContext.Provider value={{ menuItems, loading, addFood, deleteFood, fetchFoods }}>
      {children}
    </FoodContext.Provider>
  );
};
