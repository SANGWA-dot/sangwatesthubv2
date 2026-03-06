-- Create registered_users table
CREATE TABLE IF NOT EXISTS public.registered_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_requests table
CREATE TABLE IF NOT EXISTS public.payment_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) DEFAULT 2000,
  status VARCHAR(50) DEFAULT 'pending',
  user_name VARCHAR(255),
  user_location VARCHAR(255),
  user_id_number VARCHAR(100),
  mtn_reference_id VARCHAR(255),
  mtn_status VARCHAR(50),
  financial_transaction_id VARCHAR(255),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  confirmed_by VARCHAR(255),
  rejected_at TIMESTAMP WITH TIME ZONE,
  rejected_by VARCHAR(255),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create premium_users table
CREATE TABLE IF NOT EXISTS public.premium_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_premium BOOLEAN DEFAULT TRUE,
  subscription_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_end TIMESTAMP WITH TIME ZONE,
  payment_amount DECIMAL(10, 2),
  confirmed_by VARCHAR(255),
  mtn_reference_id VARCHAR(255),
  financial_transaction_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: Sangwa@123)
-- In production, use bcrypt hash. For demo, using a placeholder that we'll handle in code.
INSERT INTO public.admins (phone_number, full_name, password_hash)
VALUES ('0794290803', 'Sangwa Bruce', 'Sangwa@123')
ON CONFLICT (phone_number) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.registered_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policies for public read/write access (for this app's specific use case)
-- registered_users policies
CREATE POLICY "Allow public insert on registered_users" ON public.registered_users
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on registered_users" ON public.registered_users
  FOR SELECT USING (true);
CREATE POLICY "Allow public update on registered_users" ON public.registered_users
  FOR UPDATE USING (true);

-- payment_requests policies
CREATE POLICY "Allow public insert on payment_requests" ON public.payment_requests
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on payment_requests" ON public.payment_requests
  FOR SELECT USING (true);
CREATE POLICY "Allow public update on payment_requests" ON public.payment_requests
  FOR UPDATE USING (true);

-- premium_users policies
CREATE POLICY "Allow public insert on premium_users" ON public.premium_users
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on premium_users" ON public.premium_users
  FOR SELECT USING (true);
CREATE POLICY "Allow public update on premium_users" ON public.premium_users
  FOR UPDATE USING (true);

-- admins policies (read only for verification)
CREATE POLICY "Allow public select on admins" ON public.admins
  FOR SELECT USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_registered_users_phone ON public.registered_users(phone_number);
CREATE INDEX IF NOT EXISTS idx_payment_requests_phone ON public.payment_requests(phone_number);
CREATE INDEX IF NOT EXISTS idx_payment_requests_status ON public.payment_requests(status);
CREATE INDEX IF NOT EXISTS idx_premium_users_phone ON public.premium_users(phone_number);
CREATE INDEX IF NOT EXISTS idx_admins_phone ON public.admins(phone_number);
