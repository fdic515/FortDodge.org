-- Create Admin table for storing admin credentials
-- This table stores the admin email (hardcoded) and password (plain text)

CREATE TABLE IF NOT EXISTS admin (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_email ON admin(email);

-- Insert initial admin record with default password
-- The email is hardcoded and cannot be changed
-- The password can be updated through the admin panel
INSERT INTO admin (email, password)
VALUES ('Fdic515@gmail.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

-- Add comment to table
COMMENT ON TABLE admin IS 'Stores admin credentials. Email is hardcoded and cannot be changed. Password is stored in plain text and can be updated.';

