-- ============================================
-- DMARS APP - SUPABASE DATABASE SETUP
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'owner')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 2. ROOMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS rooms (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  location TEXT DEFAULT '',
  type TEXT DEFAULT '',
  bedrooms INTEGER DEFAULT 1,
  amenities TEXT[] DEFAULT '{}',
  img TEXT DEFAULT '',
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. FOODS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS foods (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC NOT NULL,
  old_price NUMERIC,
  category TEXT DEFAULT '',
  img TEXT DEFAULT '',
  sold TEXT DEFAULT '0',
  tags TEXT[] DEFAULT '{}',
  toppings JSONB DEFAULT '[]',
  fbt JSONB DEFAULT '[]',
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT DEFAULT '',
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC DEFAULT 0,
  delivery_fee NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Processing',
  delivery_address JSONB DEFAULT '{}',
  payment_method TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. APPOINTMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT DEFAULT '',
  room TEXT DEFAULT '',
  date TEXT DEFAULT '',
  time TEXT DEFAULT '',
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read all profiles, update own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ROOMS: Anyone can read, owners can insert/update/delete their own
CREATE POLICY "Rooms are viewable by everyone" ON rooms
  FOR SELECT USING (true);
CREATE POLICY "Owners can insert rooms" ON rooms
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their rooms" ON rooms
  FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete their rooms" ON rooms
  FOR DELETE USING (auth.uid() = owner_id);

-- FOODS: Anyone can read, owners can insert/update/delete their own
CREATE POLICY "Foods are viewable by everyone" ON foods
  FOR SELECT USING (true);
CREATE POLICY "Owners can insert foods" ON foods
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their foods" ON foods
  FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete their foods" ON foods
  FOR DELETE USING (auth.uid() = owner_id);

-- ORDERS: Users can read/insert their own, owners can read all
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner')
  );
CREATE POLICY "Owners can update order status" ON orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner')
  );

-- APPOINTMENTS: Users can read/insert their own, owners can read/update all
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners can view all appointments" ON appointments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner')
  );
CREATE POLICY "Owners can update appointment status" ON appointments
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner')
  );

