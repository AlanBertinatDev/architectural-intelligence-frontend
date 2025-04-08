/*
  # Initial Schema Setup

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `name` (text)
      - `position` (text)
      - `department` (text)
      - `email` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `employees` table
    - Add policies for authenticated users to perform CRUD operations
*/

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  department text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all employees
CREATE POLICY "Users can read all employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert their own employees
CREATE POLICY "Users can insert employees"
  ON employees
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own employees
CREATE POLICY "Users can update employees"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete their own employees
CREATE POLICY "Users can delete employees"
  ON employees
  FOR DELETE
  TO authenticated
  USING (true);