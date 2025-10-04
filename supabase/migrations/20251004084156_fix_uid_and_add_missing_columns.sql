/*
  # Fix uid() function references and add missing columns

  1. New Columns
    - `parent_analysis_id` (uuid, nullable) - Links refined ideas to their original analysis
    - `refinement_count` (integer, default 0) - Tracks how many times an idea has been refined
  
  2. Changes
    - Drop the incorrect policy that uses uid() instead of auth.uid()
    - Recreate the policy with the correct auth.uid() function reference
  
  3. Security
    - Ensures users can only refine their own analyses
    - All policies use correct auth.uid() function
*/

-- Add parent_analysis_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'analysis_history' AND column_name = 'parent_analysis_id'
  ) THEN
    ALTER TABLE analysis_history 
    ADD COLUMN parent_analysis_id uuid REFERENCES analysis_history(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add refinement_count column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'analysis_history' AND column_name = 'refinement_count'
  ) THEN
    ALTER TABLE analysis_history 
    ADD COLUMN refinement_count integer DEFAULT 0;
  END IF;
END $$;

-- Create index for better performance on parent lookups
CREATE INDEX IF NOT EXISTS analysis_history_parent_analysis_id_idx ON analysis_history(parent_analysis_id);

-- Drop the incorrect policy if it exists
DROP POLICY IF EXISTS "Users can refine own analysis history" ON analysis_history;

-- Create the policy with correct auth.uid() reference
CREATE POLICY "Users can refine own analysis history"
  ON analysis_history
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND 
    (parent_analysis_id IS NULL OR 
     EXISTS (
       SELECT 1 FROM analysis_history parent 
       WHERE parent.id = parent_analysis_id 
       AND parent.user_id = auth.uid()
     ))
  );