-- ============================================
-- 7. SEED DATA - ROOMS
-- ============================================
INSERT INTO rooms (name, price, location, type, bedrooms, amenities, img) VALUES
  ('Bed Space near Al Rigga Metro', 1200, 'Deira', 'Bed Space', 1, ARRAY['WiFi', 'Kitchen', 'Air Conditioning'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuA1rmGG2f77zbbOb6INDXDD1hbBfE-NUDXgh7PCwbEDZXg6sfcwGF2NLI6ngYQGwGCt2lgUG9W4kNW5iY52ebH-meBrNKNwIO8JyuP8mnEt4mtXzbxhTRo3Ch_6dp7OfPYggaiEwdnih6uRF9HtlWYOkJgrE2Kb6uwgcvCPdSOHrfIAx5gE4oLAfl4WKu0JUjShfPsIzKrQgUS89e4dL_81s233x5juvVla6yUe5ggdbNJhnBdFfXY84NBLZkw5mCpF2soCFiirWSk'),
  ('Shared Room near Union Metro', 800, 'Deira', 'Shared Room', 1, ARRAY['WiFi', 'Kitchen'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAZq9Ezzs4e0333w4ZWCZM2PH2VQCmHj6V9PsM3j8pONscYaUMOUPAG_AsN-8RPsalVZJ1OBt72wsJWyLUWzZ-qczf7LgWwyjvbqJcOQ0JuKgaJZH46-_2lnQtq8ZquvJ-xX213va_-Hfaz4pwcPwLHHL_UPzDxFEnid1O5KIamxhLgteziJIz3qpgRDsb1tjgn8domtItLXvDnWEsWR4BnHzd7S0_65uiIVCbT-vcskfVLHugU8HJXHEqXBVcvBxtL5lZIvBWnNkI'),
  ('Private Room with Balcony', 1200, 'Al Nahda', 'Private Room', 1, ARRAY['WiFi', 'Kitchen', 'Air Conditioning', 'Balcony'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAmOrnDVMkqbg20TuBGE5YCEHawr4cZCS-ANMp54Iviyi_RSKTWmSPcFRenottNqQuuGjRRgddDROMQgW0SozWRAo5NiZTgfCDM6Bb9MuB5-h8i2TNfWkeNTFryzSv-89NYiy0fJRoC0n0mGJjOxXFEduHFLqmQAFt-8mONEu8Zx9pGpbCTOUUd1zxQ7AqCUYmdIINyXJ6BIEcT68j9uukGT6xlD876R5yCae_onmV9tUNekE4KKaoZdeJCxdaO2M5tqBcYxWGDbiA'),
  ('Private Room in Karama', 1200, 'Al Karama', 'Private Room', 1, ARRAY['WiFi', 'Kitchen', 'Air Conditioning'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDxLGuzqjickH7YRB1IQp4xPqLELrDO6S-CVMLdi6m5kLzY7QYTK1lPdKcwMdSiQkBHHLeNsKIyNYYwb4iqxi1x7P07VU0ZQRdDwulTlpnUAXYgcY6PpTogJSqQp6FV0qXQdLWt6z-OsUv1uZ4nYG1Rgu4H0oVqvvNmBwXvqGUWybHk85SeWM8TJ7sb4GEjFDFl79A2M_05i-Z9j7IRyRnPvy92_XkeZ4wOn6N-fnfLFjsX9NZkjY8DNTfDRUQSq8MhnOk0Ks47V7k'),
  ('Studio Room near Burj Juman', 2000, 'Bur Dubai', 'Studio', 1, ARRAY['WiFi', 'Kitchen', 'Air Conditioning', 'Furnished', 'Parking'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBLvVTEGl675vy7Uuog5hLe42Fr5joLSvMs8mequ_gloDF14eq3qxktnW8I0_x_zIxItglQhQB4hHq9v5Y3JX3341tVF0egDfztiM9xoN2NHBn9msaCtwgJoM_dzhkHECH8L839_H5mjCwAPSK8_f0Z66_KsKpMSwbHG7zkPHUBhnSZLTiZobN7_hXXR1XpDjVfL9vVgUA5waqHoKQP32BSFHepL9C947bq-uyu6Fpu6yzsHflyMNlMK3U3CyVIOV5sz43oYGqKRRE'),
  ('Bed Space for Male Workers', 450, 'Muhaisnah', 'Bed Space', 1, ARRAY['WiFi', 'Air Conditioning'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDeQmzYylDrWwL8Dqccuwmc3zEsxRKbVgnpKdv2v6OHE-JrSo94ydUJtpnKvjDdRMGDMnxcbZO6Xoyh536Hk5oMXZqySm9bwPAWIf-2tss4jyHEisBzplKFAlvhB9UwzBnwb1Csmj18yAyB4L7wEH8oM4r0waRcbKg0bvOpp_VG56wEo2KpEPoITvKR1eKsQq0BOQ_JJFwxBant1GJWkhB9VWTNcTZu8MIGoXBBHSIgwZjiO3xkBvBfa1Do1foQLnBex1HKbx8cKX0'),
  ('Luxury Studio in Dubai Marina', 3500, 'Dubai Marina', 'Studio', 1, ARRAY['WiFi', 'Kitchen', 'Air Conditioning', 'Gym', 'Parking', 'Furnished', 'Balcony'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuA1rmGG2f77zbbOb6INDXDD1hbBfE-NUDXgh7PCwbEDZXg6sfcwGF2NLI6ngYQGwGCt2lgUG9W4kNW5iY52ebH-meBrNKNwIO8JyuP8mnEt4mtXzbxhTRo3Ch_6dp7OfPYggaiEwdnih6uRF9HtlWYOkJgrE2Kb6uwgcvCPdSOHrfIAx5gE4oLAfl4WKu0JUjShfPsIzKrQgUS89e4dL_81s233x5juvVla6yUe5ggdbNJhnBdFfXY84NBLZkw5mCpF2soCFiirWSk'),
  ('Shared Room in Al Barsha', 900, 'Al Barsha', 'Shared Room', 2, ARRAY['WiFi', 'Laundry', 'Air Conditioning'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAZq9Ezzs4e0333w4ZWCZM2PH2VQCmHj6V9PsM3j8pONscYaUMOUPAG_AsN-8RPsalVZJ1OBt72wsJWyLUWzZ-qczf7LgWwyjvbqJcOQ0JuKgaJZH46-_2lnQtq8ZquvJ-xX213va_-Hfaz4pwcPwLHHL_UPzDxFEnid1O5KIamxhLgteziJIz3qpgRDsb1tjgn8domtItLXvDnWEsWR4BnHzd7S0_65uiIVCbT-vcskfVLHugU8HJXHEqXBVcvBxtL5lZIvBWnNkI'),
  ('2BR Private Apartment Downtown', 4500, 'Downtown Dubai', 'Private Room', 2, ARRAY['WiFi', 'Kitchen', 'Air Conditioning', 'Gym', 'Parking', 'Furnished', 'Balcony', 'Laundry'],
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAmOrnDVMkqbg20TuBGE5YCEHawr4cZCS-ANMp54Iviyi_RSKTWmSPcFRenottNqQuuGjRRgddDROMQgW0SozWRAo5NiZTgfCDM6Bb9MuB5-h8i2TNfWkeNTFryzSv-89NYiy0fJRoC0n0mGJjOxXFEduHFLqmQAFt-8mONEu8Zx9pGpbCTOUUd1zxQ7AqCUYmdIINyXJ6BIEcT68j9uukGT6xlD876R5yCae_onmV9tUNekE4KKaoZdeJCxdaO2M5tqBcYxWGDbiA');

-- ============================================
-- 8. SEED DATA - FOODS
-- ============================================
INSERT INTO foods (name, description, price, old_price, category, img, sold, tags, toppings, fbt) VALUES
  ('Myaungmya Mohinga',
   'Rich fish broth with rice noodles, crispy fritters, cilantro and lime',
   8.50, 10.50, 'Main Menu',
   'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&q=80',
   '1.2k', ARRAY['Main Dish', 'Popular'],
   '[{"id":"t1","name":"Mandalay Fritter","price":5},{"id":"t2","name":"Fish Cake","price":5},{"id":"t3","name":"Crispy Onion","price":5},{"id":"t4","name":"Boiled Egg","price":5}]'::jsonb,
   '[{"id":"fbt1","name":"Sweet Milk Tea","price":5,"img":"https://images.unsplash.com/photo-1558857563-b371033873b8?w=200&q=80"}]'::jsonb),
  ('Kyah Ohh',
   'Your daily bowl of comfort. Freshly made, flavorful, and served hot.',
   8.50, 10.50, 'Main Menu',
   'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80',
   '1.2k', ARRAY['Main Dish', 'Popular'],
   '[{"id":"t5","name":"Pork Meatballs","price":6},{"id":"t6","name":"Quail Eggs","price":4},{"id":"t7","name":"Extra Greens","price":3}]'::jsonb,
   '[{"id":"fbt2","name":"Lemon Iced Tea","price":3,"img":"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80"}]'::jsonb),
  ('SweetMilk Tea',
   'Creamy Myanmar-style milk tea, perfectly sweetened and aromatic.',
   3.50, 5.00, 'Drink',
   'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&q=80',
   '2.5k', ARRAY['Hot', 'Drink'],
   '[{"id":"t8","name":"Extra Pearls","price":2},{"id":"t9","name":"Less Sugar","price":0}]'::jsonb,
   '[]'::jsonb),
  ('Noodle Salad',
   'Fresh rice noodles tossed with crunchy vegetables, lime dressing and herbs.',
   8.50, 10.50, 'Salad',
   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
   '1.2k', ARRAY['Salad'],
   '[{"id":"t10","name":"Chicken Slices","price":7},{"id":"t11","name":"Extra Peanuts","price":3}]'::jsonb,
   '[{"id":"fbt2","name":"Lemon Iced Tea","price":3,"img":"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80"}]'::jsonb),
  ('Shan Noodles',
   'Traditional Shan-style rice noodles with savory tomato-based sauce.',
   9.50, 12.00, 'Main Menu',
   'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80',
   '890', ARRAY['Main Dish'],
   '[{"id":"t12","name":"Extra Chicken","price":6},{"id":"t13","name":"Pickled Mustard","price":2}]'::jsonb,
   '[]'::jsonb),
  ('Lemon Iced Tea',
   'Refreshing cold lemon tea, perfect for a hot day.',
   3.00, 4.50, 'Drink',
   'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
   '3.1k', ARRAY['Cold', 'Drink'],
   '[{"id":"t14","name":"Extra Ice","price":0},{"id":"t15","name":"Extra Lemon","price":1}]'::jsonb,
   '[]'::jsonb);

-- ============================================
-- 9. CREATE STORAGE BUCKET FOR IMAGES
-- ============================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to images
CREATE POLICY "Public read access for images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
