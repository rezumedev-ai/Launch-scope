/*
  # Add Project Status History Tracking and Update Validation Integration

  ## Overview
  This migration adds comprehensive project lifecycle tracking and ensures validation
  status is properly synchronized with project_status.

  ## 1. New Tables

  ### `project_status_history`
  Tracks all status changes for ideas throughout their lifecycle
  - `id` (uuid, primary key)
  - `analysis_id` (uuid, references analysis_history)
  - `old_status` (text) - Previous status value
  - `new_status` (text) - New status value
  - `changed_by` (uuid, references auth.users)
  - `change_notes` (text) - Optional notes about the status change
  - `created_at` (timestamptz) - When the change occurred

  ## 2. Functions

  ### `record_status_change()`
  Trigger function to automatically record status changes in history table

  ### `get_time_in_status(analysis_id, status)`
  Calculate total time spent in a specific status

  ### `sync_validation_to_project_status()`
  Trigger to keep is_validated in sync with project_status

  ## 3. Indexes
  - Fast lookups by analysis_id for history
  - Index on created_at for chronological queries
  - Composite index for analysis_id and status

  ## 4. Security (RLS)
  - Users can only view status history for their own ideas
  - Status history records are automatically created (no direct INSERT allowed)
  - Read-only access for users to their own history

  ## 5. Data Backfill
  - Update existing validated ideas to have project_status='validated'
  - Create initial status history records for existing data
*/

-- =====================================================
-- 1. CREATE PROJECT STATUS HISTORY TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS project_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES analysis_history(id) ON DELETE CASCADE NOT NULL,
  old_status text,
  new_status text NOT NULL,
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  change_notes text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- =====================================================
-- 2. CREATE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS project_status_history_analysis_id_idx ON project_status_history(analysis_id);
CREATE INDEX IF NOT EXISTS project_status_history_created_at_idx ON project_status_history(created_at DESC);
CREATE INDEX IF NOT EXISTS project_status_history_analysis_status_idx ON project_status_history(analysis_id, new_status);
CREATE INDEX IF NOT EXISTS project_status_history_changed_by_idx ON project_status_history(changed_by);

-- =====================================================
-- 3. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE project_status_history ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. CREATE RLS POLICIES
-- =====================================================

CREATE POLICY "Users can view status history for own ideas"
  ON project_status_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analysis_history
      WHERE analysis_history.id = project_status_history.analysis_id
      AND analysis_history.user_id = auth.uid()
    )
  );

-- =====================================================
-- 5. CREATE TRIGGER FUNCTION TO RECORD STATUS CHANGES
-- =====================================================

CREATE OR REPLACE FUNCTION record_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.project_status IS DISTINCT FROM NEW.project_status) THEN
    INSERT INTO project_status_history (
      analysis_id,
      old_status,
      new_status,
      changed_by,
      created_at
    ) VALUES (
      NEW.id,
      OLD.project_status,
      NEW.project_status,
      NEW.user_id,
      now()
    );
    
    NEW.status_updated_at := now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- =====================================================
-- 6. CREATE TRIGGER ON ANALYSIS_HISTORY
-- =====================================================

DROP TRIGGER IF EXISTS trigger_record_status_change ON analysis_history;

CREATE TRIGGER trigger_record_status_change
  BEFORE UPDATE ON analysis_history
  FOR EACH ROW
  EXECUTE FUNCTION record_status_change();

-- =====================================================
-- 7. CREATE FUNCTION TO SYNC VALIDATION WITH PROJECT STATUS
-- =====================================================

CREATE OR REPLACE FUNCTION sync_validation_to_project_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.is_validated IS DISTINCT FROM NEW.is_validated) THEN
    IF NEW.is_validated = true THEN
      IF NEW.project_status = 'exploring' OR NEW.project_status IS NULL THEN
        NEW.project_status := 'validated';
      END IF;
    ELSIF NEW.is_validated = false THEN
      IF NEW.project_status = 'validated' THEN
        NEW.project_status := 'exploring';
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- =====================================================
-- 8. CREATE TRIGGER TO SYNC VALIDATION
-- =====================================================

DROP TRIGGER IF EXISTS trigger_sync_validation_to_status ON analysis_history;

CREATE TRIGGER trigger_sync_validation_to_status
  BEFORE UPDATE ON analysis_history
  FOR EACH ROW
  EXECUTE FUNCTION sync_validation_to_project_status();

-- =====================================================
-- 9. CREATE HELPER FUNCTION TO CALCULATE TIME IN STATUS
-- =====================================================

CREATE OR REPLACE FUNCTION get_time_in_status(p_analysis_id uuid, p_status text)
RETURNS interval
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  total_time interval := '0 seconds'::interval;
  status_record record;
  next_change_time timestamptz;
  entry_time timestamptz;
BEGIN
  FOR status_record IN 
    SELECT created_at, new_status
    FROM project_status_history
    WHERE analysis_id = p_analysis_id
    ORDER BY created_at ASC
  LOOP
    IF status_record.new_status = p_status THEN
      entry_time := status_record.created_at;
      
      SELECT created_at INTO next_change_time
      FROM project_status_history
      WHERE analysis_id = p_analysis_id
        AND created_at > entry_time
      ORDER BY created_at ASC
      LIMIT 1;
      
      IF next_change_time IS NULL THEN
        SELECT status_updated_at INTO next_change_time
        FROM analysis_history
        WHERE id = p_analysis_id;
        
        IF next_change_time IS NULL THEN
          next_change_time := now();
        END IF;
      END IF;
      
      total_time := total_time + (next_change_time - entry_time);
    END IF;
  END LOOP;
  
  RETURN total_time;
END;
$$;

-- =====================================================
-- 10. BACKFILL EXISTING VALIDATED IDEAS
-- =====================================================

UPDATE analysis_history
SET project_status = 'validated',
    status_updated_at = validated_at
WHERE is_validated = true
  AND (project_status IS NULL OR project_status = 'exploring');

-- Create initial status history records for existing validated ideas
INSERT INTO project_status_history (analysis_id, old_status, new_status, changed_by, created_at)
SELECT 
  id,
  'exploring',
  'validated',
  user_id,
  COALESCE(validated_at, created_at)
FROM analysis_history
WHERE is_validated = true
  AND project_status = 'validated'
  AND NOT EXISTS (
    SELECT 1 FROM project_status_history
    WHERE project_status_history.analysis_id = analysis_history.id
  );

-- =====================================================
-- 11. ADD CONSTRAINT FOR VALID STATUS VALUES
-- =====================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'analysis_history_project_status_check'
  ) THEN
    ALTER TABLE analysis_history
    ADD CONSTRAINT analysis_history_project_status_check
    CHECK (project_status IN ('exploring', 'validated', 'planning', 'building', 'testing', 'launched', 'paused', 'abandoned'));
  END IF;
END $$;