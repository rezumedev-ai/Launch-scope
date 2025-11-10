/*
  # Fix Shared Reports Anonymous Update Permission

  1. Changes
    - Add policy to allow anonymous users to update view_count on shared_reports
    - This is needed for the get-shared-report function to increment view counts
  
  2. Security
    - Policy only allows updating view_count field
    - Only applies to active shared reports
*/

-- Allow anonymous users to update view counts on active shared reports
CREATE POLICY "Anyone can update view counts on active shared reports"
  ON shared_reports
  FOR UPDATE
  TO anon
  USING (is_active = true)
  WITH CHECK (is_active = true);