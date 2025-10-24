import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  userId?: string;
  analysisId?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const body: RequestBody = await req.json();
    const userId = body.userId || user.id;

    // Call the database function to update market knowledge
    const { error: updateError } = await supabase.rpc('update_user_market_knowledge', {
      p_user_id: userId
    });

    if (updateError) {
      console.error('Error updating market knowledge:', updateError);
      throw updateError;
    }

    // If an analysisId is provided, calculate opportunity quality score
    if (body.analysisId) {
      const { data: analysis, error: analysisError } = await supabase
        .from('analysis_history')
        .select('analysis_result, viability_score')
        .eq('id', body.analysisId)
        .single();

      if (analysisError) {
        console.error('Error fetching analysis:', analysisError);
      } else if (analysis) {
        // Calculate opportunity quality score (0-100)
        const opportunityScore = calculateOpportunityScore(analysis.analysis_result, analysis.viability_score);

        // Update the analysis with the opportunity score
        const { error: scoreError } = await supabase
          .from('analysis_history')
          .update({ opportunity_quality_score: opportunityScore })
          .eq('id', body.analysisId);

        if (scoreError) {
          console.error('Error updating opportunity score:', scoreError);
        }
      }
    }

    // Fetch updated market knowledge
    const { data: marketKnowledge, error: fetchError } = await supabase
      .from('user_market_knowledge')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching market knowledge:', fetchError);
    }

    // Check and award achievements
    await checkAndAwardAchievements(supabase, userId);

    return new Response(
      JSON.stringify({
        success: true,
        marketKnowledge: marketKnowledge || null
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error in update-market-knowledge:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

// Calculate opportunity quality score based on analysis results
function calculateOpportunityScore(analysisResult: any, viabilityScore: number): number {
  let score = 0;

  // Base score from viability (0-40 points)
  score += (viabilityScore / 10) * 40;

  // Opportunity factors (up to 60 points)
  const factors = {
    hasOpportunities: analysisResult?.opportunities?.length > 0,
    hasMarketSignals: !!analysisResult?.marketSignals,
    hasMonetization: analysisResult?.monetization?.length > 0,
    hasDistribution: analysisResult?.distribution?.length > 0,
    hasValidationSteps: analysisResult?.validationSteps?.length > 0,
    lowCompetition: analysisResult?.marketSignals?.competitionDensity?.toLowerCase().includes('low'),
    highDemand: analysisResult?.marketSignals?.searchVolume?.toLowerCase().includes('high'),
    goodTiming: analysisResult?.detailedViabilityBreakdown?.timing?.score >= 7
  };

  // Add points for each positive factor
  if (factors.hasOpportunities) score += 10;
  if (factors.hasMarketSignals) score += 8;
  if (factors.hasMonetization) score += 8;
  if (factors.hasDistribution) score += 8;
  if (factors.hasValidationSteps) score += 6;
  if (factors.lowCompetition) score += 8;
  if (factors.highDemand) score += 8;
  if (factors.goodTiming) score += 4;

  // Cap at 100
  return Math.min(Math.round(score), 100);
}

// Check and award achievements
async function checkAndAwardAchievements(supabase: any, userId: string) {
  const { data: analyses } = await supabase
    .from('analysis_history')
    .select('id, is_validated, created_at')
    .eq('user_id', userId)
    .is('parent_analysis_id', null);

  if (!analyses) return;

  const achievements: { key: string; data: any }[] = [];

  // First Validation
  if (analyses.length >= 1) {
    achievements.push({ key: 'first_validation', data: { count: 1 } });
  }

  // 5 Analyses
  if (analyses.length >= 5) {
    achievements.push({ key: '5_analyses', data: { count: 5 } });
  }

  // 10 Analyses
  if (analyses.length >= 10) {
    achievements.push({ key: '10_analyses', data: { count: 10 } });
  }

  // First Validated Idea
  const validatedCount = analyses.filter(a => a.is_validated).length;
  if (validatedCount >= 1) {
    achievements.push({ key: 'first_validated_idea', data: { count: 1 } });
  }

  // 5 Validated Ideas
  if (validatedCount >= 5) {
    achievements.push({ key: '5_validated_ideas', data: { count: 5 } });
  }

  // Insert achievements (ignore conflicts if already earned)
  for (const achievement of achievements) {
    await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_key: achievement.key,
        achievement_data: achievement.data
      })
      .select()
      .single()
      .then(() => {})
      .catch(() => {}); // Ignore duplicate key errors
  }
}
