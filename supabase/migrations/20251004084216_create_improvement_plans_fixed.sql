/*
  # Create improvement_plans table

  1. New Tables
    - `improvement_plans`
      - `id` (uuid, primary key)
      - `analysis_id` (uuid, foreign key to analysis_history, unique)
      - `user_id` (uuid, foreign key to auth.users)
      - `plan_data` (jsonb, stores the improvement plan JSON)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `improvement_plans` table
    - Add policy for users to view their own improvement plans
    - Add policy for users to insert their own improvement plans
    - Add policy for users to update their own improvement plans

  3. Indexes
    - Index on user_id for efficient queries
    - Index on analysis_id for lookups
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS improvement_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid UNIQUE NOT NULL REFERENCES analysis_history(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS improvement_plans_user_id_idx ON improvement_plans(user_id);
CREATE INDEX IF NOT EXISTS improvement_plans_analysis_id_idx ON improvement_plans(analysis_id);
CREATE INDEX IF NOT EXISTS improvement_plans_created_at_idx ON improvement_plans(created_at DESC);

-- Enable Row Level Security
ALTER TABLE improvement_plans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own improvement plans"
  ON improvement_plans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own improvement plans"
  ON improvement_plans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own improvement plans"
  ON improvement_plans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);