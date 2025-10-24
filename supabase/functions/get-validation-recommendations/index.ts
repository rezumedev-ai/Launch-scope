import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalysisRecord {
  id: string;
  idea: string;
  viability_score: number;
  analysis_result: any;
  created_at: string;
  is_validated: boolean;
}

function calculateRecommendationScore(analysis: AnalysisRecord): number {
  let score = 0;
  const result = analysis.analysis_result;
  
  const viabilityScore = analysis.viability_score || 0;
  score += viabilityScore * 2;
  
  if (result.detailedViabilityBreakdown) {
    const breakdown = result.detailedViabilityBreakdown;
    score += (breakdown.marketDemand?.score || 0) * 1.5;
    score += (breakdown.monetizationPotential?.score || 0) * 1.5;
    score += (breakdown.differentiation?.score || 0) * 1.0;
    score += (breakdown.technicalFeasibility?.score || 0) * 0.8;
    score += (breakdown.timing?.score || 0) * 0.5;
  }
  
  if (result.marketSignals) {
    const signals = result.marketSignals;
    if (signals.searchVolume?.toLowerCase().includes('high') || signals.searchVolume?.toLowerCase().includes('growing')) {
      score += 5;
    }
    if (signals.fundingActivity?.toLowerCase().includes('high') || signals.fundingActivity?.toLowerCase().includes('active')) {
      score += 3;
    }
    if (signals.competitionDensity?.toLowerCase().includes('moderate') || signals.competitionDensity?.toLowerCase().includes('low')) {
      score += 2;
    }
  }
  
  if (viabilityScore >= 7) {
    score += 10;
  } else if (viabilityScore >= 6) {
    score += 5;
  }
  
  const strengthsCount = result.strengths?.length || 0;
  score += Math.min(strengthsCount * 1.5, 10);
  
  if (result.buildCost?.estimate?.toLowerCase() === 'low') {
    score += 3;
  } else if (result.buildCost?.estimate?.toLowerCase() === 'medium') {
    score += 1;
  }
  
  return Math.min(Math.round(score * 10) / 10, 100);
}

function getRecommendationReason(analysis: AnalysisRecord, score: number): string {
  const reasons: string[] = [];
  const viabilityScore = analysis.viability_score || 0;
  const result = analysis.analysis_result;
  
  if (viabilityScore >= 7) {
    reasons.push(`High viability score of ${viabilityScore}/10`);
  }
  
  if (result.detailedViabilityBreakdown) {
    const breakdown = result.detailedViabilityBreakdown;
    if (breakdown.marketDemand?.score >= 7) {
      reasons.push('Strong market demand');
    }
    if (breakdown.monetizationPotential?.score >= 7) {
      reasons.push('Clear monetization path');
    }
  }
  
  if (result.marketSignals?.searchVolume?.toLowerCase().includes('high') || 
      result.marketSignals?.searchVolume?.toLowerCase().includes('growing')) {
    reasons.push('Growing market interest');
  }
  
  if (result.buildCost?.estimate?.toLowerCase() === 'low') {
    reasons.push('Low build cost');
  }
  
  const strengthsCount = result.strengths?.length || 0;
  if (strengthsCount >= 3) {
    reasons.push(`${strengthsCount} key strengths identified`);
  }
  
  if (reasons.length === 0) {
    return 'Shows potential based on overall analysis';
  }
  
  return reasons.slice(0, 3).join(', ');
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: analyses, error } = await supabase
      .from("analysis_history")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_validated", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching analyses:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch analyses" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const recommendations = (analyses || [])
      .map((analysis: AnalysisRecord) => {
        const score = calculateRecommendationScore(analysis);
        return {
          id: analysis.id,
          idea: analysis.idea,
          viability_score: analysis.viability_score,
          recommendation_score: score,
          reason: getRecommendationReason(analysis, score),
          created_at: analysis.created_at,
          analysis_result: analysis.analysis_result,
        };
      })
      .filter((rec) => rec.viability_score >= 6)
      .sort((a, b) => b.recommendation_score - a.recommendation_score)
      .slice(0, 5);

    for (const rec of recommendations) {
      await supabase
        .from("analysis_history")
        .update({ recommendation_score: rec.recommendation_score })
        .eq("id", rec.id)
        .eq("user_id", user.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        recommendations,
        count: recommendations.length
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error in get-validation-recommendations function:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});