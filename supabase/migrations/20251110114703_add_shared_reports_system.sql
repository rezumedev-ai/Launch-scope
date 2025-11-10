/*
  # Add Shared Reports System

  1. New Tables
    - `shared_reports`
      - `id` (uuid, primary key)
      - `analysis_id` (uuid, foreign key to analysis_history)
      - `user_id` (uuid, foreign key to auth.users)
      - `share_token` (text, unique, URL-safe token for sharing)
      - `view_count` (integer, tracks how many times the report has been viewed)
      - `is_active` (boolean, allows users to revoke/disable share links)
      - `created_at` (timestamptz, when the share link was created)

  2. Security
    - Enable RLS on `shared_reports` table
    - Users can create, read, update, and delete their own shared reports
    - Public (anon) users can read active shared reports by token
    - Index on share_token for fast lookups
    - Unique constraint on share_token to prevent duplicates

  3. Helper Function
    - Function to generate random URL-safe share tokens
*/

-- Function to generate a random URL-safe share token
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  chars text := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..12 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- Create shared_reports table
CREATE TABLE IF NOT EXISTS shared_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES analysis_history(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  share_token text UNIQUE NOT NULL DEFAULT generate_share_token(),
  view_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE shared_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own shared reports
CREATE POLICY "Users can read own shared reports"
  ON shared_reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can create their own shared reports
CREATE POLICY "Users can create shared reports"
  ON shared_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own shared reports
CREATE POLICY "Users can update own shared reports"
  ON shared_reports
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own shared reports
CREATE POLICY "Users can delete own shared reports"
  ON shared_reports
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Anyone (including anonymous) can view active shared reports by token
CREATE POLICY "Anyone can view active shared reports"
  ON shared_reports
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS shared_reports_share_token_idx ON shared_reports(share_token);
CREATE INDEX IF NOT EXISTS shared_reports_analysis_id_idx ON shared_reports(analysis_id);
CREATE INDEX IF NOT EXISTS shared_reports_user_id_idx ON shared_reports(user_id);

-- Allow anonymous users to read analysis_history through shared links
-- We need a special policy for this
CREATE POLICY "Anyone can view shared analysis"
  ON analysis_history
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM shared_reports
      WHERE shared_reports.analysis_id = analysis_history.id
      AND shared_reports.is_active = true
    )
  );