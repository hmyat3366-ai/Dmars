import { createContext, useState, useContext } from 'react';
import { allMenuItems as initialMenuItems } from '../data/foodData';

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const addFood = (newFood) => {
    // Generate a simple numeric ID based on the max existing ID to avoid conflicts
    const maxId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) : 0;
    const foodToAdd = {
      ...newFood,
      id: maxId + 1,
      oldPrice: newFood.price * 1.2, // Mock an old price just for UI consistency
      sold: 0,
      tags: ['New', newFood.category],
    };
    
    setMenuItems((prevItems) => [foodToAdd, ...prevItems]);
  };

  const deleteFood = (id) => {
    setMenuItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <FoodContext.Provider value={{ menuItems, addFood, deleteFood }}>
      {children}
    </FoodContext.Provider>
  );
};
