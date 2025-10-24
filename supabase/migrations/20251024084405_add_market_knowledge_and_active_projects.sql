/*
  # Add Market Knowledge System and Active Projects Tracking

  ## Overview
  This migration transforms the "Opportunities" feature into a comprehensive 
  Market Knowledge Score system and adds Active Projects lifecycle tracking.

  ## 1. New Tables
    
  ### `user_market_knowledge`
  Tracks overall market expertise score and level for each user
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `total_score` (integer) - Aggregate expertise score (0-10000, displayed as 0-100)
  - `current_level` (integer) - User's expertise level (1-10)
  - `domains_explored` (jsonb) - Track which domains user has analyzed
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `user_domain_expertise`
  Tracks user expertise in specific business domains/industries
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `domain` (text) - e.g., 'saas', 'ecommerce', 'marketplace', 'ai_ml', 'fintech'
  - `score` (integer) - Domain-specific expertise score
  - `idea_count` (integer) - Number of ideas analyzed in this domain
  - `avg_viability` (numeric) - Average viability score in this domain
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `user_achievements`
  Tracks earned achievements/badges for gamification
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `achievement_key` (text) - Unique identifier for achievement type
  - `achievement_data` (jsonb) - Additional data about the achievement
  - `earned_at` (timestamptz)

  ## 2. Schema Updates to Existing Tables

  ### `analysis_history` additions
  - `project_status` (text) - Lifecycle stage: 'exploring', 'validated', 'building', 'launched', 'paused', 'abandoned'
  - `status_updated_at` (timestamptz) - When status last changed
  - `business_domain` (text) - Categorization: 'saas', 'ecommerce', etc.
  - `opportunity_quality_score` (numeric) - Quality rating of opportunities found (0-100)
  - `launch_date` (date) - When idea was launched (if applicable)
  - `launch_metrics` (jsonb) - Optional launch metrics (users, revenue, etc.)

  ## 3. Indexes
  - Fast lookups by user_id for all new tables
  - Composite indexes for common query patterns
  - Indexes on status and domain for filtering

  ## 4. Security (RLS)
  - Users can only read/write their own market knowledge data
  - Users can only read/write their own domain expertise
  - Users can only read/write their own achievements
  - Users can update project_status on their own analyses

  ## 5. Functions
  - Function to calculate market knowledge score based on user activity
  - Function to determine appropriate level from score
  - Function to check and award achievements
*/

-- =====================================================
-- 1. CREATE NEW TABLES
-- =====================================================

-- User Market Knowledge Table
CREATE TABLE IF NOT EXISTS user_market_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_score integer DEFAULT 0 NOT NULL,
  current_level integer DEFAULT 1 NOT NULL,
  domains_explored jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- User Domain Expertise Table
CREATE TABLE IF NOT EXISTS user_domain_expertise (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  domain text NOT NULL,
  score integer DEFAULT 0 NOT NULL,
  idea_count integer DEFAULT 0 NOT NULL,
  avg_viability numeric(4,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, domain)
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_key text NOT NULL,
  achievement_data jsonb DEFAULT '{}'::jsonb,
  earned_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, achievement_key)
);

-- =====================================================
-- 2. ADD COLUMNS TO EXISTING TABLES
-- =====================================================

-- Add Active Projects tracking columns to analysis_history
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'project_status'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN project_status text DEFAULT 'exploring';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'status_updated_at'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN status_updated_at timestamptz DEFAULT now();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'business_domain'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN business_domain text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'opportunity_quality_score'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN opportunity_quality_score numeric(5,2);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'launch_date'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN launch_date date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'analysis_history' AND column_name = 'launch_metrics'
  ) THEN
    ALTER TABLE analysis_history ADD COLUMN launch_metrics jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- =====================================================
-- 3. CREATE INDEXES
-- =====================================================

-- Indexes for user_market_knowledge
CREATE INDEX IF NOT EXISTS user_market_knowledge_user_id_idx ON user_market_knowledge(user_id);
CREATE INDEX IF NOT EXISTS user_market_knowledge_score_idx ON user_market_knowledge(total_score DESC);
CREATE INDEX IF NOT EXISTS user_market_knowledge_level_idx ON user_market_knowledge(current_level DESC);

