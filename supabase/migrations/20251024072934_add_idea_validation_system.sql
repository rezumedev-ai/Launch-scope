/*
  # Add Idea Validation System

  1. Schema Changes
    - Add `is_validated` (boolean) column to track if an idea is validated
    - Add `validated_at` (timestamp) to record when validation occurred
    - Add `validation_notes` (text) for user comments on why they validated
    - Add `recommendation_score` (numeric) for AI-calculated recommendation priority
    
  2. Indexes
    - Create index on `is_validated` for fast filtering
    - Create index on `validated_at` for sorting validated ideas
    - Create composite index on `user_id` and `is_validated` for dashboard queries
    
  3. Security
    - Update RLS policies to allow users to update validation status of their own ideas
*/

-- Add validation columns to analysis_history table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'is_validated'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN is_validated boolean DEFAULT false NOT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'validated_at'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN validated_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'validation_notes'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN validation_notes text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'recommendation_score'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN recommendation_score numeric(4,2);
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS analysis_history_is_validated_idx ON analysis_history(is_validated);
CREATE INDEX IF NOT EXISTS analysis_history_validated_at_idx ON analysis_history(validated_at DESC);
CREATE INDEX IF NOT EXISTS analysis_history_user_validated_idx ON analysis_history(user_id, is_validated);
CREATE INDEX IF NOT EXISTS analysis_history_recommendation_score_idx ON analysis_history(recommendation_score DESC NULLS LAST);

-- RLS policies are already in place for UPDATE, so users can update their own validation status