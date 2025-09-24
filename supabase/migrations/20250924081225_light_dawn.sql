/*
  # Add parent analysis tracking for idea refinements

  1. New Columns
    - `parent_analysis_id` (uuid, nullable) - Links refined ideas to their original analysis
    - `refinement_count` (integer, default 0) - Tracks how many times an idea has been refined
  
  2. Security
    - Update RLS policies to handle parent-child relationships
    - Ensure users can only refine their own analyses
*/

-- Add parent_analysis_id column to track refinement relationships
ALTER TABLE analysis_history 
ADD COLUMN parent_analysis_id uuid REFERENCES analysis_history(id) ON DELETE SET NULL,
ADD COLUMN refinement_count integer DEFAULT 0;

-- Create index for better performance on parent lookups
CREATE INDEX analysis_history_parent_analysis_id_idx ON analysis_history(parent_analysis_id);

-- Update RLS policies to handle refinements
CREATE POLICY "Users can refine own analysis history"
  ON analysis_history
  FOR INSERT
  TO authenticated
  WITH CHECK (
    uid() = user_id AND 
    (parent_analysis_id IS NULL OR 
     EXISTS (
       SELECT 1 FROM analysis_history parent 
       WHERE parent.id = parent_analysis_id 
       AND parent.user_id = uid()
     ))
  );