-- Indexes for user_domain_expertise
CREATE INDEX IF NOT EXISTS user_domain_expertise_user_id_idx ON user_domain_expertise(user_id);
CREATE INDEX IF NOT EXISTS user_domain_expertise_domain_idx ON user_domain_expertise(domain);
CREATE INDEX IF NOT EXISTS user_domain_expertise_user_domain_idx ON user_domain_expertise(user_id, domain);
CREATE INDEX IF NOT EXISTS user_domain_expertise_score_idx ON user_domain_expertise(score DESC);

-- Indexes for user_achievements
CREATE INDEX IF NOT EXISTS user_achievements_user_id_idx ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS user_achievements_key_idx ON user_achievements(achievement_key);
CREATE INDEX IF NOT EXISTS user_achievements_earned_idx ON user_achievements(earned_at DESC);

-- Indexes for new analysis_history columns
CREATE INDEX IF NOT EXISTS analysis_history_project_status_idx ON analysis_history(project_status);
CREATE INDEX IF NOT EXISTS analysis_history_business_domain_idx ON analysis_history(business_domain);
CREATE INDEX IF NOT EXISTS analysis_history_user_status_idx ON analysis_history(user_id, project_status);
CREATE INDEX IF NOT EXISTS analysis_history_opportunity_score_idx ON analysis_history(opportunity_quality_score DESC NULLS LAST);

-- =====================================================
-- 4. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE user_market_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_domain_expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. CREATE RLS POLICIES
-- =====================================================

-- Policies for user_market_knowledge
CREATE POLICY "Users can view own market knowledge"
  ON user_market_knowledge FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own market knowledge"
  ON user_market_knowledge FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own market knowledge"
  ON user_market_knowledge FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_domain_expertise
CREATE POLICY "Users can view own domain expertise"
  ON user_domain_expertise FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own domain expertise"
  ON user_domain_expertise FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own domain expertise"
  ON user_domain_expertise FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 6. HELPER FUNCTIONS
-- =====================================================

-- Function to calculate user's current level based on score
CREATE OR REPLACE FUNCTION calculate_user_level(score integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Level progression: 0-99=1, 100-299=2, 300-599=3, 600-999=4, 1000-1499=5
  -- 1500-2099=6, 2100-2799=7, 2800-3599=8, 3600-4499=9, 4500+=10
  RETURN CASE
    WHEN score < 100 THEN 1
    WHEN score < 300 THEN 2
    WHEN score < 600 THEN 3
    WHEN score < 1000 THEN 4
    WHEN score < 1500 THEN 5
    WHEN score < 2100 THEN 6
    WHEN score < 2800 THEN 7
    WHEN score < 3600 THEN 8
    WHEN score < 4500 THEN 9
    ELSE 10
  END;
END;
$$;

-- Function to initialize or update user market knowledge
CREATE OR REPLACE FUNCTION update_user_market_knowledge(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_analyses integer;
  v_validated_count integer;
  v_avg_viability numeric;
  v_improvement_plans integer;
  v_new_score integer;
  v_new_level integer;
BEGIN
  -- Calculate metrics
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE is_validated = true),
    COALESCE(AVG(viability_score), 0),
    COUNT(*) FILTER (WHERE id IN (SELECT DISTINCT analysis_id FROM improvement_plans))
  INTO v_total_analyses, v_validated_count, v_avg_viability, v_improvement_plans
  FROM analysis_history
  WHERE user_id = p_user_id AND parent_analysis_id IS NULL;

  -- Calculate new score
  v_new_score := 
    (v_total_analyses * 10) +           -- Base: 10 points per analysis
    (v_validated_count * 25) +          -- Bonus: 25 points per validated idea
    (v_improvement_plans * 15) +        -- Bonus: 15 points per improvement plan
    (v_avg_viability * 10)::integer;    -- Bonus: avg viability * 10

  v_new_level := calculate_user_level(v_new_score);

  -- Insert or update
  INSERT INTO user_market_knowledge (user_id, total_score, current_level, updated_at)
  VALUES (p_user_id, v_new_score, v_new_level, now())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    total_score = v_new_score,
    current_level = v_new_level,
    updated_at = now();
END;
$$;