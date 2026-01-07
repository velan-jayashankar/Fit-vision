-- Create Users Table
create table users (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text unique not null,
  password text not null, -- Storing hashed password manually for custom auth
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Fitness Profiles Table
create table fitness_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) not null unique,
  age int,
  gender text,
  height numeric,
  weight numeric,
  goal text,
  experience_level text,
  days_per_week int,
  equipment text,
  diet_preference text,
  bmr numeric,
  tdee numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Workouts Table
create table workouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) not null,
  name text,
  exercises jsonb, -- Storing array of exercises as JSON
  duration int,
  calories_burned int,
  status text,
  date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Nutrition Logs Table
create table nutrition_logs (
   id uuid default gen_random_uuid() primary key,
   user_id uuid references users(id) not null,
   meals jsonb, -- Storing array of meal objects
   total_calories int,
   total_protein int,
   total_carbs int,
   total_fat int,
   date date default CURRENT_DATE
);
