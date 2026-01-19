-- Supabase Database Setup for Project Pets
-- Run this SQL in your Supabase SQL Editor

-- Table: pets (shared gallery)
CREATE TABLE IF NOT EXISTS pets (
  id TEXT PRIMARY KEY,
  appearance JSONB NOT NULL,
  personality JSONB NOT NULL,
  stats JSONB NOT NULL,
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  image_data TEXT NOT NULL,
  token_address TEXT,
  created_at BIGINT NOT NULL,
  last_interaction BIGINT NOT NULL
);

-- Table: chats (personal chats per user)
CREATE TABLE IF NOT EXISTS chats (
  pet_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (pet_id, user_id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pets_created_at ON pets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
CREATE INDEX IF NOT EXISTS idx_chats_pet_id ON chats(pet_id);

-- Enable Row Level Security (RLS) - optional, but recommended
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read pets (shared gallery)
CREATE POLICY "Anyone can read pets" ON pets
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert pets (shared gallery)
CREATE POLICY "Anyone can insert pets" ON pets
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can only read their own chats
CREATE POLICY "Users can read own chats" ON chats
  FOR SELECT
  USING (auth.uid()::text = user_id OR user_id LIKE 'user_%');

-- Policy: Users can insert their own chats
CREATE POLICY "Users can insert own chats" ON chats
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR user_id LIKE 'user_%');

-- Policy: Users can update their own chats
CREATE POLICY "Users can update own chats" ON chats
  FOR UPDATE
  USING (auth.uid()::text = user_id OR user_id LIKE 'user_%');

-- Note: Since we're using simple localStorage-based user IDs (user_xxx),
-- the RLS policies check for user_id LIKE 'user_%' pattern.
-- For production with real auth, you'd use auth.uid()::text = user_id

