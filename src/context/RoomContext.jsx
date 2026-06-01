import { createContext, useState, useContext } from 'react';

const initialRooms = [
  { id: 1, name: 'Bed Space near Al Rigga Metro', price: 1200, location: 'Deira', type: 'Bed Space', bedrooms: 1, amenities: ['WiFi', 'Kitchen', 'Air Conditioning'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1rmGG2f77zbbOb6INDXDD1hbBfE-NUDXgh7PCwbEDZXg6sfcwGF2NLI6ngYQGwGCt2lgUG9W4kNW5iY52ebH-meBrNKNwIO8JyuP8mnEt4mtXzbxhTRo3Ch_6dp7OfPYggaiEwdnih6uRF9HtlWYOkJgrE2Kb6uwgcvCPdSOHrfIAx5gE4oLAfl4WKu0JUjShfPsIzKrQgUS89e4dL_81s233x5juvVla6yUe5ggdbNJhnBdFfXY84NBLZkw5mCpF2soCFiirWSk' },
  { id: 2, name: 'Shared Room near Union Metro', price: 800, location: 'Deira', type: 'Shared Room', bedrooms: 1, amenities: ['WiFi', 'Kitchen'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZq9Ezzs4e0333w4ZWCZM2PH2VQCmHj6V9PsM3j8pONscYaUMOUPAG_AsN-8RPsalVZJ1OBt72wsJWyLUWzZ-qczf7LgWwyjvbqJcOQ0JuKgaJZH46-_2lnQtq8ZquvJ-xX213va_-Hfaz4pwcPwLHHL_UPzDxFEnid1O5KIamxhLgteziJIz3qpgRDsb1tjgn8domtItLXvDnWEsWR4BnHzd7S0_65uiIVCbT-vcskfVLHugU8HJXHEqXBVcvBxtL5lZIvBWnNkI' },
  { id: 3, name: 'Private Room with Balcony', price: 1200, location: 'Al Nahda', type: 'Private Room', bedrooms: 1, amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Balcony'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmOrnDVMkqbg20TuBGE5YCEHawr4cZCS-ANMp54Iviyi_RSKTWmSPcFRenottNqQuuGjRRgddDROMQgW0SozWRAo5NiZTgfCDM6Bb9MuB5-h8i2TNfWkeNTFryzSv-89NYiy0fJRoC0n0mGJjOxXFEduHFLqmQAFt-8mONEu8Zx9pGpbCTOUUd1zxQ7AqCUYmdIINyXJ6BIEcT68j9uukGT6xlD876R5yCae_onmV9tUNekE4KKaoZdeJCxdaO2M5tqBcYxWGDbiA' },
  { id: 4, name: 'Private Room in Karama', price: 1200, location: 'Al Karama', type: 'Private Room', bedrooms: 1, amenities: ['WiFi', 'Kitchen', 'Air Conditioning'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxLGuzqjickH7YRB1IQp4xPqLELrDO6S-CVMLdi6m5kLzY7QYTK1lPdKcwMdSiQkBHHLeNsKIyNYYwb4iqxi1x7P07VU0ZQRdDwulTlpnUAXYgcY6PpTogJSqQp6FV0qXQdLWt6z-OsUv1uZ4nYG1Rgu4H0oVqvvNmBwXvqGUWybHk85SeWM8TJ7sb4GEjFDFl79A2M_05i-Z9j7IRyRnPvy92_XkeZ4wOn6N-fnfLFjsX9NZkjY8DNTfDRUQSq8MhnOk0Ks47V7k' },
  { id: 5, name: 'Studio Room near Burj Juman', price: 2000, location: 'Bur Dubai', type: 'Studio', bedrooms: 1, amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Furnished', 'Parking'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLvVTEGl675vy7Uuog5hLe42Fr5joLSvMs8mequ_gloDF14eq3qxktnW8I0_x_zIxItglQhQB4hHq9v5Y3JX3341tVF0egDfztiM9xoN2NHBn9msaCtwgJoM_dzhkHECH8L839_H5mjCwAPSK8_f0Z66_KsKpMSwbHG7zkPHUBhnSZLTiZobN7_hXXR1XpDjVfL9vVgUA5waqHoKQP32BSFHepL9C947bq-uyu6Fpu6yzsHflyMNlMK3U3CyVIOV5sz43oYGqKRRE' },
  { id: 6, name: 'Bed Space for Male Workers', price: 450, location: 'Muhaisnah', type: 'Bed Space', bedrooms: 1, amenities: ['WiFi', 'Air Conditioning'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeQmzYylDrWwL8Dqccuwmc3zEsxRKbVgnpKdv2v6OHE-JrSo94ydUJtpnKvjDdRMGDMnxcbZO6Xoyh536Hk5oMXZqySm9bwPAWIf-2tss4jyHEisBzplKFAlvhB9UwzBnwb1Csmj18yAyB4L7wEH8oM4r0waRcbKg0bvOpp_VG56wEo2KpEPoITvKR1eKsQq0BOQ_JJFwxBant1GJWkhB9VWTNcTZu8MIGoXBBHSIgwZjiO3xkBvBfa1Do1foQLnBex1HKbx8cKX0' },
  { id: 7, name: 'Luxury Studio in Dubai Marina', price: 3500, location: 'Dubai Marina', type: 'Studio', bedrooms: 1, amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Gym', 'Parking', 'Furnished', 'Balcony'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1rmGG2f77zbbOb6INDXDD1hbBfE-NUDXgh7PCwbEDZXg6sfcwGF2NLI6ngYQGwGCt2lgUG9W4kNW5iY52ebH-meBrNKNwIO8JyuP8mnEt4mtXzbxhTRo3Ch_6dp7OfPYggaiEwdnih6uRF9HtlWYOkJgrE2Kb6uwgcvCPdSOHrfIAx5gE4oLAfl4WKu0JUjShfPsIzKrQgUS89e4dL_81s233x5juvVla6yUe5ggdbNJhnBdFfXY84NBLZkw5mCpF2soCFiirWSk' },
  { id: 8, name: 'Shared Room in Al Barsha', price: 900, location: 'Al Barsha', type: 'Shared Room', bedrooms: 2, amenities: ['WiFi', 'Laundry', 'Air Conditioning'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZq9Ezzs4e0333w4ZWCZM2PH2VQCmHj6V9PsM3j8pONscYaUMOUPAG_AsN-8RPsalVZJ1OBt72wsJWyLUWzZ-qczf7LgWwyjvbqJcOQ0JuKgaJZH46-_2lnQtq8ZquvJ-xX213va_-Hfaz4pwcPwLHHL_UPzDxFEnid1O5KIamxhLgteziJIz3qpgRDsb1tjgn8domtItLXvDnWEsWR4BnHzd7S0_65uiIVCbT-vcskfVLHugU8HJXHEqXBVcvBxtL5lZIvBWnNkI' },
  { id: 9, name: '2BR Private Apartment Downtown', price: 4500, location: 'Downtown Dubai', type: 'Private Room', bedrooms: 2, amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Gym', 'Parking', 'Furnished', 'Balcony', 'Laundry'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmOrnDVMkqbg20TuBGE5YCEHawr4cZCS-ANMp54Iviyi_RSKTWmSPcFRenottNqQuuGjRRgddDROMQgW0SozWRAo5NiZTgfCDM6Bb9MuB5-h8i2TNfWkeNTFryzSv-89NYiy0fJRoC0n0mGJjOxXFEduHFLqmQAFt-8mONEu8Zx9pGpbCTOUUd1zxQ7AqCUYmdIINyXJ6BIEcT68j9uukGT6xlD876R5yCae_onmV9tUNekE4KKaoZdeJCxdaO2M5tqBcYxWGDbiA' },
];

const RoomContext = createContext();

export const useRoom = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(initialRooms);

  const addRoom = (newRoom) => {
    const maxId = rooms.length > 0 ? Math.max(...rooms.map(item => item.id)) : 0;
    const roomToAdd = {
      ...newRoom,
      id: maxId + 1,
    };
    
    setRooms((prevRooms) => [roomToAdd, ...prevRooms]);
  };

  const deleteRoom = (id) => {
    setRooms((prevRooms) => prevRooms.filter(item => item.id !== id));
  };

  return (
    <RoomContext.Provider value={{ rooms, addRoom, deleteRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
